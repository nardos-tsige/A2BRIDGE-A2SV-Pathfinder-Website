import React, { useRef, useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  MapPin,
  GraduationCap,
  Code2,
  User as UserIcon,
  Camera,
  Trophy,
  Flame,
  Target,
  Activity,
  Edit2,
  Save,
  X
} from "lucide-react";
import { db, logActivity, handleFirestoreError, OperationType } from "../lib/firebase";
import { collection, query, orderBy, limit, onSnapshot, doc, updateDoc } from "firebase/firestore";

export default function Profile() {
  const { user } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activities, setActivities] = useState<any[]>([]);
  
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    bio: "",
    university: "",
    github: "",
    linkedin: "",
    leetcode: ""
  });

  useEffect(() => {
    if (user) {
      setEditForm({
        bio: user.bio || "",
        university: user.university || "",
        github: user.github || "",
        linkedin: user.linkedin || "",
        leetcode: user.leetcode || ""
      });
    }
  }, [user]);

  useEffect(() => {
    if (!user) return;
    const q = query(
      collection(db, 'users', user.uid, 'activities'),
      orderBy('timestamp', 'desc'),
      limit(5)
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const acts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setActivities(acts);
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, `users/${user.uid}/activities`);
    });
    return () => unsubscribe();
  }, [user]);

  const handleSaveProfile = async () => {
    if (!user) return;
    try {
      await updateDoc(doc(db, 'users', user.uid), {
        bio: editForm.bio,
        university: editForm.university,
        github: editForm.github,
        linkedin: editForm.linkedin,
        leetcode: editForm.leetcode
      });
      await logActivity(user.uid, "Updated Profile", "Updated profile information.", "profile_update");
      setIsEditing(false);
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `users/${user.uid}`);
    }
  };

  if (!user) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden"
      >
        {/* Header/Cover */}
        <div className="h-40 bg-gradient-to-r from-teal-600 via-indigo-600 to-slate-900 relative">
          <div className="absolute -bottom-16 left-8 group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
            <div className="relative">
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user.displayName}
                  className="w-32 h-32 rounded-full border-4 border-white dark:border-slate-900 object-cover bg-white shadow-lg transition-transform group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-32 h-32 rounded-full border-4 border-white dark:border-slate-900 bg-slate-100 dark:bg-slate-800 flex items-center justify-center shadow-lg transition-transform group-hover:scale-105">
                  <UserIcon className="w-12 h-12 text-slate-400" />
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="pt-20 px-8 pb-8 bg-white dark:bg-slate-900">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
                  {user.displayName || "Anonymous User"}
                </h1>
                {!isEditing ? (
                  <button 
                    onClick={() => setIsEditing(true)}
                    className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
                  >
                    <Edit2 className="w-4 h-4" /> Edit Profile
                  </button>
                ) : (
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => setIsEditing(false)}
                      className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
                    >
                      <X className="w-4 h-4" /> Cancel
                    </button>
                    <button 
                      onClick={handleSaveProfile}
                      className="flex items-center gap-2 text-sm font-medium bg-teal-600 hover:bg-teal-700 text-white px-3 py-1.5 rounded-lg transition-colors"
                    >
                      <Save className="w-4 h-4" /> Save
                    </button>
                  </div>
                )}
              </div>

              {isEditing ? (
                <div className="mt-4 space-y-4 max-w-2xl">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Bio</label>
                    <textarea 
                      value={editForm.bio}
                      onChange={(e) => setEditForm({...editForm, bio: e.target.value})}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2 text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500 outline-none"
                      rows={3}
                      placeholder="Tell us about yourself..."
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">University</label>
                      <input 
                        type="text"
                        value={editForm.university}
                        onChange={(e) => setEditForm({...editForm, university: e.target.value})}
                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2 text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500 outline-none"
                        placeholder="e.g. Addis Ababa University"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">GitHub URL</label>
                      <input 
                        type="text"
                        value={editForm.github}
                        onChange={(e) => setEditForm({...editForm, github: e.target.value})}
                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2 text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500 outline-none"
                        placeholder="https://github.com/username"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">LinkedIn URL</label>
                      <input 
                        type="text"
                        value={editForm.linkedin}
                        onChange={(e) => setEditForm({...editForm, linkedin: e.target.value})}
                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2 text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500 outline-none"
                        placeholder="https://linkedin.com/in/username"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">LeetCode URL</label>
                      <input 
                        type="text"
                        value={editForm.leetcode}
                        onChange={(e) => setEditForm({...editForm, leetcode: e.target.value})}
                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2 text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500 outline-none"
                        placeholder="https://leetcode.com/username"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  {user.bio && (
                    <p className="mt-2 text-slate-600 dark:text-slate-300 max-w-2xl">
                      {user.bio}
                    </p>
                  )}
                  <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-slate-600 dark:text-slate-300">
                    <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-full">
                      <Mail className="w-4 h-4 text-teal-500" />
                      <span>{user.email}</span>
                    </div>
                    {user.university && (
                      <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-full">
                        <GraduationCap className="w-4 h-4 text-indigo-500" />
                        <span>{user.university}</span>
                      </div>
                    )}
                    {user.github && (
                      <a href={user.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                        <Github className="w-4 h-4 text-slate-700 dark:text-slate-300" />
                        <span>GitHub</span>
                      </a>
                    )}
                    {user.linkedin && (
                      <a href={user.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                        <Linkedin className="w-4 h-4 text-blue-600" />
                        <span>LinkedIn</span>
                      </a>
                    )}
                    {user.leetcode && (
                      <a href={user.leetcode} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                        <Code2 className="w-4 h-4 text-orange-500" />
                        <span>LeetCode</span>
                      </a>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="mt-10 pt-8 border-t border-slate-100 dark:border-slate-800">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
              A2SV Preparation Status
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-teal-50 to-emerald-50 dark:from-teal-900/20 dark:to-emerald-900/20 p-6 rounded-2xl border border-teal-100 dark:border-teal-800/30 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <Trophy className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                  <p className="text-sm text-teal-800 dark:text-teal-300 font-semibold uppercase tracking-wider">
                    Problems Solved
                  </p>
                </div>
                <p className="text-4xl font-black text-teal-900 dark:text-teal-100 mt-2">
                  {user.stats.problemsSolved}
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 p-6 rounded-2xl border border-amber-100 dark:border-amber-800/30 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <Flame className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                  <p className="text-sm text-amber-800 dark:text-amber-300 font-semibold uppercase tracking-wider">
                    Current Streak
                  </p>
                </div>
                <p className="text-4xl font-black text-amber-900 dark:text-amber-100 mt-2">
                  {user.stats.currentStreak}{" "}
                  <span className="text-lg font-medium text-amber-600/70 dark:text-amber-400/70">
                    days
                  </span>
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 p-6 rounded-2xl border border-indigo-100 dark:border-indigo-800/30 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  <p className="text-sm text-indigo-800 dark:text-indigo-300 font-semibold uppercase tracking-wider">
                    Days Active
                  </p>
                </div>
                <p className="text-4xl font-black text-indigo-900 dark:text-indigo-100 mt-2">
                  {user.stats.daysActive}{" "}
                  <span className="text-lg font-medium text-indigo-600/70 dark:text-indigo-400/70">
                    days
                  </span>
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10 pt-8 border-t border-slate-100 dark:border-slate-800">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
              <Activity className="w-6 h-6 text-purple-500" />
              Recent Activities
            </h3>
            {activities.length === 0 ? (
              <p className="text-slate-500 dark:text-slate-400">No recent activities. Start solving problems or adding events!</p>
            ) : (
              <div className="space-y-4">
                {activities.map(activity => (
                  <div key={activity.id} className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white">{activity.title}</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400">{activity.description}</p>
                    </div>
                    <div className="text-xs text-slate-400 dark:text-slate-500 whitespace-nowrap">
                      {activity.timestamp?.toDate ? new Date(activity.timestamp.toDate()).toLocaleDateString() : 'Just now'}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </motion.div>
    </div>
  );
}
