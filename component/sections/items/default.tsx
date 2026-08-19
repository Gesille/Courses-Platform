import {
  AwardIcon,
  ArrowUpRightIcon,
  BookOpenCheckIcon,
  BriefcaseBusinessIcon,
  ChartNoAxesCombinedIcon,
  LanguagesIcon,
  LaptopIcon,
  MessagesSquareIcon,
  UsersRoundIcon,
} from "lucide-react";
import { ReactNode } from "react";

import { Section } from "../../ui/section";

interface ItemProps {
  title: string;
  description: string;
  icon: ReactNode;
}

interface ItemsProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  items?: ItemProps[] | false;
  className?: string;
}

const DEFAULT_ITEMS: ItemProps[] = [
  {
    title: "Practical courses",
    description: "Learn through structured lessons, guided examples, and useful real-world skills.",
    icon: <BookOpenCheckIcon className="size-5" />,
  },
  {
    title: "Excel & data skills",
    description: "Build confidence with Excel, reporting, dashboards, and business analytics.",
    icon: <ChartNoAxesCombinedIcon className="size-5" />,
  },
 
  {
    title: "Flexible learning",
    description: "Study online at your own pace from any device, wherever you are.",
    icon: <LaptopIcon className="size-5" />,
  },
  {
    title: "Career-ready skills",
    description: "Develop knowledge that supports your next role or professional goal.",
    icon: <BriefcaseBusinessIcon className="size-5" />,
  },
  {
    title: "Certificates",
    description: "Showcase your progress with certificates for completed courses.",
    icon: <AwardIcon className="size-5" />,
  },
  {
    title: "Multilingual support",
    description: "Make learning accessible across languages, communities, and regions.",
    icon: <LanguagesIcon className="size-5" />,
  },
  {
    title: "Learning community",
    description: "Stay motivated with support, discussion, and shared progress.",
    icon: <MessagesSquareIcon className="size-5" />,
  },
];

const ICON_COLORS = [
  "bg-brand text-brand-foreground",
  "bg-accent text-accent-foreground",
  "bg-secondary text-secondary-foreground",
  "bg-muted text-foreground",
];

export default function Items({
  eyebrow = "NEXT INTERNATIONAL",
  title = "Learn skills that move you forward.",
  description = "Practical training for people who want to build confidence, improve their career, and achieve more.",
  items = DEFAULT_ITEMS,
  className,
}: ItemsProps) {
  return (
    <Section className={className}>
      <div className="mx-auto max-w-container">
        <div className="mb-10 flex flex-col gap-5 sm:mb-14 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="mb-4 inline-flex items-center gap-2 text-xs font-bold tracking-[0.18em] text-brand">
              <span className="h-px w-8 bg-brand" />
              {eyebrow}
            </div>
            <h2 className="text-3xl font-semibold leading-tight tracking-tight sm:text-5xl">
              {title}
            </h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
              {description}
            </p>
          </div>

          <div className="flex w-fit items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 shadow-md">
            <div className="flex -space-x-2">
              {[
                { label: "NI", className: "bg-brand text-brand-foreground" },
                { label: "XL", className: "bg-verified text-verified-foreground" },
                { label: "+", className: "bg-secondary text-secondary-foreground" },
              ].map((avatar) => (
                <div
                  key={avatar.label}
                  className={`flex size-8 items-center justify-center rounded-full border-2 border-card text-[10px] font-bold ${avatar.className}`}
                >
                  {avatar.label}
                </div>
              ))}
            </div>
            <div>
              <p className="text-sm font-semibold">Your next step starts here</p>
              <p className="text-xs text-muted-foreground">Learn. Apply. Grow.</p>
            </div>
          </div>
        </div>

        {items !== false && items.length > 0 && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {items.map((item, index) => {
              const featured = index === 0;

              return (
                <article
                  key={item.title}
                  className={`group relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-xl ${
                    featured ? "sm:col-span-2 lg:col-span-2" : ""
                  }`}
                >
                  <div className="absolute right-0 top-0 h-24 w-24 rounded-bl-full bg-brand/[0.04] transition-transform duration-300 group-hover:scale-150" />

                  <div className="relative flex h-full min-h-[210px] flex-col justify-between gap-8">
                    <div>
                      <div className={`mb-6 flex size-11 items-center justify-center rounded-xl ${ICON_COLORS[index % ICON_COLORS.length]}`}>
                        {item.icon}
                      </div>
                      <h3 className={`font-semibold tracking-tight ${featured ? "text-2xl" : "text-lg"}`}>
                        {item.title}
                      </h3>
                      <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
                        {item.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-1 text-xs font-semibold text-brand">
                      Explore course
                      <ArrowUpRightIcon className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </Section>
  );
}

export type { ItemProps, ItemsProps };
