"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getCookie, removeCookie } from "../cookies";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if token exists in cookies on component mount
    const token = getCookie("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleSignOut = () => {
    removeCookie("token");
    setIsLoggedIn(false);
    setIsMobileMenuOpen(false);
    router.push("/");
    router.refresh();
  };

  return (
    <header className="sticky top-0 z-50 bg-[#0d1117]/85 backdrop-blur-md border-b border-[#30363d] px-6 py-3.5 flex items-center justify-between text-sm transition-all duration-300">
      <div className="flex items-center gap-8 flex-1">
        {/* G-Remover Logo */}
        <Link href="/" className="flex items-center gap-2 text-white hover:text-[#58a6ff] transition-colors cursor-pointer group">
          <svg height="32" viewBox="0 0 16 16" width="32" className="fill-current text-[#58a6ff] group-hover:scale-105 transition-transform duration-200">
            <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.35 3.12.88.01.64.01 1.25.01 1.42 0 .21-.15.46-.55.38A8.013 8.013 0 0 1 0 8c0-4.42 3.58-8 8-8z"></path>
          </svg>
          <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-white via-white to-[#8b949e] bg-clip-text text-transparent">
            G-Remover
          </span>
        </Link>

        {/* Global Navigation Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-[#8b949e]">
          <Link href="/#playground" className="hover:text-white transition-colors cursor-pointer relative py-1 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 hover:after:w-full after:bg-[#58a6ff] after:transition-all after:duration-200">
            Playground
          </Link>
          <Link href="/#code-samples" className="hover:text-white transition-colors cursor-pointer relative py-1 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 hover:after:w-full after:bg-[#58a6ff] after:transition-all after:duration-200">
            Developer API
          </Link>
          <Link href="/#features" className="hover:text-white transition-colors cursor-pointer relative py-1 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 hover:after:w-full after:bg-[#58a6ff] after:transition-all after:duration-200">
            Security
          </Link>
          {isLoggedIn && (
            <Link href="/dashboard" className="text-[#58a6ff] hover:text-[#58a6ff]/80 transition-colors cursor-pointer relative py-1">
              Dashboard
            </Link>
          )}
        </nav>
      </div>

      {/* Auth Actions Right (Desktop) */}
      <div className="hidden md:flex items-center gap-4">
        {isLoggedIn ? (
          <div className="flex items-center gap-4">
            <button
              onClick={handleSignOut}
              className="text-xs font-semibold text-[#8b949e] hover:text-[#f85149] cursor-pointer transition-colors"
            >
              Sign out
            </button>
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#58a6ff] to-[#bc85ff] border border-[#30363d] flex items-center justify-center font-bold text-white text-xs select-none shadow-md shadow-[#58a6ff]/10">
              G
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Link
              href="/auth/login"
              className="text-xs font-semibold text-[#8b949e] hover:text-white cursor-pointer transition-colors px-3 py-1.5 rounded-md hover:bg-[#161b22]/50"
            >
              Sign in
            </Link>
            <Link
              href="/auth/register"
              className="bg-[#238636] hover:bg-[#2ea043] text-white text-xs font-bold px-4 py-2 rounded-full cursor-pointer shadow-sm hover:shadow-[#2ea043]/30 transition-all active:scale-95"
            >
              Sign up
            </Link>
          </div>
        )}
      </div>

      {/* Mobile Burger Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="md:hidden flex items-center justify-center p-2 text-[#8b949e] hover:text-white transition-colors cursor-pointer"
        aria-label="Toggle Navigation Menu"
      >
        <svg viewBox="0 0 16 16" width="20" height="20" className="fill-current">
          {isMobileMenuOpen ? (
            <path d="M3.72 3.72a.75.75 0 0 1 1.06 0L8 6.94l3.22-3.22a.75.75 0 1 1 1.06 1.06L9.06 8l3.22 3.22a.75.75 0 1 1-1.06 1.06L8 9.06l-3.22 3.22a.75.75 0 0 1-1.06-1.06L6.94 8 3.72 4.78a.75.75 0 0 1 0-1.06z"></path>
          ) : (
            <path d="M1 2.75A.75.75 0 0 1 1.75 2h12.5a.75.75 0 0 1 0 1.5H1.75A.75.75 0 0 1 1 2.75zm0 5A.75.75 0 0 1 1.75 7h12.5a.75.75 0 0 1 0 1.5H1.75A.75.75 0 0 1 1 7.75zM1.75 12h12.5a.75.75 0 0 1 0 1.5H1.75a.75.75 0 0 1 0-1.5z"></path>
          )}
        </svg>
      </button>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="absolute top-[57px] left-0 w-full bg-[#0d1117] border-b border-[#30363d] flex flex-col p-5 gap-4 md:hidden animate-slide-in-right z-40 shadow-2xl">
          <Link
            href="/#playground"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-sm font-semibold text-[#8b949e] hover:text-white py-1.5 border-b border-[#161b22]"
          >
            Playground
          </Link>
          <Link
            href="/#code-samples"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-sm font-semibold text-[#8b949e] hover:text-white py-1.5 border-b border-[#161b22]"
          >
            Developer API
          </Link>
          <Link
            href="/#features"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-sm font-semibold text-[#8b949e] hover:text-white py-1.5 border-b border-[#161b22]"
          >
            Security
          </Link>
          {isLoggedIn && (
            <Link
              href="/dashboard"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-sm font-semibold text-[#58a6ff] hover:text-[#58a6ff]/80 py-1.5 border-b border-[#161b22]"
            >
              Dashboard
            </Link>
          )}

          <div className="flex flex-col gap-3.5 pt-2">
            {isLoggedIn ? (
              <div className="flex items-center justify-between">
                <button
                  onClick={handleSignOut}
                  className="text-sm font-semibold text-[#f85149] hover:underline"
                >
                  Sign out
                </button>
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#58a6ff] to-[#bc85ff] border border-[#30363d] flex items-center justify-center font-bold text-white text-xs select-none">
                  G
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-2.5">
                <Link
                  href="/auth/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="bg-[#161b22] border border-[#30363d] hover:border-[#8b949e] text-white text-sm font-semibold py-2 rounded-md text-center"
                >
                  Sign in
                </Link>
                <Link
                  href="/auth/register"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="bg-[#238636] hover:bg-[#2ea043] text-white text-sm font-semibold py-2 rounded-md text-center"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
