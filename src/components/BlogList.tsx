"use client";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { BlogPost } from "../app/api/posts/data";
import BlogCard from "./BlogCard";
import { Search } from "lucide-react";

async function fetchPosts(search: string, topic: string): Promise<BlogPost[]> {
  const params = new URLSearchParams();
  if (search) params.append('search', search);
  if (topic && topic !== 'All') params.append('topic', topic);
  const url = `/api/posts?${params.toString()}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch posts");
  return res.json();
}

export default function BlogList({ initialPosts, searchTopic }: { initialPosts: BlogPost[], searchTopic?: string }) {
  const [searchQuery, setSearchQuery] = useState("");
  const activeTopic = searchTopic || "All";

  const { data: posts, isLoading } = useQuery({
    queryKey: ["posts", searchQuery, activeTopic],
    queryFn: () => fetchPosts(searchQuery, activeTopic),
    initialData: searchQuery === "" ? initialPosts : undefined,
  });

  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col gap-8 items-center max-w-2xl mx-auto w-full">
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-[var(--muted)]" />
          </div>
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full pl-11 pr-4 py-3 bg-[var(--card-bg)] border border-[var(--border)] text-[var(--foreground)] placeholder-[var(--muted)] focus:outline-none focus:border-[var(--accent)] transition-all text-sm rounded-none"
          />
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--accent)]"></div>
        </div>
      ) : posts && posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-16">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-[var(--muted)]">
          <p className="text-lg font-serif">No posts found matching "{searchQuery}"</p>
          <p className="text-xs uppercase tracking-widest mt-4">Try adjusting your search terms.</p>
        </div>
      )}
    </div>
  );
}
