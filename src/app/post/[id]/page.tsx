import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, User } from "lucide-react";
import { BlogPost } from "../../api/posts/data";
import BlogCard from "@/components/BlogCard";

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
    title: `${post.title} | Beyond Blog`,
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
  
  const relatedPostsRaw = await prisma.post.findMany({
    where: {
      id: { not: id },
      OR: tagsArray.map(tag => ({ tags: { contains: tag } }))
    },
    take: 3,
    orderBy: { date: 'desc' },
  });
  
  const relatedPosts = relatedPostsRaw.map(rp => ({
    ...rp,
    tags: rp.tags.split(',').map(tag => tag.trim()).filter(Boolean),
    date: rp.date.toISOString(),
    createdAt: rp.createdAt.toISOString(),
    updatedAt: rp.updatedAt.toISOString(),
  }));

  return (
    <article className="max-w-3xl mx-auto w-full pb-20">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-white transition-colors mb-10"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to articles
      </Link>

      <div className="space-y-6 mb-10">
        <div className="flex flex-wrap gap-2">
          {post.tags.split(',').map(tag => tag.trim()).filter(Boolean).map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide bg-purple-500/10 text-purple-400 border border-purple-500/20"
            >
              {tag}
            </span>
          ))}
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight tracking-tight">
          {post.title}
        </h1>
        <p className="text-xl text-slate-300 leading-relaxed max-w-2xl">
          {post.excerpt}
        </p>

        <div className="flex items-center gap-6 text-sm text-slate-400 pt-6 border-t border-white/10 mt-6">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-slate-500" />
            <span className="font-medium text-slate-300">{post.author}</span>
          </div>
          <div className="flex items-center gap-2">
            <CalendarDays className="w-5 h-5 text-slate-500" />
            <time dateTime={post.date.toISOString()}>
              {new Date(post.date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </time>
          </div>
        </div>
      </div>

      <div className="relative aspect-video w-full rounded-2xl overflow-hidden mb-12 shadow-2xl shadow-purple-500/5">
        <Image
          src={post.imageUrl}
          alt={post.title}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 768px) 100vw, 800px"
        />
      </div>

      <div className="prose prose-invert prose-lg max-w-none prose-p:text-slate-300 prose-p:leading-relaxed prose-headings:text-white prose-a:text-purple-400 hover:prose-a:text-purple-300 transition-colors">
        <p>{post.content}</p>
        <p>
          As we look towards the future, the integration of intelligent agents
          and automated workflows will seamlessly blend with the UI, creating
          experiences that are not only beautiful but also highly functional.
          This is just the beginning of what is possible with modern Next.js
          and Tailwind CSS.
        </p>
      </div>

      {relatedPosts.length > 0 && (
        <div className="mt-20 border-t border-white/10 pt-10">
          <h2 className="text-2xl font-bold text-white mb-6">Related Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map(rp => (
              <BlogCard key={rp.id} post={rp as BlogPost} />
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
