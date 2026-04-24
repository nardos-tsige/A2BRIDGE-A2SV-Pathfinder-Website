import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Code,
  BookOpen,
  Target,
  CheckCircle2,
  TrendingUp,
  Calendar,
} from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "../lib/utils";
import { db, handleFirestoreError, OperationType } from "../lib/firebase";
import { collection, query, orderBy, limit, onSnapshot } from "firebase/firestore";

import { REAL_LEETCODE_PROBLEMS } from "./Tracker";
import { REAL_CODEFORCES_PROBLEMS } from "./Codeforces";
import { A2_QUESTIONS } from "../data/a2practice";

export default function Home() {
  const { user } = useAuth();

  if (user) {
    return <Dashboard />;
  }

  return <LandingPage />;
}

function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12"
      >
        <div className="flex-1 text-center lg:text-left">
          <div className="inline-block mb-4 px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-400 font-medium text-sm tracking-wide">
            For AAU, ASTU & AASTU Students
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
            From my rejection <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-emerald-300">
              to your success.
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
            A2BRIDGE is the ultimate platform designed to help you prepare for and
            successfully join African to Silicon Valley (A2SV).
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <Link
              to="/login"
              className="w-full sm:w-auto px-8 py-4 bg-purple-500 hover:bg-purple-400 text-slate-900 font-bold rounded-xl transition-all shadow-lg shadow-purple-500/20 flex items-center justify-center gap-2"
            >
              Start Your Journey <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/about"
              className="w-full sm:w-auto px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-xl transition-all border border-slate-700 flex items-center justify-center"
            >
              About
            </Link>
          </div>
        </div>
        
        <div className="flex-1 w-full max-w-lg lg:max-w-none relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-emerald-500/20 rounded-3xl blur-2xl transform rotate-3"></div>
          <img 
            src="https://tse2.mm.bing.net/th/id/OIP.0l5M_1p3loToP8DSpdRgygHaHa?w=1080&h=1080&rs=1&pid=ImgDetMain&o=7&rm=3" 
            alt="Students coding together" 
            className="relative rounded-3xl shadow-2xl border border-slate-700/50 object-cover w-full h-[400px]"
            referrerPolicy="no-referrer"
          />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto w-full"
      >
        {[
          {
            icon: Code,
            title: "LeetCode Tracker",
            desc: "Curated 500 problems with progress tracking.",
          },
          {
            icon: BookOpen,
            title: "Interview Prep",
            desc: "Behavioral & technical questions with sample answers.",
          },
          {
            icon: Target,
            title: "A2SV Awareness",
            desc: "Everything you need to know about the selection process.",
          },
        ].map((feature, i) => (
          <div
            key={i}
            className="bg-slate-800/50 border border-slate-700/50 p-8 rounded-2xl backdrop-blur-sm hover:bg-slate-800 transition-colors"
          >
            <div className="bg-slate-700/50 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
              <feature.icon className="w-7 h-7 text-purple-400" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-white">
              {feature.title}
            </h3>
            <p className="text-slate-400 leading-relaxed">{feature.desc}</p>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

function Dashboard() {
  const { user } = useAuth();
  const [activities, setActivities] = useState<any[]>([]);

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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-2">
          Welcome back, {user?.displayName?.split(" ")[0] || "User"}! 👋
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-lg">
          {user?.university || "Student"}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Stats Area */}
        <div className="lg:col-span-2 space-y-8">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-emerald-100 dark:bg-emerald-500/10 p-2 rounded-lg text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h3 className="font-medium text-slate-600 dark:text-slate-400">Problems Solved</h3>
              </div>
              <p className="text-3xl font-bold text-slate-900 dark:text-white">
                {user?.stats?.problemsSolved || 0}{" "}
                <span className="text-sm font-normal text-slate-500 dark:text-slate-500">
                  / {REAL_LEETCODE_PROBLEMS.length + REAL_CODEFORCES_PROBLEMS.length + A2_QUESTIONS.length}
                </span>
              </p>
            </div>
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-amber-100 dark:bg-amber-500/10 p-2 rounded-lg text-amber-600 dark:text-amber-400">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <h3 className="font-medium text-slate-600 dark:text-slate-400">Current Streak</h3>
              </div>
              <p className="text-3xl font-bold text-slate-900 dark:text-white">
                {user?.stats?.currentStreak || 0}{" "}
                <span className="text-sm font-normal text-slate-500 dark:text-slate-500">days</span>
              </p>
            </div>
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-blue-100 dark:bg-blue-500/10 p-2 rounded-lg text-blue-600 dark:text-blue-400">
                  <Calendar className="w-5 h-5" />
                </div>
                <h3 className="font-medium text-slate-600 dark:text-slate-400">Days Active</h3>
              </div>
              <p className="text-3xl font-bold text-slate-900 dark:text-white">
                {user?.stats?.daysActive || 0}{" "}
                <span className="text-sm font-normal text-slate-500 dark:text-slate-500">days</span>
              </p>
            </div>
          </div>

          {/* Upcoming Tip */}
          <div className="bg-slate-900 text-white p-8 rounded-2xl relative overflow-hidden border border-slate-800 shadow-sm">
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
            <h3 className="text-lg font-medium text-purple-400 mb-2 flex items-center gap-2">
              <Target className="w-5 h-5" /> Interview Tip of the Day
            </h3>
            <p className="text-xl font-medium leading-relaxed max-w-2xl relative z-10">
              "{
                [
                  "When explaining your code, always start with the brute force approach before jumping into the optimized solution. It shows your thought process.",
                  "Think out loud! Interviewers want to know how you approach a problem, not just the final code.",
                  "If you get stuck, don't panic. Ask clarifying questions or state your assumptions.",
                  "Always test your code with edge cases before saying you are finished.",
                  "Write clean, readable code. Use meaningful variable names instead of single letters.",
                  "Communication is just as important as coding. Keep a dialogue going with your interviewer.",
                  "Don't rush to code. Spend the first 5-10 minutes understanding the problem and discussing the approach."
                ][new Date().getDay() % 7]
              }"
            </p>
            <Link
              to="/interview"
              className="inline-flex items-center gap-2 mt-6 text-sm font-medium text-white hover:text-purple-300 transition-colors relative z-10"
            >
              View more tips <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
              Quick Actions
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {[
                {
                  name: "Tracker",
                  path: "/tracker",
                  icon: Code,
                  color: "bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400",
                },
                {
                  name: "Codeforces",
                  path: "/codeforces",
                  icon: TrendingUp,
                  color: "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400",
                },
                {
                  name: "A2Practice",
                  path: "/a2practice",
                  icon: Code,
                  color: "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400",
                },
                {
                  name: "Awareness",
                  path: "/awareness",
                  icon: BookOpen,
                  color: "bg-purple-50 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400",
                },
                {
                  name: "Interview",
                  path: "/interview",
                  icon: BookOpen,
                  color: "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400",
                },
              ].map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="bg-white dark:bg-slate-900 p-4 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-md transition-all flex flex-col items-center justify-center gap-3 group"
                >
                  <div
                    className={cn(
                      "p-3 rounded-xl transition-transform group-hover:scale-110",
                      link.color,
                    )}
                  >
                    <link.icon className="w-6 h-6" />
                  </div>
                  <span className="font-medium text-slate-700 dark:text-slate-300 text-sm">
                    {link.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Weekly Target */}
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 p-6 rounded-2xl border border-emerald-100 dark:border-emerald-500/20">
            <h3 className="text-sm font-bold text-emerald-800 dark:text-emerald-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Target className="w-4 h-4" /> Weekly Target
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-600 dark:text-slate-400">Problems Solved</span>
                  <span className="font-bold text-emerald-700 dark:text-emerald-400">
                    {user?.stats?.problemsSolved || 0} / 10
                  </span>
                </div>
                <div className="w-full bg-emerald-200 dark:bg-emerald-900/50 rounded-full h-2">
                  <div 
                    className="bg-emerald-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(((user?.stats?.problemsSolved || 0) / 10) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Solve {Math.max(10 - (user?.stats?.problemsSolved || 0), 0)} more problems this week to hit your target!
              </p>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
              Recent Activity
            </h3>
            {activities.length === 0 ? (
              <p className="text-slate-500 dark:text-slate-400 text-sm">No recent activities yet. Start practicing!</p>
            ) : (
              <div className="space-y-4">
                {activities.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3">
                    <div className="mt-1 w-2 h-2 rounded-full bg-purple-500 flex-shrink-0"></div>
                    <div>
                      <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
                        {activity.title}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {activity.timestamp?.toDate ? new Date(activity.timestamp.toDate()).toLocaleDateString() : 'Just now'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
