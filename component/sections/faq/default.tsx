import Link from "next/link";
import { ReactNode } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../ui/accordion";
import { Section } from "../../ui/section";

interface FAQItemProps {
  question: string;
  answer: ReactNode;
  value?: string;
}

interface FAQProps {
  title?: string;
  items?: FAQItemProps[] | false;
  className?: string;
}

const DEFAULT_ITEMS: FAQItemProps[] = [
  {
    question: "What can I learn at Next International?",
    answer: (
      <>
        <p className="mb-4 max-w-[640px] text-muted-foreground text-balance">
          Next International offers practical learning for professional and career development. Course topics can include Excel and Microsoft Office, data analysis, Power BI, workplace skills, project management, and other business-focused subjects.
        </p>
        <p className="mb-4 max-w-[640px] text-muted-foreground text-balance">
          Explore the available subjects and choose a course that matches your current skills and career goals.
        </p>
        <Link href="/courses" className="text-foreground underline underline-offset-2">
          Browse courses
        </Link>
      </>
    ),
  },
  {
    question: "Are the courses suitable for beginners?",
    answer: (
      <p className="mb-4 max-w-[600px] text-muted-foreground">
        Yes. Many courses are designed to guide learners from the fundamentals to more advanced topics. Each course description should explain the expected level, required knowledge, and what you will be able to do after completing the course.
      </p>
    ),
  },
  {
    question: "How do I access my course after registering?",
    answer: (
      <>
        <p className="mb-4 max-w-[600px] text-muted-foreground">
          After registration or enrollment, sign in to your Next International account and open your learner dashboard. Your available courses, lessons, progress, and learning materials will be shown there.
        </p>
        <p className="mb-4 max-w-[600px] text-muted-foreground">
          You can continue learning from a supported computer, tablet, or mobile device, depending on the course requirements.
        </p>
      </>
    ),
  },
  {
    question: "Can I learn at my own pace?",
    answer: (
      <p className="mb-4 max-w-[580px] text-muted-foreground">
        Most online courses allow you to learn at your own pace. You can review lessons, repeat activities, and return to your course according to the access period shown on the course or enrollment page.
      </p>
    ),
  },
  {
    question: "Will I receive a certificate after completing a course?",
    answer: (
      <p className="mb-4 max-w-[580px] text-muted-foreground">
        Certificate availability depends on the specific course. When a certificate is included, the course requirements will explain what you need to complete, such as lessons, assessments, assignments, or a final evaluation.
      </p>
    ),
  },
  {
    question: "Do I need previous experience to take an Excel or data course?",
    answer: (
      <p className="mb-4 max-w-[580px] text-muted-foreground">
        Previous experience is not always required. Beginner courses introduce the essential tools and concepts first, while advanced courses may expect familiarity with spreadsheets, formulas, reporting, or data concepts. Check the course level before enrolling.
      </p>
    ),
  },
  {
    question: "Are the courses available in more than one language?",
    answer: (
      <p className="mb-4 max-w-[580px] text-muted-foreground">
        Language availability depends on the course and its learning materials. Next International is designed to support learners across different regions, so check each course page for the available language, subtitles, and downloadable resources.
      </p>
    ),
  },
  {
    question: "How can I get help if I have a question about a course?",
    answer: (
      <>
        <p className="mb-4 max-w-[580px] text-muted-foreground">
          Start by checking the course information and learner resources. If you still need help with enrollment, access, or course content, contact the Next International support team through the contact page.
        </p>
        <Link href="/contact" className="text-foreground underline underline-offset-2">
          Contact support
        </Link>
      </>
    ),
  },
];

export default function FAQ({
  title = "Frequently asked questions about learning with Next International",
  items = DEFAULT_ITEMS,
  className,
}: FAQProps) {
  return (
    <Section className={className}>
      <div className="mx-auto flex max-w-container flex-col items-center gap-8">
        <div className="text-center">
          <p className="mb-3 text-xs font-bold tracking-[0.18em] text-brand">
            LEARN WITH CONFIDENCE
          </p>
          <h2 className="text-center text-3xl font-semibold tracking-tight sm:text-5xl">
            {title}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Find answers about courses, enrollment, certificates, learning access, and learner support.
          </p>
        </div>

        {items !== false && items.length > 0 && (
          <Accordion type="single" collapsible className="w-full max-w-[800px]">
            {items.map((item, index) => (
              <AccordionItem
                key={item.value ?? item.question}
                value={item.value || `item-${index + 1}`}
              >
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </div>
    </Section>
  );
}

export type { FAQItemProps, FAQProps };
