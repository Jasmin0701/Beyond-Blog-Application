"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreatePostPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const title = formData.get("title") as string;
    const excerpt = formData.get("excerpt") as string;
    const content = formData.get("content") as string;
    const author = formData.get("author") as string;
    const tagsInput = formData.get("tags") as string;
    const imageUrl = formData.get("imageUrl") as string;

    const tags = tagsInput ? tagsInput.split(',').map(t => t.trim()).filter(Boolean) : ['Space', 'New'];

    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          excerpt,
          content,
          author: author || undefined,
          imageUrl: imageUrl || undefined,
          tags,
        }),
      });

      if (!response.ok) throw new Error('Failed to create post');
      
      setSuccess(true);
      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (error) {
      console.error(error);
      alert('Failed to publish post');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="max-w-2xl mx-auto w-full py-20 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 text-green-600 mb-6">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-[var(--foreground)] mb-4">Post Published!</h2>
        <p className="text-[var(--muted)]">Your article has been successfully added to Astrobyte. Redirecting to home...</p>
      </div>
    );
  }

  return (
    <article className="max-w-3xl mx-auto w-full py-8">
      <h1 className="text-4xl font-bold text-[var(--accent)] mb-2 tracking-tight">
        Write an Article
      </h1>
      <p className="text-[var(--muted)] mb-10 text-sm">Share your knowledge with the Astrobyte community.</p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-xs font-bold uppercase tracking-widest text-[var(--muted)] mb-2">Post Title</label>
          <input
            type="text"
            id="title"
            name="title"
            required
            className="w-full px-4 py-3 bg-transparent border border-[var(--border)] text-[var(--foreground)] placeholder-[var(--muted)] focus:outline-none focus:border-[var(--accent)] transition-all rounded-md"
            placeholder="E.g., The Future of React"
          />
        </div>

        <div>
          <label htmlFor="excerpt" className="block text-xs font-bold uppercase tracking-widest text-[var(--muted)] mb-2">Short Excerpt</label>
          <input
            type="text"
            id="excerpt"
            name="excerpt"
            required
            className="w-full px-4 py-3 bg-transparent border border-[var(--border)] text-[var(--foreground)] placeholder-[var(--muted)] focus:outline-none focus:border-[var(--accent)] transition-all rounded-md"
            placeholder="A brief summary of your article..."
          />
        </div>

        <div>
          <label htmlFor="content" className="block text-xs font-bold uppercase tracking-widest text-[var(--muted)] mb-2">Full Content</label>
          <textarea
            id="content"
            name="content"
            required
            rows={10}
            className="w-full px-4 py-3 bg-transparent border border-[var(--border)] text-[var(--foreground)] placeholder-[var(--muted)] focus:outline-none focus:border-[var(--accent)] resize-y transition-all font-mono text-sm rounded-md"
            placeholder="Write your markdown content here..."
          ></textarea>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="author" className="block text-xs font-bold uppercase tracking-widest text-[var(--muted)] mb-2">Author Name</label>
            <input
              type="text"
              id="author"
              name="author"
              className="w-full px-4 py-3 bg-transparent border border-[var(--border)] text-[var(--foreground)] placeholder-[var(--muted)] focus:outline-none focus:border-[var(--accent)] transition-all rounded-md"
              placeholder="Your Name (Optional)"
            />
          </div>
          <div>
            <label htmlFor="tags" className="block text-xs font-bold uppercase tracking-widest text-[var(--muted)] mb-2">Tags</label>
            <input
              type="text"
              id="tags"
              name="tags"
              className="w-full px-4 py-3 bg-transparent border border-[var(--border)] text-[var(--foreground)] placeholder-[var(--muted)] focus:outline-none focus:border-[var(--accent)] transition-all rounded-md"
              placeholder="Space, Mars, Science (comma separated)"
            />
          </div>
        </div>

        <div>
          <label htmlFor="imageUrl" className="block text-xs font-bold uppercase tracking-widest text-[var(--muted)] mb-2">Cover Image URL</label>
          <input
            type="url"
            id="imageUrl"
            name="imageUrl"
            className="w-full px-4 py-3 bg-transparent border border-[var(--border)] text-[var(--foreground)] placeholder-[var(--muted)] focus:outline-none focus:border-[var(--accent)] transition-all rounded-md"
            placeholder="https://example.com/image.jpg (Optional)"
          />
        </div>

        <div className="flex justify-end pt-4 border-t border-[var(--border)]">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-8 py-3 bg-[var(--accent)] hover:bg-[var(--accent-hover)] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-md transition-all duration-200"
          >
            {isSubmitting ? "Publishing..." : "Publish Post"}
          </button>
        </div>
      </form>
    </article>
  );
}
