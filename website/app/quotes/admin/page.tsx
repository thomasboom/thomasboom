'use client';

import { useState } from 'react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import Link from 'next/link';

const ADMIN_PASSWORD_HASH = process.env.NEXT_PUBLIC_ADMIN_PASSWORD_HASH || '';

async function sha256(message: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

const getToday = () => {
  const now = new Date();
  const tzOffsetMs = now.getTimezoneOffset() * 60_000;
  return new Date(now.getTime() - tzOffsetMs).toISOString().slice(0, 10);
};

export default function QuotesAdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const quotes = useQuery(api.quotes.getAllQuotes);
  const addQuote = useMutation(api.quotes.addQuote);
  const deleteQuote = useMutation(api.quotes.deleteQuote);

  const [text, setText] = useState('');
  const [scheduledDate, setScheduledDate] = useState(getToday());
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const hash = await sha256(password);
    if (hash === ADMIN_PASSWORD_HASH) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Invalid password');
    }
  };

  const handleAddQuote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    setIsSubmitting(true);
    try {
      await addQuote({ text: text.trim(), scheduledDate });
      setText('');
      setScheduledDate(getToday());
    } catch (err) {
      console.error('Failed to add quote:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteQuote({ id: id as any });
    } catch (err) {
      console.error('Failed to delete quote:', err);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="quotes-admin-container">
        <div className="quotes-admin-header">
          <h1 className="name">
            <span>Admin</span>
            <span className="accent">Login</span>
          </h1>
          <p className="meta">
            Enter your password to access the quotes admin
          </p>
        </div>

        <form onSubmit={handleLogin} className="quote-form">
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
            />
          </div>
          {error && <p style={{ color: '#ff6b6b', fontSize: '14px' }}>{error}</p>}
          <button type="submit" className="quote-form-submit">
            Login
          </button>
        </form>

        <Link href="/quotes" className="back-link">← Back to quotes</Link>
      </div>
    );
  }

  return (
    <div className="quotes-admin-container">
      <div className="quotes-admin-header">
        <h1 className="name">
          <span>Quotes</span>
          <span className="accent">Admin</span>
        </h1>
        <p className="meta">
          Manage your quotes
          <span>Schedule quotes for specific dates or leave empty for random</span>
        </p>
      </div>

      <form onSubmit={handleAddQuote} className="quote-form">
        <div className="form-group">
          <label>Quote Text</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter your quote here..."
            required
          />
        </div>
        <div className="form-group">
          <label>Schedule for Date (leave empty for random)</label>
          <input
            type="date"
            value={scheduledDate}
            onChange={(e) => setScheduledDate(e.target.value)}
          />
        </div>
        <button type="submit" className="quote-form-submit" disabled={isSubmitting}>
          {isSubmitting ? 'Adding...' : 'Add Quote'}
        </button>
      </form>

      {quotes && quotes.length > 0 && (
        <>
          <h2 style={{ marginTop: '48px', marginBottom: '24px', fontSize: '24px', fontWeight: 400 }}>
            Existing Quotes
          </h2>
          <div className="quotes-list">
            {quotes.map((quote) => (
              <div key={quote._id} className="quote-card">
                <p className="quote-card-text">&ldquo;{quote.text}&rdquo;</p>
                <div className="quote-card-meta">
                  <span>
                    {quote.scheduledDate
                      ? new Date(quote.scheduledDate).toLocaleDateString()
                      : 'Random'}
                  </span>
                  <button
                    className="quote-card-delete"
                    onClick={() => handleDelete(quote._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      <Link href="/quotes" className="back-link">← Back to quotes</Link>
    </div>
  );
}
