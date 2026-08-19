/* eslint-disable react-hooks/set-state-in-effect */
"use client";

/**
 * NEXT LEARN — "Briefing / Checkpoint" redesign
 * ------------------------------------------------
 * Concept: this isn't a chat-wizard anymore, it's an internal company
 * newsletter issue ("THE BRIEFING") that ends in a passport-style
 * verification checkpoint. Two accent colors carry two meanings:
 *   - indigo  = progress / the system moving you forward
 *   - brass   = achievement / the stamp you earn at the end
 *
 * Fonts assumed (load with next/font in your root layout):
 *   display : Fraunces (italic)   -> font-serif
 *   utility : IBM Plex Mono       -> font-mono
 *   body    : your default sans
 *
 * Drop-in replacement: same props, same state machine, same logic.
 * New: optional `imageUrl` for the cover photo (falls back to a
 * generated editorial placeholder if you don't have one yet).
 */

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckCircle2Icon,
  ClockIcon,
  ExternalLinkIcon,
  PlayIcon,
  RotateCcwIcon,
  ShieldCheckIcon,
  TrophyIcon,
  XCircleIcon,
} from "lucide-react";

import type { Course } from "./next-learn-data";

const QUESTION_SECONDS = 20;
const VIDEO_UNLOCK_SECONDS = 8;

const ink = "#1E1B3A";
const body = "#3B3563";
const muted = "#6B64A0";
const faint = "#A39DC9";
const paper = "#F7F5FC";
const hairline = "#E3DDF7";
const brand = "#4B3AC0";
const brandDark = "#3B2E9A";
const brass = "#B8862E";
const success = "#1F8A4C";
const danger = "#C23A3A";

function getEmbedUrl(url: string) {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{11})/);
  return match ? `https://www.youtube.com/embed/${match[1]}?rel=0` : null;
}

