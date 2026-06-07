"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

export type ToastType = "success" | "error" | "info";

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}

interface ToastContextType {
  toast: (message: string, type?: ToastType, duration?: number) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = useCallback((message: string, type: ToastType = "info", duration = 3000) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type, duration }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      
      {/* Toast Portal Container */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`pointer-events-auto flex items-center justify-between gap-3 px-4 py-3 rounded-lg border shadow-xl backdrop-blur-md transition-all duration-300 transform translate-y-0 animate-slide-in-right ${
              t.type === "success"
                ? "bg-[#163020]/90 border-[#238636] text-[#3fb950]"
                : t.type === "error"
                ? "bg-[#301614]/90 border-[#f85149] text-[#f85149]"
                : "bg-[#161b22]/90 border-[#30363d] text-[#58a6ff]"
            }`}
          >
            <div className="flex items-center gap-2.5 text-xs font-semibold">
              {t.type === "success" && (
                <svg viewBox="0 0 16 16" width="16" height="16" className="fill-current flex-shrink-0">
                  <path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.75.75 0 1 1 1.06-1.06L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0z"></path>
                </svg>
              )}
              {t.type === "error" && (
                <svg viewBox="0 0 16 16" width="16" height="16" className="fill-current flex-shrink-0">
                  <path d="M8 1.5a6.5 6.5 0 1 1 0 13 6.5 6.5 0 0 1 0-13zM0 8a8 8 0 1 0 16 0A8 8 0 0 0 0 8zm9 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-.25-6.25a.75.75 0 0 0-1.5 0v3.5a.75.75 0 0 0 1.5 0v-3.5z"></path>
                </svg>
              )}
              {t.type === "info" && (
                <svg viewBox="0 0 16 16" width="16" height="16" className="fill-current flex-shrink-0">
                  <path d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm6.5-1.75A.75.75 0 0 1 7.25 5.5h1.5a.75.75 0 0 1 .75.75v5.25a.75.75 0 0 1-1.5 0v-4.5h-.75a.75.75 0 0 1-.75-.75zM8 3.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"></path>
                </svg>
              )}
              <span>{t.message}</span>
            </div>
            
            {/* Manual Dismiss Button */}
            <button
              onClick={() => setToasts((prev) => prev.filter((item) => item.id !== t.id))}
              className="text-[#8b949e] hover:text-white transition-colors cursor-pointer text-[10px]"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
