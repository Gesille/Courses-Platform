import * as React from "react";
import { cn } from "../lib/utils";


function Section({ className, ...props }: React.ComponentProps<"section">) {
  return (
    <section
      data-slot="section"
      data-reveal
      className={cn("page-section-reveal line-b px-4 py-12 sm:py-24 md:py-32", className)}
      {...props}
    />
  );
}

export { Section };
