'use client';

import { useState, useEffect } from 'react';
import { useMutation, useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { Id } from '../../convex/_generated/dataModel';

interface Comment {
  _id: Id<"comments">;
  name: string;
  content: string;
  parentId?: Id<"comments">;
  createdAt: number;
  _creationTime: number;
}

interface CommentWithReplies extends Comment {
  replies: CommentWithReplies[];
}

function buildCommentTree(comments: Comment[]): CommentWithReplies[] {
  const map = new Map<string, CommentWithReplies>();
  const roots: CommentWithReplies[] = [];

  comments.forEach(comment => {
    map.set(comment._id as string, { ...comment, replies: [] });
  });

  comments.forEach(comment => {
    const node = map.get(comment._id as string)!;
    if (comment.parentId) {
      const parent = map.get(comment.parentId as string);
      if (parent) {
        parent.replies.push(node);
      } else {
        roots.push(node);
      }
    } else {
      roots.push(node);
    }
  });

  return roots.sort((a, b) => b.createdAt - a.createdAt);
}

function CommentItem({ comment, postSlug, onReply }: { comment: CommentWithReplies; postSlug: string; onReply: (id: Id<"comments">) => void }) {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyContent, setReplyContent] = useState('');
  const [replyName, setReplyName] = useState('');
  const addComment = useMutation(api.comments.addComment);

  const handleSubmitReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyName.trim() || !replyContent.trim()) return;

    await addComment({
      postSlug,
      name: replyName,
      content: replyContent,
      parentId: comment._id,
    });

    setReplyName('');
    setReplyContent('');
    setShowReplyForm(false);
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="comment">
      <div className="comment-header">
        <span className="comment-author">{comment.name}</span>
        <span className="comment-date">{formatDate(comment.createdAt)}</span>
      </div>
      <div className="comment-content">{comment.content}</div>
      <div className="comment-actions">
        <button className="comment-reply-button" onClick={() => onReply(comment._id)}>
          Reply
        </button>
      </div>

      {showReplyForm && (
        <form className="reply-form" onSubmit={handleSubmitReply}>
          <input
            type="text"
            className="comment-name-input"
            placeholder="Your name"
            value={replyName}
            onChange={(e) => setReplyName(e.target.value)}
            maxLength={50}
            required
          />
          <textarea
            className="comment-input"
            placeholder="Write a reply..."
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            maxLength={1000}
            required
          />
          <div className="reply-actions">
            <button type="submit" className="comment-submit">Reply</button>
            <button type="button" className="secondary-button" onClick={() => setShowReplyForm(false)}>
              Cancel
            </button>
          </div>
        </form>
      )}

      {comment.replies.length > 0 && (
        <div className="comment-children">
          {comment.replies.map(reply => (
            <CommentItem key={reply._id} comment={reply} postSlug={postSlug} onReply={onReply} />
          ))}
        </div>
      )}
    </div>
  );
}

export function Comments({ postSlug }: { postSlug: string }) {
  const comments = useQuery(api.comments.getCommentsByPost, { postSlug });
  const addComment = useMutation(api.comments.addComment);
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [replyTo, setReplyTo] = useState<Id<"comments"> | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !content.trim()) return;

    await addComment({
      postSlug,
      name,
      content,
      parentId: replyTo || undefined,
    });

    setName('');
    setContent('');
    setReplyTo(null);
  };

  const handleReply = (id: Id<"comments">) => {
    setReplyTo(id);
    document.getElementById('comment-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  if (!comments) {
    return <div className="comments-loading">Loading comments...</div>;
  }

  const commentTree = buildCommentTree(comments);

  return (
    <div className="comments-section">
      <h2 className="comments-title">Comments</h2>

      <form className="comment-form" id="comment-form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="comment-name-input"
          placeholder="Your name"
          value={replyTo ? '' : name}
          onChange={(e) => !replyTo && setName(e.target.value)}
          maxLength={50}
          required
        />
        <textarea
          className="comment-input"
          placeholder={replyTo ? "Write a reply..." : "Write a comment..."}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          maxLength={1000}
          required
        />
        <div className="comment-form-footer">
          <span className="character-count">{content.length}/1000</span>
          <div>
            {replyTo && (
              <button type="button" className="secondary-button" onClick={() => setReplyTo(null)} style={{ marginRight: '12px' }}>
                Cancel reply
              </button>
            )}
            <button type="submit" className="comment-submit" disabled={!name.trim() || !content.trim()}>
              Submit
            </button>
          </div>
        </div>
      </form>

      {commentTree.length === 0 ? (
        <div className="comments-empty">No comments yet. Be the first to comment!</div>
      ) : (
        <div className="comments-list">
          {commentTree.map(comment => (
            <CommentItem key={comment._id} comment={comment} postSlug={postSlug} onReply={handleReply} />
          ))}
        </div>
      )}
    </div>
  );
}