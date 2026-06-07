"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if token exists in localStorage on component mount
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    router.push("/");
    // Force a page reload to refresh all components relying on auth state
    router.refresh();
  };

  return (
    <header className="relative z-50 bg-[#161b22]/90 backdrop-blur-md border-b border-[#30363d] px-6 py-4 flex items-center justify-between text-sm">
      <div className="flex items-center gap-6 flex-1">
        {/* G-Remover Logo */}
        <Link href="/" className="flex items-center gap-2 text-white hover:text-[#58a6ff] transition-colors cursor-pointer">
          <svg height="32" viewBox="0 0 16 16" width="32" className="fill-current text-[#58a6ff]">
            <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.35 3.12.88.01.64.01 1.25.01 1.42 0 .21-.15.46-.55.38A8.013 8.013 0 0 1 0 8c0-4.42 3.58-8 8-8z"></path>
          </svg>
          <span className="font-bold text-lg tracking-tight">G-Remover</span>
        </Link>

        {/* Global Navigation Links */}
        <nav className="hidden md:flex items-center gap-5 text-xs font-semibold text-[#8b949e]">
          <Link href="/#playground" className="hover:text-white transition-colors cursor-pointer">
            Playground
          </Link>
          <Link href="/#code-samples" className="hover:text-white transition-colors cursor-pointer">
            Developer API
          </Link>
          <Link href="/#features" className="hover:text-white transition-colors cursor-pointer">
            Security
          </Link>
          {isLoggedIn && (
            <Link href="/dashboard" className="text-[#58a6ff] hover:text-[#58a6ff]/80 transition-colors cursor-pointer">
              Dashboard
            </Link>
          )}
        </nav>
      </div>

      {/* Auth Actions Right */}
      <div className="flex items-center gap-4">
        {isLoggedIn ? (
          <div className="flex items-center gap-3">
            {/* Sign Out Button */}
            <button
              onClick={handleSignOut}
              className="text-xs font-semibold text-[#8b949e] hover:text-white hover:underline cursor-pointer transition-colors"
            >
              Sign out
            </button>
            {/* User Profile Avatar */}
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#6366f1] to-[#10b981] border border-[#30363d] flex items-center justify-center font-bold text-white text-xs select-none">
              G
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Link href="/auth/login" className="text-xs font-semibold text-[#8b949e] hover:text-white cursor-pointer transition-colors px-3 py-1.5">
              Sign in
            </Link>
            <Link
              href="/auth/register"
              className="bg-transparent border border-[#30363d] hover:border-[#8b949e] text-white text-xs font-semibold px-3 py-1.5 rounded-md cursor-pointer transition-all"
            >
              Sign up
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
