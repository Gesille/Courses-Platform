import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Check,
  Clock3,
  FileText,
  Play,
  Send,
  ShieldCheck,
  Sparkles,
  Target,
  UserRound,
} from "lucide-react";

import Navbar from "@/component/sections/navbar/default";

export default function HowItWorksPage() {
  return (
    <main className="bg-background text-foreground min-h-screen w-full">
      <Navbar />

      <section className="max-w-container mx-auto px-4 pt-14 pb-20 sm:pt-20 lg:px-0">
        <div className="bg-[#f7f3ea] rounded-2xl border p-8 sm:p-12 lg:p-16">
          <div className="grid items-end gap-10 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="flex flex-col items-start gap-6">
              <span className="text-[#d66f5b] border-[#d66f5b]/25 bg-[#eef2f8] rounded-full border px-3 py-1 font-mono text-[11px] font-medium tracking-widest uppercase">
                How NEXT LEARN works
              </span>

              <h1 className="font-serif text-foreground text-4xl leading-[1.08] font-semibold text-balance sm:text-6xl">
                What happens when a course becomes a{" "}
                <span className="text-[#d66f5b]">challenge?</span>
              </h1>
            </div>

            <div className="flex flex-col items-start gap-6">
              <p className="text-muted-foreground max-w-[46ch] text-lg">
                NEXT LEARN gives people one real situation, one useful idea,
                and one chance to practice it — then turns that moment into
                visible progress.
              </p>
              <Link
                href="#challenge-flow"
                className="text-[#d66f5b] inline-flex items-center gap-2 text-sm font-semibold hover:underline"
              >
                See the simple flow <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>

          <div className="border-border mt-12 grid gap-4 border-t pt-6 sm:grid-cols-3">
            <IntroStep number="01" text="Notice the moment" />
            <IntroStep number="02" text="Practice the decision" />
            <IntroStep number="03" text="Keep the proof" />
          </div>
        </div>
      </section>

      <section
        id="challenge-flow"
        className="max-w-container mx-auto px-4 pb-20 lg:px-0"
      >
        <div className="bg-card border-border overflow-hidden rounded-xl border shadow-xl">
          <div className="bg-muted/40 border-border flex items-center justify-between border-b px-5 py-4 sm:px-6">
            <div className="flex items-center gap-2">
              <span className="bg-destructive size-2 rounded-full" />
              <span className="bg-[#dfb85f] size-2 rounded-full" />
              <span className="bg-[#6da47f] size-2 rounded-full" />
              <span className="text-muted-foreground ml-3 font-mono text-[11px] tracking-wide uppercase">
                NEXT LEARN / challenge flow
              </span>
            </div>
            <span className="text-[#d66f5b] hidden text-[11px] font-semibold uppercase sm:block">
              One topic / one record
            </span>
          </div>

          <div className="grid lg:grid-cols-3">
            <FlowPanel
              label="01 / INPUT"
              title="A real moment"
              icon={<FileText className="size-5" />}
              className="bg-[#f6e9c8]"
            >
              <p className="text-foreground text-sm">
                “Your password expires in two hours. Verify now.”
              </p>
              <Flag text="Urgency pressure" />
              <Flag text="Mismatched link" />
            </FlowPanel>

            <FlowPanel
              label="02 / MOMENT"
              title="A focused challenge"
              icon={<Target className="size-5" />}
              className="bg-[#eef2f8]"
            >
              <div className="bg-[#273448] rounded-lg p-5 text-white">
                <div className="flex items-center justify-between text-xs opacity-60">
                  <span>Question 03 / 05</span>
                  <span>04:12</span>
                </div>
                <p className="font-serif mt-6 text-2xl leading-tight">
                  What would you do next?
                </p>
                <div className="mt-5 space-y-2 text-xs">
                  <div className="border-[#dfb85f] text-[#a97820] rounded-md border px-3 py-3">
                    Report the email and do not click
                  </div>
                  <div className="rounded-md border border-white/15 px-3 py-3 opacity-60">
                    Verify through the link
                  </div>
                </div>
              </div>
              <div className="text-[#d66f5b] mt-5 flex items-center gap-2 text-xs font-semibold">
                <Play className="size-3.5" fill="currentColor" /> Watch → learn → decide
              </div>
            </FlowPanel>

            <FlowPanel
              label="03 / PROOF"
              title="A useful record"
              icon={<BarChart3 className="size-5" />}
              className="bg-[#e3efe8]"
            >
              <div className="grid grid-cols-2 gap-3">
                <Metric label="Score" value="4 / 5" />
                <Metric label="Time" value="05:12" />
                <Metric label="Status" value="Complete" />
                <Metric label="Rating" value="★★★★★" />
              </div>
              <div className="bg-card mt-5 rounded-md p-4">
                <div className="flex items-center gap-2 text-xs font-semibold">
                  <UserRound className="text-[#4d8662] size-4" /> Manager sign-off
                </div>
                <p className="text-muted-foreground mt-2 text-xs">
                  Sarah Mitchell · record ready to share
                </p>
              </div>
            </FlowPanel>
          </div>
        </div>
      </section>

      <section className="bg-[#eef2f8] border-y px-4 py-20 lg:py-24">
        <div className="max-w-container mx-auto lg:px-0">
          <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-start">
            <div>
              <p className="text-[#d66f5b] font-mono text-xs font-medium tracking-widest uppercase">
                The NEXT LEARN difference
              </p>
              <h2 className="font-serif mt-5 text-4xl leading-tight sm:text-5xl">
                Small moments. Stronger habits.
              </h2>
              <p className="text-muted-foreground mt-5 max-w-md text-sm leading-7">
                Each challenge is designed to respect the workday while making the learning moment useful, memorable, and easy to measure.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <Promise icon={<Clock3 />} title="Short" text="A focused experience that fits into the workday." />
              <Promise icon={<Sparkles />} title="Useful" text="Built around real decisions employees face." />
              <Promise icon={<Send />} title="Visible" text="Ends with proof your team can understand." />
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-container mx-auto px-4 py-20 lg:px-0 lg:py-24">
        <div className="mb-10 max-w-2xl">
          <p className="text-[#d66f5b] font-mono text-xs font-medium tracking-widest uppercase">What you receive</p>
          <h2 className="font-serif mt-5 text-4xl leading-tight sm:text-5xl">A complete learning record, not just a completion tick.</h2>
          <p className="text-muted-foreground mt-5 text-lg leading-8">NEXT LEARN connects the learning moment to the evidence that comes after it.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Deliverable icon={<Check />} title="Course completion" text="Know whether the employee started, progressed, and finished the challenge." />
          <Deliverable icon={<BarChart3 />} title="Quiz result" text="See the score, answers, pass status, and time spent on the quiz." />
          <Deliverable icon={<UserRound />} title="Manager sign-off" text="Capture the manager's name, email, phone, and confirmation details." />
          <Deliverable icon={<ShieldCheck />} title="Feedback loop" text="Collect ratings and comments that help improve the next challenge." />
        </div>
      </section>

      <section className="max-w-container mx-auto px-4 py-20 lg:px-0 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <p className="text-[#d66f5b] font-mono text-xs font-medium tracking-widest uppercase">
              For your team
            </p>
            <h2 className="font-serif mt-5 text-4xl leading-tight sm:text-5xl">
              One experience, three points of value.
            </h2>
          </div>
          <div className="divide-border divide-y border-y">
            <Value number="01" title="Employees know what to do next" text="No hunting through a course library. The next action is always visible." />
            <Value number="02" title="Managers can see what happened" text="Completion, score, timing, feedback, and sign-off live together." />
            <Value number="03" title="Learning teams can repeat the model" text="Swap the topic, video, questions, and takeaways — keep the method." />
          </div>
        </div>
      </section>

      <section className="bg-[#f7f3ea] border-y px-4 py-20 lg:py-24">
        <div className="max-w-container mx-auto lg:px-0">
          <div className="grid gap-10 lg:grid-cols-3">
            <Audience title="For employees" text="A clear five-minute path: watch something useful, learn the key idea, answer practical questions, and see your result immediately." />
            <Audience title="For managers" text="A simple view of what happened: who completed the challenge, how they scored, how long it took, and whether follow-up is needed." />
            <Audience title="For learning teams" text="A repeatable model for every topic. Change the image, video, questions, and takeaways while keeping the same proven flow." />
          </div>
        </div>
      </section>

      <section className="max-w-container mx-auto px-4 pb-24 pt-20 lg:px-0 lg:pt-24">
        <div className="bg-[#d66f5b] text-white rounded-xl p-8 sm:p-14">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div>
              <p className="font-mono text-xs font-medium tracking-widest uppercase opacity-70">
                Start with one topic
              </p>
              <h2 className="font-serif mt-5 max-w-3xl text-4xl leading-tight sm:text-5xl">
                Make the next five minutes count.
              </h2>
            </div>
            <Link
              href="/courses"
              className="bg-background text-foreground inline-flex shrink-0 items-center gap-2 rounded-md px-6 py-3.5 text-sm font-semibold hover:opacity-90"
            >
              See challenges <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function IntroStep({ number, text }: { number: string; text: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-[#d66f5b] font-mono text-xs font-semibold">{number}</span>
      <span className="text-foreground text-sm font-semibold">{text}</span>
    </div>
  );
}

function Flag({ text }: { text: string }) {
  return (
    <div className="bg-card border-border text-muted-foreground mt-3 rounded-md border p-3 text-xs">
      <span className="text-destructive font-semibold">Flag found:</span> {text}
    </div>
  );
}

function FlowPanel({
  label,
  title,
  icon,
  className,
  children,
}: {
  label: string;
  title: string;
  icon: React.ReactNode;
  className: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`border-border border-b p-6 last:border-b-0 sm:p-8 lg:border-r lg:border-b-0 lg:last:border-r-0 ${className}`}>
      <div className="flex items-start justify-between gap-5">
        <div>
          <p className="text-muted-foreground font-mono text-[10px] font-medium tracking-widest uppercase">
            {label}
          </p>
          <h2 className="font-serif mt-3 text-2xl leading-tight">{title}</h2>
        </div>
        <span className="text-[#d66f5b]">{icon}</span>
      </div>
      <div className="text-muted-foreground mt-8 text-sm leading-7">{children}</div>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-card rounded-md p-3">
      <p className="text-muted-foreground text-[10px] uppercase tracking-wider">{label}</p>
      <p className="text-foreground mt-1 text-sm font-semibold">{value}</p>
    </div>
  );
}

function Deliverable({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <div className="bg-card border-border rounded-xl border p-5 shadow-sm">
      <span className="text-[#d66f5b] flex size-9 items-center justify-center rounded-lg bg-[#d66f5b]/10">{icon}</span>
      <h3 className="font-serif mt-6 text-2xl leading-tight">{title}</h3>
      <p className="text-muted-foreground mt-3 text-sm leading-6">{text}</p>
    </div>
  );
}

function Audience({ title, text }: { title: string; text: string }) {
  return (
    <div className="border-border border-t pt-5">
      <p className="text-[#d66f5b] font-mono text-xs font-medium tracking-widest uppercase">NEXT LEARN</p>
      <h3 className="font-serif mt-4 text-3xl leading-tight">{title}</h3>
      <p className="text-muted-foreground mt-3 text-sm leading-7">{text}</p>
    </div>
  );
}

function Promise({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <div className="border-background/15 bg-background/10 rounded-lg border p-5">
      <span className="text-[#a97820]">{icon}</span>
      <h3 className="font-serif text-foreground mt-6 text-2xl">{title}</h3>
      <p className="text-foreground/70 mt-2 text-sm">{text}</p>
    </div>
  );
}

function Value({ number, title, text }: { number: string; title: string; text: string }) {
  return (
    <div className="grid grid-cols-[42px_1fr] gap-4 py-5">
      <span className="text-[#d66f5b] font-mono text-xs font-semibold">{number}</span>
      <div>
        <h3 className="font-serif text-2xl leading-tight">{title}</h3>
        <p className="text-muted-foreground mt-2 text-sm leading-7">{text}</p>
      </div>
    </div>
  );
}
