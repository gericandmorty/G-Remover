"use client";

import Link from "next/link";

export default function PrivacyPolicyPage() {
  const lastUpdated = "June 14, 2026";

  const sections = [
    {
      title: "1. Overview & Scope",
      content: (
        <>
          G-Remover is committed to protecting your privacy. This Privacy Policy describes how we handle information in connection with our AI background removal services, user accounts, and API interfaces. By using our application, dashboard, or backend services, you consent to the practices described in this document.
        </>
      ),
    },
    {
      title: "2. Absolute Image Privacy — In-Memory Processing",
      content: (
        <>
          <p className="mb-3">
            Our background removal tool runs on a zero-retention policy:
          </p>
          <ul className="list-disc pl-5 flex flex-col gap-2">
            <li>
              <strong>No Storage:</strong> Images uploaded for background removal are processed entirely in-memory on our secure servers.
            </li>
            <li>
              <strong>Immediate Deletion:</strong> The temporary image buffers and output tensors are released and deleted from system memory immediately after the processed PNG bytes are transmitted back to you.
            </li>
            <li>
              <strong>No Training:</strong> We do not store, copy, share, or use your uploaded images to train or fine-tune machine learning models.
            </li>
          </ul>
        </>
      ),
    },
    {
      title: "3. Information We Collect",
      content: (
        <>
          <p className="mb-3">
            We only collect the minimum required data to provide account functionality:
          </p>
          <ul className="list-disc pl-5 flex flex-col gap-2">
            <li>
              <strong>Account Credentials:</strong> If you register an account, we collect your email address and a cryptographically hashed version of your password (using bcrypt). We never store raw passwords.
            </li>
            <li>
              <strong>API Logs:</strong> Our system logs general service events, error codes, and network metadata (like IP address and rate limit tokens) to enforce security limits and prevent abuse. We do not link these logs to your uploaded image contents.
            </li>
          </ul>
        </>
      ),
    },
    {
      title: "4. Cookies & Authentication Tokens",
      content: (
        <>
          G-Remover uses cookies and local storage tokens solely for session authentication. When you sign in, we issue a secure, signed JSON Web Token (JWT) containing your user identifier. This token is used to validate your API requests. We do not use tracking cookies or advertising networks.
        </>
      ),
    },
    {
      title: "5. Data Security",
      content: (
        <>
          We implement robust, industry-standard security measures to protect your account details and backend operations. All network traffic is encrypted using Transport Layer Security (TLS/HTTPS). Database storage is hosted securely via MongoDB Atlas, which utilizes strict network firewalls and access controls.
        </>
      ),
    },
    {
      title: "6. Your Rights & Data Export",
      content: (
        <>
          You have full ownership of your account data. You have the right to access, update, or permanently delete your account at any time. When you request account deletion, all associated user documents and session tokens are immediately and permanently purged from our database.
        </>
      ),
    },
    {
      title: "7. Contact Information",
      content: (
        <>
          If you have any questions or concerns regarding this Privacy Policy, please reach out to us at:
          <div className="mt-3 font-semibold text-white">
            Email: gericmorit.dev@gmail.com
          </div>
        </>
      ),
    },
  ];

  return (
    <div className="flex-1 bg-[#040d21] text-[#c9d1d9] font-sans antialiased flex flex-col relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#0d2b5c]/30 via-transparent to-transparent pointer-events-none z-0" />

      <main className="relative z-10 max-w-4xl mx-auto w-full px-4 sm:px-6 py-10 sm:py-16 flex flex-col gap-10 animate-fade-in">
        
        {/* Header */}
        <div className="text-center">
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight bg-gradient-to-r from-white via-[#e2e8f0] to-[#8b949e] bg-clip-text text-transparent">
            Privacy Policy
          </h1>
          <p className="mt-3 text-sm text-[#8b949e] max-w-md mx-auto">
            Last updated: {lastUpdated} · Absolute data privacy is core to our architecture.
          </p>
        </div>

        {/* Content Card */}
        <div className="bg-[#161b22] border border-[#30363d] rounded-2xl p-6 sm:p-10 shadow-2xl flex flex-col gap-8">
          <div className="text-sm text-[#8b949e] leading-relaxed pb-4 border-b border-[#30363d]/60">
            Please read this policy carefully. It describes how G-Remover handles your data, particularly emphasizing that your processed images are never saved, persisted, or used for model training.
          </div>

          <div className="flex flex-col gap-8">
            {sections.map((section, idx) => (
              <section key={idx} className="flex flex-col gap-3">
                <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                  {section.title}
                </h2>
                <div className="text-sm text-[#8b949e] leading-relaxed">
                  {section.content}
                </div>
              </section>
            ))}
          </div>

          {/* Bottom Back Button */}
          <div className="border-t border-[#30363d] pt-6 flex justify-between items-center text-xs">
            <Link href="/" className="text-[#58a6ff] hover:underline font-semibold flex items-center gap-1">
              ← Back to Home
            </Link>
            <Link href="/terms-of-service" className="text-[#8b949e] hover:text-white transition-colors">
              Terms of Service →
            </Link>
          </div>
        </div>

      </main>
    </div>
  );
}
