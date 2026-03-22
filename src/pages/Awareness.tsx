import React from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  Calendar,
  CheckCircle,
  Globe,
  Users,
  Zap,
  Target,
  Briefcase,
  HeartHandshake,
  GraduationCap,
  TrendingUp,
  Lightbulb,
  Code2
} from "lucide-react";

export default function Awareness() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background decoration */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] rounded-full bg-blue-900/10 dark:bg-blue-900/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-purple-900/10 dark:bg-purple-900/20 blur-[120px]" />
      </div>

      <motion.div 
        className="max-w-6xl mx-auto relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Hero Section */}
        <motion.div variants={itemVariants} className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 text-blue-700 dark:text-blue-400 font-medium text-sm mb-6">
            <Globe className="w-4 h-4" />
            African to Silicon Valley
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-slate-900 dark:text-white">
            What is <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">A2SV?</span>
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
            A2SV is more than just a training program. It is a life-changing journey that transforms high-potential African university students into world-class software engineers.
          </p>
        </motion.div>

        {/* Core Pillars Section */}
        <motion.div variants={itemVariants} className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">The A2SV Experience</h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">
              A2SV doesn't just teach you how to code. They rewire how you think, how you work, and how you approach challenges.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 p-8 rounded-3xl shadow-sm hover:shadow-md transition-all">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-500/10 rounded-xl flex items-center justify-center mb-6">
                <GraduationCap className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">World-Class Education</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Receive rigorous, Silicon Valley-standard training in Data Structures, Algorithms, and Software Engineering principles. You will learn to solve complex problems efficiently and write production-grade code.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 p-8 rounded-3xl shadow-sm hover:shadow-md transition-all">
              <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-500/10 rounded-xl flex items-center justify-center mb-6">
                <TrendingUp className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">The Power of Consistency</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Talent is not enough. A2SV heavily emphasizes <strong className="text-slate-900 dark:text-white">consistency and discipline</strong>. You will build the habit of showing up every single day, pushing through frustration, and compounding your skills over time.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 p-8 rounded-3xl shadow-sm hover:shadow-md transition-all">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-500/10 rounded-xl flex items-center justify-center mb-6">
                <Briefcase className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Global Opportunities</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                A2SV provides direct pathways to internships and full-time roles at global tech giants like Google, Bloomberg, Databricks, and Amazon. They bridge the gap between your potential and top-tier companies.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 p-8 rounded-3xl shadow-sm hover:shadow-md transition-all">
              <div className="w-12 h-12 bg-rose-100 dark:bg-rose-500/10 rounded-xl flex items-center justify-center mb-6">
                <Lightbulb className="w-6 h-6 text-rose-600 dark:text-rose-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Real-World Impact</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Beyond passing interviews, A2SV empowers you to build digital solutions to Africa's most pressing problems. You will work on real projects that make a tangible difference in people's lives.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 p-8 rounded-3xl shadow-sm hover:shadow-md transition-all">
              <div className="w-12 h-12 bg-amber-100 dark:bg-amber-500/10 rounded-xl flex items-center justify-center mb-6">
                <Users className="w-6 h-6 text-amber-600 dark:text-amber-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Elite Community</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Surround yourself with the brightest minds. The A2SV community is a brotherhood/sisterhood of highly motivated individuals who push each other to grow, share knowledge, and succeed together.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 p-8 rounded-3xl shadow-sm hover:shadow-md transition-all">
              <div className="w-12 h-12 bg-cyan-100 dark:bg-cyan-500/10 rounded-xl flex items-center justify-center mb-6">
                <HeartHandshake className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Mentorship & Guidance</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Get 1-on-1 guidance from A2SV alumni and engineers currently working in Silicon Valley. They review your code, conduct mock interviews, and provide invaluable career advice.
              </p>
            </div>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-24">
          {/* Eligibility */}
          <motion.div variants={itemVariants} className="bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 p-8 rounded-3xl shadow-sm">
            <div className="flex items-center gap-4 mb-8">
              <div className="bg-indigo-100 dark:bg-indigo-500/10 p-3 rounded-xl text-indigo-600 dark:text-indigo-400">
                <CheckCircle className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Who Can Apply?</h2>
            </div>
            <ul className="space-y-4">
              {[
                "Currently enrolled in a university in Ethiopia (AAU, ASTU, AASTU, etc.)",
                "Strong foundation in programming basics (variables, loops, functions)",
                "High commitment and dedication (able to commit 20+ hours/week)",
                "A burning passion for solving problems and continuous learning",
                "Willingness to give back to the community"
              ].map((req, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="mt-1.5 w-2 h-2 rounded-full bg-indigo-500 flex-shrink-0"></div>
                  <span className="text-slate-700 dark:text-slate-300 leading-relaxed">{req}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Selection Process */}
          <motion.div variants={itemVariants} className="bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 p-8 rounded-3xl shadow-sm">
            <div className="flex items-center gap-4 mb-8">
              <div className="bg-orange-100 dark:bg-orange-500/10 p-3 rounded-xl text-orange-600 dark:text-orange-400">
                <Calendar className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">The Selection Process</h2>
            </div>
            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-orange-500/20 before:via-orange-500/20 before:to-transparent">
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
                <div key={item.step} className="relative flex items-start gap-6">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white dark:border-slate-900 bg-orange-100 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400 font-bold shrink-0 z-10">
                    {item.step}
                  </div>
                  <div className="pt-1.5">
                    <h4 className="font-bold text-slate-900 dark:text-white text-lg">{item.title}</h4>
                    <p className="text-slate-600 dark:text-slate-400 mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Preparation Tips */}
        <motion.div variants={itemVariants} className="bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-800 dark:to-slate-900 rounded-3xl p-8 md:p-12 shadow-xl border border-slate-700 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
          
          <div className="text-center mb-12 relative z-10">
            <h2 className="text-3xl font-bold text-white mb-4">How to Prepare Right Now</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Don't wait for the applications to open. Start building your foundation today using A2BRIDGE.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative z-10">
            <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-2xl">
              <div className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center text-white font-bold mb-4">1</div>
              <h3 className="font-bold text-white text-lg mb-2">Master the Basics</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Ensure you have a solid grasp of basic data structures (Arrays, Strings, Hash Maps, Two Pointers) before moving to complex topics like DP or Graphs.
              </p>
            </div>
            <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-2xl">
              <div className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center text-white font-bold mb-4">2</div>
              <h3 className="font-bold text-white text-lg mb-2">Practice Consistently</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Use the A2BRIDGE Trackers. Aim for 2-3 problems daily. Consistency beats intensity. It's better to solve 2 problems every day than 14 problems on Sunday.
              </p>
            </div>
            <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-2xl">
              <div className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center text-white font-bold mb-4">3</div>
              <h3 className="font-bold text-white text-lg mb-2">Mock Interviews</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Practice explaining your thought process out loud. Use our Interview Prep section to practice behavioral questions and technical communication.
              </p>
            </div>
          </div>
          
          <div className="mt-12 text-center relative z-10">
            <a 
              href="https://a2sv.org/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-colors"
            >
              Visit Official A2SV Website
              <Globe className="w-4 h-4" />
            </a>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
