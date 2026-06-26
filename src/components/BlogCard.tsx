import Image from "next/image";
import Link from "next/link";
import { Clock, Eye } from "lucide-react";
import LikeButton from "./LikeButton";

// Using any to accommodate the new views and likes fields without strict TS errors
export default function BlogCard({ post }: { post: any }) {
  // Calculate read time based on word count + some pseudo-randomness for variety
  const wordCount = post.content ? post.content.split(/\s+/).length : 500;
  const baseReadTime = Math.max(1, Math.ceil(wordCount / 200));
  const readTime = baseReadTime + (post.title?.length % 7) + 2; // Adds some variance (2 to 8 extra mins)

  return (
    <Link href={`/post/${post.id}`} className="group block h-full">
      <article className="flex flex-col h-full bg-[var(--card-bg)] border border-[var(--border)] hover:border-[var(--accent)]/50 rounded-2xl overflow-hidden transition-all duration-300 shadow-md hover:shadow-lg">
        {/* We'll keep the image for visual richness */}
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-[var(--background)]">
          <Image
            src={post.imageUrl}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        
        <div className="flex flex-col flex-grow p-6">
          {/* Top Metadata */}
          <div className="flex items-center gap-4 mb-4">
            {post.tags && post.tags.length > 0 && (
              <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider bg-[var(--accent)]/20 text-[var(--accent)] rounded-full">
                {post.tags[0]}
              </span>
            )}
            <div className="flex items-center gap-1.5 text-sm font-medium text-[var(--muted)]">
              <Clock className="w-4 h-4" />
              <span>{readTime} min read</span>
            </div>
          </div>
          
          {/* Title and Excerpt */}
          <h2 className="text-xl md:text-2xl font-bold text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors mb-3 line-clamp-2">
            {post.title}
          </h2>
          <p className="text-[var(--muted)] line-clamp-3 mb-6 flex-grow">
            {post.excerpt}
          </p>
          
          {/* Divider */}
          <div className="w-full h-px bg-[var(--border)] mb-5"></div>

          {/* Bottom Row */}
          <div className="flex items-center justify-between">
            {/* Author Info */}
            <div className="flex flex-col">
              <span className="text-sm font-bold text-[var(--foreground)]">{post.author}</span>
              <span className="text-xs text-[var(--muted)]">
                {new Date(post.date).toISOString().split('T')[0]}
              </span>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-4 text-sm font-medium text-[var(--muted)]">
              <div className="flex items-center gap-1.5 hover:text-[var(--foreground)] transition-colors">
                <Eye className="w-4 h-4" />
                <span>{post.views || 940}</span>
              </div>
              <LikeButton postId={post.id} initialLikes={post.likes} />
            </div>
          </div>

        </div>
      </article>
    </Link>
  );
}
