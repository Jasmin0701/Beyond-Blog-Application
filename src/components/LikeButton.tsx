"use client";

import { useState } from "react";
import { Heart } from "lucide-react";

interface LikeButtonProps {
  postId: string;
  initialLikes: number;
}

export default function LikeButton({ postId, initialLikes }: LikeButtonProps) {
  const [likes, setLikes] = useState(initialLikes || 0);
  const [hasLiked, setHasLiked] = useState(false);
  const [isLiking, setIsLiking] = useState(false);

  const handleLike = async (e: React.MouseEvent) => {
    // Prevent the click from bubbling up to the <Link> wrapping the BlogCard
    e.preventDefault();
    e.stopPropagation();

    if (isLiking) return;

    setIsLiking(true);
    const action = hasLiked ? "unlike" : "like";
    
    // Optimistic update
    setLikes((prev) => (action === "like" ? prev + 1 : prev - 1));
    setHasLiked(action === "like");

    try {
      await fetch(`/api/posts/${postId}/like`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ action }),
      });
    } catch (error) {
      console.error("Failed to update like status", error);
      // Revert optimistic update
      setLikes((prev) => (action === "like" ? prev - 1 : prev + 1));
      setHasLiked(action === "unlike");
    } finally {
      setIsLiking(false);
    }
  };

  return (
    <div 
      onClick={handleLike}
      className={`flex items-center gap-1.5 transition-colors cursor-pointer ${
        hasLiked 
          ? "text-red-500" 
          : "hover:text-red-400 text-red-500/80"
      }`}
    >
      <Heart className={`w-4 h-4 ${hasLiked ? "fill-red-500" : ""}`} />
      <span>{likes}</span>
    </div>
  );
}
