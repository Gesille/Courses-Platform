"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Clock3, ShieldCheck, Sparkles, X } from "lucide-react";
import { useState, type ReactNode } from "react";
import { IMyCourseEntry } from "@/redux/courses/Courseapi";

function CourseImage({ entry, className, children }: { entry: IMyCourseEntry; className?: string; children?: ReactNode }) {
  const [failed, setFailed] = useState(false);
  const imageUrl = entry.course.heroImage?.url;
  return (
    <div className={`relative overflow-hidden bg-gradient-to-br from-[#5B3DF5] via-[#8567F8] to-[#C9BCF2] ${className ?? ""}`}>
      {!failed && imageUrl && (
        <img
          src={imageUrl}
          alt={entry.course.title}
          onError={() => setFailed(true)}
          className="absolute inset-0 size-full object-cover"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent" />
      {children}
    </div>
  );
}

export function StartCourseCard({ entry, children, className }: { entry: IMyCourseEntry; children: ReactNode; className?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={`block w-full text-left ${className ?? ""}`}>
        {children}
      </button>
      {open && <AcceptCourseModal entry={entry} onClose={() => setOpen(false)} />}
    </>
  );
}

export function AcceptCourseModal({ entry, onClose }: { entry: IMyCourseEntry; onClose: () => void }) {
  const router = useRouter();
  const [accepting, setAccepting] = useState(false);
  const { course, status } = entry;

  const alreadyStarted = status !== "not_started";

  const enterCourse = () => {
    setAccepting(true);
    router.push(`/courses/${course._id}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#221B3B]/50 p-4 backdrop-blur-sm" onClick={onClose}>
      <div
        onClick={(event) => event.stopPropagation()}
        className="relative w-full max-w-lg overflow-hidden rounded-[1.75rem] bg-white shadow-2xl shadow-[#221B3B]/20"
      >
        <button onClick={onClose} className="absolute right-4 top-4 z-10 rounded-full bg-white/90 p-2 text-[#221B3B] shadow-sm hover:bg-white">
          <X size={18} />
        </button>

        <CourseImage entry={entry} className="aspect-[16/9]">
          <div className="relative flex h-full flex-col justify-end p-6">
            <span className="w-fit rounded-full bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-[.16em] text-[#221B3B]">
              {course.courseCode} · {course.category ?? course.topic}
            </span>
            <h2 className="mt-3 font-serif text-4xl leading-[.95] text-white drop-shadow-sm">{course.title}</h2>
          </div>
        </CourseImage>

        <div className="p-7">
          <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[.18em] text-[#5B3DF5]">
            <Sparkles size={14} /> {alreadyStarted ? "Pick up where you left off" : "Ready to accept this challenge?"}
          </p>
          <p className="mt-3 text-sm leading-6 text-[#6E6584]">{course.hook}</p>

          <div className="mt-5 flex flex-wrap gap-2 text-xs font-semibold text-[#6E6584]">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#E5DFF5] bg-[#FAF8F4] px-3 py-1.5">
              <Clock3 size={13} /> {course.durationMinutes} min
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#E5DFF5] bg-[#FAF8F4] px-3 py-1.5">
              <ShieldCheck size={13} /> Due {new Date(entry.dueAt).toLocaleDateString()}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#E5DFF5] bg-[#FAF8F4] px-3 py-1.5 capitalize">{course.difficulty}</span>
          </div>

          {entry.isLate && (
            <div className="mt-4 rounded-2xl bg-[#FDE6DE] p-3 text-xs font-semibold text-[#B5502F]">This course is past its due date.</div>
          )}

          <button
            onClick={enterCourse}
            disabled={accepting}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[#5B3DF5] px-6 py-4 text-sm font-bold text-white shadow-lg shadow-[#5B3DF5]/25 transition hover:-translate-y-0.5 hover:bg-[#4527E0] disabled:opacity-60"
          >
            {accepting ? "Opening course…" : alreadyStarted ? "Continue course" : "Accept challenge & enter course"} <ArrowRight size={16} />
          </button>
          <Link href={`/courses/${course._id}`} className="mt-3 block text-center text-xs font-semibold text-[#8A8298] hover:text-[#5B3DF5]">
            View full course brief first
          </Link>
        </div>
      </div>
    </div>
  );
}

export { CourseImage };
