import React, { useState, useRef, useEffect, useMemo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { LogOut, Menu, X, User as UserIcon, Palette, Search } from "lucide-react";
import { cn } from "../lib/utils";
import { LEETCODE_DETAILS } from "../data/leetcodeDetails";
import { CODEFORCES_DETAILS } from "../data/codeforcesDetails";
import { A2_QUESTIONS } from "../data/a2practice";

export default function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = React.useState(false);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const loggedOutLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
  ];

  const loggedInLinks = [
    { name: "Dashboard", path: "/" },
    { name: "LeetCode", path: "/tracker" },
    { name: "Codeforces", path: "/codeforces" },
    { name: "A2Practice", path: "/a2practice" },
    { name: "Interview", path: "/interview" },
    { name: "Calendar", path: "/calendar" },
    { name: "Awareness", path: "/awareness" },
    { name: "About", path: "/about" },
  ];

  const links = user ? loggedInLinks : loggedOutLinks;

  const allSearchableItems = useMemo(() => {
    const items = [
      ...links.map(link => ({ title: link.name, type: "Section", path: link.path }))
    ];

    if (user) {
      Object.keys(LEETCODE_DETAILS).forEach(title => {
        items.push({ title, type: "LeetCode", path: `/tracker?search=${encodeURIComponent(title)}` });
      });
      Object.keys(CODEFORCES_DETAILS).forEach(title => {
        items.push({ title, type: "Codeforces", path: `/codeforces?search=${encodeURIComponent(title)}` });
      });
      A2_QUESTIONS.forEach(q => {
        items.push({ title: q.title, type: "A2Practice", path: `/a2practice?search=${encodeURIComponent(q.title)}` });
      });
    }

    return items;
  }, [links, user]);

  const filteredItems = useMemo(() => {
    if (!searchQuery) return [];
    const query = searchQuery.toLowerCase();
    return allSearchableItems
      .filter(item => item.title.toLowerCase().includes(query))
      .slice(0, 10); // Limit to 10 results for performance and UI
  }, [searchQuery, allSearchableItems]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchSelect = (path: string) => {
    navigate(path);
    setSearchQuery("");
    setIsSearchOpen(false);
    setIsOpen(false);
  };

  return (
    <nav className="bg-slate-900 text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-purple-500 p-1.5 rounded-lg flex items-center justify-center">
                <span className="text-2xl leading-none" role="img" aria-label="bridge">🌉</span>
              </div>
              <span className="font-bold text-xl tracking-tight hidden sm:block">A2BRIDGE</span>
            </Link>
          </div>

          {/* Search Bar - Only visible when logged in */}
          {user && (
            <div className="flex-1 max-w-md px-4 flex items-center justify-center lg:justify-end" ref={searchRef}>
              <div className="relative w-full max-w-xs">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-slate-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-1.5 border border-slate-700 rounded-md leading-5 bg-slate-800 text-slate-300 placeholder-slate-400 focus:outline-none focus:bg-slate-900 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 sm:text-sm transition-colors"
                  placeholder="Search sections & questions..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setIsSearchOpen(true);
                  }}
                  onFocus={() => setIsSearchOpen(true)}
                />
                
                {/* Search Results Dropdown */}
                {isSearchOpen && searchQuery && (
                  <div className="absolute z-50 mt-1 w-full bg-slate-800 border border-slate-700 rounded-md shadow-lg overflow-hidden">
                    {filteredItems.length > 0 ? (
                      <ul className="max-h-60 overflow-auto py-1">
                        {filteredItems.map((item, idx) => (
                          <li key={`${item.path}-${idx}`}>
                            <button
                              onClick={() => handleSearchSelect(item.path)}
                              className="w-full text-left px-4 py-2 text-sm text-slate-300 hover:bg-slate-700 hover:text-white transition-colors flex justify-between items-center"
                            >
                              <span className="truncate mr-2">{item.title}</span>
                              <span className="text-xs text-slate-500 bg-slate-900 px-2 py-0.5 rounded-full whitespace-nowrap">
                                {item.type}
                              </span>
                            </button>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="px-4 py-3 text-sm text-slate-400 text-center">
                        No results found
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:space-x-1 lg:space-x-2">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "px-2 lg:px-3 py-2 rounded-md text-xs lg:text-sm font-medium transition-colors",
                  location.pathname === link.path
                    ? "bg-slate-800 text-purple-400"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white",
                )}
              >
                {link.name}
              </Link>
            ))}

            <div className="flex items-center gap-2 lg:gap-4 ml-1 lg:ml-2 border-l border-slate-700 pl-2 lg:pl-4">
              {user ? (
                <>
                  <Link
                    to="/profile"
                    className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors"
                  >
                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt="Profile"
                        className="w-8 h-8 rounded-full object-cover border border-slate-700"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700">
                        <UserIcon className="w-4 h-4" />
                      </div>
                    )}
                  </Link>
                  <button
                    onClick={logout}
                    className="flex items-center gap-2 text-slate-300 hover:text-red-400 transition-colors text-sm font-medium"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="hidden lg:inline">Logout</span>
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="bg-purple-500 hover:bg-purple-400 text-slate-900 px-3 lg:px-4 py-1.5 lg:py-2 rounded-md text-xs lg:text-sm font-bold transition-colors"
                >
                  Login
                </Link>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden gap-2">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-300 hover:text-white p-2"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-slate-800 border-t border-slate-700 max-h-[calc(100vh-4rem)] overflow-y-auto">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "block px-3 py-2 rounded-md text-base font-medium",
                  location.pathname === link.path
                    ? "bg-slate-900 text-purple-400"
                    : "text-slate-300 hover:bg-slate-700 hover:text-white",
                )}
              >
                {link.name}
              </Link>
            ))}
            {user ? (
              <>
                <Link
                  to="/profile"
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:bg-slate-700 hover:text-white"
                >
                  Profile
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-400 hover:bg-slate-700"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium bg-purple-500 text-slate-900 mt-4"
              >
                Login / Sign Up
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
