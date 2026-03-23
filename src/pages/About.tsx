import React from "react";
import { motion } from "framer-motion";
import { 
  Code2, 
  Target, 
  BookOpen, 
  CalendarDays, 
  MessageSquare, 
  Rocket,
  Sparkles,
  Globe,
  Github,
  Trophy,
  Terminal,
  Heart
} from "lucide-react";

export default function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background decoration */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-purple-900/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-emerald-900/10 blur-[120px]" />
      </div>

      <motion.div 
        className="max-w-6xl mx-auto relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Hero Section */}
        <motion.div variants={itemVariants} className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 font-medium text-sm mb-6">
            <Sparkles className="w-4 h-4" />
            Empowering Ethiopian Tech Talent
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-white">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-emerald-400">A2BRIDGE</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
            The ultimate all-in-one preparation platform designed exclusively for university students aspiring to join African to Silicon Valley (A2SV).
          </p>
        </motion.div>

        {/* The Vision Section */}
        <motion.div variants={itemVariants} className="text-center mb-24">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Our Vision & Mission</h2>
          <p className="text-xl text-slate-300 max-w-4xl mx-auto leading-relaxed bg-slate-900/50 p-8 rounded-3xl border border-slate-800 shadow-xl">
            To democratize access to world-class tech education preparation for students at <span className="text-white font-bold">AAU, ASTU, and AASTU</span>. We aim to bridge the gap between raw potential and Silicon Valley standards by providing a structured, transparent, and comprehensive roadmap to ace the A2SV assessments.
          </p>
        </motion.div>

        {/* Platform Contents Section */}
        <motion.div variants={itemVariants} className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">What's Inside A2BRIDGE?</h2>
            <p className="text-slate-400 text-lg">Everything you need to go from beginner to A2SV-ready.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Code2,
                title: "LeetCode & Codeforces Trackers",
                desc: "Curated lists of essential Data Structures and Algorithms problems. Track your progress, maintain streaks, and master the patterns A2SV tests for.",
                color: "text-blue-400",
                bg: "bg-blue-500/10"
              },
              {
                icon: Target,
                title: "A2Practice Arena",
                desc: "Exclusive, custom-tailored practice questions designed to mirror the exact difficulty and style of the actual A2SV assessment environment.",
                color: "text-emerald-400",
                bg: "bg-emerald-500/10"
              },
              {
                icon: MessageSquare,
                title: "Interview Preparation",
                desc: "Comprehensive guides covering behavioral questions, technical communication, and strategies to articulate your thought process clearly.",
                color: "text-amber-400",
                bg: "bg-amber-500/10"
              },
              {
                icon: Globe,
                title: "A2SV Awareness",
                desc: "Demystifying the application process. Know exactly what A2SV looks for, understand the timeline, and learn how to make your application stand out.",
                color: "text-purple-400",
                bg: "bg-purple-500/10"
              },
              {
                icon: CalendarDays,
                title: "Consistency Calendar",
                desc: "Visualize your daily dedication. A GitHub-style contribution graph keeps you motivated and accountable every single day of your journey.",
                color: "text-rose-400",
                bg: "bg-rose-500/10"
              },
              {
                icon: Rocket,
                title: "Performance Analytics",
                desc: "Real-time dashboard showing your problem-solving velocity, active days, and overall readiness for the upcoming A2SV cohorts.",
                color: "text-cyan-400",
                bg: "bg-cyan-500/10"
              }
            ].map((feature, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -5 }}
                className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl hover:bg-slate-800/80 transition-all"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${feature.bg}`}>
                  <feature.icon className={`w-6 h-6 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed text-sm">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* The Story Behind the Bridge (Compact) */}
        <motion.div variants={itemVariants} className="mb-20 max-w-2xl mx-auto">
          <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 md:p-8 text-center relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl"></div>
            
            <Heart className="w-8 h-8 text-rose-500 mx-auto mb-4 relative z-10" />
            <h2 className="text-2xl font-bold text-white mb-4 relative z-10">The Story Behind A2BRIDGE</h2>
            
            <div className="text-base text-slate-300 leading-relaxed space-y-3 relative z-10">
              <p>
                When I joined the software department, I heard people preparing for A2SV. I wanted to join, so I started preparing too.
              </p>
              <p>
                But I think I started too late. I didn't know exactly what to study or how to prepare well, and because of that, I was rejected.
              </p>
              <blockquote className="text-lg font-serif italic text-white leading-snug my-6 py-4 border-y border-slate-800">
                "I decided that my rejection shouldn't be the end of the story. It should be the beginning of someone else's success."
              </blockquote>
              <p className="text-sm text-slate-400">
                A2BRIDGE is my way of making sure no one else is left behind because they started late or didn't have guidance.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Footer CTA */}
        <motion.div variants={itemVariants} className="mt-12 text-center pb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Ready to cross the bridge?</h2>
          <p className="text-slate-400 mb-8 max-w-2xl mx-auto">
            Join the community of students preparing for their breakthrough. Your journey to Silicon Valley starts with a single line of code.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
