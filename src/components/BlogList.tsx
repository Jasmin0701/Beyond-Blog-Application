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

export default function BlogList({ initialPosts, topics }: { initialPosts: BlogPost[], topics?: string[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTopic, setActiveTopic] = useState("All");

  const { data: posts, isLoading } = useQuery({
    queryKey: ["posts", searchQuery, activeTopic],
    queryFn: () => fetchPosts(searchQuery, activeTopic),
    initialData: searchQuery === "" && activeTopic === "All" ? initialPosts : undefined,
  });

  return (
    <div className="flex flex-col gap-10">
      {topics && topics.length > 0 && (
        <div className="flex flex-wrap gap-2 justify-center mb-2">
          {topics.map(topic => (
            <button
              key={topic}
              onClick={() => setActiveTopic(topic)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${activeTopic === topic ? 'bg-purple-600 text-white' : 'bg-white/5 text-slate-300 border border-white/10 hover:bg-white/10'}`}
            >
              {topic}
            </button>
          ))}
        </div>
      )}
      <div className="relative max-w-xl w-full mx-auto">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-slate-400" />
        </div>
        <input
          type="text"
          placeholder="Search articles..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="block w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
        />
      </div>

      {isLoading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-purple-500"></div>
        </div>
      ) : posts && posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-slate-400">
          <p className="text-lg">No posts found matching "{searchQuery}"</p>
          <p className="text-sm mt-2">Try adjusting your search terms.</p>
        </div>
      )}
    </div>
  );
}
