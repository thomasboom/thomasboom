'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const getToday = () => {
  const now = new Date();
  const tzOffsetMs = now.getTimezoneOffset() * 60_000;
  return new Date(now.getTime() - tzOffsetMs).toISOString().slice(0, 10);
};

export default function NewBlogPost() {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(getToday());
  const [isCustomDate, setIsCustomDate] = useState(false);
  const [content, setContent] = useState('');
  const [copied, setCopied] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDiffOpen, setIsDiffOpen] = useState(false);
  const [isAiWorking, setIsAiWorking] = useState(false);
  const [aiError, setAiError] = useState('');
  const [aiDraft, setAiDraft] = useState<{ title: string; content: string } | null>(null);
  const autosaveKey = 'blog-new-post-autosave';

  useEffect(() => {
    const saved = localStorage.getItem(autosaveKey);
    if (!saved) {
      setDate(getToday());
      return;
    }
    try {
      const data = JSON.parse(saved) as {
        title?: string;
        date?: string;
        content?: string;
        isCustomDate?: boolean;
      };
      setTitle(data.title ?? '');
      setContent(data.content ?? '');
      const today = getToday();
      const shouldUseSavedDate = Boolean(data.isCustomDate && data.date);
      setDate(shouldUseSavedDate ? (data.date as string) : today);
      setIsCustomDate(Boolean(data.isCustomDate && data.date !== today));
    } catch {
      localStorage.removeItem(autosaveKey);
      setDate(getToday());
    }
  }, []);

  useEffect(() => {
    const payload = JSON.stringify({ title, date, content, isCustomDate });
    localStorage.setItem(autosaveKey, payload);
  }, [title, date, content, isCustomDate]);

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

  const tokenize = (text: string) => text.split(/(\s+)/).filter(Boolean);

  const buildWordDiff = (before: string, after: string) => {
    const beforeTokens = tokenize(before);
    const afterTokens = tokenize(after);
    const totalCells = beforeTokens.length * afterTokens.length;

    if (totalCells > 4_000_000) {
      return {
        left: before ? [{ text: before, type: 'remove' as const }] : [],
        right: after ? [{ text: after, type: 'add' as const }] : [],
      };
    }

    const columns = afterTokens.length + 1;
    const directions = new Uint8Array((beforeTokens.length + 1) * columns);
    let previous = new Uint32Array(columns);
    let current = new Uint32Array(columns);

    for (let i = 1; i <= beforeTokens.length; i += 1) {
      current[0] = 0;
      for (let j = 1; j <= afterTokens.length; j += 1) {
        const beforeToken = beforeTokens[i - 1];
        const afterToken = afterTokens[j - 1];
        const index = i * columns + j;

        if (beforeToken === afterToken) {
          current[j] = previous[j - 1] + 1;
          directions[index] = 1;
        } else if (previous[j] >= current[j - 1]) {
          current[j] = previous[j];
          directions[index] = 2;
        } else {
          current[j] = current[j - 1];
          directions[index] = 3;
        }
      }
      const swap = previous;
      previous = current;
      current = swap;
    }

    const left: Array<{ text: string; type: 'same' | 'remove' }> = [];
    const right: Array<{ text: string; type: 'same' | 'add' }> = [];
    let i = beforeTokens.length;
    let j = afterTokens.length;

    while (i > 0 || j > 0) {
      const index = i * columns + j;
      if (i > 0 && j > 0 && directions[index] === 1) {
        left.push({ text: beforeTokens[i - 1], type: 'same' });
        right.push({ text: afterTokens[j - 1], type: 'same' });
        i -= 1;
        j -= 1;
      } else if (i > 0 && (j === 0 || directions[index] === 2)) {
        left.push({ text: beforeTokens[i - 1], type: 'remove' });
        i -= 1;
      } else {
        right.push({ text: afterTokens[j - 1], type: 'add' });
        j -= 1;
      }
    }

    left.reverse();
    right.reverse();

    return { left, right };
  };

  const applyAiDraft = () => {
    if (!aiDraft) return;
    setTitle(aiDraft.title);
    setContent(aiDraft.content);
    setAiDraft(null);
    setIsDiffOpen(false);
    setAiError('');
  };

  const runAiCorrect = async () => {
    if (!title && !content) {
      setAiError('Add a title or content before using AI correct.');
      return;
    }

    setAiError('');
    setIsAiWorking(true);

    try {
      const response = await fetch('/api/ai-correct', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content }),
      });

      const data = (await response.json()) as { title?: string; content?: string; error?: string };

      if (!response.ok) {
        throw new Error(data.error ?? 'AI correction failed.');
      }

      const nextTitle = typeof data.title === 'string' ? data.title : title;
      const nextContent = typeof data.content === 'string' ? data.content : content;

      if (nextTitle === title && nextContent === content) {
        setAiError('AI suggested no changes.');
        return;
      }

      setAiDraft({ title: nextTitle, content: nextContent });
      setIsDiffOpen(true);
    } catch (error) {
      setAiError(error instanceof Error ? error.message : 'AI correction failed.');
    } finally {
      setIsAiWorking(false);
    }
  };

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
              onChange={(e) => {
                const nextDate = e.target.value;
                setDate(nextDate);
                setIsCustomDate(nextDate !== getToday());
              }}
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

          <div className="editor-actions">
            <button
              type="button"
              className="generate-button"
              onClick={() => setIsModalOpen(true)}
            >
              Generate Post Snippet
            </button>
            <button
              type="button"
              className="ai-button"
              onClick={runAiCorrect}
              disabled={isAiWorking}
            >
              {isAiWorking ? 'AI Working…' : 'AI Correct'}
            </button>
          </div>
          <div className={`ai-status${aiError ? ' error' : ''}`}>
            {aiError || 'Light grammar touch-up via OpenRouter.'}
          </div>
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
              <button
                className="secondary-button"
                onClick={async () => {
                  await copyToClipboard();
                  localStorage.removeItem(autosaveKey);
                  setIsModalOpen(false);
                }}
              >
                Done
              </button>
              <button onClick={copyToClipboard} className="copy-button">
                {copied ? 'Copied!' : 'Copy'}
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

      {isDiffOpen && aiDraft && (
        <div className="modal-overlay" role="dialog" aria-modal="true">
          <div className="modal diff-modal">
            <div className="modal-header">
              <h3>AI Suggested Changes</h3>
              <button
                className="modal-close"
                onClick={() => {
                  setIsDiffOpen(false);
                  setAiDraft(null);
                }}
                aria-label="Close"
              >
                ✕
              </button>
            </div>
            <p className="modal-subtitle">Review the diff before applying.</p>

            <div className="diff-section">
              <div className="diff-title">Title</div>
              <div className="diff-grid">
                {(() => {
                  const diff = buildWordDiff(title, aiDraft.title);
                  return (
                    <>
                      <div className="diff-column">
                        <div className="diff-column-label">Original</div>
                        <div className="diff-block">
                          {diff.left.map((token, index) => (
                            <span key={`title-left-${index}`} className={`diff-token ${token.type}`}>
                              {token.text}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="diff-column">
                        <div className="diff-column-label">AI Version</div>
                        <div className="diff-block">
                          {diff.right.map((token, index) => (
                            <span key={`title-right-${index}`} className={`diff-token ${token.type}`}>
                              {token.text}
                            </span>
                          ))}
                        </div>
                      </div>
                    </>
                  );
                })()}
              </div>
            </div>

            <div className="diff-section">
              <div className="diff-title">Content</div>
              <div className="diff-grid">
                {(() => {
                  const diff = buildWordDiff(content, aiDraft.content);
                  return (
                    <>
                      <div className="diff-column">
                        <div className="diff-column-label">Original</div>
                        <div className="diff-block">
                          {diff.left.map((token, index) => (
                            <span key={`content-left-${index}`} className={`diff-token ${token.type}`}>
                              {token.text}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="diff-column">
                        <div className="diff-column-label">AI Version</div>
                        <div className="diff-block">
                          {diff.right.map((token, index) => (
                            <span key={`content-right-${index}`} className={`diff-token ${token.type}`}>
                              {token.text}
                            </span>
                          ))}
                        </div>
                      </div>
                    </>
                  );
                })()}
              </div>
            </div>

            <div className="modal-actions">
              <button className="copy-button" onClick={applyAiDraft}>
                Apply Changes
              </button>
              <button
                className="secondary-button"
                onClick={() => {
                  setIsDiffOpen(false);
                  setAiDraft(null);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <Link href="/blog" className="back-link">← Back to blog</Link>
    </div>
  );
}
