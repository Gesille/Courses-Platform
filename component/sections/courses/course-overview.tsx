/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, ArrowRight, Clock3, PlayCircle, Quote, ShieldCheck, Star, Users } from "lucide-react";


export default function CourseOverview() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError } = useOpenCourseQuery(id);

  if (isLoading) {
    return <main className="flex min-h-screen items-center justify-center bg-[#FAF8F4] text-[#6E6584]">Loading course…</main>;
  }
  if (isError || !data) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#FAF8F4] text-[#221B3B]">
        <p className="text-[#6E6584]">This course isn&apos;t available, or isn&apos;t assigned to you.</p>
        <Link href="/courses" className="text-sm font-bold text-[#5B3DF5]">Back to your courses</Link>
      </main>
    );
  }

  const { course, attempt } = data;
  const portrait = course.heroImage?.url;
  const alreadyStarted = attempt.status !== "not_started";

  return (
    <main className="min-h-screen bg-[#FAF8F4] text-[#221B3B]">
      <header className="border-b border-[#E5DFF5] bg-[#FAF8F4]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 lg:px-10">
          <Link href="/courses" className="inline-flex items-center gap-2 text-sm font-semibold text-[#6E6584] hover:text-[#221B3B]">
            <ArrowLeft size={16} /> Back to library
          </Link>
          <span className="font-serif text-2xl">Next Learn</span>
          <span className="rounded-full border border-[#E5DFF5] bg-white px-3 py-1 text-xs font-bold uppercase tracking-[.14em] text-[#6E6584]">Briefing</span>
        </div>
      </header>

      <section className="relative overflow-hidden border-b border-[#E5DFF5]">
        <div className="pointer-events-none absolute -left-40 top-0 size-[34rem] rounded-full bg-[#5B3DF5]/10 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl gap-14 px-5 py-16 lg:grid-cols-[1.15fr_.85fr] lg:px-10 lg:py-24">
          <div className="relative flex flex-col justify-center">
            <span className="pointer-events-none absolute -left-3 -top-14 select-none font-serif text-[13rem] font-bold leading-none text-[#221B3B]/[0.04] sm:-top-20 sm:text-[17rem]">
              {course.order}
            </span>
            <div className="relative">
              <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.22em] text-[#5B3DF5]">
                {course.category ?? course.topic} · {course.difficulty}
              </p>
              <h1 className="mt-5 max-w-xl font-serif text-6xl leading-[.94] tracking-[-.04em] sm:text-7xl">{course.title}</h1>
              <p className="mt-6 max-w-lg text-lg leading-8 text-[#6E6584]">{course.whatYouNeedToKnow}</p>

              <div className="mt-9 flex max-w-md flex-wrap items-center gap-6 border-y border-[#E5DFF5] py-4 text-sm">
                <span className="flex items-center gap-2 text-[#221B3B]"><Clock3 size={16} className="text-[#5B3DF5]" /> {course.durationMinutes} min</span>
                <span className="h-4 w-px bg-[#E5DFF5]" />
                <span className="flex items-center gap-2 text-[#221B3B]"><ShieldCheck size={16} className="text-[#5B3DF5]" /> {course.passingScore} to pass</span>
                <span className="h-4 w-px bg-[#E5DFF5]" />
                <span className="flex items-center gap-2 text-[#221B3B]"><Users size={16} className="text-[#5B3DF5]" /> Due {attempt.dueAt ? new Date(attempt.dueAt).toLocaleDateString() : "—"}</span>
              </div>

              <Link
                href={`/courses/${id}/learn`}
                className="mt-9 inline-flex w-fit items-center gap-3 rounded-full bg-[#5B3DF5] px-6 py-4 text-sm font-bold text-white shadow-lg shadow-[#5B3DF5]/25 transition hover:-translate-y-0.5 hover:bg-[#4527E0]"
              >
                {alreadyStarted ? "Continue course" : "Start course"} <ArrowRight size={17} />
              </Link>
              {attempt.isLate && <p className="mt-4 text-sm font-semibold text-[#B5502F]">This course is past its due date.</p>}
            </div>
          </div>

          <div className="relative">
            <div className="relative aspect-[3/4] overflow-hidden rounded-[2rem] border border-[#E5DFF5] bg-[#F1ECFB] shadow-xl shadow-[#5B3DF5]/5">
              {portrait && (
                <img
                  src={portrait}
                  alt={course.title}
                  className="size-full object-cover"
                  onError={(event) => { event.currentTarget.style.display = "none"; }}
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <span className="absolute left-6 top-6 rounded-full bg-white/90 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.16em] text-[#221B3B]">{course.courseCode}</span>
            </div>

            <div className="relative mx-4 -mt-14 rounded-[1.5rem] border border-[#E5DFF5] bg-white p-6 shadow-xl shadow-[#221B3B]/10 sm:mx-8 sm:p-7">
              <Quote size={22} className="text-[#5B3DF5]/40" />
              <p className="mt-2 font-serif text-xl leading-snug text-[#221B3B]">&ldquo;{course.hook}&rdquo;</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-16 lg:px-10">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.2em] text-[#5B3DF5]">Inside the briefing</p>
            <h2 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">What you&apos;ll walk away with.</h2>
          </div>
          <div className="flex items-center gap-2 text-sm text-[#6E6584]">
            <PlayCircle size={16} className="text-[#5B3DF5]" /> One video · {course.durationMinutes} min
          </div>
        </div>

        <ol className="relative mt-12 space-y-10 border-l border-[#E5DFF5] pl-9">
          {course.keyPoints.map((item:any, index:any) => (
            <li key={item} className="relative">
              <span className="absolute -left-[3.05rem] flex size-9 items-center justify-center rounded-full border border-[#E5DFF5] bg-white font-mono text-xs font-bold text-[#5B3DF5]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="text-lg leading-8 text-[#221B3B]">{item}</p>
            </li>
          ))}
        </ol>

        {course.ratingCount > 0 && (
          <div className="mt-12 flex flex-wrap items-center gap-4 rounded-2xl border border-[#E5DFF5] bg-white p-5">
            <div className="flex items-center gap-1.5">
              {[1, 2, 3, 4, 5].map((n) => (
                <Star key={n} size={15} fill={n <= Math.round(course.avgCourseRating) ? "#F2A93B" : "none"} className={n <= Math.round(course.avgCourseRating) ? "text-[#F2A93B]" : "text-[#D8D2E8]"} />
              ))}
            </div>
            <p className="text-sm text-[#6E6584]">{course.avgCourseRating.toFixed(1)} average from {course.ratingCount} teammate{course.ratingCount === 1 ? "" : "s"} who&apos;ve finished this.</p>
          </div>
        )}
      </section>

      <section className="bg-[#221B3B] text-white">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-5 py-16 text-center lg:px-10">
          <p className="text-xs font-bold uppercase tracking-[.22em] text-[#C9BCF2]">Ready when you are</p>
          <h2 className="max-w-xl font-serif text-4xl leading-tight sm:text-5xl">Start {course.title} and finish in about {course.durationMinutes} minutes.</h2>
          <Link
            href={`/courses/${id}/learn`}
            className="mt-2 inline-flex items-center gap-3 rounded-full bg-[#5B3DF5] px-7 py-4 text-sm font-bold text-white shadow-lg shadow-[#5B3DF5]/30 transition hover:-translate-y-0.5 hover:bg-[#4527E0]"
          >
            {alreadyStarted ? "Continue the course" : "Start the course"} <ArrowRight size={17} />
          </Link>
        </div>
      </section>
    </main>
  );
}
function useOpenCourseQuery(id: string): { data: any; isLoading: any; isError: any; } {
  throw new Error("Function not implemented.");
}

