'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function NewBlogPost() {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [content, setContent] = useState('');
  const [copied, setCopied] = useState(false);

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
            <label>Content</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your blog post here... Use ## for headings, - for lists, [text](url) for links, and regular text for paragraphs."
              rows={20}
            />
          </div>
        </div>

        <div className="code-output">
          <div className="code-header">
            <h3>1. Add to app/blog/posts.ts posts array:</h3>
            <button onClick={copyToClipboard} className="copy-button">
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <pre><code>{code}</code></pre>

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

      <Link href="/blog" className="back-link">← Back to blog</Link>
    </div>
  );
}
