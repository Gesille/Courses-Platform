"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, ChevronDown, Mail, ShieldCheck, UserRound } from "lucide-react";
import { useState } from "react";
import type { Course } from "./next-learn-data";

const managers = ["Sarah Mitchell", "David Carter", "Nadia Williams"];

export default function CourseRegistration({ course }: { course: Course }) {
  const [form, setForm] = useState({ name: "", email: "", manager: "" });
  const [submitted, setSubmitted] = useState(false);
  const update = (key: keyof typeof form, value: string) => setForm((current) => ({ ...current, [key]: value }));

  if (submitted) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#FAF8F4] px-5 text-[#221B3B]">
        <div className="w-full max-w-xl rounded-[2rem] border border-[#E5DFF5] bg-white p-8 text-center shadow-xl shadow-[#5B3DF5]/5 sm:p-12">
          <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-[#DFF3E6] text-[#2F9E68]"><Check size={30} /></div>
          <p className="mt-7 text-xs font-bold uppercase tracking-[.2em] text-[#5B3DF5]">You are registered</p>
          <h1 className="mt-3 font-serif text-5xl leading-tight">Your learning room is ready.</h1>
          <p className="mt-5 leading-7 text-[#6E6584]">
            We saved your details for <strong className="text-[#221B3B]">{form.name}</strong>. You can now begin {course.title}.{" "}
            {form.manager ? `Completion updates will be shared with ${form.manager}.` : "You can add a manager later from your profile."}
          </p>
          <Link href={`/courses/${course.id}/learn`} className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#5B3DF5] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#5B3DF5]/25 hover:bg-[#4527E0]">
            Enter the learning room <ArrowRight size={16} />
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FAF8F4] text-[#221B3B]">
      <header className="border-b border-[#E5DFF5]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 lg:px-10">
          <Link href={`/courses/${course.id}`} className="inline-flex items-center gap-2 text-sm font-semibold text-[#6E6584]"><ArrowLeft size={16} /> Course overview</Link>
          <span className="font-serif text-2xl">Next Learn</span>
          <span className="text-xs font-bold uppercase tracking-[.18em] text-[#8A8298]">Step 1 of 2</span>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-12 lg:grid-cols-[.8fr_1.2fr] lg:px-10 lg:py-20">
        <aside className="lg:sticky lg:top-10 lg:h-fit">
          <p className="text-xs font-bold uppercase tracking-[.2em] text-[#5B3DF5]">Before you begin</p>
          <h1 className="mt-4 max-w-lg font-serif text-6xl leading-[.92] tracking-[-.05em]">Your details unlock the course.</h1>
          <p className="mt-6 max-w-md text-lg leading-8 text-[#6E6584]">We use this information to save your progress, show your completion status, and notify your manager when you finish.</p>
          <div className="mt-10 rounded-3xl border border-[#E5DFF5] bg-white p-6">
            <p className="text-xs font-bold uppercase tracking-[.16em] text-[#5B3DF5]">You are registering for</p>
            <h2 className="mt-3 font-serif text-3xl">{course.title}</h2>
            <div className="mt-6 flex items-center gap-2 text-sm text-[#6E6584]"><ShieldCheck size={16} /> Your information stays with your learning record.</div>
          </div>
        </aside>

        <section className="rounded-[2rem] border border-[#E5DFF5] bg-white p-7 shadow-xl shadow-[#5B3DF5]/5 sm:p-10">
          <div className="flex items-center gap-4 border-b border-[#F1ECFB] pb-7">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-[#F1ECFB] text-[#5B3DF5]"><UserRound size={22} /></div>
            <div><h2 className="font-serif text-3xl">Tell us who is learning</h2><p className="mt-1 text-sm text-[#8A8298]">All fields are simple and quick.</p></div>
          </div>
          <form onSubmit={(event) => { event.preventDefault(); if (form.name && form.email) setSubmitted(true); }} className="mt-8 space-y-6">
            <label className="block text-sm font-bold">
              Full name<span className="ml-1 text-[#FF7A50]">*</span>
              <input required value={form.name} onChange={(event) => update("name", event.target.value)} placeholder="Your first and last name" className="mt-2 h-14 w-full rounded-2xl border border-[#E5DFF5] bg-white px-4 outline-none transition focus:border-[#5B3DF5] focus:ring-4 focus:ring-[#5B3DF5]/10" />
            </label>
            <label className="block text-sm font-bold">
              Work email<span className="ml-1 text-[#FF7A50]">*</span>
              <div className="relative mt-2">
                <Mail className="pointer-events-none absolute left-4 top-4 text-[#8A8298]" size={18} />
                <input required type="email" value={form.email} onChange={(event) => update("email", event.target.value)} placeholder="you@company.com" className="h-14 w-full rounded-2xl border border-[#E5DFF5] bg-white pl-12 pr-4 outline-none transition focus:border-[#5B3DF5] focus:ring-4 focus:ring-[#5B3DF5]/10" />
              </div>
            </label>
            <label className="block text-sm font-bold">
              Your manager <span className="font-normal text-[#8A8298]">(optional)</span>
              <div className="relative mt-2">
                <select value={form.manager} onChange={(event) => update("manager", event.target.value)} className="h-14 w-full appearance-none rounded-2xl border border-[#E5DFF5] bg-white px-4 outline-none transition focus:border-[#5B3DF5] focus:ring-4 focus:ring-[#5B3DF5]/10">
                  <option value="">I will choose later</option>
                  {managers.map((manager) => <option key={manager}>{manager}</option>)}
                </select>
                <ChevronDown size={17} className="pointer-events-none absolute right-4 top-4 text-[#8A8298]" />
              </div>
              <span className="mt-2 block text-xs font-normal leading-5 text-[#8A8298]">If selected, your manager will receive a completion update after you finish the course.</span>
            </label>
            <div className="rounded-2xl bg-[#FAF8F4] p-4 text-sm leading-6 text-[#6E6584]">
              <strong className="text-[#221B3B]">What happens next?</strong><br />
              We create your learning record, open the first lesson, and keep the remaining lessons locked until you complete them in order.
            </div>
            <button type="submit" className="flex h-14 w-full items-center justify-center gap-2 rounded-full bg-[#5B3DF5] text-sm font-bold text-white transition hover:bg-[#4527E0]">
              Save details and continue <ArrowRight size={17} />
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}