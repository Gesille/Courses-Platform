import { notFound } from "next/navigation";
import CourseChallenge from "@/component/sections/courses/course-challenge";
import { COURSES, getCourse } from "@/component/sections/courses/next-learn-data";

export function generateStaticParams() { return COURSES.map((course) => ({ id: course.id })); }

export default async function CourseLearnPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const course = getCourse(id);
  if (!course) notFound();
  return <CourseChallenge  />;
}
