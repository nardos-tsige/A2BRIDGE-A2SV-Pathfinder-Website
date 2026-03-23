/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Tracker from "./pages/Tracker";
import Awareness from "./pages/Awareness";
import Interview from "./pages/Interview";
import Profile from "./pages/Profile";
import Calendar from "./pages/Calendar";
import Codeforces from "./pages/Codeforces";
import A2Practice from "./pages/A2Practice";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
}

function PublicOnlyRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  if (user) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans font-medium transition-colors duration-300">
          <Navbar />
          <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route
                  path="/login"
                  element={
                    <PublicOnlyRoute>
                      <Login />
                    </PublicOnlyRoute>
                  }
                />
                <Route
                  path="/tracker"
                  element={
                    <ProtectedRoute>
                      <Tracker />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/codeforces"
                  element={
                    <ProtectedRoute>
                      <Codeforces />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/a2practice"
                  element={
                    <ProtectedRoute>
                      <A2Practice />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/awareness"
                  element={
                    <ProtectedRoute>
                      <Awareness />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/interview"
                  element={
                    <ProtectedRoute>
                      <Interview />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/calendar"
                  element={
                    <ProtectedRoute>
                      <Calendar />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </main>
            <footer className="bg-slate-900 text-slate-400 py-8 text-center border-t border-slate-800">
              <p>
                &copy; {new Date().getFullYear()} A2BRIDGE. Built by Nardos Tsige. From my rejection to your success.
              </p>
            </footer>
          </div>
        </BrowserRouter>
      </AuthProvider>
  );
}
