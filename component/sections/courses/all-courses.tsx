"use client";

import Link from "next/link";
import { ArrowRightIcon, BookOpenIcon, CheckCircle2Icon, Clock3Icon, SearchIcon } from "lucide-react";
import { useMemo, useState } from "react";

import { COURSES } from "./next-learn-data";

export default function AllCoursesPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All topics");
  const categories = ["All topics", ...Array.from(new Set(COURSES.map((course) => course.category)))];
  const courses = useMemo(() => COURSES.filter((course) => {
    const text = `${course.title} ${course.description} ${course.category}`.toLowerCase();
    return text.includes(query.toLowerCase()) && (category === "All topics" || course.category === category);
  }), [query, category]);

  return <main className="min-h-screen bg-background text-foreground"><div className="mx-auto max-w-container px-5 py-10 sm:px-8 sm:py-16"><Link href="/" className="text-sm font-semibold text-muted-foreground hover:text-brand">← Back to home</Link><div className="mt-10 flex items-center gap-2 text-xs font-bold tracking-[0.18em] text-brand"><BookOpenIcon className="size-4" /> ALL COURSES</div><h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-6xl">Find your next challenge.</h1><p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">Choose from ten practical learning experiences created for real workplace situations.</p><div className="mt-10 flex flex-col gap-3 border-y border-border py-5 sm:flex-row"><div className="relative flex-1"><SearchIcon className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search courses" className="h-11 w-full rounded-xl border border-border bg-card pl-9 pr-4 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/15" /></div><select value={category} onChange={(event) => setCategory(event.target.value)} className="h-11 rounded-xl border border-border bg-card px-4 text-sm outline-none focus:border-brand"><option>All topics</option>{categories.slice(1).map((item) => <option key={item}>{item}</option>)}</select></div><p className="mt-7 text-sm text-muted-foreground">Showing <strong className="text-foreground">{courses.length}</strong> of {COURSES.length} courses</p><div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">{courses.map((course) => <Link key={course.id} href={`/courses/${course.id}`} className="group rounded-2xl border border-border bg-card p-6 shadow-md transition-all hover:-translate-y-1 hover:border-brand/40 hover:shadow-xl"><div className="flex items-start justify-between gap-4"><div className="flex items-center gap-2 text-xs font-bold tracking-[0.14em] text-brand"><span>#{course.number}</span><span className="size-1 rounded-full bg-brand" /><span>{course.category}</span></div><span className="flex size-9 items-center justify-center rounded-full bg-muted text-brand transition-colors group-hover:bg-brand group-hover:text-brand-foreground"><ArrowRightIcon className="size-4" /></span></div><div className="mt-12"><p className="text-xs font-bold tracking-[0.14em] text-muted-foreground">{course.heroLabel}</p><h2 className="mt-3 text-2xl font-semibold tracking-tight">{course.title}</h2><p className="mt-3 min-h-14 text-sm leading-6 text-muted-foreground">{course.description}</p></div><div className="mt-6 flex items-center justify-between border-t border-border pt-4 text-xs text-muted-foreground"><span className="flex items-center gap-1.5"><Clock3Icon className="size-3.5" />{course.duration}</span><span className="flex items-center gap-1.5"><CheckCircle2Icon className="size-3.5 text-verified" />{course.level}</span></div></Link>)}</div></div></main>;
}
