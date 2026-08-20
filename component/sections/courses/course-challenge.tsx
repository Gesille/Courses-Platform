/* eslint-disable react-hooks/immutability */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft, ArrowRight, Check, Clock3, Image as ImageIcon, MessageCircle,
  Send, ShieldCheck, Star, Video as VideoIcon,
} from "lucide-react";
import { useOpenCourseQuery, useUpdateVideoProgressMutation, useMarkContentViewedMutation, useStartQuizMutation, useAutosaveQuizAnswersMutation, useSubmitQuizMutation, ICourseQuestion, IQuizAnswerInput, useGetMyRatingQuery, useSubmitRatingMutation, useGetMyCommentsForCourseQuery, useAddCommentMutation, useAddThreadMessageMutation } from "@/redux/courses/Courseapi";


/* Paper + violet palette — see start-course-modal.tsx.

   Mapping note: the demo had multiple mini-lessons per course, each with
   its own video. The real Course model has ONE video plus a keyPoints
   array. So "lessons" here = the single video, and keyPoints render as
   takeaway cards underneath rather than separate videos. */

function getEmbedUrl(url: string) {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{11})/);
  return match ? `https://www.youtube.com/embed/${match[1]}?rel=0` : null;
}

type Tab = "learn" | "quiz" | "discussion";

export default function CourseLearnPage() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, refetch } = useOpenCourseQuery(id);
  const [tab, setTab] = useState<Tab>("learn");

  if (isLoading || !data) {
    return <main className="flex min-h-screen items-center justify-center bg-[#FAF8F4] text-[#6E6584]">Loading course…</main>;
  }

  const { course, attempt } = data;
  const contentDone = Boolean(attempt.contentCompletedAt);
  const quizDone = attempt.status === "completed";

  return (
    <main className="min-h-screen bg-[#FAF8F4] text-[#221B3B]">
      <header className="sticky top-0 z-20 border-b border-[#E5DFF5] bg-[#FAF8F4]/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <Link href={`/courses/${id}`} className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#6E6584] hover:text-[#221B3B]">
            <ArrowLeft size={15} /> Course brief
          </Link>
          <nav className="flex gap-1 rounded-full border border-[#E5DFF5] bg-white p-1">
            {(["learn", "quiz", "discussion"] as Tab[]).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`rounded-full px-4 py-2 text-xs font-bold uppercase tracking-[.1em] transition ${
                  tab === t ? "bg-[#5B3DF5] text-white" : "text-[#6E6584] hover:text-[#221B3B]"
                }`}
              >
                {t === "learn" ? "Learn" : t === "quiz" ? "Checkpoint" : "Discussion"}
              </button>
            ))}
          </nav>
          <span className="text-xs font-semibold text-[#6E6584]">{course.courseCode}</span>
        </div>
      </header>

      {tab === "learn" && <LearnTab id={id} course={course} attempt={attempt} onDone={() => { refetch(); setTab("quiz"); }} />}
      {tab === "quiz" && <QuizTab id={id} course={course} contentDone={contentDone} quizDone={quizDone} attempt={attempt} onFinished={() => refetch()} />}
      {tab === "discussion" && <DiscussionTab id={id} />}
    </main>
  );
}

/* ────────────────────────────────────────────────────────────────────── */
/* LEARN TAB — video + key points                                        */
/* ────────────────────────────────────────────────────────────────────── */

