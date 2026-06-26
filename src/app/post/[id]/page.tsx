import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Search } from "lucide-react";
import PostActions from "@/components/PostActions";
import CopyLinkButton from "@/components/CopyLinkButton";
import NewsletterForm from "@/components/NewsletterForm";

// Generate metadata dynamically for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const prisma = (await import("@/lib/prisma")).default;
  const post = await prisma.post.findUnique({ where: { id } });

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: `${post.title} | Astrobyte`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.imageUrl],
      type: "article",
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const prisma = (await import("@/lib/prisma")).default;
  const post = await prisma.post.findUnique({ where: { id } });

  if (!post) {
    notFound();
  }

  const tagsArray = post.tags.split(',').map(tag => tag.trim()).filter(Boolean);
  const category = tagsArray.length > 0 ? tagsArray[0] : "Article";

  // Calculate estimated read time based on word count
  const wordCount = post.content.split(/\s+/).length;
  const readTime = Math.max(1, Math.ceil(wordCount / 200)); // Assuming 200 words per minute

  return (
    <article className="max-w-5xl mx-auto w-full pb-20">
      <div className="flex justify-end mb-4">
        <PostActions postId={post.id} />
      </div>

      {/* Header Section */}
      <header className="text-center max-w-3xl mx-auto mb-10">
        <div className="text-sm font-semibold text-[var(--accent)] mb-4">
          {category}
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[var(--foreground)] mb-6">
          {post.title}
        </h1>
        <p className="text-lg text-[var(--muted)] leading-relaxed">
          {post.excerpt}
        </p>
      </header>

      {/* Hero Image */}
      <div className="relative aspect-[21/9] w-full mb-8 rounded-xl overflow-hidden shadow-lg border border-[var(--border)]">
        <Image
          src={post.imageUrl}
          alt={post.title}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 768px) 100vw, 1024px"
        />
      </div>

      {/* Author and Share Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between py-6 border-b border-[var(--border)] mb-12 gap-6">
        <div className="flex flex-col">
          <span className="font-semibold text-[var(--foreground)]">{post.author}</span>
          <span className="text-sm text-[var(--muted)]">
            {new Date(post.date).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })} • {readTime} min read
          </span>
        </div>

        <div className="flex items-center gap-3">
          <CopyLinkButton />
          <button className="p-2 text-[var(--muted)] border border-[var(--border)] rounded-md hover:bg-[var(--border)] hover:text-[#1DA1F2] transition-colors" aria-label="Share on Twitter">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
          </button>
          <button className="p-2 text-[var(--muted)] border border-[var(--border)] rounded-md hover:bg-[var(--border)] hover:text-[#4267B2] transition-colors" aria-label="Share on Facebook">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
          </button>
          <button className="p-2 text-[var(--muted)] border border-[var(--border)] rounded-md hover:bg-[var(--border)] hover:text-[#0077B5] transition-colors" aria-label="Share on LinkedIn">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
          </button>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
        
        {/* Left Sidebar */}
        <aside className="w-full lg:w-72 flex-shrink-0 flex flex-col gap-10">
          
          {/* Search */}
          <div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-[var(--muted)]" />
              </div>
              <input
                type="text"
                placeholder="Search"
                className="w-full pl-10 pr-4 py-2.5 bg-[var(--background)] border border-[var(--border)] text-[var(--foreground)] placeholder-[var(--muted)] focus:outline-none focus:border-[var(--accent)] transition-colors rounded-md text-sm"
              />
            </div>
          </div>

          {/* Contents */}
          <div>
            <h3 className="font-semibold text-sm text-[var(--foreground)] mb-4 uppercase tracking-wider">Contents</h3>
            <nav className="flex flex-col gap-3 text-sm">
              <a href="#" className="text-[var(--foreground)] font-medium">Introduction</a>
              <a href="#" className="text-[var(--muted)] hover:text-[var(--accent)] transition-colors">What employers want to know</a>
              <a href="#" className="text-[var(--muted)] hover:text-[var(--accent)] transition-colors">Tips and tricks</a>
              <a href="#" className="text-[var(--muted)] hover:text-[var(--accent)] transition-colors">How to get it right</a>
              <a href="#" className="text-[var(--muted)] hover:text-[var(--accent)] transition-colors">Follow up questions</a>
              <a href="#" className="text-[var(--muted)] hover:text-[var(--accent)] transition-colors">Conclusion</a>
            </nav>
          </div>

          {/* Newsletter */}
          <div className="bg-[var(--background)] pt-4">
            <h3 className="font-semibold text-sm text-[var(--foreground)] mb-2 uppercase tracking-wider">Sign up to our newsletter</h3>
            <p className="text-sm text-[var(--muted)] mb-4">Stay updated with our latest insights.</p>
            <NewsletterForm />
          </div>
        </aside>

        {/* Right Main Content */}
        <main className="flex-1 min-w-0">
          <div className="prose dark:prose-invert prose-lg max-w-none 
            prose-headings:font-bold prose-headings:text-[var(--foreground)] 
            prose-p:text-[var(--foreground)] prose-p:leading-loose 
            prose-a:text-[var(--accent)] hover:prose-a:text-[var(--accent-hover)]
            prose-blockquote:border-l-4 prose-blockquote:border-[var(--accent)] prose-blockquote:bg-[var(--accent)]/10 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-lg prose-blockquote:not-italic prose-blockquote:font-medium
            prose-img:rounded-xl">
            
            <p className="lead text-lg font-medium text-[var(--muted)] mb-8">
              {post.excerpt}
            </p>
            
            <div className="whitespace-pre-wrap">
              {post.content}
            </div>

            {/* Example Blockquote to match the UI style */}
            <blockquote className="my-8">
              "The best way to answer behavioral interview questions is to focus on your past successes and how they relate to what the company and job asks for."
            </blockquote>

            <p>
              As we look towards the future, the integration of intelligent agents
              and automated workflows will seamlessly blend with the UI, creating
              experiences that are not only beautiful but also highly functional.
              This is just the beginning of what is possible with modern architecture.
            </p>
          </div>
        </main>

      </div>
    </article>
  );
}
