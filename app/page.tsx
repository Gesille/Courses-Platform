import Items from "@/component/sections/items/default";
import Hero from "@/component/sections/hero/default";
import Logos from "@/component/sections/logos/default";
import Navbar from "@/component/sections/navbar/default";

import { LayoutLines } from "@/component/ui/layout-lines";
import FAQ from "@/component/sections/faq/default";
import Footer from "@/component/sections/footer/default";

import CoursePreview from "@/component/sections/courses/course-preview";
import ManagerPage from "@/component/sections/manager/page";

export default function Home() {
  return (
    <main className="bg-background text-foreground min-h-screen w-full">
      <LayoutLines />
      <Navbar />
      <Hero />
      <Logos />
      <Items />
      <CoursePreview />
      <ManagerPage />
      <FAQ />

      <Footer />
    </main>
  );
}