function LearnTab({ id, course, attempt, onDone }: { id: string; course: any; attempt: any; onDone: () => void }) {
  const [updateVideoProgress] = useUpdateVideoProgressMutation();
  const [markContentViewed] = useMarkContentViewedMutation();
  const [markedComplete, setMarkedComplete] = useState(Boolean(attempt.contentCompletedAt));
  const lastReported = useRef(0);
  const embedUrl = getEmbedUrl(course.videoUrl);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const reportProgress = (seconds: number, completed = false) => {
    if (seconds - lastReported.current < 5 && !completed) return;
    lastReported.current = seconds;
    updateVideoProgress({ id, progressSeconds: Math.round(seconds), completed });
  };

  const finishContent = async () => {
    if (markedComplete) return;
    setMarkedComplete(true);
    await markContentViewed(id);
    onDone();
  };

  return (
    <section className="mx-auto max-w-6xl px-5 py-10">
      <div className="grid gap-10 lg:grid-cols-[1.3fr_.9fr]">
        <div>
          <div className="overflow-hidden rounded-[1.5rem] border border-[#E5DFF5] bg-white shadow-lg shadow-[#5B3DF5]/5">
            <div className="aspect-video bg-[#F1ECFB]">
              {embedUrl ? (
                <iframe src={embedUrl} title={course.title} className="size-full" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
              ) : (
                <video
                  ref={videoRef}
                  src={course.videoUrl}
                  controls
                  className="size-full"
                  onTimeUpdate={(e) => reportProgress(e.currentTarget.currentTime)}
                  onEnded={(e) => { reportProgress(e.currentTarget.duration, true); finishContent(); }}
                />
              )}
            </div>
            <div className="p-6 sm:p-8">
              <p className="text-xs font-bold uppercase tracking-[.16em] text-[#5B3DF5]">{course.title}</p>
              <p className="mt-3 leading-7 text-[#6E6584]">{course.whatYouNeedToKnow}</p>
            </div>
          </div>

          {!markedComplete ? (
            <button onClick={finishContent} className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#F2A93B] px-5 py-3 text-sm font-bold text-[#221B3B]">
              Mark video as watched <Check size={16} />
            </button>
          ) : (
            <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#DFF3E6] px-5 py-3 text-sm font-bold text-[#227A4E]">
              <Check size={16} /> Content complete — head to the checkpoint quiz.
            </div>
          )}
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-[.2em] text-[#5B3DF5]">Key points</p>
          <div className="mt-4 space-y-3">
            {course.keyPoints.map((point: string, index: number) => (
              <div key={point} className="rounded-2xl border border-[#E5DFF5] bg-white p-4">
                <span className="text-xs font-bold text-[#5B3DF5]">0{index + 1}</span>
                <p className="mt-2 text-sm leading-6 text-[#6E6584]">{point}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────────────── */
/* QUIZ TAB                                                               */
/* ────────────────────────────────────────────────────────────────────── */

function QuizTab({ id, course, contentDone, quizDone, attempt, onFinished }: {
  id: string; course: any; contentDone: boolean; quizDone: boolean; attempt: any; onFinished: () => void;
}) {
  const [startQuiz, { isLoading: starting }] = useStartQuizMutation();
  const [autosave] = useAutosaveQuizAnswersMutation();
  const [submitQuiz, { isLoading: submitting }] = useSubmitQuizMutation();

  const [questions, setQuestions] = useState<ICourseQuestion[] | null>(null);
  const [expiresAt, setExpiresAt] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [index, setIndex] = useState(0);
  const [remainingSeconds, setRemainingSeconds] = useState<number | null>(null);
  const [result, setResult] = useState<Awaited<ReturnType<typeof submitQuiz>>["data"] | null>(null);

  useEffect(() => {
    if (!expiresAt) return;
    const tick = () => setRemainingSeconds(Math.max(0, Math.round((new Date(expiresAt).getTime() - Date.now()) / 1000)));
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [expiresAt]);

  useEffect(() => {
    if (remainingSeconds === 0 && questions && !result) {
      handleSubmit();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [remainingSeconds]);

  const begin = async () => {
    const res = await startQuiz(id);
    if ("data" in res && res.data) {
      setQuestions(res.data.questions);
      setExpiresAt(res.data.quizExpiresAt);
    }
  };

  const select = (questionId: string, optionIndex: number) => {
    const next = { ...answers, [questionId]: optionIndex };
    setAnswers(next);
    autosave({ id, answers: [{ questionId, selectedOptionIndex: optionIndex }] });
  };

  const handleSubmit = async () => {
    if (!questions) return;
    const payload: IQuizAnswerInput[] = questions.map((q) => ({
      questionId: q._id,
      selectedOptionIndex: answers[q._id] ?? -1,
    }));
    const res = await submitQuiz({ id, answers: payload as any });
    if ("data" in res) {
      setResult(res.data);
      onFinished();
    }
  };

  if (quizDone && !result) {
    return (
      <section className="mx-auto max-w-3xl px-5 py-16 text-center">
        <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-[#DFF3E6] text-[#2F9E68]"><Check size={30} /></div>
        <h2 className="mt-6 font-serif text-4xl">You&apos;ve already completed this checkpoint.</h2>
        <p className="mt-3 text-[#6E6584]">Score: {attempt.score}/{attempt.totalPossibleScore} ({attempt.percentage}%) — {attempt.passed ? "Passed" : "Not passed"}.</p>
        {!attempt.hasRated && <RatingForm id={id} />}
      </section>
    );
  }

  if (result) {
    return (
      <section className="mx-auto max-w-3xl px-5 py-16 text-center">
        <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-[#DFF3E6] text-[#2F9E68]"><Check size={30} /></div>
        <h2 className="mt-6 font-serif text-4xl">Checkpoint submitted.</h2>
        <p className="mt-3 text-[#6E6584]">
          {result.score}/{result.totalPossibleScore} correct ({result.percentage}%) — {result.passed ? "Passed" : "Not passed"}
          {result.isLate ? ", submitted late" : ""}.
        </p>
        <RatingForm id={id} />
      </section>
    );
  }

  if (!contentDone) {
    return (
      <section className="mx-auto max-w-2xl px-5 py-16 text-center text-[#6E6584]">
        Finish watching the video and mark it complete on the Learn tab to unlock the checkpoint.
      </section>
    );
  }

  if (!questions) {
    return (
      <section className="mx-auto max-w-2xl px-5 py-16 text-center">
        <p className="text-xs font-bold uppercase tracking-[.2em] text-[#5B3DF5]">Knowledge checkpoint</p>
        <h2 className="mt-3 font-serif text-4xl">Show what stayed with you.</h2>
        <p className="mt-4 text-[#6E6584]">You&apos;ll have {Math.round(course.timeLimitSeconds / 60)} minutes once you begin. The timer runs even if you leave the page.</p>
        <button onClick={begin} disabled={starting} className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#5B3DF5] px-6 py-3.5 text-sm font-bold text-white hover:bg-[#4527E0] disabled:opacity-60">
          {starting ? "Starting…" : "Begin quiz"} <ArrowRight size={16} />
        </button>
      </section>
    );
  }

  const current = questions[index];
  const minutes = remainingSeconds !== null ? Math.floor(remainingSeconds / 60) : 0;
  const seconds = remainingSeconds !== null ? remainingSeconds % 60 : 0;

  return (
    <section className="mx-auto max-w-3xl px-5 py-10">
      <div className="rounded-3xl border-2 border-[#5B3DF5]/15 bg-white p-6 sm:p-8">
        <div className="flex items-center justify-between text-xs font-bold uppercase tracking-[.14em] text-[#5B3DF5]">
          <span>Question {index + 1} / {questions.length}</span>
          <span className="flex items-center gap-1.5"><Clock3 size={14} /> {minutes}:{seconds.toString().padStart(2, "0")}</span>
        </div>
        <h3 className="mt-6 text-xl font-bold leading-8">{current.text}</h3>
        {current.scenarioContext && <p className="mt-2 text-sm leading-6 text-[#6E6584]">{current.scenarioContext}</p>}
        <div className="mt-6 grid gap-3">
          {current.options.map((option, optionIndex) => (
            <button
              key={option._id ?? option.value}
              onClick={() => select(current._id, optionIndex)}
              className={`rounded-xl border p-4 text-left text-sm transition ${
                answers[current._id] === optionIndex ? "border-[#5B3DF5] bg-[#5B3DF5]/5" : "border-[#E5DFF5] bg-white hover:bg-[#FAF8F4]"
              }`}
            >
              {option.text}
            </button>
          ))}
        </div>
        <div className="mt-6 flex items-center justify-between">
          <button disabled={index === 0} onClick={() => setIndex((v) => v - 1)} className="text-sm font-semibold text-[#6E6584] disabled:opacity-30">Back</button>
          {index < questions.length - 1 ? (
            <button onClick={() => setIndex((v) => v + 1)} disabled={answers[current._id] === undefined} className="inline-flex items-center gap-2 rounded-full bg-[#221B3B] px-5 py-3 text-sm font-bold text-white disabled:opacity-40">
              Next question <ArrowRight size={16} />
            </button>
          ) : (
            <button onClick={handleSubmit} disabled={submitting} className="inline-flex items-center gap-2 rounded-full bg-[#221B3B] px-5 py-3 text-sm font-bold text-white disabled:opacity-40">
              {submitting ? "Submitting…" : "Finish checkpoint"} <ArrowRight size={16} />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

function RatingForm({ id }: { id: string }) {
  const { data } = useGetMyRatingQuery(id);
  const [submitRating, { isSuccess }] = useSubmitRatingMutation();
  const [courseRating, setCourseRating] = useState(0);
  const [quizRating, setQuizRating] = useState(0);
  const [courseFeedback, setCourseFeedback] = useState("");

  if (data?.rating || isSuccess) {
    return <p className="mt-8 text-sm font-semibold text-[#2F9E68]">Thanks for rating this course.</p>;
  }

  return (
    <div className="mt-10 rounded-3xl border border-[#E5DFF5] bg-white p-6 text-left sm:p-7">
      <p className="text-sm font-bold">Rate this course</p>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div>
          <p className="text-xs font-semibold text-[#6E6584]">Course content</p>
          <StarPicker value={courseRating} onChange={setCourseRating} />
        </div>
        <div>
          <p className="text-xs font-semibold text-[#6E6584]">Quiz fairness</p>
          <StarPicker value={quizRating} onChange={setQuizRating} />
        </div>
      </div>
      <textarea
        value={courseFeedback}
        onChange={(e) => setCourseFeedback(e.target.value)}
        placeholder="Anything else? (optional)"
        className="mt-4 min-h-20 w-full resize-none rounded-xl border border-[#E5DFF5] bg-[#FAF8F4] p-3 text-sm outline-none focus:border-[#5B3DF5]"
      />
      <button
        disabled={!courseRating || !quizRating}
        onClick={() => submitRating({ id, data: { courseRating, quizRating, courseFeedback: courseFeedback || undefined } })}
        className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#221B3B] px-5 py-3 text-sm font-bold text-white disabled:opacity-40"
      >
        Submit rating <Send size={15} />
      </button>
    </div>
  );
}

function StarPicker({ value, onChange }: { value: number; onChange: (n: number) => void }) {
  return (
    <div className="mt-1 flex gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <button key={n} type="button" onClick={() => onChange(n)}>
          <Star size={22} fill={n <= value ? "#F2A93B" : "none"} className={n <= value ? "text-[#F2A93B]" : "text-[#D8D2E8]"} />
        </button>
      ))}
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────── */
/* DISCUSSION TAB — real threads via CourseComment                        */
/* ────────────────────────────────────────────────────────────────────── */

function DiscussionTab({ id }: { id: string }) {
  const { data, isLoading } = useGetMyCommentsForCourseQuery(id);
  const [addComment, { isLoading: posting }] = useAddCommentMutation();
  const [addThreadMessage] = useAddThreadMessageMutation();

  const [text, setText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [replyDraft, setReplyDraft] = useState<Record<string, string>>({});
  const [openReplyFor, setOpenReplyFor] = useState<string | null>(null);

  const threads = data?.comments ?? [];

  const post = async () => {
    if (!text.trim()) return;
    await addComment({ id, text: text.trim(), file });
    setText("");
    setFile(null);
  };

  const reply = async (commentId: string) => {
    const value = replyDraft[commentId]?.trim();
    if (!value) return;
    await addThreadMessage({ commentId, courseId: id, text: value });
    setReplyDraft((c) => ({ ...c, [commentId]: "" }));
    setOpenReplyFor(null);
  };

  return (
    <section className="mx-auto max-w-3xl px-5 py-10">
      <p className="text-xs font-bold uppercase tracking-[.2em] text-[#5B3DF5]">Discussion</p>
      <h2 className="mt-3 font-serif text-4xl">Ask a question or leave a note.</h2>

      <div className="mt-8 rounded-3xl border border-[#E5DFF5] bg-white p-6">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What's on your mind about this course?"
          className="min-h-24 w-full resize-none rounded-xl border border-[#E5DFF5] bg-[#FAF8F4] p-4 text-sm outline-none focus:border-[#5B3DF5]"
        />
        <div className="mt-3 flex items-center justify-between">
          <label className="inline-flex cursor-pointer items-center gap-2 text-xs font-bold text-[#5B3DF5]">
            <ImageIcon size={14} /> {file ? file.name : "Attach a photo or video"}
            <input type="file" accept="image/*,video/*" className="hidden" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
          </label>
          <button onClick={post} disabled={posting || !text.trim()} className="inline-flex items-center gap-2 rounded-full bg-[#221B3B] px-5 py-3 text-sm font-bold text-white disabled:opacity-40">
            <Send size={15} /> Post
          </button>
        </div>
      </div>

      <div className="mt-8 space-y-5">
        {isLoading && <p className="text-sm text-[#6E6584]">Loading…</p>}
        {!isLoading && threads.length === 0 && <p className="text-sm text-[#6E6584]">No comments yet — be the first to ask something.</p>}
        {threads.map((thread) => (
          <article key={thread._id} className="rounded-3xl border border-[#E5DFF5] bg-white p-6">
            <span className="rounded-full bg-[#F1ECFB] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[.1em] text-[#5B3DF5]">{thread.status}</span>
            <div className="mt-4 space-y-4">
              {thread.messages.map((message) => (
                <div key={message._id} className={message.authorRole === "admin" ? "rounded-2xl bg-[#F1ECFB] p-4" : ""}>
                  <p className="text-xs font-bold text-[#221B3B]">{message.authorRole === "admin" ? "Learning team" : "You"} <span className="ml-2 font-normal text-[#8A8298]">{new Date(message.createdAt).toLocaleDateString()}</span></p>
                  <p className="mt-1 text-sm leading-6 text-[#6E6584]">{message.text}</p>
                  {message.attachment && (
                    <div className="mt-2 overflow-hidden rounded-xl border border-[#E5DFF5]">
                      {message.attachment.resourceType === "image" ? (
                        <img src={message.attachment.url} alt="" className="max-h-56 w-full object-cover" />
                      ) : (
                        <div className="flex items-center gap-2 p-3 text-xs text-[#6E6584]"><VideoIcon size={14} /> Video attached</div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <button onClick={() => setOpenReplyFor(openReplyFor === thread._id ? null : thread._id)} className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-[#6E6584] hover:text-[#5B3DF5]">
              <MessageCircle size={14} /> Reply
            </button>
            {openReplyFor === thread._id && (
              <div className="mt-3 flex gap-2">
                <input
                  value={replyDraft[thread._id] ?? ""}
                  onChange={(e) => setReplyDraft((c) => ({ ...c, [thread._id]: e.target.value }))}
                  placeholder="Write a reply…"
                  className="flex-1 rounded-xl border border-[#E5DFF5] bg-[#FAF8F4] px-3 py-2.5 text-sm outline-none focus:border-[#5B3DF5]"
                />
                <button onClick={() => reply(thread._id)} className="rounded-xl bg-[#5B3DF5] px-4 py-2.5 text-sm font-bold text-white">Send</button>
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
