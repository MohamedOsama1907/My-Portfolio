import mavic from "../assets/1-MavicPro.png";
import uxReview from "../assets/2-UXReview.svg";
import mudaber from "../assets/3-mudaber.png";
import clarity from "../assets/4-Clarity.png";
import gameArena from "../assets/5-GameArena.png";
import contactHub from "../assets/6-ContactHub.svg";
import portfolio from "../assets/7-portfolio.jpg";
import cosmos from "../assets/8-COSMOS.png.jpg";
import quizApp from "../assets/9-QuizApp.png";
import cineVerse from "../assets/10-CineVerse.png";
import socialApp from "../assets/11-SocialApp.svg";
import audioGuard from "../assets/12-AudioGuard.svg";
import currentPortfolio from "../assets/13-CurrentPortfolio.png";

export type Category =
  | "All"
  | "Web Applications"
  | "Landing Pages"
  | "Education & Learning"
  | "Entertainment & Games"
  | "Portfolio";

export type ProjectItem = {
  id: string;
  name: string;
  category: Exclude<Category, "All">;
  badge: string;
  image: string;
  description: string;
  longDescription: string;
  technologies: string[];
  highlights: string[];
  demo?: string;
  github?: string;
};

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: "cineverse",
    name: "CineVerse",
    category: "Web Applications",
    badge: "Streaming Platform",
    image: cineVerse,
    description:
      "A modern movie discovery app featuring trending films, trailers, ratings, and media details.",
    longDescription:
      "CineVerse is a feature-packed movie and entertainment discovery platform built with React, TypeScript, and Tailwind CSS. It integrates movie database APIs to allow users to explore trending films, watch trailers, browse cast details, and filter by genre with an immersive cinema UI.",
    technologies: [
      "React.js",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "Lucide",
      "TMDB API",
      "React Router",
    ],
    highlights: [
      "Real-time TMDB API integration for trending titles, upcoming releases, and media discovery",
      "Dedicated detail pages with video trailers, user ratings, cast profiles, and genre filters",
      "Immersive cinema dark UI with responsive grid cards and smooth transition effects",
      "Client-side routing with instant bookmarking and optimized media asset loading",
    ],
    demo: "https://shaheed-app.vercel.app/",
    github: "https://github.com/MohamedOsama1907/Movie-App",
  },
  {
    id: "social-app",
    name: "Social App",
    category: "Web Applications",
    badge: "Social Platform",
    image: socialApp,
    description:
      "A feature-rich social platform for sharing posts, connecting with people, and viewing profiles.",
    longDescription:
      "A full-featured social networking client application engineered with React, TypeScript, and TanStack Query. Includes user authentication, timeline feed, post creation with media uploads, likes, comments, and profile customization with responsive UI.",
    technologies: [
      "React.js",
      "TypeScript",
      "TanStack Query",
      "Axios",
      "Tailwind CSS",
      "Vite",
      "Sonner",
    ],
    highlights: [
      "Complete user authentication flow with protected routes and persistent session management",
      "Interactive social timeline supporting post creation, image uploads, comments, and likes",
      "Server-state management and optimistic UI updates powered by TanStack Query and Axios",
      "User profile customization with dynamic avatars and user activity history",
    ],
    demo: "https://social-media-space.vercel.app/",
    github: "https://github.com/MohamedOsama1907/Social-App",
  },
  {
    id: "audioguard",
    name: "AudioGuard",
    category: "Web Applications",
    badge: "AI Platform",
    image: audioGuard,
    description:
      "An AI voice detection interface for analyzing uploaded or recorded audio authenticity.",
    longDescription:
      "AudioGuard provides an intuitive, high-performance interface for AI-powered voice and speech analysis. Built with React and TypeScript, it features real-time audio wave visualization, file upload processing, confidence scoring, and forensic voice analysis metrics.",
    technologies: [
      "React.js",
      "TypeScript",
      "TanStack Query",
      "Tailwind CSS",
      "Axios",
      "Vite",
      "Sonner",
    ],
    highlights: [
      "Dual audio intake workflows supporting live microphone recording and direct audio file uploads",
      "Dynamic waveform audio visualization giving real-time feedback during playback and analysis",
      "Deepfake detection scoring with detailed authenticity probability breakdown and confidence ratings",
      "Fast, accessible user interface with toast feedback and clean dark/light mode integration",
    ],
    demo: "https://voiceguardal.vercel.app/",
    github: "https://github.com/MohamedOsama1907/VoiceGuard-AI",
  },
  {
    id: "contacthub",
    name: "ContactHub",
    category: "Web Applications",
    badge: "Productivity",
    image: contactHub,
    description:
      "A smart contact manager for organizing people, favorites, and emergency contacts.",
    longDescription:
      "A comprehensive contact management web application featuring complete CRUD operations, contact filtering, favorites bookmarking, search by name or phone, and persistent data storage.",
    technologies: [
      "HTML5",
      "CSS3",
      "Bootstrap",
      "JavaScript",
      "LocalStorage",
      "CRUD",
    ],
    highlights: [
      "Full CRUD operations allowing users to create, view, update, and delete contacts effortlessly",
      "Instant real-time search and filter by contact name, phone number, and relationship categories",
      "Favorites and emergency contacts quick-tagging with direct click-to-call actions",
      "Persistent client-side data storage using browser LocalStorage for offline reliability",
    ],
    demo: "https://mohamedosama1907.github.io/Assignment-9/",
    github: "https://github.com/MohamedOsama1907/Assignment-9",
  },
  {
    id: "mavic-pro",
    name: "Mavic Pro",
    category: "Landing Pages",
    badge: "Product Showcase",
    image: mavic,
    description:
      "A responsive product showcase and marketing landing page for the DJI Mavic Pro.",
    longDescription:
      "An interactive marketing landing page dedicated to the DJI Mavic Pro drone. Highlights specifications, flight capabilities, cinematic camera features, and accessories with smooth animations and responsive layout.",
    technologies: ["HTML5", "CSS3", "Responsive Design", "Flexbox", "CSS Grid"],
    highlights: [
      "Visually engaging product showcase highlighting key flight mechanics and 4K camera specs",
      "Custom responsive CSS Grid and Flexbox layouts structured for high-conversion marketing",
      "Interactive technical specifications breakdown covering range, battery life, and gimbal controls",
      "Mobile-optimized assets ensuring fast load speeds and crisp rendering across retina screens",
    ],
    demo: "https://mohamedosama1907.github.io/Assignment-3/",
    github: "https://github.com/MohamedOsama1907/Assignment-3",
  },
  {
    id: "ux-review",
    name: "UX Review",
    category: "Landing Pages",
    badge: "Editorial",
    image: uxReview,
    description:
      "A bold editorial landing page for design culture, articles, and creative direction.",
    longDescription:
      "A design-forward editorial platform concept focused on UX case studies, typography, and creative direction. Features modern grid structures, contrast styling, and responsive media blocks.",
    technologies: ["HTML5", "CSS3", "Typography", "CSS Architecture"],
    highlights: [
      "Striking editorial typographic hierarchy built around bold headings and readable body text",
      "Multi-column responsive grid layout showcasing design articles, essays, and case studies",
      "Clean metadata presentation with estimated reading times, author tags, and publication dates",
      "Accessible contrast ratios and semantic HTML structure ensuring broad accessibility",
    ],
    demo: "https://mohamedosama1907.github.io/Assignment-3/",
    github: "https://github.com/MohamedOsama1907/Assignment-3",
  },
  {
    id: "clarity",
    name: "Clarity",
    category: "Landing Pages",
    badge: "Corporate",
    image: clarity,
    description:
      "A clean, responsive corporate interface built around clear information and usability.",
    longDescription:
      "A corporate landing page emphasizing clarity, brand identity, and intuitive navigation. Built with clean semantic markup, custom styling, and performance-optimized assets.",
    technologies: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
    highlights: [
      "Modern corporate layout communicating core value propositions with clean information hierarchy",
      "Interactive feature showcases and service offering cards with subtle hover feedback",
      "Customer trust elements including social proof metrics, partner logos, and testimonial blocks",
      "Fully responsive framework delivering seamless layout transitions from mobile to wide screens",
    ],
    demo: "https://mohamedosama1907.github.io/Route-Exam/",
    github: "https://github.com/MohamedOsama1907/Route-Exam",
  },
  {
    id: "mudaber",
    name: "Mudaber",
    category: "Education & Learning",
    badge: "Educational",
    image: mudaber,
    description:
      "A responsive Arabic learning platform experience with courses and structured paths.",
    longDescription:
      "An online education platform specifically designed for Arabic language and Islamic learning. Offers responsive course browsing, curriculum tracks, lesson modules, and modern cards.",
    technologies: ["HTML5", "CSS3", "Bootstrap", "JavaScript", "RTL Layout"],
    highlights: [
      "Engineered with native Right-to-Left (RTL) styling and Arabic typography considerations",
      "Structured course curriculum tracks with module overviews and progress indicators",
      "Responsive card layouts displaying instructor bios, course difficulty, and duration",
      "Built with Bootstrap and custom CSS for high cross-browser compatibility",
    ],
    demo: "https://mohamedosama1907.github.io/Assginment-5/",
    github: "https://github.com/MohamedOsama1907/Assginment-5",
  },
  {
    id: "cosmos",
    name: "COSMOS",
    category: "Education & Learning",
    badge: "Dashboard",
    image: cosmos,
    description:
      "A space exploration dashboard featuring astronomy content and NASA imagery.",
    longDescription:
      "An educational astronomy dashboard that visualizes planetary data, deep space photography, solar system timelines, and space exploration mission logs with engaging interactive widgets.",
    technologies: ["HTML5", "CSS3", "Bootstrap", "JavaScript", "APIs"],
    highlights: [
      "Interactive astronomy dashboard featuring high-resolution space photography and planetary facts",
      "Solar system timeline visualization documenting historic milestones in space exploration",
      "Engaging planetary data cards highlighting orbital periods, atmospheric data, and physical properties",
      "Dynamic interactive UI components with smooth responsive layout adaptations",
    ],
    demo: "https://mohamedosama1907.github.io/Assignment-11/",
    github: "https://github.com/MohamedOsama1907/Assignment-11",
  },
  {
    id: "game-arena",
    name: "Game Arena",
    category: "Entertainment & Games",
    badge: "Gaming Hub",
    image: gameArena,
    description:
      "A game discovery experience for browsing, filtering, and exploring games.",
    longDescription:
      "An interactive video game library catalog where users can filter titles by genre, platform, and ratings. Built with responsive grid cards, modal previews, and search capabilities.",
    technologies: ["HTML5", "CSS3", "Bootstrap", "JavaScript", "Gaming API"],
    highlights: [
      "Extensive game catalog with multi-filter sorting by genre, platform (PC/Browser), and release date",
      "Interactive modal cards displaying system hardware requirements, gameplay details, and screenshots",
      "Real-time game search with instant client-side filtering and responsive grid views",
      "Direct external launch links connecting players to official free-to-play titles",
    ],
    demo: "https://mohamedosama1907.github.io/Assignment-6/",
    github: "https://github.com/MohamedOsama1907/Assignment-6",
  },
  {
    id: "quiz-app",
    name: "Quiz App",
    category: "Entertainment & Games",
    badge: "Interactive Trivia",
    image: quizApp,
    description:
      "An interactive quiz game with categories, difficulty settings, and timed questions.",
    longDescription:
      "A trivia game application built with Object-Oriented JavaScript. Features dynamic question fetching from trivia APIs, category selection, animated timers, instant feedback, and final score breakdowns.",
    technologies: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "OOP",
      "Trivia API",
      "Bootstrap",
    ],
    highlights: [
      "Built with modular Object-Oriented JavaScript (OOP) architecture managing quiz states",
      "Dynamic questions fetched from Open Trivia API across multiple topics and difficulty tiers",
      "Animated countdown timer per question with instant answer feedback and score calculation",
      "Final results dashboard showing performance stats, correct answer summaries, and replay option",
    ],
    demo: "https://mohamedosama1907.github.io/Assignment-12/",
    github: "https://github.com/MohamedOsama1907/Assignment-12",
  },
  {
    id: "portfolio",
    name: "Portfolio",
    category: "Portfolio",
    badge: "Personal Showcase",
    image: portfolio,
    description:
      "A personal creative developer portfolio highlighting frontend projects and UI engineering.",
    longDescription:
      "A modern and professional portfolio website designed to highlight my skills, projects, and work experience as a frontend developer. Built with React, TypeScript, Tailwind CSS, and GSAP.",
    technologies: [
      "React.js",
      "TypeScript",
      "Tailwind CSS",
      "Vite",
      "GSAP",
      "Embla Carousel",
      "Lucide Icons",
    ],
    highlights: [
      "Showcases projects with descriptions, tech stacks, and direct links to live demos and source code",
      "Structured sections for about, core technical skills, education, and contact channels",
      "Smooth GSAP scroll entrance animations and interactive draggable quick-contact widget",
      "Complete Light Mode and Dark Mode theming with responsive layout across all device screens",
    ],
    demo: "https://mohamedosama1907.github.io/Assignment-10/",
    github: "https://github.com/MohamedOsama1907/Assignment-10",
  },
  {
    id: "current-portfolio",
    name: "Current Portfolio",
    category: "Portfolio",
    badge: "Personal Portfolio",
    image: currentPortfolio,
    description:
      "A responsive portfolio showcasing frontend projects, skills, and experience.",
    longDescription:
      "My current portfolio brings together selected projects, technical skills, experience, and contact options in a responsive interface. It includes project browsing with details, live demos, and source links, plus light and dark themes.",
    technologies: [
      "React.js",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "GSAP",
      "Embla Carousel",
      "Lucide React",
    ],
    highlights: [
      "Responsive portfolio sections for projects, skills, education, and contact",
      "Project carousel and cards with details, live demo, and source links",
      "Light and dark themes with reduced-motion support",
      "Animated interactions built with GSAP and Embla Carousel",
    ],
    demo: "https://mohamed-osama1907.vercel.app/",
    github: "https://github.com/MohamedOsama1907/My-Portfolio",
  },
];

const PROJECT_ORDER = [
  "social-app",
  "current-portfolio",
  "quiz-app",
  "audioguard",
  "cineverse",
  "cosmos",
  "mudaber",
  "portfolio",
  "contacthub",
  "game-arena",
  "clarity",
  "ux-review",
  "mavic-pro",
];

PROJECTS_DATA.sort(
  (a, b) => PROJECT_ORDER.indexOf(a.id) - PROJECT_ORDER.indexOf(b.id),
);
