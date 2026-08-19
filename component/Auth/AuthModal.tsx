/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { FC, useEffect } from "react";
import { X, Check } from "lucide-react";
import Login from "./Login";
import SignUp from "./SignUp";
import Verification from "./Verification";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  route: string;
  setRoute: (route: string) => void;
  refetch?: any;
};

const STEPS = [
  { key: "Sign-Up", label: "Create account" },
  { key: "Verification", label: "Verify email" },
  { key: "Login", label: "Start learning" },
] as const;

const AuthModal: FC<Props> = ({ open, setOpen, route, setRoute, refetch }) => {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setOpen]);

  if (!open) return null;

  // "Login" is a re-entry point, not a step in the create-account flow —
  // treat it as "all steps cleared" so returning users see a completed rail.
  const activeIndex =
    route === "Login" ? STEPS.length - 1 : STEPS.findIndex((s) => s.key === route);

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center p-4"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) setOpen(false);
      }}
    >
      {/* scrim — intentionally theme-independent so the modal always reads as a focused layer */}
      <div className="absolute inset-0 bg-[#0b1220]/65 backdrop-blur-sm animate-in fade-in duration-200" />

      <div
        className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-border
                   bg-card shadow-2xl animate-in fade-in zoom-in-95 duration-200
                   grid grid-cols-1 sm:grid-cols-[220px_1fr]"
      >
        {/* --- credential rail --- */}
        <div className="bg-primary text-primary-foreground p-6 flex sm:flex-col items-center sm:items-stretch justify-between sm:justify-start gap-6 sm:gap-10">
          <div className="flex items-center gap-2">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-primary-foreground/10 text-xs font-semibold tracking-wide">
              NL
            </span>
            <span className="font-serif text-sm hidden sm:block">Next Learn</span>
          </div>

          {/* step ledger */}
          <div className="flex sm:flex-col gap-4 sm:gap-5">
            {STEPS.map((step, i) => {
              const done = i < activeIndex || (route === "Login" && i <= activeIndex);
              const current = i === activeIndex && route !== "Login";
              return (
                <div key={step.key} className="flex items-center gap-3">
                  <span
                    className={`flex size-5 shrink-0 items-center justify-center rounded-full border text-[10px] font-semibold transition-colors ${
                      done
                        ? "bg-verified border-verified text-verified-foreground"
                        : current
                          ? "border-primary-foreground text-primary-foreground"
                          : "border-primary-foreground/30 text-primary-foreground/40"
                    }`}
                  >
                    {done ? <Check size={12} /> : i + 1}
                  </span>
                  <span
                    className={`hidden sm:block text-xs font-medium ${
                      done || current ? "text-primary-foreground" : "text-primary-foreground/40"
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>

          <p className="hidden sm:block text-[11px] leading-relaxed text-primary-foreground/50 mt-auto">
            Your account is protected by email verification before you can start a course.
          </p>
        </div>

        {/* --- form panel --- */}
        <div className="relative p-8">
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="absolute right-4 top-4 rounded-full p-1.5 text-muted-foreground transition hover:bg-muted hover:text-foreground"
            aria-label="Close"
          >
            <X size={18} />
          </button>

          {route === "Login" && <Login setRoute={setRoute} setOpen={setOpen} refetch={refetch} />}
          {route === "Sign-Up" && <SignUp setRoute={setRoute} />}
          {route === "Verification" && <Verification setRoute={setRoute} />}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;