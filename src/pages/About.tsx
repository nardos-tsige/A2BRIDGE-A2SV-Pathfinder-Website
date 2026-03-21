import React from "react";
import { motion } from "framer-motion";

export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-12"
      >
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            My Story
          </h1>
          <p className="text-xl text-slate-300 font-medium">
            From rejection to building a bridge for others.
          </p>
        </div>

        <div className="prose prose-lg prose-invert mx-auto">
          <div className="bg-slate-900 p-8 rounded-3xl shadow-sm border border-slate-800 mb-8">
            <p className="text-lg leading-relaxed text-slate-300 mb-6">
              Hi, I'm <strong className="text-white">Nardos Tsige</strong>,
              a second-year software engineering student at Addis Ababa
              University (AAU).
            </p>
            <p className="text-lg leading-relaxed text-slate-300 mb-6">
              Like many ambitious students, I dreamed of joining African to
              Silicon Valley (A2SV). I saw it as the ultimate launchpad for my
              career in tech. I applied, hoping for the best, but ultimately, I
              was rejected.
            </p>
            <p className="text-lg leading-relaxed text-slate-300 mb-6">
              The rejection stung, but it also opened my eyes. I realized that
              my failure wasn't just about coding skills; it was due to a severe
              lack of proper awareness, structured preparation, and accessible
              resources. I didn't know what to expect in the interviews, which
              LeetCode problems to focus on, or how to present myself
              effectively.
            </p>
            <blockquote className="border-l-4 border-purple-500 pl-6 py-2 my-8 italic text-xl text-slate-200 font-medium bg-slate-800 rounded-r-xl">
              "I decided that my rejection shouldn't be the end of the story. It
              should be the beginning of someone else's success."
            </blockquote>
            <p className="text-lg leading-relaxed text-slate-300 mb-6">
              That's why I created <strong>A2BRIDGE</strong>. My vision is to
              help students from AAU, ASTU, and AASTU achieve their dreams of
              joining A2SV. I want to bridge the gap between where you are now
              and where you need to be.
            </p>
            <p className="text-lg leading-relaxed text-slate-300">
              This platform is my commitment to making quality preparation
              resources accessible to everyone, regardless of their background
              or circumstances. It's designed to be easy to use, attractive, and
              genuinely helpful for students facing the same challenges I did.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 shadow-sm">
              <h3 className="text-xl font-bold mb-2 text-purple-400">
                Awareness
              </h3>
              <p className="text-slate-300 text-sm">
                Demystifying the A2SV process so you know exactly what to
                expect.
              </p>
            </div>
            <div className="bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 shadow-sm">
              <h3 className="text-xl font-bold mb-2 text-amber-400">
                Preparation
              </h3>
              <p className="text-slate-300 text-sm">
                Curated LeetCode problems and interview prep materials.
              </p>
            </div>
            <div className="bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 shadow-sm">
              <h3 className="text-xl font-bold mb-2 text-rose-400">
                Tracking
              </h3>
              <p className="text-slate-300 text-sm">
                Monitor your LeetCode and Codeforces progress seamlessly.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
