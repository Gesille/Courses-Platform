import { notFound } from "next/navigation";
import CourseRegistration from "@/component/sections/courses/course-registration";
import { COURSES, getCourse } from "@/component/sections/courses/next-learn-data";

export function generateStaticParams() { return COURSES.map((course) => ({ id: course.id })); }

export default async function CourseRegistrationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const course = getCourse(id);
  if (!course) notFound();
  return <CourseRegistration course={course} />;
}
