"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";

export default function EditPostPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const [postData, setPostData] = useState({
    title: "",
    excerpt: "",
    content: "",
    author: "",
    tags: "",
    imageUrl: ""
  });

  useEffect(() => {
    async function fetchPost() {
      try {
        const res = await fetch(`/api/posts/${params.id}`);
        if (!res.ok) throw new Error("Failed to fetch post");
        const data = await res.json();
        setPostData({
          title: data.title,
          excerpt: data.excerpt,
          content: data.content,
          author: data.author,
          tags: data.tags ? data.tags.join(", ") : "",
          imageUrl: data.imageUrl,
        });
      } catch (error) {
        console.error(error);
        alert("Failed to load post data");
      } finally {
        setIsLoading(false);
      }
    }
    
    if (params.id) {
      fetchPost();
    }
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const tags = postData.tags ? postData.tags.split(',').map(t => t.trim()).filter(Boolean) : ['Community', 'New'];

    try {
      const response = await fetch(`/api/posts/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: postData.title,
          excerpt: postData.excerpt,
          content: postData.content,
          author: postData.author || undefined,
          imageUrl: postData.imageUrl || undefined,
          tags,
        }),
      });

      if (!response.ok) throw new Error('Failed to update post');
      
      setSuccess(true);
      setTimeout(() => {
        router.push(`/post/${params.id}`);
        router.refresh();
      }, 2000);
    } catch (error) {
      console.error(error);
      alert('Failed to update post');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="max-w-2xl mx-auto w-full py-20 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-500/20 text-blue-400 mb-6">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-white mb-4">Post Updated!</h2>
        <p className="text-slate-400">Your article has been successfully saved. Redirecting to post...</p>
      </div>
    );
  }

  return (
    <article className="max-w-3xl mx-auto w-full py-8">
      <h1 className="text-4xl font-extrabold text-white mb-2 tracking-tight">
        Edit Article
      </h1>
      <p className="text-slate-400 mb-10">Make changes to your existing blog post.</p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-slate-300 mb-2">Post Title</label>
          <input
            type="text"
            id="title"
            name="title"
            required
            value={postData.title}
            onChange={(e) => setPostData({...postData, title: e.target.value})}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
          />
        </div>

        <div>
          <label htmlFor="excerpt" className="block text-sm font-medium text-slate-300 mb-2">Short Excerpt</label>
          <input
            type="text"
            id="excerpt"
            name="excerpt"
            required
            value={postData.excerpt}
            onChange={(e) => setPostData({...postData, excerpt: e.target.value})}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
          />
        </div>

        <div>
          <label htmlFor="content" className="block text-sm font-medium text-slate-300 mb-2">Full Content</label>
          <textarea
            id="content"
            name="content"
            required
            rows={10}
            value={postData.content}
            onChange={(e) => setPostData({...postData, content: e.target.value})}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-y transition-all font-mono text-sm"
          ></textarea>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="author" className="block text-sm font-medium text-slate-300 mb-2">Author Name</label>
            <input
              type="text"
              id="author"
              name="author"
              value={postData.author}
              onChange={(e) => setPostData({...postData, author: e.target.value})}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
            />
          </div>
          <div>
            <label htmlFor="tags" className="block text-sm font-medium text-slate-300 mb-2">Tags</label>
            <input
              type="text"
              id="tags"
              name="tags"
              value={postData.tags}
              onChange={(e) => setPostData({...postData, tags: e.target.value})}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              placeholder="React, Next.js, Tutorial (comma separated)"
            />
          </div>
        </div>

        <div>
          <label htmlFor="imageUrl" className="block text-sm font-medium text-slate-300 mb-2">Cover Image URL</label>
          <input
            type="url"
            id="imageUrl"
            name="imageUrl"
            value={postData.imageUrl}
            onChange={(e) => setPostData({...postData, imageUrl: e.target.value})}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
          />
        </div>

        <div className="flex justify-end pt-4 border-t border-white/10 gap-4">
          <button
            type="button"
            onClick={() => router.back()}
            disabled={isSubmitting}
            className="px-8 py-3 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-xl transition-all duration-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-blue-500/20"
          >
            {isSubmitting ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </article>
  );
}
