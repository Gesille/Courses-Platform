"use client";
import Link from "next/link";
import { ArrowRightIcon, BookOpenIcon, CheckCircle2Icon, Clock3Icon, PlayCircleIcon } from "lucide-react";


import { StartCourseCard } from "../courses/start-course-modal";
import { Section } from "@/component/ui/section";
import { useGetMyCoursesQuery } from "@/redux/courses/Courseapi";

export default function CoursePreview() {
  const { data, isLoading } = useGetMyCoursesQuery();
  const entries = data?.courses ?? [];

  // Feature whatever's most urgent: not-started/in-progress first, soonest due date wins.
  const sorted = [...entries].sort((a, b) => {
    const weight = (s: string) => (s === "completed" ? 1 : 0);
    if (weight(a.status) !== weight(b.status)) return weight(a.status) - weight(b.status);
    return new Date(a.dueAt).getTime() - new Date(b.dueAt).getTime();
  });
  const featured = sorted[0];
  const previews = sorted.slice(1, 3);

  if (isLoading) {
    return (
      <Section className="bg-[#FAF8F4]">
        <div className="mx-auto max-w-container py-10 text-sm text-[#6E6584]">Loading your courses…</div>
      </Section>
    );
  }

  if (!featured) {
    return (
      <Section className="bg-[#FAF8F4]">
        <div className="mx-auto max-w-container py-10 text-sm text-[#6E6584]">No courses assigned yet.</div>
      </Section>
    );
  }

  return (
    <Section className="bg-[#FAF8F4]">
      <div className="mx-auto max-w-container">
        <div className="mb-9 flex flex-col justify-between gap-5 sm:mb-12 lg:flex-row lg:items-end">
          <div>
            <div className="mb-4 flex items-center gap-2 text-xs font-bold tracking-[0.18em] text-[#5B3DF5]"><BookOpenIcon className="size-4" /> NEXT LEARN</div>
            <h2 className="text-3xl font-semibold tracking-tight text-[#221B3B] sm:text-5xl">Start with something useful.</h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-[#6E6584]">Short learning challenges built around real workplace situations.</p>
          </div>
          <Link href="/courses" className="inline-flex items-center gap-2 text-sm font-bold text-[#5B3DF5] hover:underline">View all {entries.length} courses <ArrowRightIcon className="size-4" /></Link>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1.25fr_0.75fr]">
          <StartCourseCard entry={featured} className="group relative min-h-[360px] overflow-hidden rounded-3xl border border-[#E5DFF5] bg-white shadow-md transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-[#5B3DF5]/10">
            {featured.course.heroImage?.url && (
              <img
                src={featured.course.heroImage.url}
                alt=""
                className="absolute inset-0 size-full object-cover transition duration-700 group-hover:scale-105"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
            <div className="relative flex h-full min-h-[360px] flex-col justify-between p-7 sm:p-10">
              <div>
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-white/90 px-3 py-1.5 text-[11px] font-bold tracking-[0.12em] text-[#221B3B]">
                    {featured.status === "not_started" ? "NEXT UP" : featured.status === "completed" ? "COMPLETED" : "IN PROGRESS"}
                  </span>
                  <PlayCircleIcon className="size-8 text-white/80" />
                </div>
                <p className="mt-16 text-xs font-bold tracking-[0.18em] text-white/70">{featured.course.courseCode}</p>
                <h3 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">{featured.course.title}</h3>
                <p className="mt-3 max-w-md text-lg text-white/80">{featured.course.hook}</p>
              </div>
              <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/20 pt-5">
                <div className="flex gap-4 text-xs text-white/80">
                  <span className="flex items-center gap-1.5"><Clock3Icon className="size-4" /> {featured.course.durationMinutes} min</span>
                  <span>Due {new Date(featured.dueAt).toLocaleDateString()}</span>
                </div>
                <span className="flex items-center gap-2 text-sm font-bold text-white">Start now <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-1" /></span>
              </div>
            </div>
          </StartCourseCard>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
            {previews.map((entry) => (
              <StartCourseCard key={entry.attemptId} entry={entry} className="group overflow-hidden rounded-3xl border border-[#E5DFF5] bg-white shadow-sm transition-all hover:-translate-y-1 hover:border-[#C9BCF2] hover:shadow-lg hover:shadow-[#5B3DF5]/10">
                <div className="relative aspect-[2/1] overflow-hidden">
                  {entry.course.heroImage?.url && (
                    <img
                      src={entry.course.heroImage.url}
                      alt=""
                      className="absolute inset-0 size-full object-cover transition duration-500 group-hover:scale-105"
                      onError={(event) => { event.currentTarget.style.display = "none"; }}
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent" />
                  <span className="absolute bottom-3 left-4 flex items-center gap-2 text-xs font-bold tracking-[0.14em] text-white"><span>{entry.course.courseCode}</span><span className="size-1 rounded-full bg-white" /><span>{entry.course.category ?? entry.course.topic}</span></span>
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-2xl font-semibold tracking-tight text-[#221B3B]">{entry.course.title}</h3>
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#F1ECFB] text-[#5B3DF5] transition-colors group-hover:bg-[#5B3DF5] group-hover:text-white"><ArrowRightIcon className="size-4" /></span>
                  </div>
                  <p className="mt-3 line-clamp-2 text-sm leading-6 text-[#6E6584]">{entry.course.hook}</p>
                  <div className="mt-6 flex items-center justify-between border-t border-[#F1ECFB] pt-4 text-xs text-[#6E6584]">
                    <span>{entry.course.durationMinutes} min</span>
                    <span className="flex items-center gap-1 font-semibold text-[#2F9E68]"><CheckCircle2Icon className="size-3.5" /> {entry.course.difficulty}</span>
                  </div>
                </div>
              </StartCourseCard>
            ))}
          </div>
        </div>

        <div className="mt-7 flex flex-col items-center justify-between gap-4 rounded-2xl border border-dashed border-[#5B3DF5]/30 bg-[#5B3DF5]/[0.04] p-5 text-center sm:flex-row sm:text-left">
          <div>
            <p className="font-semibold text-[#221B3B]">Looking for another topic?</p>
            <p className="mt-1 text-sm text-[#6E6584]">Browse everything assigned to you.</p>
          </div>
          <Link href="/courses" className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-[#5B3DF5] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#4527E0]">Explore all courses <ArrowRightIcon className="size-4" /></Link>
        </div>
      </div>
    </Section>
  );
}
