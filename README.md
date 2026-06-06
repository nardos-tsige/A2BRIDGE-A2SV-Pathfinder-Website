# 🚀 A2BRIDGE | A2SV Pathfinder

**From my rejection to your success.**

[![Live Demo](https://img.shields.io/badge/Live_Demo-https://a2--bridge--a2--sv--pathfinder--website.vercel.app/-success?style=for-the-badge&logo=vercel)](https://a2-bridge-a2-sv-pathfinder-website.vercel.app/)

## 📖 About The Project

This project was born from a personal rejection letter. Instead of a dead end, it became the foundation for a solution I wished I had as a beginner. **A2BRIDGE** is a comprehensive, all-in-one preparation hub for students at **AAU, ASTU, & AASTU** who aspire to join the **African to Silicon Valley (A2SV)** program.

It transforms the ambiguous "preparation journey" into a structured, interactive roadmap. From curated coding problems to real interview experiences and a personal coding calendar, this platform bridges the gap between aspiration and acceptance.

## ✨ Key Features

### 🧠 Coding Problem Hub
- **Curated Problem Sets:** Selected **LeetCode** and **Codeforces** problems (500+ tracker).
- **Detailed Solutions:** Each problem includes a full explanation and solution guide, perfect for complete beginners.
- **Progress Tracking:** Monitor your solved problems and learning path.

### 🐍 A2Practice (Python Sandbox)
- **Beginner-Friendly:** Dedicated space to practice Python fundamentals.
- **Interactive Editor:** Write, run, and reset Python code directly in the browser.
- **Immediate Feedback:** Perfect for hands-on learning without setting up a local environment.

### 🎤 Interview Preparation
- **Real Questions:** Curated technical and behavioral questions shared by senior A2SVians (A2SV members).
- **Sample Answers:** See how successful candidates structured their responses.
- **Tip Library:** Essential tips for resumes, email communication, and problem-solving under pressure.

### 📢 A2SV Awareness Hub
- **Mission & Process:** Clear explanation of what A2SV is, its impact, and the step-by-step selection process.
- **Success Roadmap:** Detailed benefits of joining the program, from mentorship to Silicon Valley opportunities.

### 📅 Personal Coding Calendar
- **Stay Organized:** Keep track of your personal coding schedule, contests, and deadlines.
- **Custom Events:** Add your own events, study sessions, or reminders.
- **Smart Reminders:** Set notifications so you never miss an important deadline or contest.

## 🛠️ Built With

- **TypeScript** – Type-safe core logic and enhanced developer experience
- **React** – Frontend UI library
- **Vite** – Next-generation frontend tooling
- **Firebase** – Backend services (Firestore, Auth)
- **Vercel** – Deployment and hosting

## 🚀 Live Demo

Experience the platform live:  
**[https://a2-bridge-a2-sv-pathfinder-website.vercel.app/](https://a2-bridge-a2-sv-pathfinder-website.vercel.app/)**

## 📦 Getting Started

### Prerequisites

- **Node.js** (v16 or later)
- **npm** or **yarn**

### Installation & Setup

```bash
# Clone the repository
git clone https://github.com/nardos-tsige/a2bridge.git
cd a2bridge

# Install dependencies
npm install

# Run the development server
npm run dev
Then open http://localhost:5173 in your browser (Vite default port).

**Firebase Configuration**
Create a Firebase project at Firebase Console

Enable Firestore Database

Copy your Firebase config and update .env:
Then open http://localhost:5173 in your browser (Vite default port).

**Firebase Configuration**

Create a Firebase project at Firebase Console

Enable Firestore Database

Copy your Firebase config and update .env:

VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

Deploy Firestore rules using firestore.rules

**📂 Project Structure**

a2bridge/
├── public/                 # Static assets
├── src/                    # Source code
│   ├── components/         # Reusable UI components
│   └── pages/              # Page components
├── .env.example            # Environment variables template
├── .gitignore              # Git ignore rules
├── index.html              # Entry HTML file
├── package.json            # Dependencies and scripts
├── tsconfig.json           # TypeScript configuration
├── vite.config.ts          # Vite configuration
├── firestore.rules         # Firebase Firestore security rules
├── firebase-applet-config.json  # Firebase configuration
├── firebase-blueprint.json      # Firebase data blueprint
├── metadata.json           # LeetCode problems metadata
├── extracted.json          # Extracted problem data
├── chunk1.json             # Problem data chunk 1
├── chunk2.json             # Problem data chunk 2
├── chunk3.json             # Problem data chunk 3
├── chunk4.json             # Problem data chunk 4
├── add_descriptions.cjs    # Script to add problem descriptions
├── check_missing.cjs       # Script to check missing problems
├── extract.cjs             # Script to extract problem data
├── find_dups.cjs           # Script to find duplicates
├── generate_chunk2.cjs     # Script to generate chunk 2
├── generate_chunk3.cjs     # Script to generate chunk 3
├── generate_chunk4.cjs     # Script to generate chunk 4
├── merge_all_chunks.cjs    # Script to merge all chunks
├── merge_chunks.cjs        # Script to merge chunks
├── merge_last_two.cjs      # Script to merge last two chunks
├── rewrite_leetcode_details.cjs  # Script to rewrite problem details
├── package-lock.json       # Locked dependencies
└── README.md               # Project documentation

**🗄️ Data Processing Scripts**

The project includes several Node.js scripts for managing LeetCode problem data:

Script	Purpose
extract.cjs	Extract problem data from source
add_descriptions.cjs	Add detailed descriptions to problems
check_missing.cjs	Identify missing problems
find_dups.cjs	Find and remove duplicate entries
merge_*.cjs	Merge JSON chunk files
rewrite_leetcode_details.cjs	Rewrite problem details formatting

**🔥 Firebase Setup**

Import firestore.rules to your Firebase project

Use firebase-applet-config.json and firebase-blueprint.json as references for your data structure

Enable Firestore in your Firebase project

**🚢 Deployment**

This project is deployed on Vercel. To deploy your own instance:

# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Or push to GitHub and connect to Vercel
git push origin main

https://vercel.com/button

**🤝 Contributing**

Contributions are what make the open-source community such an amazing place to learn and grow. Any contributions you make are greatly appreciated.

Fork the Project

Create your Feature Branch (git checkout -b feature/AmazingFeature)

Commit your Changes (git commit -m 'Add some AmazingFeature')

Push to the Branch (git push origin feature/AmazingFeature)

Open a Pull Request

**📝 License**

Distributed under the MIT License. See LICENSE for more information.

**📧 Contact**

Nardos Tsige – @nardos-tsige

Project Link: https://github.com/nardos-tsige/a2bridge

**🙏 Acknowledgments**

A2SV for inspiring this mission and creating a life-changing program

Senior A2SVians who shared their real interview questions and advice

Every student who turns rejection into determination