function formatTime(ms: number) {
  const totalSeconds = Math.max(0, Math.round(ms / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

export default function CourseChallenge({
  course,
  imageUrl,
}: {
  course: Course;
  imageUrl?: string;
}) {
  const [stage, setStage] = useState<"start" | "learn" | "quiz" | "result">("start");
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState(false);
  const [timeLeft, setTimeLeft] = useState(QUESTION_SECONDS);
  const [unlockIn, setUnlockIn] = useState(VIDEO_UNLOCK_SECONDS);
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [finishedAt, setFinishedAt] = useState<number | null>(null);
  const optionRefs = useRef<HTMLButtonElement[]>([]);

  const quiz = course.quiz;
  const question = quiz[current];
  const selected = question ? answers[question.id] : undefined;
  const score = quiz.reduce((total, item) => total + (answers[item.id] === item.correctAnswer ? 1 : 0), 0);
  const embedUrl = getEmbedUrl(course.videoUrl);

  const stageProgress =
    stage === "start" ? 0.02 : stage === "learn" ? 0.18 : stage === "quiz" ? 0.28 + (current / quiz.length) * 0.62 : 1;

  const begin = () => {
    setStartedAt(Date.now());
    setUnlockIn(VIDEO_UNLOCK_SECONDS);
    setStage("learn");
  };

  const restart = () => {
    setStage("start");
    setCurrent(0);
    setAnswers({});
    setChecked(false);
    setTimeLeft(QUESTION_SECONDS);
    setUnlockIn(VIDEO_UNLOCK_SECONDS);
    setStartedAt(null);
    setFinishedAt(null);
  };

  const selectOption = (option: string) => {
    if (checked || !question) return;
    setAnswers((previous) => ({ ...previous, [question.id]: option }));
  };

  const checkAnswer = () => {
    if (!selected || checked) return;
    setChecked(true);
  };

  const next = () => {
    if (current === quiz.length - 1) {
      setFinishedAt(Date.now());
      setStage("result");
    } else {
      setCurrent((value) => value + 1);
      setChecked(false);
      setTimeLeft(QUESTION_SECONDS);
    }
  };

  useEffect(() => {
    if (stage !== "learn" || unlockIn <= 0) return;
    const timer = setTimeout(() => setUnlockIn((value) => value - 1), 1000);
    return () => clearTimeout(timer);
  }, [stage, unlockIn]);

  useEffect(() => {
    if (stage !== "quiz" || checked) return;
    if (timeLeft <= 0) {
      setChecked(true);
      return;
    }
    const timer = setTimeout(() => setTimeLeft((value) => value - 1), 1000);
    return () => clearTimeout(timer);
  }, [stage, checked, timeLeft]);

  useEffect(() => {
    if (stage !== "quiz" || !question) return;
    const onKeyDown = (event: KeyboardEvent) => {
      const index = Number(event.key) - 1;
      if (!checked && index >= 0 && index < question.options.length) {
        selectOption(question.options[index]);
        optionRefs.current[index]?.focus();
      } else if (event.key === "Enter") {
        if (!checked) checkAnswer();
        else next();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage, question, checked, selected]);

  const timerDanger = timeLeft <= 5;

  return (
    <main className="min-h-screen" style={{ backgroundColor: paper, color: ink }}>
      {/* ---------- Masthead / progress rule ---------- */}
      <div className="sticky top-0 z-10 border-b backdrop-blur" style={{ borderColor: hairline, backgroundColor: `${paper}F2` }}>
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-3 sm:px-8">
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] hover:opacity-80"
            style={{ color: muted }}
          >
            <ArrowLeftIcon className="size-3.5" /> Library
          </Link>
          <span className="hidden font-mono text-[11px] font-semibold uppercase tracking-[0.2em] sm:inline" style={{ color: brand }}>
            Next Learn — Briefing №{String(course.number).padStart(2, "0")}
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.14em]" style={{ color: faint }}>
            {stage === "quiz" ? `Checkpoint ${current + 1} / ${quiz.length}` : stage}
          </span>
        </div>
        <div className="h-[3px] w-full" style={{ backgroundColor: hairline }}>
          <div
            className="h-full transition-[width] duration-500 ease-out"
            style={{ width: `${stageProgress * 100}%`, backgroundColor: brand }}
          />
        </div>
      </div>

      {/* ---------- START: cover ---------- */}
      {stage === "start" && (
        <section className="mx-auto max-w-4xl px-5 py-12 sm:px-8 sm:py-16">
          <div className="flex flex-wrap items-center gap-2.5 font-mono text-[11px] font-bold uppercase tracking-[0.14em]" style={{ color: brand }}>
            <span className="rounded-full border px-3 py-1" style={{ borderColor: `${brand}4D` }}>
              {course.category}
            </span>
            <span style={{ color: faint }}>·</span>
            <span style={{ color: muted }}>{course.level}</span>
            <span style={{ color: faint }}>·</span>
            <span className="flex items-center gap-1" style={{ color: muted }}>
              <ClockIcon className="size-3" /> {course.duration}
            </span>
          </div>

          <h1 className="mt-6 font-serif text-5xl italic leading-[0.98] sm:text-7xl">{course.hook}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8" style={{ color: "#4A4568" }}>
            {course.description}
          </p>

          <figure className="mt-10 overflow-hidden rounded-sm border" style={{ borderColor: hairline }}>
            <div className="relative aspect-[16/9] overflow-hidden" style={{ backgroundColor: "#EFEAFB" }}>
              {imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={imageUrl} alt={course.title} className="size-full object-cover" />
              ) : (
                <div
                  className="flex size-full items-center justify-center"
                  style={{ backgroundImage: "radial-gradient(#D7CFF2 1px, transparent 1px)", backgroundSize: "16px 16px" }}
                >
                  <span className="font-serif text-[140px] italic leading-none sm:text-[180px]" style={{ color: "#D7CFF2" }}>
                    {course.category.charAt(0)}
                  </span>
                </div>
              )}
            </div>
            <figcaption
              className="flex items-center justify-between border-t bg-white px-5 py-3 font-mono text-[10px] font-bold uppercase tracking-[0.12em]"
              style={{ borderColor: hairline, color: faint }}
            >
              <span>Fig. 01 — {course.title}</span>
              <span>{course.category}</span>
            </figcaption>
          </figure>

          <button
            onClick={begin}
            className="mt-9 inline-flex items-center gap-2 rounded-sm px-6 py-3.5 font-mono text-xs font-bold uppercase tracking-[0.12em] text-white transition-colors"
            style={{ backgroundColor: brand }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = brandDark)}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = brand)}
          >
            Open the briefing <ArrowRightIcon className="size-4" />
          </button>
        </section>
      )}

      {/* ---------- LEARN: field notes + video ticket ---------- */}
      {stage === "learn" && (
        <section className="mx-auto max-w-5xl px-5 py-10 sm:px-8 sm:py-14">
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color: brand }}>
            Field notes
          </p>
          <h1 className="mt-3 max-w-2xl font-serif text-3xl italic leading-tight sm:text-5xl">
            Read the notes, then clear the checkpoint.
          </h1>

          <div className="mt-10 grid gap-10 lg:grid-cols-12">
            {/* article column */}
            <div className="lg:col-span-7">
              <ol className="space-y-7">
                {course.takeaways.map((takeaway, index) => (
                  <li key={takeaway} className="flex gap-5 border-l-2 pl-5" style={{ borderColor: hairline }}>
                    <span className="shrink-0 pt-1 font-mono text-xs font-bold" style={{ color: brand }}>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p className="text-[15px] leading-7" style={{ color: body }}>
                      {index === 0 && (
                        <span className="float-left mr-2 font-serif text-5xl italic leading-[0.75]" style={{ color: brand }}>
                          {takeaway.charAt(0)}
                        </span>
                      )}
                      {index === 0 ? takeaway.slice(1) : takeaway}
                    </p>
                  </li>
                ))}
              </ol>
            </div>

            {/* video + ticket rail */}
            <aside className="lg:col-span-5">
              <div className="overflow-hidden rounded-sm border bg-white shadow-sm lg:sticky lg:top-24" style={{ borderColor: hairline }}>
                <div
                  className="flex items-center justify-between border-b px-4 py-2.5 font-mono text-[10px] font-bold uppercase tracking-[0.16em]"
                  style={{ borderColor: hairline, color: muted }}
                >
                  <span>Watch the recap</span>
                  <PlayIcon className="size-3.5" />
                </div>
                <div className="aspect-video bg-black">
                  {embedUrl ? (
                    <iframe
                      src={embedUrl}
                      title={course.title}
                      className="size-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <a
                      href={course.videoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex aspect-video items-center justify-center gap-2 text-sm font-semibold text-white/80 hover:text-white"
                    >
                      <PlayIcon className="size-5" /> Watch the video
                    </a>
                  )}
                </div>
              </div>

              {/* ticket stub unlock control */}
              <div className="relative mt-5 overflow-hidden rounded-sm border border-dashed bg-white" style={{ borderColor: `${brand}66` }}>
                <div className="flex items-center justify-between px-5 py-4">
                  <div>
                    <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em]" style={{ color: muted }}>
                      Admit one
                    </p>
                    <p className="mt-1 font-serif text-xl italic">Checkpoint pass</p>
                  </div>
                  <div
                    className="flex size-12 items-center justify-center rounded-full border-2 font-mono text-sm font-bold"
                    style={{ borderColor: brand, color: brand }}
                  >
                    {unlockIn > 0 ? unlockIn : <CheckCircle2Icon className="size-5" />}
                  </div>
                </div>
                <div className="relative border-t border-dashed" style={{ borderColor: `${brand}66` }}>
                  <span className="absolute -left-2.5 -top-2.5 size-5 rounded-full" style={{ backgroundColor: paper }} />
                  <span className="absolute -right-2.5 -top-2.5 size-5 rounded-full" style={{ backgroundColor: paper }} />
                  <button
                    onClick={() => {
                      setStage("quiz");
                      setTimeLeft(QUESTION_SECONDS);
                    }}
                    disabled={unlockIn > 0}
                    className="w-full px-5 py-3 text-left font-mono text-[11px] font-bold uppercase tracking-[0.14em] disabled:cursor-not-allowed"
                    style={{ color: unlockIn > 0 ? faint : brand }}
                  >
                    {unlockIn > 0 ? `Unlocks in ${unlockIn}s` : "Proceed to checkpoint →"}
                  </button>
                </div>
              </div>
            </aside>
          </div>
        </section>
      )}

      {/* ---------- QUIZ: checkpoint ---------- */}
      {stage === "quiz" && question && (
        <section className="mx-auto max-w-3xl px-5 py-10 sm:px-8">
          <div className="rounded-sm border bg-white p-7 shadow-sm sm:p-10" style={{ borderColor: hairline }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color: brand }}>
                  Checkpoint {current + 1} of {quiz.length}
                </p>
                <p className="mt-1 text-sm" style={{ color: muted }}>
                  {question.type === "scenario" ? "What would you do?" : question.type === "true-false" ? "True or false" : "Choose the best answer"}
                </p>
              </div>
              <div
                className="flex size-14 items-center justify-center rounded-full border-2 font-mono text-base font-bold"
                style={{ borderColor: timerDanger ? danger : brand, color: timerDanger ? danger : brand }}
              >
                0:{timeLeft.toString().padStart(2, "0")}
              </div>
            </div>

            {/* punch-card progress */}
            <div className="mt-6 flex gap-1.5">
              {quiz.map((item, index) => {
                const answered = answers[item.id] !== undefined && (index < current || (index === current && checked));
                const correct = answers[item.id] === item.correctAnswer;
                return (
                  <span
                    key={item.id}
                    className="h-1.5 flex-1 rounded-full"
                    style={{
                      backgroundColor: !answered ? hairline : correct ? success : danger,
                      boxShadow: index === current ? `0 0 0 2px white, 0 0 0 3.5px ${brand}` : undefined,
                    }}
                  />
                );
              })}
            </div>

            <h1 className="mt-10 font-serif text-2xl italic leading-tight sm:text-4xl">{question.question}</h1>

            <div className="mt-8 grid gap-3">
              {question.options.map((option, index) => {
                const isSelected = selected === option;
                const isCorrect = checked && option === question.correctAnswer;
                const isWrong = checked && isSelected && !isCorrect;
                const stateColor = isCorrect ? success : isWrong ? danger : isSelected ? brand : null;
                return (
                  <button
                    key={option}
                    ref={(el) => {
                      if (el) optionRefs.current[index] = el;
                    }}
                    onClick={() => selectOption(option)}
                    disabled={checked}
                    className="flex items-center gap-4 border px-5 py-4 text-left text-sm font-medium transition-colors"
                    style={{
                      borderColor: stateColor ?? hairline,
                      backgroundColor: stateColor ? `${stateColor}0D` : "white",
                      color: stateColor ?? ink,
                    }}
                  >
                    <span
                      className="flex size-8 shrink-0 items-center justify-center border font-mono text-xs font-bold"
                      style={{ borderColor: stateColor ?? hairline, color: stateColor ?? faint }}
                    >
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span className="flex-1">{option}</span>
                    {isCorrect && <CheckCircle2Icon className="size-5 shrink-0" />}
                    {isWrong && <XCircleIcon className="size-5 shrink-0" />}
                  </button>
                );
              })}
            </div>

            {checked && (
              <div className="mt-6 border-t border-dashed pt-6" style={{ borderColor: hairline }}>
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em]" style={{ color: brass }}>
                  {!selected ? "Time's up" : selected === question.correctAnswer ? "Confirmed correct" : "Not quite"}
                </p>
                <p className="mt-2 text-sm leading-6" style={{ color: muted }}>
                  {question.explanation}
                </p>
              </div>
            )}

            <div className="mt-8 flex items-center justify-between">
              <p className="hidden font-mono text-[10px] uppercase tracking-[0.1em] sm:block" style={{ color: faint }}>
                Press 1–4 to answer, Enter to confirm
              </p>
              {!checked ? (
                <button
                  disabled={!selected}
                  onClick={checkAnswer}
                  className="ml-auto rounded-sm px-5 py-3 font-mono text-xs font-bold uppercase tracking-[0.1em] text-white disabled:opacity-40"
                  style={{ backgroundColor: brand }}
                >
                  Check answer
                </button>
              ) : (
                <button
                  onClick={next}
                  className="ml-auto inline-flex items-center gap-2 rounded-sm px-5 py-3 font-mono text-xs font-bold uppercase tracking-[0.1em] text-white"
                  style={{ backgroundColor: brand }}
                >
                  {current === quiz.length - 1 ? "See result" : "Next question"}
                  <ArrowRightIcon className="size-4" />
                </button>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ---------- RESULT: certificate ---------- */}
      {stage === "result" && (
        <section className="mx-auto max-w-3xl px-5 py-10 sm:px-8">
          <div className="relative overflow-hidden rounded-sm border bg-white p-8 text-center shadow-sm sm:p-14" style={{ borderColor: hairline }}>
            <div
              className="absolute right-6 top-6 flex size-24 -rotate-12 items-center justify-center rounded-full border-2 border-dashed font-mono text-[10px] font-bold uppercase tracking-[0.08em]"
              style={{ borderColor: brass, color: brass }}
            >
              <div className="flex flex-col items-center leading-tight">
                {score === quiz.length ? <TrophyIcon className="size-5" /> : <ShieldCheckIcon className="size-5" />}
                <span className="mt-1">{score === quiz.length ? "Perfect" : "Verified"}</span>
              </div>
            </div>

            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: brand }}>
              Briefing complete
            </p>
            <h1 className="mt-4 font-serif text-4xl italic sm:text-6xl">{score === quiz.length ? "Perfect score." : "Nicely done."}</h1>
            <p className="mt-5 text-lg leading-8" style={{ color: muted }}>
              You scored{" "}
              <strong style={{ color: ink }}>
                {score} of {quiz.length}
              </strong>
              {startedAt && finishedAt && (
                <>
                  {" "}
                  in <strong style={{ color: ink }}>{formatTime(finishedAt - startedAt)}</strong>
                </>
              )}
              .
            </p>

            <div className="mx-auto mt-9 max-w-xl border border-dashed p-6 text-left" style={{ borderColor: hairline, backgroundColor: paper }}>
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em]" style={{ color: brass }}>
                Remember this
              </p>
              <p className="mt-3 text-sm leading-6" style={{ color: body }}>
                {course.takeaways[course.takeaways.length - 1]}
              </p>
            </div>

            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <button
                onClick={restart}
                className="inline-flex items-center gap-2 rounded-sm border px-5 py-3 font-mono text-xs font-bold uppercase tracking-[0.1em] transition-colors"
                style={{ borderColor: hairline, color: ink }}
              >
                <RotateCcwIcon className="size-4" /> Try again
              </button>
              <a
                href={course.sharePointUrl}
                className="inline-flex items-center gap-2 rounded-sm px-5 py-3 font-mono text-xs font-bold uppercase tracking-[0.1em] text-white"
                style={{ backgroundColor: brand }}
              >
                Open SharePoint <ExternalLinkIcon className="size-4" />
              </a>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}