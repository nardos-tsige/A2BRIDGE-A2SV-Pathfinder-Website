import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Circle, ExternalLink, Github, Lock, Unlock } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { cn } from "../lib/utils";
import { CODEFORCES_DETAILS } from "../data/codeforcesDetails";
import { useAuth } from "../context/AuthContext";
import { logActivity, db, handleFirestoreError, OperationType } from "../lib/firebase";
import { doc, updateDoc, increment, arrayUnion, arrayRemove } from "firebase/firestore";
import { useLocation } from "react-router-dom";

export const REAL_CODEFORCES_PROBLEMS = [
  { id: "4A", title: "Watermelon", difficulty: "800" },
  { id: "71A", title: "Way Too Long Words", difficulty: "800" },
  { id: "231A", title: "Team", difficulty: "800" },
  { id: "158A", title: "Next Round", difficulty: "800" },
  { id: "50A", title: "Domino piling", difficulty: "800" },
  { id: "282A", title: "Bit++", difficulty: "800" },
  { id: "112A", title: "Petya and Strings", difficulty: "800" },
  { id: "339A", title: "Helpful Maths", difficulty: "800" },
  { id: "281A", title: "Word Capitalization", difficulty: "800" },
  { id: "266A", title: "Stones on the Table", difficulty: "800" },
  { id: "236A", title: "Boy or Girl", difficulty: "800" },
  { id: "546A", title: "Soldier and Bananas", difficulty: "800" },
  { id: "791A", title: "Bear and Big Brother", difficulty: "800" },
  { id: "617A", title: "Elephant", difficulty: "800" },
  { id: "59A", title: "Word", difficulty: "800" },
  { id: "977A", title: "Wrong Subtraction", difficulty: "800" },
  { id: "116A", title: "Tram", difficulty: "800" },
  { id: "266B", title: "Queue at the School", difficulty: "800" },
  { id: "110A", title: "Nearly Lucky Number", difficulty: "800" },
  { id: "734A", title: "Anton and Danik", difficulty: "800" },
  { id: "41A", title: "Translation", difficulty: "800" },
  { id: "677A", title: "Vanya and Fence", difficulty: "800" },
  { id: "271A", title: "Beautiful Year", difficulty: "800" },
  { id: "136A", title: "Presents", difficulty: "800" },
  { id: "344A", title: "Magnets", difficulty: "800" },
  { id: "1030A", title: "In Search of an Easy Problem", difficulty: "800" },
  { id: "467A", title: "George and Accommodation", difficulty: "800" },
  { id: "486A", title: "Calculating Function", difficulty: "800" },
  { id: "200B", title: "Drinks", difficulty: "800" },
  { id: "61A", title: "Ultra-Fast Mathematician", difficulty: "800" },
  { id: "228A", title: "Is your horseshoe on the other hoof?", difficulty: "800" },
  { id: "1328A", title: "Divisibility Problem", difficulty: "800" },
  { id: "405A", title: "Gravity Flip", difficulty: "900" },
  { id: "337A", title: "Puzzles", difficulty: "900" },
  { id: "160A", title: "Twins", difficulty: "900" },
  { id: "230A", title: "Dragons", difficulty: "1000" },
  { id: "451B", title: "Sort the Array", difficulty: "1300" }
];

const CODEFORCES_PROBLEMS = REAL_CODEFORCES_PROBLEMS.map((prob, i) => {
  const contestId = prob.id.replace(/[A-Z]+$/, '');
  const index = prob.id.replace(/^[0-9]+/, '');

  return {
    id: i + 1,
    title: prob.title,
    difficulty: `Rating ${prob.difficulty}`,
    url: `https://codeforces.com/problemset/problem/${contestId}/${index}`,
  };
});

