import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { auth, db, initializeUserProfile, handleFirestoreError, OperationType } from "../lib/firebase";
import { onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword, User as FirebaseUser } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";

export interface UserStats {
  problemsSolved: number;
  currentStreak: number;
  daysActive: number;
}

export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  bio?: string;
  github?: string;
  linkedin?: string;
  university?: string;
  leetcode?: string;
  stats: UserStats;
  completedLeetCode?: number[];
  completedCodeforces?: number[];
  completedA2Practice?: number[];
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  loginWithGoogle: () => Promise<void>;
  loginWithEmail: (email: string, password: string) => Promise<void>;
  signupWithEmail: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribeDoc: (() => void) | null = null;

    const unsubscribeAuth = onAuthStateChanged(auth, async (firebaseUser) => {
      if (unsubscribeDoc) {
        unsubscribeDoc();
        unsubscribeDoc = null;
      }

      if (firebaseUser) {
        // Ensure user profile exists in Firestore
        await initializeUserProfile(firebaseUser);
        
        // Listen to user document in Firestore
        unsubscribeDoc = onSnapshot(doc(db, 'users', firebaseUser.uid), (docSnap) => {
          if (docSnap.exists()) {
            const data = docSnap.data();
            setUser({
              uid: data.uid,
              email: data.email,
              displayName: data.displayName || firebaseUser.displayName || '',
              photoURL: data.photoURL || firebaseUser.photoURL || '',
              bio: data.bio || '',
              github: data.github || '',
              linkedin: data.linkedin || '',
              university: data.university || '',
              leetcode: data.leetcode || '',
              stats: {
                problemsSolved: data.problemsSolved || 0,
                currentStreak: data.currentStreak || 0,
                daysActive: data.daysActive || 0
              },
              completedLeetCode: data.completedLeetCode || [],
              completedCodeforces: data.completedCodeforces || [],
              completedA2Practice: data.completedA2Practice || []
            });
          } else {
            // Fallback if document doesn't exist yet or failed to create
            setUser({
              uid: firebaseUser.uid,
              email: firebaseUser.email || '',
              displayName: firebaseUser.displayName || (firebaseUser.email ? firebaseUser.email.split('@')[0] : 'User'),
              photoURL: firebaseUser.photoURL || '',
              stats: {
                problemsSolved: 0,
                currentStreak: 0,
                daysActive: 0
              },
              completedLeetCode: [],
              completedCodeforces: [],
              completedA2Practice: []
            });
          }
          setLoading(false);
        }, (error) => {
          handleFirestoreError(error, OperationType.GET, `users/${firebaseUser.uid}`);
          // Still set user so they aren't completely locked out if Firestore fails
          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email || '',
            displayName: firebaseUser.displayName || (firebaseUser.email ? firebaseUser.email.split('@')[0] : 'User'),
            photoURL: firebaseUser.photoURL || '',
            stats: {
              problemsSolved: 0,
              currentStreak: 0,
              daysActive: 0
            },
            completedLeetCode: [],
            completedCodeforces: [],
            completedA2Practice: []
          });
          setLoading(false);
        });
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeDoc) {
        unsubscribeDoc();
      }
    };
  }, []);

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Error signing in with Google:", error);
      throw error;
    }
  };

  const loginWithEmail = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("Error signing in with email:", error);
      throw error;
    }
  };

  const signupWithEmail = async (email: string, password: string) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("Error signing up with email:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, loginWithGoogle, loginWithEmail, signupWithEmail, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
