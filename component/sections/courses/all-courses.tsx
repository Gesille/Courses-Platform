"use client";

import Link from "next/link";
import { ArrowRight, BookOpen, CheckCircle2, Clock3, Search } from "lucide-react";
import { useMemo, useState } from "react";

import { StartCourseCard } from "./start-course-modal";
import { useGetMyCoursesQuery, IMyCourseEntry } from "@/redux/courses/Courseapi";

/* Paper + violet palette:
   paper #FAF8F4 · surface #FFFFFF · ink #221B3B · muted #6E6584
   border #E5DFF5 · brand #5B3DF5 · brand-dark #4527E0
   coral #FF7A50 · gold #F2A93B · green #2F9E68 */

export default function AllCoursesPage() {
  const { data, isLoading, isError } = useGetMyCoursesQuery();
  const entries = data?.courses ?? [];

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All topics");
  const categories = useMemo(
    () => ["All topics", ...Array.from(new Set(entries.map((e) => e.course.category || e.course.topic)))],
    [entries],
  );
  const filtered = useMemo(
    () =>
      entries.filter((entry) => {
        const c = entry.course;
        const text = `${c.title} ${c.hook} ${c.category ?? ""} ${c.topic}`.toLowerCase();
        const matchesCategory = category === "All topics" || (c.category ?? c.topic) === category;
        return text.includes(query.toLowerCase()) && matchesCategory;
      }),
    [entries, query, category],
  );

  return (
    <main className="min-h-screen bg-[#FAF8F4] text-[#221B3B]">
      <header className="border-b border-[#E5DFF5] bg-[#FAF8F4]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 lg:px-10">
          <Link href="/" className="font-serif text-2xl">Next Learn</Link>
          <span className="hidden text-xs font-bold uppercase tracking-[.18em] text-[#6E6584] sm:block">The learning journal</span>
          <Link href="/" className="text-sm font-semibold text-[#6E6584] hover:text-[#221B3B]">Home</Link>
        </div>
      </header>

      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute -right-32 -top-40 size-[28rem] rounded-full bg-[#5B3DF5]/10 blur-3xl" />
        <div className="pointer-events-none absolute -left-24 bottom-0 size-72 rounded-full bg-[#FF7A50]/10 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-5 pb-20 pt-14 lg:px-10 lg:pt-20">
          <div className="grid gap-10 lg:grid-cols-[1fr_.8fr] lg:items-end">
            <div>
              <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[.22em] text-[#5B3DF5]"><BookOpen size={15} /> Employee learning library</p>
              <h1 className="mt-5 max-w-3xl font-serif text-6xl leading-[.9] tracking-[-.05em] sm:text-8xl">Learn something useful. <em className="text-[#5B3DF5]">Every week.</em></h1>
            </div>
            <p className="max-w-md text-lg leading-8 text-[#6E6584]">Short, practical courses assigned to you — one thoughtful lesson at a time.</p>
          </div>

          <div className="mt-14 flex flex-col gap-3 border-y border-[#E5DFF5] py-5 sm:flex-row">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-[#8A8298]" />
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search your courses" className="h-12 w-full rounded-xl border border-[#E5DFF5] bg-white pl-11 pr-4 text-sm outline-none focus:border-[#5B3DF5]" />
            </div>
            <select value={category} onChange={(event) => setCategory(event.target.value)} className="h-12 rounded-xl border border-[#E5DFF5] bg-white px-4 text-sm outline-none focus:border-[#5B3DF5]">
              {categories.map((item) => <option key={item}>{item}</option>)}
            </select>
          </div>

          <div className="mt-8 flex items-center justify-between text-sm text-[#6E6584]">
            <span><strong className="text-[#221B3B]">{filtered.length}</strong> courses assigned to you</span>
            <span className="hidden sm:block">Your progress is recorded as you learn</span>
          </div>

          {isLoading && <div className="mt-10 text-sm text-[#6E6584]">Loading your courses…</div>}
          {isError && <div className="mt-10 text-sm text-[#B5502F]">Couldn&apos;t load your courses. Try refreshing.</div>}
          {!isLoading && !isError && filtered.length === 0 && (
            <div className="mt-10 rounded-2xl border border-dashed border-[#E5DFF5] bg-white p-10 text-center text-sm text-[#6E6584]">
              Nothing assigned yet — check back once your admin publishes a course.
            </div>
          )}

          <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((entry) => (
              <StartCourseCard key={entry.attemptId} entry={entry} className="group overflow-hidden rounded-[1.35rem] border border-[#E5DFF5] bg-white transition hover:-translate-y-1 hover:border-[#C9BCF2] hover:shadow-xl hover:shadow-[#5B3DF5]/10">
                <CourseCard entry={entry} />
              </StartCourseCard>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

function CourseCard({ entry }: { entry: IMyCourseEntry }) {
  const { course, status, dueAt, passed } = entry;
  return (
    <>
      <div className="relative flex aspect-[1.7/1] items-end overflow-hidden">
        {course.heroImage?.url && (
          <img
            src={course.heroImage.url}
            alt=""
            className="absolute inset-0 size-full object-cover transition duration-500 group-hover:scale-105"
            onError={(event) => { event.currentTarget.style.display = "none"; }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        <span className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-[.15em] text-[#221B3B]">
          {course.category ?? course.topic}
        </span>
        <span className="relative p-5 font-serif text-3xl leading-none text-white drop-shadow-sm">{course.courseCode}</span>
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between text-xs font-bold uppercase tracking-[.14em] text-[#5B3DF5]">
          <span>{status === "completed" ? (passed ? "Passed" : "Completed") : status.replace("_", " ")}</span>
          <ArrowRight size={15} className="transition group-hover:translate-x-1" />
        </div>
        <h2 className="mt-4 font-serif text-3xl leading-tight">{course.title}</h2>
        <p className="mt-3 min-h-14 text-sm leading-6 text-[#6E6584]">{course.hook}</p>
        <div className="mt-6 flex items-center justify-between border-t border-[#F1ECFB] pt-4 text-xs text-[#8A8298]">
          <span className="flex items-center gap-1.5"><Clock3 size={14} /> {course.durationMinutes} min</span>
          <span className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-[#2F9E68]" /> Due {new Date(dueAt).toLocaleDateString()}</span>
        </div>
      </div>
    </>
  );
}
