"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";

interface CommentsProps {
  postSlug: string;
}

export function Comments({ postSlug }: CommentsProps) {
  const comments = useQuery(api.comments.getCommentsByPost, { postSlug });
  const addComment = useMutation(api.comments.addComment);
  const [name, setName] = useState("");
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !newComment.trim()) return;

    setIsSubmitting(true);
    try {
      await addComment({
        postSlug,
        name: name.trim(),
        content: newComment.trim(),
      });
      setName("");
      setNewComment("");
    } catch (error) {
      console.error("Failed to add comment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="comments-section">
      <h2 className="comments-title">Comments</h2>

      <form onSubmit={handleSubmit} className="comment-form">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name (fake is fine)..."
          className="comment-name-input"
          maxLength={50}
          disabled={isSubmitting}
          required
        />
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Share your thoughts, just keep it respectful..."
          className="comment-input"
          rows={3}
          maxLength={1000}
          disabled={isSubmitting}
          required
        />
        <div className="comment-form-footer">
          <span className="character-count">
            {newComment.length}/1000
          </span>
          <button
            type="submit"
            className="comment-submit"
            disabled={isSubmitting || !name.trim() || !newComment.trim()}
          >
            {isSubmitting ? "Posting..." : "Post Comment"}
          </button>
        </div>
      </form>

      <div className="comments-list">
        {comments === undefined ? (
          <p className="comments-loading">Loading comments...</p>
        ) : comments.length === 0 ? (
          <p className="comments-empty">
            No comments yet. Be the first to share your thoughts!
          </p>
        ) : (
          comments.map((comment) => (
            <div key={comment._id} className="comment">
              <div className="comment-header">
                <span className="comment-author">{comment.name}</span>
                <span className="comment-date">
                  {formatDate(comment.createdAt)}
                </span>
              </div>
              <p className="comment-content">{comment.content}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
