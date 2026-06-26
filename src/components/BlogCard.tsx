import Image from "next/image";
import Link from "next/link";
import { BlogPost } from "../app/api/posts/data";
import { CalendarDays, User } from "lucide-react";

export default function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link href={`/post/${post.id}`} className="group flex flex-col overflow-hidden rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-purple-500/10">
      <div className="relative aspect-[16/9] w-full overflow-hidden">
        <Image
          src={post.imageUrl}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-80" />
      </div>
      <div className="flex flex-col flex-1 p-6 sm:p-8">
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide bg-purple-500/20 text-purple-300 border border-purple-500/30"
            >
              {tag}
            </span>
          ))}
        </div>
        <h2 className="text-xl sm:text-2xl font-bold leading-tight text-white mb-3 group-hover:text-purple-400 transition-colors">
          {post.title}
        </h2>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-6 line-clamp-3 flex-1">
          {post.excerpt}
        </p>
        <div className="flex items-center gap-4 text-xs text-slate-500 pt-4 border-t border-white/5">
          <div className="flex items-center gap-1.5">
            <User className="w-4 h-4" />
            <span>{post.author}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CalendarDays className="w-4 h-4" />
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </time>
          </div>
        </div>
      </div>
    </Link>
  );
}
