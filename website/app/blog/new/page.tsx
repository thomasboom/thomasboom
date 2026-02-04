'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function NewBlogPost() {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [content, setContent] = useState('');
  const [copied, setCopied] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const autosaveKey = 'blog-new-post-autosave';

  useEffect(() => {
    const saved = localStorage.getItem(autosaveKey);
    if (!saved) return;
    try {
      const data = JSON.parse(saved) as { title?: string; date?: string; content?: string };
      setTitle(data.title ?? '');
      setDate(data.date ?? '');
      setContent(data.content ?? '');
    } catch {
      localStorage.removeItem(autosaveKey);
    }
  }, []);

  useEffect(() => {
    const payload = JSON.stringify({ title, date, content });
    localStorage.setItem(autosaveKey, payload);
  }, [title, date, content]);

  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const generateCode = () => {
    return `  {
    slug: '${slug}',
    title: '${title}',
    date: '${date}',
    content: \`${content}\`
  },`;
  };

  const code = generateCode();
  return (
    <div className="blog-editor">
      <div className="editor-header">
        <h1 className="name">
          <span>New</span>
          <span className="accent">Post</span>
        </h1>
        <p className="meta">
          Blog Editor
          <span>Create and manage your blog posts</span>
        </p>
      </div>

      <div className="editor-container">
        <div className="editor-form">
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="My New Post"
            />
            <span className="help-text">Slug: {slug || '(auto-generated from title)'}</span>
          </div>

          <div className="form-group">
            <label>Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="content-label">
              Content
              <span className="markdown-help" aria-label="Markdown help">
                ?
                <span className="markdown-tooltip">
                  <strong>Markdown Cheatsheet</strong>
                  <span># Heading 1</span>
                  <span>## Heading 2</span>
                  <span>**Bold** / *Italic*</span>
                  <span>- Bulleted list</span>
                  <span>1. Numbered list</span>
                  <span>[Text](url)</span>
                  <span>`inline code`</span>
                  <span>```code block```</span>
                  <span>&gt; Quote</span>
                </span>
              </span>
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your blog post here... Use ## for headings, - for lists, [text](url) for links, and regular text for paragraphs."
              rows={20}
            />
          </div>

          <button
            type="button"
            className="generate-button"
            onClick={() => setIsModalOpen(true)}
          >
            Generate Post Snippet
          </button>
        </div>

      </div>

      {isModalOpen && (
        <div className="modal-overlay" role="dialog" aria-modal="true">
          <div className="modal">
            <div className="modal-header">
              <h3>Post Snippet</h3>
              <button
                className="modal-close"
                onClick={() => setIsModalOpen(false)}
                aria-label="Close"
              >
                ✕
              </button>
            </div>
            <p className="modal-subtitle">1. Add to app/blog/posts.ts posts array:</p>
            <div className="modal-code">
              <pre><code>{code}</code></pre>
            </div>
            <div className="modal-actions">
              <button onClick={copyToClipboard} className="copy-button">
                {copied ? 'Copied!' : 'Copy'}
              </button>
              <button
                className="secondary-button"
                onClick={() => {
                  localStorage.removeItem(autosaveKey);
                  setIsModalOpen(false);
                }}
              >
                Done
              </button>
            </div>
            <div className="instructions">
              <h3>Instructions:</h3>
              <ol>
                <li>Fill out the form on the left</li>
                <li>Copy the code snippet above</li>
                <li>Open app/blog/posts.ts</li>
                <li>Paste the code into the posts array</li>
                <li>Save the file and your post will be live!</li>
              </ol>
            </div>
          </div>
        </div>
      )}

      <Link href="/blog" className="back-link">← Back to blog</Link>
    </div>
  );
}
