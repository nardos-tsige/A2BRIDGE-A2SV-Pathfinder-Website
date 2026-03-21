import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  MessageSquare,
  Code2,
  AlertTriangle,
  Lightbulb,
  ChevronDown,
  ChevronUp,
  Info,
  CheckCircle2,
  HelpCircle
} from "lucide-react";
import { cn } from "../lib/utils";
import { INTERVIEW_QUESTIONS } from "../data/interviewQuestions";

export default function Interview() {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 text-center"
      >
        <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
          Interview Preparation
        </h1>
        <p className="text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
          Master the behavioral questions commonly asked in the
          A2SV selection process.
        </p>
      </motion.div>

      <div className="space-y-6 mb-16">
        {INTERVIEW_QUESTIONS.map((q) => (
          <div
            key={q.id}
            className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden"
          >
            <button
              onClick={() => setExpandedId(expandedId === q.id ? null : q.id)}
              className="w-full px-6 py-5 flex items-center justify-between bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors text-left"
            >
              <h3 className="text-lg font-bold text-slate-900 dark:text-white pr-8">
                {q.title}
              </h3>
              {expandedId === q.id ? (
                <ChevronUp className="w-5 h-5 text-slate-400 flex-shrink-0" />
              ) : (
                <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
              )}
            </button>

            {expandedId === q.id && (
              <div className="px-6 pb-6 pt-2 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                <div className="space-y-6 mt-4">
                  {q.relatedQuestions && q.relatedQuestions.length > 0 && (
                    <div>
                      <h4 className="flex items-center gap-2 font-bold text-blue-700 dark:text-blue-400 mb-2">
                        <HelpCircle className="w-4 h-4" /> Related Questions
                      </h4>
                      <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                        {q.relatedQuestions.map((rq, i) => (
                          <li key={i}>{rq}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div>
                    <h4 className="flex items-center gap-2 font-bold text-purple-700 dark:text-purple-400 mb-2">
                      <Lightbulb className="w-4 h-4" /> Why they ask this
                    </h4>
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                      {q.description}
                    </p>
                  </div>

                  <div>
                    <h4 className="flex items-center gap-2 font-bold text-rose-700 dark:text-rose-400 mb-2">
                      <AlertTriangle className="w-4 h-4" /> Tips for Answering
                    </h4>
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                      {q.tips}
                    </p>
                  </div>

                  {q.sampleAnswer && (
                    <div className="mt-4 bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                      <h4 className="flex items-center gap-2 font-bold text-emerald-700 dark:text-emerald-400 mb-3">
                        <CheckCircle2 className="w-4 h-4" /> Sample Answer
                      </h4>
                      <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed italic border-l-4 border-emerald-500 pl-4">
                        "{q.sampleAnswer}"
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Additional Sections */}
      <div className="space-y-10 border-t border-slate-200 dark:border-slate-800 pt-10">
        
        {/* How to Answer Sample */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-100 dark:border-slate-800">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-purple-500" />
            How to Answer: Sample
          </h2>
          <div className="space-y-4 text-slate-600 dark:text-slate-300">
            <p>
              <strong>Question:</strong> "Can you tell us the time you felt uncomfortable doing something in your life? What experience did you get from it?"
            </p>
            <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-700">
              <p className="italic mb-2">"During my second year of university, I was asked to lead a group project for a subject I was struggling with. I felt extremely uncomfortable because I wasn't confident in my own technical skills, let alone leading others."</p>
              <p className="italic mb-2">"However, I realized this was an opportunity to grow. I organized our tasks, assigned roles based on everyone's strengths, and spent extra hours studying the material so I could guide the team effectively."</p>
              <p className="italic">"From this experience, I learned that stepping out of my comfort zone is the fastest way to learn. It improved my leadership and communication skills, and our team ended up getting one of the highest grades in the class."</p>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
              <strong>Why this works:</strong> It uses the STAR method (Situation, Task, Action, Result), shows vulnerability, and highlights a positive outcome and personal growth.
            </p>
          </div>
        </div>

        {/* General Interview Tips */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-100 dark:border-slate-800">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <Lightbulb className="w-6 h-6 text-amber-500" />
            Tips While Interviewing
          </h2>
          <ul className="space-y-3 text-slate-600 dark:text-slate-300">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span><strong>Be Authentic:</strong> Don't try to give the "perfect" answer. Be genuine about your experiences and what you've learned.</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span><strong>Use the STAR Method:</strong> Structure your answers using Situation, Task, Action, and Result to keep them focused and impactful.</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span><strong>Show Passion:</strong> A2SV looks for candidates who are deeply passionate about technology and community impact. Let your enthusiasm show.</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span><strong>Listen Carefully:</strong> Make sure you fully understand the question before answering. It's okay to take a few seconds to think.</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span><strong>Ask Questions:</strong> Have a few questions prepared for the interviewers at the end. It shows you are engaged and interested.</span>
            </li>
          </ul>
        </div>

        {/* Technical Questions Reminder */}
        <div className="bg-slate-900 dark:bg-slate-800 rounded-2xl p-8 shadow-sm border border-slate-800 dark:border-slate-700 text-white">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Code2 className="w-6 h-6 text-blue-400" />
            Reminder: Technical Questions
          </h2>
          <div className="space-y-4 text-slate-300">
            <p>
              There are also technical questions where you will need to explain your code. Writing the code is only half the battle; communicating your thought process is just as important.
            </p>
            <div className="bg-slate-800 dark:bg-slate-900 p-5 rounded-xl border border-slate-700">
              <h3 className="font-bold text-white mb-3 flex items-center gap-2">
                <Info className="w-4 h-4 text-blue-400" />
                Tips for Explaining Your Code:
              </h3>
              <ul className="space-y-2 text-sm list-disc list-inside">
                <li>Start with a high-level overview of your approach before diving into line-by-line details.</li>
                <li>Explain the time and space complexity (Big O) of your solution.</li>
                <li>Discuss edge cases and how your code handles them.</li>
                <li>If you get stuck, communicate your thought process. Interviewers want to see how you think, not just the final answer.</li>
                <li>Use clear and precise technical terminology.</li>
              </ul>
            </div>
            <div className="mt-6 p-4 bg-blue-500/20 border border-blue-500/30 rounded-xl text-center">
              <p className="font-bold text-blue-300 text-lg">
                "Practice explaining your code every time when you solve them!"
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
