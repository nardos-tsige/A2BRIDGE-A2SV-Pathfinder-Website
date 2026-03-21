import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import {
  CheckCircle2,
  Circle,
  ExternalLink,
  Github,
  Lock,
  Unlock,
} from "lucide-react";
import { cn } from "../lib/utils";
import { useAuth } from "../context/AuthContext";
import { logActivity, db } from "../lib/firebase";
import { doc, updateDoc, increment } from "firebase/firestore";
import { useLocation } from "react-router-dom";

// Real LeetCode problems
import { LEETCODE_DETAILS } from "../data/leetcodeDetails";

export const REAL_LEETCODE_PROBLEMS = [
  { title: "Two Sum", difficulty: "Easy", topic: "Arrays" },
  { title: "Best Time to Buy and Sell Stock", difficulty: "Easy", topic: "Arrays" },
  { title: "Contains Duplicate", difficulty: "Easy", topic: "Arrays" },
  { title: "Product of Array Except Self", difficulty: "Medium", topic: "Arrays" },
  { title: "Maximum Subarray", difficulty: "Medium", topic: "Arrays" },
  { title: "Maximum Product Subarray", difficulty: "Medium", topic: "Arrays" },
  { title: "Find Minimum in Rotated Sorted Array", difficulty: "Medium", topic: "Binary Search" },
  { title: "Search in Rotated Sorted Array", difficulty: "Medium", topic: "Binary Search" },
  { title: "3Sum", difficulty: "Medium", topic: "Two Pointers" },
  { title: "Container With Most Water", difficulty: "Medium", topic: "Two Pointers" },
  { title: "Sum of Two Integers", difficulty: "Medium", topic: "Bit Manipulation" },
  { title: "Number of 1 Bits", difficulty: "Easy", topic: "Bit Manipulation" },
  { title: "Counting Bits", difficulty: "Easy", topic: "Bit Manipulation" },
  { title: "Missing Number", difficulty: "Easy", topic: "Bit Manipulation" },
  { title: "Reverse Bits", difficulty: "Easy", topic: "Bit Manipulation" },
  { title: "Climbing Stairs", difficulty: "Easy", topic: "Dynamic Programming" },
  { title: "Coin Change", difficulty: "Medium", topic: "Dynamic Programming" },
  { title: "Longest Increasing Subsequence", difficulty: "Medium", topic: "Dynamic Programming" },
  { title: "Longest Common Subsequence", difficulty: "Medium", topic: "Dynamic Programming" },
  { title: "Word Break", difficulty: "Medium", topic: "Dynamic Programming" },
  { title: "Combination Sum", difficulty: "Medium", topic: "Dynamic Programming" },
  { title: "House Robber", difficulty: "Medium", topic: "Dynamic Programming" },
  { title: "House Robber II", difficulty: "Medium", topic: "Dynamic Programming" },
  { title: "Decode Ways", difficulty: "Medium", topic: "Dynamic Programming" },
  { title: "Unique Paths", difficulty: "Medium", topic: "Dynamic Programming" },
  { title: "Jump Game", difficulty: "Medium", topic: "Dynamic Programming" },
  { title: "Clone Graph", difficulty: "Medium", topic: "Graphs" },
  { title: "Course Schedule", difficulty: "Medium", topic: "Graphs" },
  { title: "Pacific Atlantic Water Flow", difficulty: "Medium", topic: "Graphs" },
  { title: "Number of Islands", difficulty: "Medium", topic: "Graphs" },
  { title: "Longest Consecutive Sequence", difficulty: "Medium", topic: "Arrays" },
  { title: "Graph Valid Tree", difficulty: "Medium", topic: "Graphs" },
  { title: "Number of Connected Components in an Undirected Graph", difficulty: "Medium", topic: "Graphs" },
  { title: "Insert Interval", difficulty: "Medium", topic: "Intervals" },
  { title: "Merge Intervals", difficulty: "Medium", topic: "Intervals" },
  { title: "Non-overlapping Intervals", difficulty: "Medium", topic: "Intervals" },
  { title: "Meeting Rooms", difficulty: "Easy", topic: "Intervals" },
  { title: "Meeting Rooms II", difficulty: "Medium", topic: "Intervals" },
  { title: "Reverse Linked List", difficulty: "Easy", topic: "Linked List" },
  { title: "Linked List Cycle", difficulty: "Easy", topic: "Linked List" },
  { title: "Merge Two Sorted Lists", difficulty: "Easy", topic: "Linked List" },
  { title: "Merge k Sorted Lists", difficulty: "Hard", topic: "Linked List" },
  { title: "Remove Nth Node From End of List", difficulty: "Medium", topic: "Linked List" },
  { title: "Reorder List", difficulty: "Medium", topic: "Linked List" },
  { title: "Set Matrix Zeroes", difficulty: "Medium", topic: "Matrix" },
  { title: "Spiral Matrix", difficulty: "Medium", topic: "Matrix" },
  { title: "Rotate Image", difficulty: "Medium", topic: "Matrix" },
  { title: "Longest Substring Without Repeating Characters", difficulty: "Medium", topic: "Strings" },
  { title: "Longest Repeating Character Replacement", difficulty: "Medium", topic: "Strings" },
  { title: "Minimum Window Substring", difficulty: "Hard", topic: "Strings" },
  { title: "Valid Anagram", difficulty: "Easy", topic: "Strings" },
  { title: "Group Anagrams", difficulty: "Medium", topic: "Strings" },
  { title: "Valid Parentheses", difficulty: "Easy", topic: "Strings" },
  { title: "Valid Palindrome", difficulty: "Easy", topic: "Strings" },
  { title: "Longest Palindromic Substring", difficulty: "Medium", topic: "Strings" },
  { title: "Palindromic Substrings", difficulty: "Medium", topic: "Strings" },
  { title: "Encode and Decode Strings", difficulty: "Medium", topic: "Strings" },
  { title: "Maximum Depth of Binary Tree", difficulty: "Easy", topic: "Trees" },
  { title: "Same Tree", difficulty: "Easy", topic: "Trees" },
  { title: "Invert Binary Tree", difficulty: "Easy", topic: "Trees" },
  { title: "Binary Tree Maximum Path Sum", difficulty: "Hard", topic: "Trees" },
  { title: "Binary Tree Level Order Traversal", difficulty: "Medium", topic: "Trees" },
  { title: "Serialize and Deserialize Binary Tree", difficulty: "Hard", topic: "Trees" },
  { title: "Subtree of Another Tree", difficulty: "Easy", topic: "Trees" },
  { title: "Construct Binary Tree from Preorder and Inorder Traversal", difficulty: "Medium", topic: "Trees" },
  { title: "Validate Binary Search Tree", difficulty: "Medium", topic: "Trees" },
  { title: "Kth Smallest Element in a BST", difficulty: "Medium", topic: "Trees" },
  { title: "Lowest Common Ancestor of a BST", difficulty: "Easy", topic: "Trees" },
  { title: "Implement Trie (Prefix Tree)", difficulty: "Medium", topic: "Tries" },
  { title: "Add and Search Word", difficulty: "Medium", topic: "Tries" },
  { title: "Word Search II", difficulty: "Hard", topic: "Tries" },
  { title: "Merge K Sorted Lists", difficulty: "Hard", topic: "Heaps" },
  { title: "Top K Frequent Elements", difficulty: "Medium", topic: "Heaps" },
  { title: "Find Median from Data Stream", difficulty: "Hard", topic: "Heaps" },
  { title: "Find Minimum in Rotated Sorted Array II", difficulty: "Hard", topic: "Binary Search" },
  { title: "Search in Rotated Sorted Array II", difficulty: "Medium", topic: "Binary Search" },
  { title: "Median of Two Sorted Arrays", difficulty: "Hard", topic: "Binary Search" },
  { title: "Koko Eating Bananas", difficulty: "Medium", topic: "Binary Search" },
  { title: "Search a 2D Matrix", difficulty: "Medium", topic: "Binary Search" },
  { title: "Time Based Key-Value Store", difficulty: "Medium", topic: "Binary Search" },
  { title: "Sliding Window Maximum", difficulty: "Hard", topic: "Sliding Window" },
  { title: "Permutation in String", difficulty: "Medium", topic: "Sliding Window" },
  { title: "Daily Temperatures", difficulty: "Medium", topic: "Stack" },
  { title: "Evaluate Reverse Polish Notation", difficulty: "Medium", topic: "Stack" },
  { title: "Generate Parentheses", difficulty: "Medium", topic: "Stack" },
  { title: "Min Stack", difficulty: "Medium", topic: "Stack" },
  { title: "Largest Rectangle in Histogram", difficulty: "Hard", topic: "Stack" },
  { title: "Car Fleet", difficulty: "Medium", topic: "Stack" },
  { title: "Binary Search", difficulty: "Easy", topic: "Binary Search" },
  { title: "Kth Largest Element in an Array", difficulty: "Medium", topic: "Heaps" },
  { title: "Task Scheduler", difficulty: "Medium", topic: "Heaps" },
  { title: "Design Twitter", difficulty: "Medium", topic: "Heaps" },
  { title: "K Closest Points to Origin", difficulty: "Medium", topic: "Heaps" },
  { title: "Last Stone Weight", difficulty: "Easy", topic: "Heaps" },
  { title: "Subsets", difficulty: "Medium", topic: "Backtracking" },
  { title: "Combination Sum II", difficulty: "Medium", topic: "Backtracking" },
  { title: "Permutations", difficulty: "Medium", topic: "Backtracking" },
  { title: "Subsets II", difficulty: "Medium", topic: "Backtracking" },
  { title: "Word Search", difficulty: "Medium", topic: "Backtracking" },
  { title: "Palindrome Partitioning", difficulty: "Medium", topic: "Backtracking" },
  { title: "Letter Combinations of a Phone Number", difficulty: "Medium", topic: "Backtracking" },
  { title: "N-Queens", difficulty: "Hard", topic: "Backtracking" },
  { title: "Surrounded Regions", difficulty: "Medium", topic: "Graphs" },
  { title: "Rotting Oranges", difficulty: "Medium", topic: "Graphs" },
  { title: "Walls and Gates", difficulty: "Medium", topic: "Graphs" },
  { title: "Course Schedule II", difficulty: "Medium", topic: "Graphs" },
  { title: "Redundant Connection", difficulty: "Medium", topic: "Graphs" },
  { title: "Word Ladder", difficulty: "Hard", topic: "Graphs" },
  { title: "Network Delay Time", difficulty: "Medium", topic: "Graphs" },
  { title: "Cheapest Flights Within K Stops", difficulty: "Medium", topic: "Graphs" },
  { title: "Swim in Rising Water", difficulty: "Hard", topic: "Graphs" },
  { title: "Alien Dictionary", difficulty: "Hard", topic: "Graphs" },
  { title: "Min Cost to Connect All Points", difficulty: "Medium", topic: "Graphs" },
  { title: "Reconstruct Itinerary", difficulty: "Hard", topic: "Graphs" },
  { title: "Min Cost Climbing Stairs", difficulty: "Easy", topic: "Dynamic Programming" },
  { title: "Target Sum", difficulty: "Medium", topic: "Dynamic Programming" },
  { title: "Interleaving String", difficulty: "Medium", topic: "Dynamic Programming" },
  { title: "Longest Palindromic Subsequence", difficulty: "Medium", topic: "Dynamic Programming" },
  { title: "Edit Distance", difficulty: "Hard", topic: "Dynamic Programming" },
  { title: "Burst Balloons", difficulty: "Hard", topic: "Dynamic Programming" },
  { title: "Regular Expression Matching", difficulty: "Hard", topic: "Dynamic Programming" },
  { title: "Maximum Alternating Subsequence Sum", difficulty: "Medium", topic: "Dynamic Programming" },
  { title: "Partition Equal Subset Sum", difficulty: "Medium", topic: "Dynamic Programming" },
  { title: "Coin Change II", difficulty: "Medium", topic: "Dynamic Programming" },
  { title: "Best Time to Buy and Sell Stock with Cooldown", difficulty: "Medium", topic: "Dynamic Programming" },
  { title: "Count Vowels Permutation", difficulty: "Hard", topic: "Dynamic Programming" },
  { title: "Gas Station", difficulty: "Medium", topic: "Greedy" },
  { title: "Hand of Straights", difficulty: "Medium", topic: "Greedy" },
  { title: "Merge Triplets to Form Target Triplet", difficulty: "Medium", topic: "Greedy" },
  { title: "Partition Labels", difficulty: "Medium", topic: "Greedy" },
  { title: "Valid Parenthesis String", difficulty: "Medium", topic: "Greedy" },
  { title: "Jump Game II", difficulty: "Medium", topic: "Greedy" },
  { title: "Maximum Points You Can Obtain from Cards", difficulty: "Medium", topic: "Sliding Window" },
  { title: "Longest Subarray of 1's After Deleting One Element", difficulty: "Medium", topic: "Sliding Window" },
  { title: "Fruit Into Baskets", difficulty: "Medium", topic: "Sliding Window" },
  { title: "Find All Anagrams in a String", difficulty: "Medium", topic: "Sliding Window" },
  { title: "Maximum Erasure Value", difficulty: "Medium", topic: "Sliding Window" },
  { title: "Binary Tree Right Side View", difficulty: "Medium", topic: "Trees" },
  { title: "Count Good Nodes in Binary Tree", difficulty: "Medium", topic: "Trees" },
  { title: "Lowest Common Ancestor of a Binary Tree", difficulty: "Medium", topic: "Trees" },
  { title: "Diameter of Binary Tree", difficulty: "Easy", topic: "Trees" },
  { title: "Balanced Binary Tree", difficulty: "Easy", topic: "Trees" },
  { title: "Copy List with Random Pointer", difficulty: "Medium", topic: "Linked List" },
  { title: "Add Two Numbers", difficulty: "Medium", topic: "Linked List" },
  { title: "Find the Duplicate Number", difficulty: "Medium", topic: "Linked List" },
  { title: "LRU Cache", difficulty: "Medium", topic: "Linked List" },
  { title: "Reverse Nodes in k-Group", difficulty: "Hard", topic: "Linked List" },
  { title: "Sort Colors", difficulty: "Medium", topic: "Sorting" },
  { title: "Merge Sorted Array", difficulty: "Easy", topic: "Sorting" },
  { title: "Squares of a Sorted Array", difficulty: "Easy", topic: "Sorting" },
  { title: "Intersection of Two Arrays", difficulty: "Easy", topic: "Sorting" },
  { title: "Intersection of Two Arrays II", difficulty: "Easy", topic: "Sorting" },
  { title: "Sort an Array", difficulty: "Medium", topic: "Sorting" },
  { title: "Largest Number", difficulty: "Medium", topic: "Sorting" },
  { title: "Sort List", difficulty: "Medium", topic: "Sorting" },
  { title: "Insertion Sort List", difficulty: "Medium", topic: "Sorting" },
  { title: "Sort Characters By Frequency", difficulty: "Medium", topic: "Sorting" },
  { title: "Custom Sort String", difficulty: "Medium", topic: "Sorting" },
  { title: "Relative Sort Array", difficulty: "Easy", topic: "Sorting" },
  { title: "Pancake Sorting", difficulty: "Medium", topic: "Sorting" },
  { title: "Wiggle Sort II", difficulty: "Medium", topic: "Sorting" },
  { title: "Maximum Gap", difficulty: "Hard", topic: "Sorting" },
];

