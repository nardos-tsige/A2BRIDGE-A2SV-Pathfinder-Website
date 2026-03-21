export interface InterviewQuestion {
  id: number;
  category: "Behavioral" | "Technical";
  title: string;
  description: string;
  tips: string;
  relatedQuestions?: string[];
  sampleAnswer?: string;
}

export const INTERVIEW_QUESTIONS: InterviewQuestion[] = [
  {
    id: 1,
    category: "Behavioral",
    title: "Who are you? (Tell us about yourself)",
    description: "This is usually the opening question. It sets the tone for the interview and allows the interviewers to understand your background, your current focus, and what drives you.",
    tips: "Keep it concise (1-2 minutes). Focus on your academic background, your passion for software engineering, and a brief highlight of your recent coding journey. Avoid reciting your entire life story.",
    relatedQuestions: [
      "Walk me through your background.",
      "How would you describe yourself in a professional setting?"
    ],
    sampleAnswer: "I am a second-year Computer Science student passionate about algorithmic problem-solving. Over the past year, I've focused on mastering Python and participating in local hackathons. I'm driven by the desire to build impactful software and am eager to join A2SV to elevate my skills and learn alongside a dedicated community."
  },
  {
    id: 2,
    category: "Behavioral",
    title: "Would you consider the past year a success? Why?",
    description: "This assesses your self-awareness, how you define success, and your ability to reflect on your own growth and setbacks.",
    tips: "Success doesn't just mean winning. You can talk about a failure that taught you a valuable lesson. Focus on growth, learning new technologies, or improving your problem-solving skills.",
    relatedQuestions: [
      "What was your biggest achievement last year?",
      "Did you meet your goals recently?"
    ],
    sampleAnswer: "Yes, I consider the past year a success. While I didn't win the regional coding competition, the intense preparation taught me dynamic programming and graph theory. I also successfully balanced my coursework with a part-time internship, which significantly improved my time management skills."
  },
  {
    id: 3,
    category: "Behavioral",
    title: "Tell us your most significant strength and weakness.",
    description: "Interviewers want to see if you are honest, self-aware, and actively working on improving yourself.",
    tips: "For strengths, choose something relevant to A2SV (e.g., persistence, fast learner). For weaknesses, pick a real but manageable flaw and, crucially, explain the steps you are taking to overcome it.",
    relatedQuestions: [
      "What are you best at?",
      "What areas do you need to improve?"
    ],
    sampleAnswer: "My greatest strength is my persistence; when I encounter a difficult bug, I systematically break down the problem until I find the root cause. My weakness is that I sometimes hesitate to ask for help, spending too much time stuck. I'm actively improving this by setting a '1-hour rule'—if I can't solve it in an hour, I reach out to a peer or mentor."
  },
  {
    id: 4,
    category: "Behavioral",
    title: "Can you tell us about a time you felt uncomfortable doing something? What experience did you gain from it?",
    description: "This evaluates your willingness to step out of your comfort zone, which is essential for rapid growth in a rigorous program like A2SV.",
    tips: "Use the STAR method. Describe a situation where you took on a challenge (e.g., leading a project, learning a difficult framework), the actions you took to manage your discomfort, and the positive outcome or lesson learned.",
    relatedQuestions: [
      "Describe a time you stepped out of your comfort zone.",
      "Tell me about a time you took a risk."
    ],
    sampleAnswer: "During a group project, our team lead fell ill, and I had to step up to present our final software architecture to the professors. Public speaking made me very uncomfortable. I practiced extensively and focused on knowing the material inside out. The presentation went well, and I learned that preparation is the best antidote to anxiety. It greatly boosted my confidence."
  },
  {
    id: 5,
    category: "Behavioral",
    title: "How did you hear about A2SV, and what do you know about it?",
    description: "This checks your genuine interest in the program. Have you done your research, or are you just applying blindly?",
    tips: "Mention specific aspects of A2SV that appeal to you, such as the focus on competitive programming, the community aspect, or the goal of bridging African talent with global tech companies.",
    relatedQuestions: [
      "Why are you interested in our program?",
      "What do you know about our mission?"
    ],
    sampleAnswer: "I first heard about A2SV from a senior student who participated last year. I know that A2SV bridges the gap between African students and top tech companies by providing rigorous algorithmic training and fostering a culture of giving back. I deeply resonate with the mission of upskilling local talent to solve global problems."
  },
  {
    id: 6,
    category: "Behavioral",
    title: "A2SV has a very busy and rigorous schedule where excuses are not accepted. Can you commit to staying until the end under such circumstances?",
    description: "A2SV is known for its high dropout rate due to intensity. They need to know you have the grit and time-management skills to survive and thrive.",
    tips: "Be realistic but confident. Provide an example of how you have successfully managed a heavy workload in the past. Reiterate your commitment to prioritizing the program.",
    relatedQuestions: [
      "How do you handle high-pressure environments?",
      "Are you ready for a heavy workload?"
    ],
    sampleAnswer: "Absolutely. I thrive in structured, high-expectation environments. Last semester, I successfully managed 18 credit hours while working a part-time job by strictly organizing my calendar and prioritizing tasks. I understand the rigor of A2SV and am fully prepared to make it my top priority."
  },
  {
    id: 7,
    category: "Behavioral",
    title: "How will you support the community?",
    description: "A2SV is built on a culture of giving back. They want team players who will help their peers, not just individuals looking out for themselves.",
    tips: "Talk about your willingness to mentor others, share resources, or organize study sessions. If you have past experience helping classmates or juniors, mention it here.",
    relatedQuestions: [
      "How do you plan to give back?",
      "Are you a team player?"
    ],
    sampleAnswer: "I believe in learning by teaching. I plan to support the community by organizing weekend review sessions for topics I excel in, like graph algorithms. Furthermore, I want to help document our learning resources so that future cohorts have an easier time onboarding. I'm committed to ensuring we all grow together."
  },
  {
    id: 8,
    category: "Behavioral",
    title: "How much time do you currently dedicate to problem-solving?",
    description: "This sets a baseline for your current work ethic and helps them gauge if you are ready for the time commitment required by A2SV.",
    tips: "Be honest. Whether it's 5 hours or 20 hours a week, state it clearly. Emphasize your consistency and your readiness to increase this time significantly if accepted.",
    relatedQuestions: [
      "What is your current practice routine?",
      "How often do you code outside of class?"
    ],
    sampleAnswer: "Currently, I dedicate about 15 hours a week to problem-solving on platforms like LeetCode and Codeforces. I typically solve problems for two hours every evening and do virtual contests on weekends. I am fully prepared to scale this up to meet A2SV's requirements."
  },
  {
    id: 9,
    category: "Behavioral",
    title: "Why do you want to join A2SV?",
    description: "This is the core motivation question. It ties together your background, your knowledge of the program, and your future goals.",
    tips: "Connect your personal goals with A2SV's mission. Talk about wanting to be challenged, the value of the community, and your ultimate career aspirations in tech.",
    relatedQuestions: [
      "What is your main motivation for applying?",
      "Where do you see yourself after this program?"
    ],
    sampleAnswer: "I want to join A2SV because I want to be pushed beyond my limits. While I practice on my own, I know that the structured curriculum, peer programming, and mentorship at A2SV will accelerate my growth exponentially. Ultimately, I want to secure a role at a top tech company and use that experience to mentor other students in my country, directly aligning with A2SV's vision."
  },
  {
    id: 10,
    category: "Behavioral",
    title: "Describe a time when you struggled to learn a complex technical concept. How did you overcome it?",
    description: "This question assesses your resilience, learning methodology, and ability to handle steep learning curves—crucial for mastering advanced algorithms.",
    tips: "Focus on the process. Mention the specific concept, why it was hard, and the actionable steps you took (e.g., breaking it down, seeking mentorship, using visual aids) to finally understand it.",
    relatedQuestions: [
      "Tell me about a steep learning curve.",
      "How do you approach learning new things?"
    ],
    sampleAnswer: "When I first encountered dynamic programming, I struggled to grasp the concept of state transitions. Instead of giving up, I took a step back. I started drawing out the recursion trees on paper and solving the simplest possible variations of the problems. I also watched visual explanations online. Eventually, it clicked, and DP is now one of my strongest areas."
  },
  {
    id: 11,
    category: "Behavioral",
    title: "Tell us about a time you worked on a team project where a team member was not contributing. How did you handle it?",
    description: "Evaluates your interpersonal skills, empathy, and leadership. A2SV values collaboration and conflict resolution.",
    tips: "Avoid sounding accusatory. Show that you approached the situation with empathy, communicated directly to understand their blockers, and found a collaborative solution to get them back on track.",
    relatedQuestions: [
      "How do you deal with difficult teammates?",
      "Describe a conflict in a group setting."
    ],
    sampleAnswer: "In a recent hackathon, one team member missed our initial syncs and wasn't pushing code. Instead of getting angry, I reached out to them privately to check if everything was okay. It turned out they were overwhelmed by the tech stack. I paired them with another member for pair programming, which helped them get up to speed and contribute meaningfully to the final product."
  },
  {
    id: 12,
    category: "Behavioral",
    title: "Describe a situation where you received critical feedback on your code or academic work. How did you react?",
    description: "Tests your coachability and ego. In A2SV, you will constantly receive feedback on your code quality and problem-solving approaches.",
    tips: "Show that you view feedback as a gift. Describe a specific instance of harsh but fair criticism, how you processed your initial emotional reaction, and the steps you took to improve.",
    relatedQuestions: [
      "How do you handle criticism?",
      "Tell me about a time you failed a code review."
    ],
    sampleAnswer: "During an open-source contribution, a maintainer left a very critical review on my pull request, pointing out inefficiencies and poor naming conventions. Initially, I felt defensive, but I realized they were right. I thanked them for their time, asked a few clarifying questions, and refactored the code. It taught me to detach my ego from my code and value constructive criticism."
  },
  {
    id: 13,
    category: "Behavioral",
    title: "Tell us about a time you had to balance multiple competing academic or personal priorities. How did you manage your time?",
    description: "A2SV requires intense time commitment alongside regular university studies. This question checks your organizational and prioritization skills.",
    tips: "Detail your specific time-management strategies (e.g., time-blocking, Pomodoro, prioritization matrices) and prove that they work with a concrete example of a stressful period you navigated successfully.",
    relatedQuestions: [
      "How do you prioritize tasks?",
      "Describe a time you had too much to do."
    ],
    sampleAnswer: "During finals week last year, I had three major exams and a final project due in the same week. I managed this by creating a strict time-blocking schedule. I broke the project into small daily tasks and allocated specific hours for studying each subject. By sticking to the schedule and eliminating distractions, I completed the project on time and scored well on my exams."
  },
  {
    id: 14,
    category: "Behavioral",
    title: "Describe a project or problem you solved that you are particularly proud of. What was your specific contribution?",
    description: "Gives you a chance to highlight your technical passion and problem-solving abilities, while also showing how you measure your own success.",
    tips: "Pick a project that had a real impact or involved a complex technical challenge. Clearly distinguish what *you* did versus what the *team* did.",
    relatedQuestions: [
      "Walk me through your most impressive project.",
      "What is your biggest technical achievement?"
    ],
    sampleAnswer: "I am most proud of a university project where we built a local ride-sharing app. My specific contribution was implementing the pathfinding algorithm to connect riders with the nearest drivers using Dijkstra's algorithm. I optimized it to run efficiently even with a large number of nodes. Seeing the algorithm work seamlessly in the final demo was incredibly rewarding."
  }
];
