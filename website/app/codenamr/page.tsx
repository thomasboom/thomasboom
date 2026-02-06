'use client';

import { useState } from 'react';
import Link from 'next/link';

const commands = [
  {
    title: 'Install',
    description: 'Run this command in your terminal:',
    command: 'curl -fsSL https://codenamr.vercel.app/install.sh | bash',
  },
  {
    title: 'Update',
    description: 'To update to the latest version:',
    command: 'curl -fsSL https://codenamr.vercel.app/update.sh | bash',
  },
  {
    title: 'Uninstall',
    description: 'To uninstall:',
    command: 'curl -fsSL https://codenamr.vercel.app/uninstall.sh | bash',
  },
];

export default function Codenamr() {
  const [copied, setCopied] = useState<number | null>(null);

  const copyCommand = async (command: string, index: number) => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(index);
      setTimeout(() => setCopied(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="codenamr-container">
      <div className="codenamr-content">
        <div className="codenamr-header">
          <h1 className="codenamr-title">
            <span>Codenamr</span>
            <span className="accent">CLI</span>
          </h1>
          <p className="codenamr-desc">
            Generate memorable code names in various formats.
          </p>
          <Link href="/" className="back-link">
            ← Back to Portfolio
          </Link>
        </div>

        <div className="codenamr-commands">
          {commands.map((item, index) => (
            <div key={index} className="command-card">
              <h2 className="command-title">{item.title}</h2>
              <p className="command-desc">{item.description}</p>
              <div className="command-block">
                <code>{item.command}</code>
                <button
                  className={`copy-btn ${copied === index ? 'copied' : ''}`}
                  onClick={() => copyCommand(item.command, index)}
                >
                  {copied === index ? 'Copied!' : 'Copy'}
                </button>
              </div>
            </div>
          ))}
        </div>

        <footer className="footer">
          <span>© 2026</span>
          <span>The Netherlands</span>
        </footer>
      </div>

      <style jsx>{`
        .codenamr-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 48px;
        }

        .codenamr-content {
          width: 100%;
          max-width: 600px;
        }

        .codenamr-header {
          margin-bottom: 48px;
        }

        .codenamr-title {
          font-size: clamp(48px, 10vw, 96px);
          line-height: 0.85;
          letter-spacing: -0.04em;
          margin-bottom: 24px;
        }

        .codenamr-title span {
          display: block;
          opacity: 0;
          transform: translateY(20px);
          animation: fadeInUp 0.8s ease forwards;
        }

        .codenamr-title span:nth-child(1) {
          animation-delay: 0.2s;
        }

        .codenamr-title span:nth-child(2) {
          animation-delay: 0.4s;
        }

        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .codenamr-title .accent {
          color: var(--accent);
        }

        .codenamr-desc {
          font-size: 14px;
          color: #666;
          line-height: 1.8;
          opacity: 0;
          animation: fadeInUp 0.8s ease 0.6s forwards;
        }

        .back-link {
          display: inline-block;
          margin-top: 32px;
          font-size: 14px;
          color: #666;
          text-decoration: none;
          transition: color 0.3s ease;
          opacity: 0;
          animation: fadeInUp 0.8s ease 0.8s forwards;
        }

        .back-link:hover {
          color: var(--accent);
        }

        .codenamr-commands {
          display: flex;
          flex-direction: column;
          gap: 24px;
          opacity: 0;
          animation: fadeInUp 0.8s ease 1s forwards;
        }

        .command-card {
          padding: 24px;
          border: 1px solid var(--border);
          transition: all 0.3s ease;
        }

        .command-card:hover {
          border-color: var(--accent);
          background: var(--accent-dim);
        }

        .command-title {
          font-size: 14px;
          color: var(--accent);
          margin-bottom: 8px;
        }

        .command-desc {
          font-size: 14px;
          color: #666;
          margin-bottom: 16px;
        }

        .command-block {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          background: #1a1a1a;
          padding: 16px 20px;
          border-radius: 4px;
          overflow-x: auto;
        }

        .command-block code {
          font-family: 'Courier New', monospace;
          font-size: 13px;
          color: var(--text);
          white-space: nowrap;
        }

        .copy-btn {
          padding: 8px 16px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 12px;
          font-family: inherit;
          background: var(--text);
          color: var(--bg);
          transition: all 0.3s ease;
          flex-shrink: 0;
        }

        .copy-btn:hover {
          background: var(--accent);
        }

        .copy-btn.copied {
          background: #22c55e;
          color: white;
        }

        .footer {
          margin-top: 64px;
          padding-top: 24px;
          border-top: 1px solid var(--border);
          font-size: 12px;
          color: #666;
          display: flex;
          gap: 24px;
          opacity: 0;
          animation: fadeInUp 0.8s ease 1.2s forwards;
        }

        @media (max-width: 600px) {
          .codenamr-container {
            padding: 24px;
          }

          .command-block {
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
          }

          .copy-btn {
            width: 100%;
            text-align: center;
          }
        }
      `}</style>
    </div>
  );
}
