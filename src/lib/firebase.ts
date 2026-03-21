import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc, collection, addDoc, serverTimestamp, query, orderBy, limit, getDocs } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

// Initialize Firebase SDK
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string;
    email?: string | null;
    emailVerified?: boolean;
    isAnonymous?: boolean;
    tenantId?: string | null;
    providerInfo: {
      providerId: string;
      displayName: string | null;
      email: string | null;
      photoUrl: string | null;
    }[];
  }
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData.map(provider => ({
        providerId: provider.providerId,
        displayName: provider.displayName,
        email: provider.email,
        photoUrl: provider.photoURL
      })) || []
    },
    operationType,
    path
  }
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Helper to log an activity
export async function logActivity(userId: string, title: string, description: string, type: string) {
  if (!userId) return;
  try {
    const activitiesRef = collection(db, 'users', userId, 'activities');
    await addDoc(activitiesRef, {
      title,
      description,
      type,
      timestamp: serverTimestamp()
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, `users/${userId}/activities`);
  }
}

// Helper to initialize user profile if it doesn't exist
export async function initializeUserProfile(user: any) {
  if (!user) return;
  const userRef = doc(db, 'users', user.uid);
  try {
    const userSnap = await getDoc(userRef);
    if (!userSnap.exists()) {
      const defaultName = user.displayName || (user.email ? user.email.split('@')[0] : 'User');
      const safeEmail = user.email || `${user.uid}@no-email.com`;
      await setDoc(userRef, {
        uid: user.uid,
        email: safeEmail,
        displayName: defaultName,
        photoURL: user.photoURL || '',
        problemsSolved: 0,
        currentStreak: 0,
        daysActive: 0,
        lastActiveDate: new Date().toISOString().split('T')[0],
        createdAt: serverTimestamp()
      });
      // Log welcome activity
      await logActivity(user.uid, 'Welcome to A2SV Tracker!', 'You successfully created your account.', 'account_created');
    } else {
      // Update last active date and streak if needed
      const data = userSnap.data();
      const today = new Date().toISOString().split('T')[0];
      if (data.lastActiveDate !== today) {
        // Simple streak logic: if lastActiveDate was yesterday, increment streak. Else if older, reset to 1.
        const lastActive = new Date(data.lastActiveDate);
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split('T')[0];
        
        let newStreak = data.currentStreak;
        if (data.lastActiveDate === yesterdayStr) {
          newStreak += 1;
        } else {
          newStreak = 1;
        }

        await setDoc(userRef, {
          ...data,
          lastActiveDate: today,
          daysActive: (data.daysActive || 0) + 1,
          currentStreak: newStreak
        }, { merge: true });
      }
    }
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `users/${user.uid}`);
  }
}
