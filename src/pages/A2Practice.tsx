import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Circle, Play, Lightbulb, Code2, RefreshCw, Loader2 } from "lucide-react";
import { cn } from "../lib/utils";
import { A2_QUESTIONS, A2Question } from "../data/a2practice";
import { useAuth } from "../context/AuthContext";
import { logActivity, db, handleFirestoreError, OperationType } from "../lib/firebase";
import { doc, updateDoc, increment, arrayUnion, arrayRemove } from "firebase/firestore";
import { useLocation } from "react-router-dom";

export default function A2Practice() {
  const { user } = useAuth();
  const location = useLocation();
  const [completed, setCompleted] = useState<Set<number>>(new Set());
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [userCode, setUserCode] = useState<Record<number, string>>({});
  const [testResults, setTestResults] = useState<Record<number, { passed: boolean; message: string }>>({});
  const [showSolution, setShowSolution] = useState<Record<number, boolean>>({});

  const [pyodide, setPyodide] = useState<any>(null);
  const [isLoadingPyodide, setIsLoadingPyodide] = useState(true);
  const [isRunning, setIsRunning] = useState<Record<number, boolean>>({});
  const [editorTheme, setEditorTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchTitle = params.get("search");
    if (searchTitle) {
      const question = A2_QUESTIONS.find(q => q.title.toLowerCase() === searchTitle.toLowerCase());
      if (question) {
        setExpandedId(question.id);
        setTimeout(() => {
          document.getElementById(`problem-${question.id}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 100);
      }
    }
  }, [location.search]);

  useEffect(() => {
    const loadPyodideScript = async () => {
      if ((window as any).loadPyodide) {
        initPyodide();
        return;
      }
      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/pyodide/v0.24.1/full/pyodide.js";
      script.onload = initPyodide;
      document.body.appendChild(script);
    };

    const initPyodide = async () => {
      try {
        const py = await (window as any).loadPyodide({
          indexURL: "https://cdn.jsdelivr.net/pyodide/v0.24.1/full/"
        });
        setPyodide(py);
        setIsLoadingPyodide(false);
      } catch (err) {
        console.error("Failed to load Pyodide", err);
      }
    };

    loadPyodideScript();
  }, []);

  // Load saved progress
  useEffect(() => {
    const savedCode = localStorage.getItem("a2practice_code_py");
    if (savedCode) setUserCode(JSON.parse(savedCode));
    
    if (user && user.completedA2Practice) {
      setCompleted(new Set(user.completedA2Practice));
    } else {
      const savedCompleted = localStorage.getItem("a2practice_completed_py");
      if (savedCompleted) setCompleted(new Set(JSON.parse(savedCompleted)));
    }
  }, [user?.completedA2Practice]);

  // Save progress
  useEffect(() => {
    localStorage.setItem("a2practice_code_py", JSON.stringify(userCode));
    localStorage.setItem("a2practice_completed_py", JSON.stringify(Array.from(completed)));
  }, [userCode, completed]);

  const toggleComplete = async (id: number) => {
    const newCompleted = new Set(completed);
    const question = A2_QUESTIONS.find(q => q.id === id);
    
    if (newCompleted.has(id)) {
      newCompleted.delete(id);
      if (user && question) {
        try {
          await updateDoc(doc(db, 'users', user.uid), {
            problemsSolved: increment(-1),
            completedA2Practice: arrayRemove(id)
          });
        } catch (error) {
          handleFirestoreError(error, OperationType.UPDATE, `users/${user.uid}`);
        }
      }
    } else {
      newCompleted.add(id);
      if (user && question) {
        try {
          await updateDoc(doc(db, 'users', user.uid), {
            problemsSolved: increment(1),
            completedA2Practice: arrayUnion(id)
          });
          await logActivity(user.uid, `Solved: ${question.title}`, `Completed an A2Practice problem.`, 'problem_solved');
        } catch (error) {
          handleFirestoreError(error, OperationType.UPDATE, `users/${user.uid}`);
        }
      }
    }
    setCompleted(newCompleted);
  };

  const handleCodeChange = (id: number, code: string) => {
    setUserCode(prev => ({ ...prev, [id]: code }));
    // Clear test results when code changes
    if (testResults[id]) {
      const newResults = { ...testResults };
      delete newResults[id];
      setTestResults(newResults);
    }
  };

  const runCode = async (question: A2Question) => {
    if (!pyodide) return;
    
    setIsRunning(prev => ({ ...prev, [question.id]: true }));
    const code = userCode[question.id] !== undefined ? userCode[question.id] : question.initialCode;
    
    try {
      let testCode = code + "\n\n";
      testCode += "import json\n";
      testCode += "import sys\n";
      testCode += "import io\n";
      testCode += "def run_tests():\n";
      
      question.testCases.forEach((tc, i) => {
        const inputsStr = JSON.stringify(tc.input);
        const expectedStr = JSON.stringify(tc.expected);
        
        testCode += `    try:\n`;
        testCode += `        inputs_val = json.loads(r'''${inputsStr}''')\n`;
        testCode += `        captured_output = io.StringIO()\n`;
        testCode += `        sys.stdout = captured_output\n`;
        testCode += `        res = solve(*inputs_val)\n`;
        testCode += `        sys.stdout = sys.__stdout__\n`;
        testCode += `        stdout_val = captured_output.getvalue().strip()\n`;
        testCode += `    except Exception as e:\n`;
        testCode += `        sys.stdout = sys.__stdout__\n`;
        testCode += `        raise Exception(f"Test case ${i + 1} failed with error: {str(e)}")\n`;
        
        testCode += `    expected_val = json.loads(r'''${expectedStr}''')\n`;
        testCode += `    if isinstance(expected_val, dict) and '__stdout__' in expected_val:\n`;
        testCode += `        if stdout_val != expected_val['__stdout__']:\n`;
        testCode += `            raise Exception(f"Test case ${i + 1} failed. Expected output: '{expected_val['__stdout__']}', but got: '{stdout_val}'")\n`;
        testCode += `    else:\n`;
        testCode += `        res_json = json.dumps(res, separators=(',', ':'))\n`;
        testCode += `        expected_json = json.dumps(expected_val, separators=(',', ':'))\n`;
        testCode += `        if res_json != expected_json:\n`;
        testCode += `            raise Exception(f"Test case ${i + 1} failed. Input: {inputsStr}. Expected: {expected_json}, but got: {res_json}")\n`;
      });
      
      testCode += "    return True\n";
      testCode += "run_tests()\n";

      await pyodide.runPythonAsync(testCode);
      
      setTestResults(prev => ({ ...prev, [question.id]: { passed: true, message: "All test cases passed! Great job!" } }));
      
      if (!completed.has(question.id)) {
        setCompleted(prev => new Set(prev).add(question.id));
        if (user) {
          try {
            await updateDoc(doc(db, 'users', user.uid), {
              problemsSolved: increment(1),
              completedA2Practice: arrayUnion(question.id)
            });
            await logActivity(user.uid, `Solved: ${question.title}`, `Completed an A2Practice problem in Python.`, 'problem_solved');
          } catch (error) {
            handleFirestoreError(error, OperationType.UPDATE, `users/${user.uid}`);
          }
        }
      }
      
    } catch (error: any) {
      const errorStr = error.toString();
      const lines = errorStr.split('\\n').filter((l: string) => l.trim().length > 0);
      const lastLine = lines[lines.length - 1] || errorStr;
      
      setTestResults(prev => ({ ...prev, [question.id]: { passed: false, message: lastLine } }));
    } finally {
      setIsRunning(prev => ({ ...prev, [question.id]: false }));
    }
  };

  const toggleSolution = (id: number) => {
    setShowSolution(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const resetCode = (id: number, initialCode: string) => {
    setUserCode(prev => ({ ...prev, [id]: initialCode }));
    const newResults = { ...testResults };
    delete newResults[id];
    setTestResults(newResults);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
          A2Practice: Interactive Coding
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-lg max-w-3xl mb-4">
          Master the basics with these {A2_QUESTIONS.length} interactive problems covering Strings, Lists, Tuples, and Numbers. 
          Write your Python solution, run it against test cases, and track your progress!
        </p>
        <div className="bg-teal-50 dark:bg-teal-900/20 border border-teal-200 dark:border-teal-800 p-4 rounded-xl text-teal-800 dark:text-teal-300 text-sm">
          <strong>Note:</strong> This section is for complete beginners who don't know about Python at all. Start here to build your foundation!
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 md:col-span-4 flex flex-col justify-center">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
                Overall Progress
              </h3>
            </div>
            <div className="text-right">
              <span className="text-3xl font-bold text-teal-500">
                {Math.round((completed.size / A2_QUESTIONS.length) * 100)}%
              </span>
            </div>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-4 overflow-hidden">
            <motion.div 
              className="bg-teal-500 h-4 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${(completed.size / A2_QUESTIONS.length) * 100}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-800/50">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Practice Problems
          </h2>
        </div>

        <div className="divide-y divide-slate-200 dark:divide-slate-800">
          {A2_QUESTIONS.map((question) => (
            <div key={question.id} id={`problem-${question.id}`} className={cn(
              "transition-colors",
              completed.has(question.id)
                ? "bg-emerald-50/50 dark:bg-emerald-900/10 hover:bg-emerald-50 dark:hover:bg-emerald-900/20"
                : "hover:bg-slate-50 dark:hover:bg-slate-800/50"
            )}>
              <div className="p-4 sm:p-6 flex items-center justify-between gap-4 cursor-pointer" onClick={() => setExpandedId(expandedId === question.id ? null : question.id)}>
                <div className="flex items-center gap-4 flex-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleComplete(question.id);
                    }}
                    className={cn(
                      "p-2 rounded-full transition-colors flex-shrink-0",
                      completed.has(question.id)
                        ? "text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10"
                        : "text-slate-300 dark:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800",
                    )}
                  >
                    {completed.has(question.id) ? (
                      <CheckCircle2 className="w-6 h-6" />
                    ) : (
                      <Circle className="w-6 h-6" />
                    )}
                  </button>
                  <div>
                    <h3 className={cn(
                      "font-medium text-lg",
                      completed.has(question.id) ? "text-slate-500 dark:text-slate-400 line-through" : "text-slate-900 dark:text-white"
                    )}>
                      {question.id}. {question.title}
                    </h3>
                    <div className="flex items-center gap-3 mt-1">
                      <span className={cn(
                        "text-xs font-medium px-2 py-0.5 rounded-full",
                        question.category === "Basics" ? "bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400" :
                        question.category === "Strings" ? "bg-purple-100 text-purple-700 dark:bg-purple-500/10 dark:text-purple-400" :
                        question.category === "Lists" ? "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400" :
                        question.category === "Algorithms" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400" :
                        "bg-slate-100 text-slate-700 dark:bg-slate-500/10 dark:text-slate-400"
                      )}>
                        {question.category}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <button
                    className="p-2 text-slate-500 hover:text-teal-600 dark:hover:text-teal-400 bg-slate-100 dark:bg-slate-800 rounded-lg transition-colors"
                    title={expandedId === question.id ? "Close Editor" : "Open Editor"}
                  >
                    <Code2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {expandedId === question.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700"
                >
                  <div className="mb-4">
                    <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Description</h4>
                    <p className="text-slate-600 dark:text-slate-400">{question.description}</p>
                  </div>

                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300">Your Solution (Python)</h4>
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => setEditorTheme(prev => prev === 'dark' ? 'light' : 'dark')}
                          className="text-xs flex items-center gap-1 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                        >
                          {editorTheme === 'dark' ? '☀️ Light Editor' : '🌙 Dark Editor'}
                        </button>
                        <button 
                          onClick={() => resetCode(question.id, question.initialCode)}
                          className="text-xs flex items-center gap-1 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                        >
                          <RefreshCw className="w-3 h-3" /> Reset
                        </button>
                      </div>
                    </div>
                    <textarea
                      value={userCode[question.id] !== undefined ? userCode[question.id] : question.initialCode}
                      onChange={(e) => handleCodeChange(question.id, e.target.value)}
                      className={cn(
                        "w-full h-48 p-4 rounded-xl font-mono text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors",
                        editorTheme === 'dark' 
                          ? "bg-slate-900 text-slate-100" 
                          : "bg-slate-100 text-slate-900 border border-slate-300"
                      )}
                      spellCheck={false}
                    />
                  </div>

                  <div className="flex flex-wrap items-center gap-4 mb-4">
                    <button
                      onClick={() => runCode(question)}
                      disabled={isLoadingPyodide || isRunning[question.id]}
                      className="flex items-center gap-2 px-4 py-2 bg-teal-600 hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors"
                    >
                      {isLoadingPyodide ? (
                        <><Loader2 className="w-4 h-4 animate-spin" /> Loading Python...</>
                      ) : isRunning[question.id] ? (
                        <><Loader2 className="w-4 h-4 animate-spin" /> Running...</>
                      ) : (
                        <><Play className="w-4 h-4" /> Run Code</>
                      )}
                    </button>
                    <button
                      onClick={() => toggleSolution(question.id)}
                      className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg font-medium transition-colors"
                    >
                      <Lightbulb className="w-4 h-4" /> {showSolution[question.id] ? "Hide Solution" : "Stuck? View Solution"}
                    </button>
                  </div>

                  {testResults[question.id] && (
                    <div className={cn(
                      "p-4 rounded-xl mb-4 text-sm font-medium",
                      testResults[question.id].passed 
                        ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800" 
                        : "bg-rose-50 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400 border border-rose-200 dark:border-rose-800"
                    )}>
                      {testResults[question.id].message}
                    </div>
                  )}

                  {showSolution[question.id] && (
                    <div className="mt-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
                      <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Reference Solution</h4>
                      <pre className="bg-slate-900 text-slate-300 p-4 rounded-lg overflow-x-auto text-sm font-mono">
                        <code>{question.solution}</code>
                      </pre>
                    </div>
                  )}
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
