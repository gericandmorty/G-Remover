"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-[#30363d] bg-[#0d1117]/85 backdrop-blur-md py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 text-xs text-[#8b949e]">
        {/* Left: Brand Logo & Copyright */}
        <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
          <Link href="/" className="flex items-center gap-2 hover:opacity-85 transition-opacity">
            <img src="/icons/icon.png" alt="G-Remover Icon" className="w-6 h-6 object-contain" />
            <span className="font-bold text-white text-sm">G-Remover</span>
          </Link>
          <span className="hidden md:inline text-[#30363d]">|</span>
          <span>&copy; {new Date().getFullYear()} G-Remover. All rights reserved.</span>
        </div>

        {/* Center: Developer Details */}
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="flex items-center gap-3">
            <img 
              src="/profile/rick-sanchez-1.jpg" 
              alt="Geric Morit Profile" 
              className="w-6 h-6 rounded-full object-cover border border-[#30363d] shadow-sm"
            />
            <span className="font-semibold text-white">Developed by Geric Morit</span>
          </div>
          <div className="flex gap-4 font-medium text-[11px] text-[#58a6ff]">
            <a 
              href="https://github.com/gericandmorty" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:underline hover:text-white transition-colors"
            >
              GitHub
            </a>
            <a 
              href="https://www.gericandmorty.codes/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:underline hover:text-white transition-colors"
            >
              Website
            </a>
          </div>
        </div>

        {/* Right: Site Navigation Links */}
        <div className="flex flex-wrap gap-4 sm:gap-6 font-semibold justify-center md:justify-end">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link>
          <Link href="/docs" className="hover:text-white transition-colors">Docs</Link>
          <Link href="/about" className="hover:text-white transition-colors">About</Link>
          <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy</Link>
          <Link href="/terms-of-service" className="hover:text-white transition-colors">Terms</Link>
        </div>
      </div>
    </footer>
  );
}
