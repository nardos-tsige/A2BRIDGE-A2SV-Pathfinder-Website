import React from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  Calendar,
  CheckCircle,
  Globe,
  Users,
  Zap,
} from "lucide-react";

export default function Awareness() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 text-center"
      >
        <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
          A2SV Awareness
        </h1>
        <p className="text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
          Everything you need to know about African to Silicon Valley, the
          selection process, and how to prepare.
        </p>
      </motion.div>

      <div className="space-y-12">
        {/* What is A2SV */}
        <section className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-purple-100 dark:bg-purple-500/10 p-3 rounded-xl text-purple-600 dark:text-purple-400">
              <Globe className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">What is A2SV?</h2>
          </div>
          <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
            African to Silicon Valley (A2SV) is a non-profit organization that
            upskills high-potential university students in Africa, connects them
            with opportunities at top tech companies like Google, Bloomberg, and
            Databricks, and empowers them to build digital solutions to Africa's
            most pressing problems. A2SV bridges the gap between brilliant African 
            minds and global tech opportunities, providing world-class training in 
            algorithms, data structures, and software engineering.
          </p>
          <div className="mb-6">
            <a 
              href="https://a2sv.org/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-purple-600 dark:text-purple-400 font-bold hover:underline"
            >
              Visit a2sv.org for more information
              <Globe className="w-4 h-4" />
            </a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-700">
              <h4 className="font-bold text-slate-900 dark:text-white mb-1">Education</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Rigorous training in Data Structures, Algorithms, and Software
                Engineering.
              </p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-700">
              <h4 className="font-bold text-slate-900 dark:text-white mb-1">Opportunity</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Direct pathways to internships and full-time roles at global
                tech giants.
              </p>
            </div>
          </div>
        </section>

        {/* Eligibility & Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <section className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-amber-100 dark:bg-amber-500/10 p-3 rounded-xl text-amber-600 dark:text-amber-400">
                <CheckCircle className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Eligibility</h2>
            </div>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="mt-1 w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0"></div>
                <span className="text-slate-700 dark:text-slate-300">
                  Currently enrolled in a university in Ethiopia (AAU, ASTU,
                  AASTU, etc.)
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1 w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0"></div>
                <span className="text-slate-700 dark:text-slate-300">
                  Strong foundation in programming basics
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1 w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0"></div>
                <span className="text-slate-700 dark:text-slate-300">
                  High commitment and dedication (20+ hours/week)
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1 w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0"></div>
                <span className="text-slate-700 dark:text-slate-300">
                  Passion for solving problems and learning
                </span>
              </li>
            </ul>
          </section>

          <section className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-blue-100 dark:bg-blue-500/10 p-3 rounded-xl text-blue-600 dark:text-blue-400">
                <Calendar className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Selection Process
              </h2>
            </div>
            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 dark:before:via-slate-700 before:to-transparent">
              {[
                {
                  step: 1,
                  title: "Online Application",
                  desc: "Submit your resume, transcript, and basic details.",
                },
                {
                  step: 2,
                  title: "Online Assessment",
                  desc: "HackerRank style coding test focusing on basic algorithms.",
                },
                {
                  step: 3,
                  title: "Technical Interview",
                  desc: "Live coding interview with A2SV alumni or mentors.",
                },
                {
                  step: 4,
                  title: "Behavioral Interview",
                  desc: "Assessing your mindset, commitment, and cultural fit.",
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white dark:border-slate-900 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-bold shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                    {item.step}
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm">
                    <h4 className="font-bold text-slate-900 dark:text-white">{item.title}</h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Preparation Tips */}
        <section className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-rose-100 dark:bg-rose-500/10 p-3 rounded-xl text-rose-600 dark:text-rose-400">
              <Zap className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              How to Prepare
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="space-y-3">
              <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-600 dark:text-slate-400 font-bold">
                1
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white">Master the Basics</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Ensure you have a solid grasp of basic data structures (Arrays,
                Strings, Hash Maps) before moving to complex topics.
              </p>
            </div>
            <div className="space-y-3">
              <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-600 dark:text-slate-400 font-bold">
                2
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white">Consistent Practice</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Use the LeetCode Tracker on this platform. Aim for 2-3 problems
                daily rather than cramming 20 on a weekend.
              </p>
            </div>
            <div className="space-y-3">
              <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-600 dark:text-slate-400 font-bold">
                3
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white">Mock Interviews</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Practice explaining your thought process out loud. Use our
                Interview Prep section to practice behavioral questions.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
