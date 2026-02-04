"use client";

import { useEffect, useMemo, useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import type { Id, Doc } from "../../convex/_generated/dataModel";

interface CommentsProps {
  postSlug: string;
}

type CommentWithChildren = Doc<"comments"> & { children: CommentWithChildren[] };

export function Comments({ postSlug }: CommentsProps) {
  const comments = useQuery(api.comments.getCommentsByPost, { postSlug });
  const addComment = useMutation(api.comments.addComment);
  const [name, setName] = useState("");
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [replyingTo, setReplyingTo] = useState<Id<"comments"> | null>(null);
  const [replyName, setReplyName] = useState("");
  const [replyContent, setReplyContent] = useState("");
  const nameStorageKey = "blog-comment-name";

  useEffect(() => {
    const savedName = localStorage.getItem(nameStorageKey);
    if (savedName) {
      setName(savedName);
      setReplyName(savedName);
    }
  }, []);

  useEffect(() => {
    if (!name.trim()) return;
    localStorage.setItem(nameStorageKey, name.trim());
  }, [name]);

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

  const handleReplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyingTo || !replyName.trim() || !replyContent.trim()) return;

    setIsSubmitting(true);
    try {
      await addComment({
        postSlug,
        name: replyName.trim(),
        content: replyContent.trim(),
        parentId: replyingTo,
      });
      setReplyingTo(null);
      setReplyName("");
      setReplyContent("");
    } catch (error) {
      console.error("Failed to add reply:", error);
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

  const threadedComments = useMemo(() => {
    if (!comments) return [] as CommentWithChildren[];
    const sorted = [...comments].sort((a, b) => a.createdAt - b.createdAt);
    const map = new Map<Id<"comments">, CommentWithChildren>();
    const roots: CommentWithChildren[] = [];

    sorted.forEach((comment) => {
      map.set(comment._id, { ...comment, children: [] });
    });

    map.forEach((comment) => {
      const parentId = (comment as any).parentId as Id<"comments"> | undefined;
      if (parentId && map.has(parentId)) {
        map.get(parentId)!.children.push(comment);
      } else {
        roots.push(comment);
      }
    });

    return roots;
  }, [comments]);

  const renderComment = (comment: CommentWithChildren, depth = 0) => {
    const isReplying = replyingTo === comment._id;
    return (
      <div key={comment._id} className={`comment ${depth > 0 ? "comment-reply" : ""}`}>
        <div className="comment-header">
          <span className="comment-author">{comment.name}</span>
          <span className="comment-date">{formatDate(comment.createdAt)}</span>
        </div>
        <p className="comment-content">{comment.content}</p>
        <div className="comment-actions">
          <button
            className="comment-reply-button"
            type="button"
            onClick={() => {
              setReplyingTo(comment._id);
              setReplyName(name);
              setReplyContent("");
            }}
          >
            Reply
          </button>
        </div>

        {isReplying && (
          <form onSubmit={handleReplySubmit} className="reply-form">
            <input
              type="text"
              value={replyName}
              onChange={(e) => setReplyName(e.target.value)}
              placeholder="Your name"
              className="comment-name-input"
              maxLength={50}
              disabled={isSubmitting}
              required
            />
            <textarea
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              placeholder="Write a reply..."
              className="comment-input"
              rows={2}
              maxLength={1000}
              disabled={isSubmitting}
              required
            />
            <div className="reply-actions">
              <button
                type="submit"
                className="comment-submit"
                disabled={isSubmitting || !replyName.trim() || !replyContent.trim()}
              >
                {isSubmitting ? "Posting..." : "Post Reply"}
              </button>
              <button
                type="button"
                className="secondary-button"
                onClick={() => setReplyingTo(null)}
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {comment.children?.length > 0 && (
          <div className="comment-children">
            {comment.children.map((child) => renderComment(child, depth + 1))}
          </div>
        )}
      </div>
    );
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
          threadedComments.map((comment) => renderComment(comment))
        )}
      </div>
    </div>
  );
}
