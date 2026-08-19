// Hero.tsx
import { ArrowRightIcon, BadgeCheck, ShieldCheck, TriangleAlert, XCircle } from "lucide-react";

import { siteConfig } from "@/config/site";
import { Badge } from "../../ui/badge";
import { LinkButton, type LinkButtonProps } from "../../ui/link-button";
import { Section } from "../../ui/section";
import { cn } from "@/component/lib/utils";
import { AmbientOrb } from "../../ui/ambient-orb";

interface HeroButtonProps extends Omit<LinkButtonProps, "children"> {
  text: string;
}

interface ScanFlag {
  label: string;
}

interface HeroProps {
  eyebrow?: string;
  title?: string;
  highlight?: string;
  description?: string;
  buttons?: HeroButtonProps[] | false;
  className?: string;
  /** The annotated phishing email shown in the console visual */
  scan?: {
    sender: string;
    senderFlag: string;
    subject: string;
    subjectFlag: string;
    preview: string;
    cta: string;
    ctaFlag: string;
    verdict: string;
    stat: string;
  };
}

const DEFAULT_BUTTONS: HeroButtonProps[] = [
  {
    href: siteConfig.getStartedUrl,
    text: "Start this week's challenge",
    variant: "default",
    iconRight: <ArrowRightIcon className="ml-2 size-4" />,
  },
  {
    href: "#how-it-works",
    text: "See how it works",
    variant: "glow",
  },
];

const DEFAULT_SCAN = {
  sender: "it-helpdesk@nextlearn-secure.net",
  senderFlag: "Spoofed domain",
  subject: "URGENT: Password expires in 2 hours",
  subjectFlag: "Urgency pressure",
  preview:
    "Your account will be locked unless you confirm your credentials immediately. Avoid disruption by verifying now.",
  cta: "Verify my account",
  ctaFlag: "Mismatched link",
  verdict: "Phishing — 3 of 3 flags found",
  stat: "94% team detection rate this quarter",
};

const TRUST_ITEMS = ["SOC 2 Type II", "GDPR-ready", "Deploys via SSO"];

const STEPS = [
  { n: "01", label: "Watch", copy: "A 90-second video on this week's real threat." },
  { n: "02", label: "Learn", copy: "Three takeaways your team will actually remember." },
  { n: "03", label: "Challenge", copy: "Five questions. Results roll up to one dashboard." },
];

function ScanFlagTag({ label }: ScanFlag) {
  return (
    <span className="bg-caution/15 text-caution-foreground border-caution/30 ml-2 inline-flex shrink-0 items-center gap-1 rounded-full border px-2 py-0.5 font-mono text-[10px] tracking-wide uppercase">
      <TriangleAlert className="size-2.5" />
      {label}
    </span>
  );
}

