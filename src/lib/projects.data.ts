export interface Project {
  title: string;
  slug: string;
  href: string;
  image: string;
  year: number;
  client: string;
  tags: string[];
  excerpt: string;
  featured?: boolean;
}

// import { Project } from '@/components/ProjectCard';

export const projects: Project[] = [
  {
    title: "Hotel Palombaggia",
    slug: "hotel-palombaggia",
    href: "/projects/hotel-palombaggia",
    image: "/images/projects/palombaggia-4x3.jpg",
    year: 2024,
    client: "Hotel Palombaggia",
    tags: ["Hospitality", "Brand", "Next.js", "Performance", "Accessibility"],
    excerpt: "Luxury beachfront resort website with seamless booking experience and immersive visual storytelling.",
    featured: true
  },
  {
    title: "Luxury Hotel Booking Platform",
    slug: "luxury-hotel-booking",
    href: "/projects/luxury-hotel-booking",
    image: "/images/projects/hotel-booking.jpg",
    year: 2024,
    client: "Grand Hotels Group",
    tags: ["Hospitality", "E-commerce", "React"],
    excerpt: "Modern booking platform with real-time availability, dynamic pricing, and seamless payment integration.",
    featured: true
  },
  {
    title: "Restaurant Chain Mobile App",
    slug: "restaurant-mobile-app",
    href: "/projects/restaurant-mobile-app",
    image: "/images/projects/restaurant-app.jpg",
    year: 2024,
    client: "Bistro Chain Co",
    tags: ["Hospitality", "Mobile", "React Native"],
    excerpt: "Native mobile app with table reservations, menu browsing, and loyalty program integration.",
    featured: true
  },
  {
    title: "Brand Identity Website",
    slug: "brand-identity-website",
    href: "/projects/brand-identity-website",
    image: "/images/projects/brand-website.jpg",
    year: 2023,
    client: "Creative Agency",
    tags: ["Brand", "Design System", "Next.js"],
    excerpt: "Comprehensive brand showcase with interactive portfolio and case study presentations.",
    featured: true
  },
  {
    title: "Interactive Event Platform",
    slug: "interactive-event-platform",
    href: "/projects/interactive-event-platform",
    image: "/images/projects/event-platform.jpg",
    year: 2023,
    client: "Event Management Co",
    tags: ["Interactive", "Real-time", "WebRTC"],
    excerpt: "Live event platform with video streaming, chat, and interactive audience engagement features.",
    featured: false
  },
  {
    title: "E-commerce Dashboard",
    slug: "ecommerce-dashboard",
    href: "/projects/ecommerce-dashboard",
    image: "/images/projects/dashboard.jpg",
    year: 2023,
    client: "Retail Chain",
    tags: ["E-commerce", "Analytics", "Vue.js"],
    excerpt: "Comprehensive analytics dashboard with real-time sales data and inventory management.",
    featured: false
  },
  {
    title: "Healthcare Portal",
    slug: "healthcare-portal",
    href: "/projects/healthcare-portal",
    image: "/images/projects/healthcare.jpg",
    year: 2022,
    client: "Medical Group",
    tags: ["Healthcare", "Security", "React"],
    excerpt: "HIPAA-compliant patient portal with appointment scheduling and medical record access.",
    featured: false
  },
  {
    title: "Financial Services App",
    slug: "financial-services-app",
    href: "/projects/financial-services-app",
    image: "/images/projects/financial.jpg",
    year: 2022,
    client: "Investment Firm",
    tags: ["Finance", "Security", "React"],
    excerpt: "Secure investment platform with portfolio tracking and real-time market data.",
    featured: false
  },
  {
    title: "Educational Platform",
    slug: "educational-platform",
    href: "/projects/educational-platform",
    image: "/images/projects/education.jpg",
    year: 2022,
    client: "University",
    tags: ["Education", "LMS", "Next.js"],
    excerpt: "Learning management system with course creation, student tracking, and assessment tools.",
    featured: false
  }
];
