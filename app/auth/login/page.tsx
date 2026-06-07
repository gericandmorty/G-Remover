"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    setIsLoading(true);

    const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

    try {
      const response = await fetch(`${apiBaseUrl}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Invalid email or password");
      }

      // Save token to localStorage
      localStorage.setItem("token", data.token);
      setSuccess(true);

      // Redirect to dashboard page after 1.5 seconds
      setTimeout(() => {
        router.push("/dashboard");
      }, 1500);
    } catch (err: any) {
      setError(err.message || "Failed to connect to authentication server.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#c9d1d9] font-sans flex flex-col items-center justify-center px-4 py-12 selection:bg-[#58a6ff]/30 selection:text-white relative">
      {/* Decorative gradient glow blob */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-[#58a6ff]/5 to-[#bc85ff]/5 blur-3xl pointer-events-none z-0"></div>

      <div className="relative z-10 w-full max-w-[340px] flex flex-col gap-6">
        {/* Header Logo & Title */}
        <div className="flex flex-col items-center gap-4 text-center">
          <Link href="/">
            <svg height="48" viewBox="0 0 16 16" width="48" className="fill-current text-[#58a6ff] hover:text-[#8b949e] transition-colors cursor-pointer">
              <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.35 3.12.88.01.64.01 1.25.01 1.42 0 .21-.15.46-.55.38A8.013 8.013 0 0 1 0 8c0-4.42 3.58-8 8-8z"></path>
            </svg>
          </Link>
          <h1 className="text-2xl font-light text-white tracking-tight">Sign in to G-Remover</h1>
        </div>

        {/* Card Form */}
        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-5 flex flex-col gap-4 shadow-xl">
          {/* Error Message */}
          {error && (
            <div className="bg-[#301614] border border-[#f85149] text-xs text-[#f85149] rounded-md p-3 font-semibold">
              {error}
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="bg-[#163020] border border-[#238636] text-xs text-[#3fb950] rounded-md p-3 font-semibold flex items-center gap-2">
              <svg viewBox="0 0 16 16" width="16" height="16" className="fill-current flex-shrink-0">
                <path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.75.75 0 1 1 1.06-1.06L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0z"></path>
              </svg>
              <span>Successfully logged in! Redirecting...</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Email Address */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-white">Email address</label>
              <input
                type="email"
                required
                disabled={isLoading}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@example.com"
                className="bg-[#0d1117] border border-[#30363d] focus:border-[#58a6ff] rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#58a6ff] transition-all placeholder-[#484f58] disabled:opacity-50"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between items-center">
                <label className="text-xs font-semibold text-white">Password</label>
                <a href="#" className="text-xs text-[#58a6ff] hover:underline">
                  Forgot password?
                </a>
              </div>
              <input
                type="password"
                required
                disabled={isLoading}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="bg-[#0d1117] border border-[#30363d] focus:border-[#58a6ff] rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#58a6ff] transition-all placeholder-[#484f58] disabled:opacity-50"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || success}
              className="bg-[#238636] hover:bg-[#2ea043] disabled:bg-[#238636]/50 text-white font-semibold text-sm py-2 px-4 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2ea043] focus:ring-offset-[#0d1117] transition-all mt-2 cursor-pointer flex items-center justify-center"
            >
              {isLoading ? (
                <div className="w-5 h-5 rounded-full border-2 border-white/20 border-t-white animate-spin"></div>
              ) : (
                "Sign In"
              )}
            </button>
          </form>
        </div>

        {/* Footer Link */}
        <div className="border border-[#30363d] rounded-lg p-4 text-center text-xs">
          <span>New to G-Remover? </span>
          <Link href="/auth/register" className="text-[#58a6ff] hover:underline font-semibold">
            Create an account
          </Link>
          <span>.</span>
        </div>
      </div>
    </div>
  );
}