export default function Hero({
  eyebrow = "ENTERPRISE SECURITY AWARENESS",
  title = "Five minutes could stop",
  highlight = "the next breach.",
  description = "NEXT LEARN turns security training into a habit your team keeps — one short, verifiable challenge at a time, with results your auditors will actually want to see.",
  buttons = DEFAULT_BUTTONS,
  scan = DEFAULT_SCAN,
  className,
}: HeroProps) {
  return (
    <Section className={cn("fade-bottom overflow-hidden pb-0 sm:pb-0 md:pb-0", className)}>
      <div className="max-w-container mx-auto pt-4 sm:pt-5">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
          {/* Left: message */}
          <div className="animate-appear flex flex-col items-start gap-7 text-left [animation-delay:120ms]">
            <Badge variant="outline" className="font-mono text-xs tracking-widest uppercase">
              {eyebrow}
            </Badge>

            <h1 className="font-serif text-foreground text-4xl leading-[1.08] font-semibold text-balance sm:text-6xl">
              {title}{" "}
              <span className="text-primary">{highlight}</span>
            </h1>

            <p className="text-muted-foreground max-w-[46ch] text-lg">
              {description}
            </p>

            {buttons !== false && buttons.length > 0 && (
              <div className="flex flex-wrap gap-4 pt-2">
                {buttons.map((button) => (
                  <LinkButton
                    key={`${button.href}-${button.text}`}
                    variant={button.variant || "default"}
                    size="lg"
                    href={button.href}
                    icon={button.icon}
                    iconRight={button.iconRight}
                  >
                    {button.text}
                  </LinkButton>
                ))}
              </div>
            )}

            {/* Trust bar — the enterprise-buyer reassurance line */}
            <div className="text-muted-foreground flex flex-wrap items-center gap-x-5 gap-y-2 pt-1 font-mono text-[11px] tracking-wide uppercase">
              {TRUST_ITEMS.map((item) => (
                <span key={item} className="motion-safe:animate-appear inline-flex items-center gap-1.5 opacity-0 [animation-delay:700ms] [animation-fill-mode:forwards]">
                  <BadgeCheck className="text-verified size-3.5" />
                  {item}
                </span>
              ))}
            </div>

            {/* Process — a real ordered flow, so numbering earns its place */}
            <div className="line-t mt-2 grid w-full grid-cols-3 gap-4 pt-6">
              {STEPS.map((step) => (
                <div key={step.n} className="motion-safe:animate-appear flex flex-col gap-1 opacity-0 [animation-delay:900ms] [animation-fill-mode:forwards]" style={{ animationDelay: `${900 + Number(step.n) * 110}ms` }}>
                  <span className="text-primary font-mono text-xs">{step.n}</span>
                  <span className="text-foreground text-sm font-semibold">
                    {step.label}
                  </span>
                  <span className="text-muted-foreground text-xs">{step.copy}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: signature element — a product console showing a live phishing review */}
          <div className="animate-appear relative delay-300 [perspective:1200px]">
            <AmbientOrb />
            <div className="hero-console motion-safe:animate-console-in border-border bg-card relative z-10 overflow-hidden rounded-xl border shadow-xl">
              {/* scan line sweep */}
              <div
                aria-hidden
                className="bg-primary/40 motion-safe:animate-scan pointer-events-none absolute inset-x-0 top-0 h-px shadow-[0_0_8px_1px_var(--primary)]"
              />

              {/* console chrome */}
              <div className="line-b bg-muted/40 flex items-center gap-2 px-4 py-3">
                <span className="relative flex size-2">
                  <span className="bg-verified motion-safe:animate-pulse-dot absolute inline-flex size-2 rounded-full" />
                </span>
                <span className="text-muted-foreground font-mono text-[11px] tracking-wide uppercase">
                  Live simulation — this week&rsquo;s challenge
                </span>
              </div>

              {/* the flagged email */}
              <div className="flex flex-col gap-3 p-6">
                <div className="flex flex-wrap items-center text-sm">
                  <span className="text-muted-foreground font-mono text-[11px] uppercase">From</span>
                  <span className="text-destructive ml-2 font-mono text-[13px]">{scan.sender}</span>
                  <ScanFlagTag label={scan.senderFlag} />
                </div>

                <div className="flex flex-wrap items-center text-sm">
                  <span className="text-muted-foreground font-mono text-[11px] uppercase">Subject</span>
                  <span className="text-foreground ml-2 text-[13px] font-semibold">{scan.subject}</span>
                  <ScanFlagTag label={scan.subjectFlag} />
                </div>

                <p className="text-muted-foreground border-border rounded-md border border-dashed p-3 text-sm">
                  {scan.preview}
                </p>

                <div className="flex flex-wrap items-center">
                  <button
                    disabled
                    className="bg-destructive/10 border-destructive/30 text-destructive flex-1 rounded-md border px-4 py-2 text-left text-sm font-medium"
                  >
                    {scan.cta} →
                  </button>
                  <ScanFlagTag label={scan.ctaFlag} />
                </div>
              </div>

              {/* verdict + org-wide trust metric */}
              <div className="line-t bg-muted/30 flex flex-wrap items-center justify-between gap-3 px-6 py-4">
                <div className="text-destructive flex items-center gap-2 text-sm font-semibold">
                  <XCircle className="size-4" />
                  {scan.verdict}
                </div>
                <div className="text-verified flex items-center gap-1.5 text-xs font-medium">
                  <ShieldCheck className="size-3.5" />
                  {scan.stat}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}