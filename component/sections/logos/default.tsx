import { ReactNode } from "react";



import { Badge } from "../../ui/badge";
import Logo from "../../ui/logo";
import { Section } from "../../ui/section";

interface LogosProps {
  title?: string;
  badge?: ReactNode | false;
  logos?: ReactNode[] | false;
  className?: string;
}

// Simple course-platform icons. These replace the technology logos while
// keeping the same Logo component and visual design.
function ExcelIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <rect width="24" height="24" rx="5" fill="#217346" />
      <path d="M7 7.5h10v9H7v-9Z" fill="#fff" opacity=".95" />
      <path d="m9 9.2 2.1 2.3L9 13.8h1.7l1.25-1.45 1.25 1.45H15l-2.1-2.3L15 9.2h-1.7l-1.35 1.55-1.25-1.55H9Z" fill="#217346" />
    </svg>
  );
}

function AnalyticsIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <rect width="24" height="24" rx="5" fill="#2563EB" />
      <path d="M6.5 16.5V12M10.5 16.5V8M14.5 16.5v-5M18 16.5V6.5" stroke="white" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function PowerBIIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <rect width="24" height="24" rx="5" fill="#F2C811" />
      <path d="M7 16V11h2.5v5H7Zm4 0V8h2.5v8H11Zm4 0V5h2.5v11H15Z" fill="#4B3F00" />
    </svg>
  );
}

function ProjectIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <rect width="24" height="24" rx="5" fill="#7C3AED" />
      <path d="M7 8.5h10M7 12h7M7 15.5h5" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
      <path d="m16 14 1.2 1.2L19.5 13" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SkillsIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <rect width="24" height="24" rx="5" fill="#0F766E" />
      <path d="M12 6.5 13.7 10l3.8.55-2.75 2.7.65 3.8L12 15.25 8.6 17.05l.65-3.8-2.75-2.7 3.8-.55L12 6.5Z" fill="white" />
    </svg>
  );
}

export default function Logos({
  title = "Learn practical skills with Next International",
  badge = (
    <Badge variant="outline" className="border-brand/30 text-brand">
      Next International Learning Platform
    </Badge>
  ),
  logos = [
    <Logo
      key="excel"
      image={ExcelIcon}
      name="Excel & Office"
      version="Beginner to Advanced"
      badge="Popular"
    />,
    <Logo
      key="analytics"
      image={AnalyticsIcon}
      name="Data Analysis"
      version="Career-focused"
      badge="New"
    />,
    <Logo
      key="power-bi"
      image={PowerBIIcon}
      name="Power BI"
      version="Practical projects"
      badge="New"
    />,
    <Logo
      key="project-management"
      image={ProjectIcon}
      name="Project Management"
      version="Professional skills"
    />,
    <Logo
      key="professional-skills"
      image={SkillsIcon}
      name="Professional Skills"
      version="Learn and grow"
    />,
  ],
  className,
}: LogosProps) {
  return (
    <Section className={className}>
      <div className="max-w-container mx-auto flex flex-col items-center gap-8 text-center">
        <div className="flex flex-col items-center gap-6">
          {badge !== false && badge}
          <h2 className="text-md font-semibold sm:text-2xl">{title}</h2>
        </div>

        {logos !== false && logos.length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-8">
            {logos}
          </div>
        )}
      </div>
    </Section>
  );
}
