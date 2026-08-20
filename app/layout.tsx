import "./globals.css";
import type { Metadata } from "next";

import { jakarta } from "@/component/lib/fonts";
import { ThemeProvider } from "next-themes";
import { siteConfig } from "@/config/site";
import { ScrollReveal } from "@/component/ui/scroll-reveal";
import { Providers } from "@/component/Provider";


export const metadata: Metadata = {
 metadataBase: new URL(siteConfig.url),

  title: {
    default: siteConfig.name,
    template:`%s - ${siteConfig.name}`,
  },

  description:   siteConfig.description,

  keywords: [
    "Employee Training",
    "Corporate Training",
    "Online Training",
    "Workplace Training",
    "Employee Learning",
    "Professional Development",
    "IT Training",
    "Workplace Safety Training",
    "Customer Service Training",
    "Learning Management System",
    "LMS",
    "NEXT Learn",
  ],

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title:siteConfig.name,
    description:siteConfig.description,
    siteName:siteConfig.name,

    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "NEXT Learn - Employee Training Platform",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description:
     siteConfig.description,
     images: [siteConfig.ogImage],
  },

  icons: {
    icon: "/logo/NextID-Logo-CMYK.png",
   
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="light"
      style={{ colorScheme: "light" }}
      suppressHydrationWarning
    >
      <body
        className={`${jakarta.variable} bg-background font-sans antialiased`}
      >
       <Providers>
      
          <ScrollReveal />
          {children}
    
       </Providers>
      </body>
    </html>
  );
}