export default function Codeforces() {
  const { user } = useAuth();
  const location = useLocation();
  const [completed, setCompleted] = useState<Set<number>>(new Set());
  const [attempted, setAttempted] = useState<Set<number>>(new Set());
  const [expandedId, setExpandedId] = useState<number | null>(null);

  useEffect(() => {
    if (user && user.completedCodeforces) {
      setCompleted(new Set(user.completedCodeforces));
    }
  }, [user?.completedCodeforces]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchTitle = params.get("search");
    if (searchTitle) {
      const problem = CODEFORCES_PROBLEMS.find(p => p.title.toLowerCase() === searchTitle.toLowerCase());
      if (problem) {
        setExpandedId(problem.id);
        setAttempted(prev => new Set(prev).add(problem.id));
        setTimeout(() => {
          document.getElementById(`problem-${problem.id}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 100);
      }
    }
  }, [location.search]);

  const toggleComplete = async (id: number) => {
    const newCompleted = new Set(completed);
    const problem = CODEFORCES_PROBLEMS.find(p => p.id === id);
    
    if (newCompleted.has(id)) {
      newCompleted.delete(id);
      if (user && problem) {
        try {
          await updateDoc(doc(db, 'users', user.uid), {
            problemsSolved: increment(-1),
            completedCodeforces: arrayRemove(id)
          });
        } catch (error) {
          handleFirestoreError(error, OperationType.UPDATE, `users/${user.uid}`);
        }
      }
    } else {
      newCompleted.add(id);
      if (user && problem) {
        try {
          await updateDoc(doc(db, 'users', user.uid), {
            problemsSolved: increment(1),
            completedCodeforces: arrayUnion(id)
          });
          await logActivity(user.uid, `Solved: ${problem.title}`, `Completed a Codeforces problem.`, 'problem_solved');
        } catch (error) {
          handleFirestoreError(error, OperationType.UPDATE, `users/${user.uid}`);
        }
      }
    }
    setCompleted(newCompleted);
  };

  const toggleAttempt = (id: number) => {
    const newAttempted = new Set(attempted);
    if (newAttempted.has(id)) {
      newAttempted.delete(id);
    } else {
      newAttempted.add(id);
    }
    setAttempted(newAttempted);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
          Codeforces Tracker
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-lg max-w-3xl mb-4">
          Master competitive programming with these 32 curated Codeforces problems. 
          Don't forget to push your solutions to GitHub!
        </p>
        <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 p-4 rounded-xl text-emerald-800 dark:text-emerald-300 text-sm">
          <strong>Note:</strong> These are Codeforces questions just to get you started. As you finish them, look for more on Codeforces to continue your practice!
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 md:col-span-3 flex flex-col justify-center">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
                Overall Progress
              </h3>
            </div>
            <div className="text-right">
              <span className="text-3xl font-bold text-purple-500">
                {Math.round((completed.size / CODEFORCES_PROBLEMS.length) * 100)}%
              </span>
            </div>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-3 overflow-hidden">
            <div 
              className="bg-purple-500 h-3 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${(completed.size / CODEFORCES_PROBLEMS.length) * 100}%` }}
            ></div>
          </div>
        </div>
        <div className="bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-800 text-white flex flex-col justify-center items-center text-center">
          <a href="https://github.com/new" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition-colors flex flex-col items-center">
            <Github className="w-8 h-8 mb-2 text-slate-300" />
            <p className="text-sm font-medium">
              Create repository <strong>my-codeforce-codes</strong>, create a file, and commit your solutions there!
            </p>
          </a>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="divide-y divide-slate-200 dark:divide-slate-800">
          {CODEFORCES_PROBLEMS.map((problem) => {
            const details = CODEFORCES_DETAILS[problem.title] || {
              description: "Description not available.",
              explanation: "Explanation not available.",
              implementation: "# Implementation not available."
            };

            return (
              <div key={problem.id} id={`problem-${problem.id}`} className="group">
                <div 
                  onClick={() => toggleComplete(problem.id)}
                  className={cn(
                    "p-4 sm:p-6 transition-colors cursor-pointer",
                    completed.has(problem.id)
                      ? "bg-emerald-50/50 dark:bg-emerald-900/10 hover:bg-emerald-50 dark:hover:bg-emerald-900/20"
                      : "hover:bg-slate-50 dark:hover:bg-slate-800/50"
                  )}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4 flex-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleComplete(problem.id);
                        }}
                        className={cn(
                          "p-2 rounded-full transition-colors flex-shrink-0",
                          completed.has(problem.id)
                            ? "text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10"
                            : "text-slate-300 dark:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800",
                        )}
                      >
                        {completed.has(problem.id) ? (
                          <CheckCircle2 className="w-6 h-6" />
                        ) : (
                          <Circle className="w-6 h-6" />
                        )}
                      </button>
                      <div>
                        <h3 className={cn(
                          "font-medium text-lg",
                          completed.has(problem.id) ? "text-slate-500 dark:text-slate-400 line-through" : "text-slate-900 dark:text-white"
                        )}>
                          {problem.id}. {problem.title}
                        </h3>
                        <div className="flex items-center gap-3 mt-1">
                          <span className={cn(
                            "text-xs font-medium px-2 py-0.5 rounded-full",
                            problem.difficulty.includes("800") ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400" :
                            problem.difficulty.includes("900") ? "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400" :
                            "bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400"
                          )}>
                            {problem.difficulty}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      {attempted.has(problem.id) ? (
                        <button 
                          onClick={(e) => { e.stopPropagation(); setExpandedId(expandedId === problem.id ? null : problem.id); }}
                          className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 text-sm font-medium flex items-center justify-center gap-1 px-3 py-2 bg-purple-50 dark:bg-purple-500/10 rounded-lg transition-colors"
                        >
                          <Unlock className="w-4 h-4" /> {expandedId === problem.id ? "Hide" : "View"}
                        </button>
                      ) : (
                        <button
                          onClick={(e) => { e.stopPropagation(); toggleAttempt(problem.id); }}
                          className="text-slate-400 dark:text-slate-600 hover:text-slate-600 dark:hover:text-slate-400 text-sm font-medium flex items-center justify-center gap-1 px-3 py-2 bg-slate-50 dark:bg-slate-800 rounded-lg transition-colors"
                          title="Mark as attempted to view explanation"
                        >
                          <Lock className="w-4 h-4" /> Locked
                        </button>
                      )}
                      <a
                        href={problem.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="p-2 text-slate-500 hover:text-purple-600 dark:hover:text-purple-400 bg-slate-100 dark:bg-slate-800 rounded-lg transition-colors"
                        title="Solve on Codeforces"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    </div>
                  </div>
                </div>
                {expandedId === problem.id && (
                  <div className="border-t border-slate-100 dark:border-slate-800">
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="p-6 bg-slate-50 dark:bg-slate-800/30"
                    >
                      <div className="max-w-4xl mx-auto space-y-6">
                        <div>
                          <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2 uppercase tracking-wider">Description</h4>
                          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                            {details.description}
                          </p>
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2 uppercase tracking-wider">Explanation</h4>
                          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                            {details.explanation}
                          </p>
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2 uppercase tracking-wider">Implementation (Python)</h4>
                          <div className="rounded-xl overflow-hidden">
                            <SyntaxHighlighter
                              language="python"
                              style={vscDarkPlus}
                              customStyle={{
                                margin: 0,
                                padding: "1rem",
                                fontSize: "0.875rem",
                                borderRadius: "0.75rem",
                              }}
                            >
                              {`# EXPLANATION:\n${details.explanation.split('. ').map(s => `# ${s}${s.endsWith('.') ? '' : '.'}`).join('\n')}\n\n${details.implementation.replace(/\\n/g, '\n')}`}
                            </SyntaxHighlighter>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
