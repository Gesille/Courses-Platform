import Link from "next/link";
import { ArrowRightIcon, BookOpenIcon, CheckCircle2Icon, Clock3Icon, PlayCircleIcon } from "lucide-react";

import { COURSES } from "./next-learn-data";
import { Section } from "@/component/ui/section";

export default function CoursePreview() {
  const [featured, ...rest] = COURSES;
  const previews = rest.slice(0, 2);

  return (
    <Section>
      <div className="mx-auto max-w-container">
        <div className="mb-9 flex flex-col justify-between gap-5 sm:mb-12 lg:flex-row lg:items-end">
          <div>
            <div className="mb-4 flex items-center gap-2 text-xs font-bold tracking-[0.18em] text-brand"><BookOpenIcon className="size-4" /> NEXT LEARN</div>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-5xl">Start with something useful.</h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground">Short learning challenges built around real workplace situations.</p>
          </div>
          <Link href="/courses" className="inline-flex items-center gap-2 text-sm font-bold text-brand hover:underline">View all {COURSES.length} courses <ArrowRightIcon className="size-4" /></Link>
        </div>
        <div className="grid gap-5 lg:grid-cols-[1.25fr_0.75fr]">
          <Link href={`/courses/${featured.id}`} className="group relative min-h-[360px] overflow-hidden rounded-3xl bg-brand p-7 text-brand-foreground shadow-xl transition-all hover:-translate-y-1 hover:shadow-2xl sm:p-10">
            <div className="absolute -right-24 -top-28 size-80 rounded-full border-[38px] border-brand-foreground/[0.08] transition-transform duration-700 group-hover:scale-110" />
            <div className="relative flex h-full flex-col justify-between"><div><div className="flex items-center justify-between"><span className="rounded-full bg-brand-foreground/10 px-3 py-1.5 text-[11px] font-bold tracking-[0.12em]">FEATURED CHALLENGE</span><PlayCircleIcon className="size-8 text-brand-foreground/75" /></div><p className="mt-16 text-xs font-bold tracking-[0.18em] text-brand-foreground/60">{featured.heroLabel}</p><h3 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">{featured.title}</h3><p className="mt-3 max-w-md text-lg text-brand-foreground/75">{featured.hook}</p></div><div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-brand-foreground/15 pt-5"><div className="flex gap-4 text-xs text-brand-foreground/75"><span className="flex items-center gap-1.5"><Clock3Icon className="size-4" /> {featured.duration}</span><span>{featured.questions} questions</span></div><span className="flex items-center gap-2 text-sm font-bold">Start now <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-1" /></span></div></div>
          </Link>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">{previews.map((course) => <Link key={course.id} href={`/courses/${course.id}`} className="group rounded-3xl border border-border bg-card p-6 shadow-md transition-all hover:-translate-y-1 hover:border-brand/40 hover:shadow-lg"><div className="flex items-start justify-between gap-4"><div><div className="flex items-center gap-2 text-xs font-bold tracking-[0.14em] text-brand"><span>#{course.number}</span><span className="size-1 rounded-full bg-brand" /><span>{course.category}</span></div><h3 className="mt-4 text-2xl font-semibold tracking-tight">{course.title}</h3></div><span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-muted text-brand transition-colors group-hover:bg-brand group-hover:text-brand-foreground"><ArrowRightIcon className="size-4" /></span></div><p className="mt-3 line-clamp-2 text-sm leading-6 text-muted-foreground">{course.description}</p><div className="mt-6 flex items-center justify-between border-t border-border pt-4 text-xs text-muted-foreground"><span>{course.duration}</span><span className="flex items-center gap-1 font-semibold text-brand"><CheckCircle2Icon className="size-3.5" /> {course.level}</span></div></Link>)}</div>
        </div>
        <div className="mt-7 flex flex-col items-center justify-between gap-4 rounded-2xl border border-dashed border-brand/30 bg-brand/[0.04] p-5 text-center sm:flex-row sm:text-left"><div><p className="font-semibold">Looking for another topic?</p><p className="mt-1 text-sm text-muted-foreground">Browse all ten courses and choose your next challenge.</p></div><Link href="/courses" className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-brand px-4 py-2.5 text-sm font-bold text-brand-foreground">Explore all courses <ArrowRightIcon className="size-4" /></Link></div>
      </div>
    </Section>
  );
}
