export type QuizQuestion = {
  id: string;
  type: "multiple-choice" | "true-false" | "scenario";
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
};

export type Course = {
  id: string;
  number: string;
  category: string;
  hook: string;
  title: string;
  description: string;
  duration: string;
  questions: number;
  level: "Beginner" | "Intermediate";
  accent: "brand" | "verified" | "caution";
  heroLabel: string;
  image: string;
  /** 2-3 supporting photos used on the detail page hero strip + lesson panel */
  gallery: string[];
  videoUrl: string;
  sharePointUrl: string;
  takeaways: string[];
  quiz: QuizQuestion[];
};

const question = (id: string, type: QuizQuestion["type"], text: string, options: string[], correctAnswer: string, explanation: string): QuizQuestion => ({ id, type, question: text, options, correctAnswer, explanation });

export const COURSES: Course[] = [
  {
    id: "phishing-or-real", number: "01", category: "Cyber Awareness", hook: "Can you spot the difference?", title: "Phishing or Real?", description: "Recognize suspicious emails, links, and requests before they become a security incident.", duration: "5 minutes", questions: 3, level: "Beginner", accent: "brand", heroLabel: "VERIFY BEFORE YOU CLICK",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1400&q=80&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1633265486064-086b219458ec?w=900&q=80&fit=crop",
      "https://images.unsplash.com/photo-1614064548016-0f5c0adaa3c2?w=900&q=80&fit=crop",
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=900&q=80&fit=crop",
    ],
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", sharePointUrl: "#sharepoint-phishing",
    takeaways: ["Check the sender address, not only the display name.", "Be careful with urgent requests for passwords or payments.", "When in doubt, verify through a trusted channel before clicking."],
    quiz: [question("p1", "multiple-choice", "Which detail is the strongest warning sign in an email?", ["A familiar logo", "An urgent request with a suspicious link", "A short subject line", "A company signature"], "An urgent request with a suspicious link", "Urgency combined with an unexpected link is a common phishing warning sign."), question("p2", "true-false", "A message is safe because it uses the company logo.", ["True", "False"], "False", "Logos and branding can be copied. Always verify the sender and destination."), question("p3", "scenario", "Your manager asks you to buy gift cards urgently. What should you do?", ["Buy them immediately", "Reply with your password", "Verify the request using a trusted channel", "Forward it to everyone"], "Verify the request using a trusted channel", "Use a known phone number or in-person conversation to verify unusual requests.")],
  },
  {
    id: "safe-sharepoint", number: "02", category: "Information Security", hook: "Could your shared file expose more than you think?", title: "SharePoint: Share Safely", description: "Understand permissions, sharing links, and simple checks that protect company information.", duration: "7 minutes", questions: 3, level: "Beginner", accent: "verified", heroLabel: "SHARE WITH CONFIDENCE",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1400&q=80&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=900&q=80&fit=crop",
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=900&q=80&fit=crop",
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=900&q=80&fit=crop",
    ],
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", sharePointUrl: "#sharepoint-sharing",
    takeaways: ["Choose the narrowest audience needed for each file.", "Review existing permissions before sharing sensitive information.", "Remove access when a project or collaboration ends."],
    quiz: [question("s1", "multiple-choice", "Which sharing option is usually safest?", ["Anyone with the link", "Only specific people who need access", "Everyone in the company", "Public on the internet"], "Only specific people who need access", "The narrowest practical audience reduces accidental exposure."), question("s2", "true-false", "Access should be reviewed when a project ends.", ["True", "False"], "True", "Removing unnecessary access is an important part of information protection."), question("s3", "scenario", "A colleague asks for a sensitive file they do not need for their work. What should you do?", ["Send it immediately", "Ask why they need it and confirm authorization", "Post it in a public folder", "Ignore the request"], "Ask why they need it and confirm authorization", "Confirming the business need helps prevent accidental oversharing.")],
  },
  {
    id: "data-smart", number: "03", category: "Data Awareness", hook: "Would you know what to do with sensitive data?", title: "Handle Data Smartly", description: "Build everyday habits that protect personal, customer, and company data.", duration: "6 minutes", questions: 3, level: "Intermediate", accent: "caution", heroLabel: "PROTECT WHAT MATTERS",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1400&q=80&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=900&q=80&fit=crop",
      "https://images.unsplash.com/photo-1591696205602-2f950c417cb9?w=900&q=80&fit=crop",
      "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=900&q=80&fit=crop",
    ],
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", sharePointUrl: "#sharepoint-data",
    takeaways: ["Only collect and use the information you need.", "Store sensitive information in approved company systems.", "Report a suspected data incident as soon as possible."],
    quiz: [question("d1", "multiple-choice", "Where should sensitive company data be stored?", ["A personal USB drive", "An approved company system", "A public file-sharing site", "A personal email account"], "An approved company system", "Approved systems provide the controls needed to protect company information."), question("d2", "true-false", "Keeping extra data forever is always safer.", ["True", "False"], "False", "Keeping unnecessary information increases exposure and risk."), question("d3", "scenario", "You accidentally send a file to the wrong person. What should you do?", ["Hide the mistake", "Report it quickly through the correct process", "Wait to see if they open it", "Delete your sent email only"], "Report it quickly through the correct process", "Fast reporting gives the organization more options to reduce harm.")],
  },
  {
    id: "strong-passwords", number: "04", category: "Cyber Awareness", hook: "Is your password doing enough work?", title: "Build Strong Password Habits", description: "Learn how to create, store, and protect passwords across your work accounts.", duration: "5 minutes", questions: 3, level: "Beginner", accent: "brand", heroLabel: "PROTECT YOUR ACCESS",
    image: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=1400&q=80&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1633265486064-086b219458ec?w=900&q=80&fit=crop",
      "https://images.unsplash.com/photo-1614064642397-24fd6dbab576?w=900&q=80&fit=crop",
      "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=900&q=80&fit=crop",
    ],
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", sharePointUrl: "#sharepoint-passwords",
    takeaways: ["Use a different password for important accounts.", "Never share passwords through email or chat.", "Use multi-factor authentication whenever it is available."],
    quiz: [question("pw1", "multiple-choice", "What is a good password habit?", ["Reuse one password everywhere", "Use unique passwords for important accounts", "Write passwords on a public note", "Share passwords with your team"], "Use unique passwords for important accounts", "Unique passwords limit the damage if one account is compromised."), question("pw2", "true-false", "Multi-factor authentication adds another layer of protection.", ["True", "False"], "True", "A second verification step helps protect accounts even if a password is exposed."), question("pw3", "scenario", "A coworker asks you to send your password so they can finish your task. What should you do?", ["Send it privately", "Refuse and use the approved access process", "Post it in the team channel", "Change it later"], "Refuse and use the approved access process", "Passwords should never be shared. Use delegated access or the approved support process.")],
  },
  {
    id: "remote-working", number: "05", category: "Workplace Security", hook: "Can you work safely from anywhere?", title: "Secure Remote Working", description: "Protect company information when working from home, public spaces, or while travelling.", duration: "6 minutes", questions: 3, level: "Beginner", accent: "verified", heroLabel: "WORK ANYWHERE SAFELY",
    image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=1400&q=80&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1521898284481-a5ec348cb555?w=900&q=80&fit=crop",
      "https://images.unsplash.com/photo-1522199755839-a2bacb67c546?w=900&q=80&fit=crop",
      "https://images.unsplash.com/photo-1487014679447-9f8336841d58?w=900&q=80&fit=crop",
    ],
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", sharePointUrl: "#sharepoint-remote",
    takeaways: ["Avoid discussing confidential information in public places.", "Keep devices locked when you step away.", "Use approved networks and company tools for work."],
    quiz: [question("r1", "multiple-choice", "What should you do before leaving your laptop unattended?", ["Leave it open", "Lock the screen", "Turn down the brightness", "Ask someone to watch it"], "Lock the screen", "Locking the screen prevents unauthorized access while you are away."), question("r2", "true-false", "Public Wi-Fi should be used carefully for company work.", ["True", "False"], "True", "Public networks can create additional security risks and may require approved protections."), question("r3", "scenario", "You need to discuss confidential customer data in a busy cafe. What is best?", ["Speak loudly", "Move to a private place or wait", "Use a public speaker", "Share the data by text"], "Move to a private place or wait", "Privacy includes protecting information from being overheard or viewed.")],
  },
  {
    id: "incident-reporting", number: "06", category: "Workplace Security", hook: "Would you report a mistake quickly?", title: "Report a Security Incident", description: "Know what counts as an incident and how early reporting helps your organization respond.", duration: "5 minutes", questions: 3, level: "Beginner", accent: "caution", heroLabel: "SPEAK UP EARLY",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1400&q=80&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1563206767-5b18f218e8de?w=900&q=80&fit=crop",
      "https://images.unsplash.com/photo-1587560699334-cc4ff634909a?w=900&q=80&fit=crop",
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=900&q=80&fit=crop",
    ],
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", sharePointUrl: "#sharepoint-incidents",
    takeaways: ["Report suspicious activity even when you are not certain.", "Include clear facts: what happened, when, and what was affected.", "Do not investigate beyond your role or delete evidence."],
    quiz: [question("i1", "multiple-choice", "When should you report a suspected incident?", ["Only when you have proof", "As soon as possible", "At the end of the month", "Only if a manager asks"], "As soon as possible", "Early reporting helps the right people investigate and reduce impact."), question("i2", "true-false", "Deleting a suspicious email is always the best first step.", ["True", "False"], "False", "Preserve useful information and follow the approved reporting process."), question("i3", "scenario", "You clicked a suspicious link but nothing happened. What should you do?", ["Ignore it", "Report it and explain what happened", "Tell nobody", "Forward the link"], "Report it and explain what happened", "A quick report allows security teams to check whether other people are at risk.")],
  },
  {
    id: "inclusive-workplace", number: "07", category: "People & Culture", hook: "What does inclusion look like in practice?", title: "Create an Inclusive Workplace", description: "Turn respect, belonging, and inclusive communication into everyday workplace actions.", duration: "8 minutes", questions: 3, level: "Beginner", accent: "verified", heroLabel: "MAKE SPACE FOR EVERYONE",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1400&q=80&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=900&q=80&fit=crop",
      "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=900&q=80&fit=crop",
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=900&q=80&fit=crop",
    ],
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", sharePointUrl: "#sharepoint-inclusion",
    takeaways: ["Listen actively and make space for different perspectives.", "Use respectful language and avoid assumptions.", "Speak up or seek support when behavior excludes others."],
    quiz: [question("in1", "multiple-choice", "What is an inclusive meeting habit?", ["Let one person dominate", "Invite different perspectives", "Skip accessibility needs", "Decide before listening"], "Invite different perspectives", "Participation improves when people are intentionally given space to contribute."), question("in2", "true-false", "Respectful communication includes considering how words may affect others.", ["True", "False"], "True", "Intent and impact can differ, so thoughtful communication matters."), question("in3", "scenario", "A colleague is repeatedly interrupted. What could you do?", ["Ignore it", "Invite them to finish and redirect the conversation", "Interrupt them too", "End the meeting"], "Invite them to finish and redirect the conversation", "Small interventions can help create a more respectful and balanced discussion.")],
  },
  {
    id: "customer-service", number: "08", category: "Customer Service", hook: "Can you turn a difficult moment around?", title: "Customer Conversations", description: "Use practical communication techniques to listen, respond, and resolve customer concerns.", duration: "7 minutes", questions: 3, level: "Intermediate", accent: "brand", heroLabel: "LISTEN. RESPOND. RESOLVE.",
    image: "https://images.unsplash.com/photo-1560264280-88b68371db39?w=1400&q=80&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=900&q=80&fit=crop",
      "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=900&q=80&fit=crop",
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=900&q=80&fit=crop",
    ],
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", sharePointUrl: "#sharepoint-customer-service",
    takeaways: ["Listen fully before offering a solution.", "Acknowledge the customer’s experience without making promises you cannot keep.", "Explain the next step clearly and follow through."],
    quiz: [question("c1", "multiple-choice", "What should happen first in a difficult customer conversation?", ["Interrupt", "Listen and understand the concern", "Blame another team", "End the conversation"], "Listen and understand the concern", "Understanding the issue is necessary before choosing an appropriate response."), question("c2", "true-false", "Clear next steps help build customer confidence.", ["True", "False"], "True", "Customers are more confident when they know what will happen next."), question("c3", "scenario", "A customer is upset about a delay. What is a helpful response?", ["Tell them it is not your problem", "Acknowledge the delay and explain the next step", "Argue about the details", "Promise anything"], "Acknowledge the delay and explain the next step", "Empathy and clear action are more useful than defensiveness or unrealistic promises.")],
  },
  {
    id: "excel-foundations", number: "09", category: "Digital Skills", hook: "Could Excel save you time every week?", title: "Excel Foundations", description: "Learn the spreadsheet habits that make everyday reporting faster, clearer, and more reliable.", duration: "10 minutes", questions: 3, level: "Beginner", accent: "caution", heroLabel: "WORK SMARTER WITH DATA",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1400&q=80&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&q=80&fit=crop",
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=900&q=80&fit=crop",
      "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=900&q=80&fit=crop",
    ],
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", sharePointUrl: "#sharepoint-excel",
    takeaways: ["Keep data organized in consistent columns and rows.", "Use formulas instead of calculating important numbers manually.", "Check your work before sharing a report."],
    quiz: [question("e1", "multiple-choice", "What is a benefit of using formulas?", ["They hide errors", "They make calculations repeatable", "They remove the need to check data", "They prevent collaboration"], "They make calculations repeatable", "Formulas make repeated calculations faster and easier to update."), question("e2", "true-false", "A spreadsheet should be checked before being used for a decision.", ["True", "False"], "True", "Checking values and formulas helps prevent avoidable reporting errors."), question("e3", "scenario", "Your report contains inconsistent date formats. What should you do?", ["Ignore it", "Standardize the format before analysis", "Delete the dates", "Send it immediately"], "Standardize the format before analysis", "Consistent formats make sorting, filtering, and analysis more reliable.")],
  },
  {
    id: "project-basics", number: "10", category: "Professional Skills", hook: "How do you keep a project moving?", title: "Project Basics", description: "Understand goals, responsibilities, risks, and communication habits that support successful projects.", duration: "8 minutes", questions: 3, level: "Intermediate", accent: "brand", heroLabel: "TURN PLANS INTO PROGRESS",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1400&q=80&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=900&q=80&fit=crop",
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=900&q=80&fit=crop",
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=900&q=80&fit=crop",
    ],
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", sharePointUrl: "#sharepoint-projects",
    takeaways: ["Define the outcome and what success looks like.", "Make ownership and deadlines visible.", "Raise risks early instead of waiting for a deadline to fail."],
    quiz: [question("pr1", "multiple-choice", "What should a project clarify first?", ["The team lunch", "The desired outcome", "The final presentation design", "Every possible detail"], "The desired outcome", "A clear outcome helps the team make aligned decisions."), question("pr2", "true-false", "Raising a risk early gives a team more options.", ["True", "False"], "True", "Early visibility allows the team to adjust scope, resources, or timing."), question("pr3", "scenario", "A task is likely to miss its deadline. What should you do?", ["Hide the issue", "Raise it early with a proposed next step", "Wait until the deadline", "Blame a teammate"], "Raise it early with a proposed next step", "Good project communication combines transparency with action.")],
  },
];

export function getCourse(id: string) {
  return COURSES.find((course) => course.id === id);
}