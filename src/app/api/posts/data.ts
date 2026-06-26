export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  imageUrl: string;
  tags: string[];
}

export const mockPosts: BlogPost[] = [
  {
    id: "1",
    title: "The Future of Web Development: What to Expect in 2027",
    excerpt: "Explore the emerging trends in web development, from AI-driven coding assistants to edge computing and advanced SSR techniques.",
    content: "Web development is evolving at an unprecedented pace. With the rise of AI tools, developers are finding new ways to optimize their workflows. Edge computing is pushing rendering closer to the user, reducing latency significantly. Furthermore, advanced Server-Side Rendering (SSR) techniques are making applications more SEO-friendly and performant than ever before. In this article, we dive deep into how these technologies will shape the web by 2027.",
    author: "Jane Doe",
    date: "2026-06-20",
    imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
    tags: ["Technology", "Web Dev", "Future"],
  },
  {
    id: "2",
    title: "Mastering Tailwind CSS: Beyond the Basics",
    excerpt: "Learn how to build scalable and maintainable design systems using Tailwind CSS's advanced features and configuration.",
    content: "Tailwind CSS has revolutionized the way we write styles. However, as projects grow, maintaining a utility-first codebase can become challenging. By leveraging Tailwind's configuration file, writing custom plugins, and utilizing @apply effectively in specific scenarios, you can build a robust design system. This post covers advanced strategies for organizing your Tailwind classes and keeping your markup clean.",
    author: "John Smith",
    date: "2026-06-18",
    imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
    tags: ["CSS", "Design", "Tutorial"],
  },
  {
    id: "3",
    title: "Understanding React Server Components",
    excerpt: "A comprehensive guide to React Server Components (RSC) and how they differ from traditional Client Components.",
    content: "React Server Components (RSC) represent a paradigm shift in the React ecosystem. Unlike traditional components that render on the client, Server Components render exclusively on the server, resulting in zero bundle size for the component itself. This allows for direct access to backend resources like databases and file systems without creating separate API endpoints. We will explore the architecture, benefits, and common use cases of RSC in modern Next.js applications.",
    author: "Alice Johnson",
    date: "2026-06-15",
    imageUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=800&q=80",
    tags: ["React", "Next.js", "Performance"],
  },
  {
    id: "4",
    title: "The Art of Minimalist UI Design",
    excerpt: "Why less is often more in user interface design, and how to achieve elegance through simplicity.",
    content: "Minimalism in UI design is not just about removing elements; it's about focusing on what truly matters. By stripping away non-essential components, designers can guide the user's attention to the core functionality. Key principles include ample whitespace, clear typography, and a restrained color palette. This article examines successful minimalist designs and provides actionable tips for simplifying your own interfaces.",
    author: "Michael Chang",
    date: "2026-06-10",
    imageUrl: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&q=80",
    tags: ["Design", "UI/UX", "Minimalism"],
  },
  {
    id: "5",
    title: "Optimizing Web Fonts for Performance",
    excerpt: "Stop your typography from slowing down your site. Learn the best practices for loading web fonts efficiently.",
    content: "Web fonts are essential for branding and aesthetics, but they can significantly impact page load times if not handled correctly. Techniques such as preloading, using the font-display property, and subsetting fonts can drastically reduce the time to first paint. We'll walk through a step-by-step process to audit your current font loading strategy and implement improvements for a blazing-fast user experience.",
    author: "Sarah Connor",
    date: "2026-06-05",
    imageUrl: "https://images.unsplash.com/photo-1515387784663-e2e29a23f69e?auto=format&fit=crop&w=800&q=80",
    tags: ["Performance", "Typography", "Optimization"],
  },
  {
    id: "6",
    title: "Building Accessible Web Applications",
    excerpt: "A practical guide to ensuring your web applications are usable by everyone, regardless of their abilities.",
    content: "Accessibility (a11y) is a crucial aspect of web development that is often overlooked. Building accessible applications ensures that everyone, including people with disabilities, can use your product. This involves proper semantic HTML, keyboard navigability, adequate color contrast, and correct use of ARIA attributes. In this guide, we'll cover the most common accessibility pitfalls and how to fix them.",
    author: "David Lee",
    date: "2026-06-01",
    imageUrl: "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=800&q=80",
    tags: ["Accessibility", "Web Dev", "Inclusive"],
  }
];