const MOCK_PROBLEMS = REAL_LEETCODE_PROBLEMS.map((prob, i) => {
  const slug = prob.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  const details = LEETCODE_DETAILS[prob.title] || {
    description: `Description for ${prob.title} is not available.`,
    explanation: `This is a detailed explanation for ${prob.title}. The optimal approach involves understanding the core concepts of ${prob.topic}.`,
    implementation: `class Solution:\n    def solve(self, nums: List[int]) -> int:\n        # Implementation for ${prob.title}\n        pass`
  };

  return {
    id: i + 1,
    title: prob.title,
    difficulty: prob.difficulty,
    completed: false,
    attempted: false,
    topic: prob.topic,
    url: `https://leetcode.com/problems/${slug}/`,
    description: details.description,
    explanation: details.explanation,
    implementation: details.implementation
  };
});

export default function Tracker() {
  const { user } = useAuth();
  const location = useLocation();
  const [problems, setProblems] = useState(MOCK_PROBLEMS);
  const [filter, setFilter] = useState("All");
  const [expandedId, setExpandedId] = useState<number | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchTitle = params.get("search");
    if (searchTitle) {
      const problem = problems.find(p => p.title.toLowerCase() === searchTitle.toLowerCase());
      if (problem) {
        setFilter("All");
        setExpandedId(problem.id);
        setProblems(prev => prev.map(p => p.id === problem.id ? { ...p, attempted: true } : p));
        setTimeout(() => {
          document.getElementById(`problem-${problem.id}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 100);
      }
    }
  }, [location.search]);

  const toggleComplete = async (id: number) => {
    let wasCompleted = false;
    let problemTitle = "";
    
    setProblems(
      problems.map((p) => {
        if (p.id === id) {
          wasCompleted = p.completed;
          problemTitle = p.title;
          return { ...p, completed: !p.completed, attempted: true };
        }
        return p;
      }),
    );
    
    if (user && problemTitle) {
      try {
        await updateDoc(doc(db, 'users', user.uid), {
          problemsSolved: increment(wasCompleted ? -1 : 1)
        });
        if (!wasCompleted) {
          await logActivity(user.uid, `Solved: ${problemTitle}`, `Completed a LeetCode problem.`, 'problem_solved');
        }
      } catch (error) {
        console.error("Failed to update stats:", error);
      }
    }
  };

  const toggleAttempt = (id: number) => {
    setProblems(
      problems.map((p) => {
        if (p.id === id) {
          return { ...p, attempted: !p.attempted };
        }
        return p;
      }),
    );
  };

  const completedCount = problems.filter((p) => p.completed).length;
  const totalCount = problems.length;

  const filteredProblems = problems.filter((p) => {
    if (filter === "Completed") return p.completed;
    if (filter === "Uncompleted") return !p.completed;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
          LeetCode Tracker
        </h1>
        <p className="text-slate-500 dark:text-slate-400">
          Curated {MOCK_PROBLEMS.length} problems to master data structures and algorithms.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 md:col-span-3 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
              Overall Progress
            </h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              {completedCount} of {totalCount} problems solved
            </p>
          </div>
          <div className="text-right">
            <span className="text-3xl font-bold text-purple-500">
              {Math.round((completedCount / totalCount) * 100)}%
            </span>
          </div>
        </div>
        <div className="bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-800 text-white flex flex-col justify-center items-center text-center">
          <a href="https://github.com/new" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition-colors flex flex-col items-center">
            <Github className="w-8 h-8 mb-2 text-slate-300" />
            <p className="text-sm font-medium">
              Create repository <strong>my-leetcode-codes</strong>, create a file, and commit your solutions there!
            </p>
          </a>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex gap-2">
          {["All", "Completed", "Uncompleted"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                filter === f
                  ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900"
                  : "bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700",
              )}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800 text-slate-500 dark:text-slate-400 text-sm">
                <th className="p-4 font-medium w-16 text-center">Status</th>
                <th className="p-4 font-medium">Title</th>
                <th className="p-4 font-medium w-32">Difficulty</th>
                <th className="p-4 font-medium w-48">Topic</th>
                <th className="p-4 font-medium w-32 text-center">
                  Explanation
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredProblems.map((problem) => (
                <React.Fragment key={problem.id}>
                  <tr
                    id={`problem-${problem.id}`}
                    className="border-b border-slate-50 dark:border-slate-800/50 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors"
                  >
                    <td className="p-4 text-center">
                      <button
                        onClick={() => toggleComplete(problem.id)}
                        className={cn(
                          "transition-colors",
                          problem.completed ? "text-emerald-500" : "text-slate-300 dark:text-slate-600 hover:text-emerald-400"
                        )}
                      >
                        {problem.completed ? (
                          <CheckCircle2 className="w-6 h-6" />
                        ) : (
                          <Circle className="w-6 h-6" />
                        )}
                      </button>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-slate-900 dark:text-white">
                          {problem.id}. {problem.title}
                        </span>
                        <a
                          href={problem.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-400 hover:text-purple-500 dark:hover:text-purple-400"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    </td>
                    <td className="p-4">
                      <span
                        className={cn(
                          "px-2.5 py-1 rounded-md text-xs font-medium",
                          problem.difficulty === "Easy" &&
                            "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400",
                          problem.difficulty === "Medium" &&
                            "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400",
                          problem.difficulty === "Hard" &&
                            "bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400",
                        )}
                      >
                        {problem.difficulty}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-slate-600 dark:text-slate-400">
                      {problem.topic}
                    </td>
                    <td className="p-4 text-center">
                      {problem.attempted ? (
                        <button 
                          onClick={() => setExpandedId(expandedId === problem.id ? null : problem.id)}
                          className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 text-sm font-medium flex items-center justify-center gap-1 w-full"
                        >
                          <Unlock className="w-4 h-4" /> {expandedId === problem.id ? "Hide" : "View"}
                        </button>
                      ) : (
                        <button
                          onClick={() => toggleAttempt(problem.id)}
                          className="text-slate-400 dark:text-slate-600 hover:text-slate-600 dark:hover:text-slate-400 text-sm font-medium flex items-center justify-center gap-1 w-full"
                          title="Mark as attempted to view explanation"
                        >
                          <Lock className="w-4 h-4" /> Locked
                        </button>
                      )}
                    </td>
                  </tr>
                  {expandedId === problem.id && (
                    <tr>
                      <td colSpan={5} className="p-0 border-b border-slate-100 dark:border-slate-800">
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="p-6 bg-slate-50 dark:bg-slate-800/30"
                        >
                          <div className="max-w-4xl mx-auto space-y-6">
                            <div>
                              <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2 uppercase tracking-wider">Description</h4>
                              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                                {problem.description}
                              </p>
                            </div>
                            <div>
                              <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2 uppercase tracking-wider">Explanation</h4>
                              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                                {problem.explanation}
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
                                  {`# EXPLANATION:\n${problem.explanation.split('. ').map(s => `# ${s}${s.endsWith('.') ? '' : '.'}`).join('\n')}\n\n${problem.implementation.replace(/\\n/g, '\n')}`}
                                </SyntaxHighlighter>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
