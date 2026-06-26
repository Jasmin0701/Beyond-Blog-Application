"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Edit, Trash2 } from "lucide-react";

export default function PostActions({ postId }: { postId: string }) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this post? This action cannot be undone.")) {
      setIsDeleting(true);
      try {
        const response = await fetch(`/api/posts/${postId}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error("Failed to delete post");
        }

        router.push("/");
        router.refresh();
      } catch (error) {
        console.error("Error deleting post:", error);
        alert("Failed to delete the post.");
        setIsDeleting(false);
      }
    }
  };

  return (
    <div className="flex items-center gap-3">
      <Link
        href={`/edit/${postId}`}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 hover:text-blue-300 transition-colors text-sm font-medium border border-blue-500/20"
      >
        <Edit className="w-4 h-4" />
        Edit
      </Link>
      <button
        onClick={handleDelete}
        disabled={isDeleting}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:text-red-300 transition-colors text-sm font-medium border border-red-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Trash2 className="w-4 h-4" />
        {isDeleting ? "Deleting..." : "Delete"}
      </button>
    </div>
  );
}
