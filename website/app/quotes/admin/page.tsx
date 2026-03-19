'use client';

import { useState, useMemo, useEffect } from 'react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { Id, Doc } from '../../../convex/_generated/dataModel';
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

const getNextAvailableDate = (quotes: Doc<"quotes">[]) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Get all scheduled dates as Date objects
  const scheduledDates = quotes
    .filter(quote => quote.scheduledDate)
    .map(quote => {
      const date = new Date(quote.scheduledDate);
      date.setHours(0, 0, 0, 0);
      return date.getTime();
    });

  // Find the next available date
  let checkDate = new Date(today); // eslint-disable-line prefer-const
  while (scheduledDates.includes(checkDate.getTime())) {
    checkDate.setDate(checkDate.getDate() + 1);
  }

  // Format as YYYY-MM-DD
  const tzOffsetMs = checkDate.getTimezoneOffset() * 60_000;
  return new Date(checkDate.getTime() - tzOffsetMs).toISOString().slice(0, 10);
};

export default function QuotesAdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const quotes = useQuery(api.quotes.getAllQuotes);
  const addQuote = useMutation(api.quotes.addQuote);
  const updateQuote = useMutation(api.quotes.updateQuote);
  const deleteQuote = useMutation(api.quotes.deleteQuote);

  const [text, setText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [processingQuotes, setProcessingQuotes] = useState<Set<string>>(new Set());

  const nextAvailableDate = useMemo(() => {
    if (!quotes) return getToday();
    return getNextAvailableDate(quotes);
  }, [quotes]);

  const [scheduledDate, setScheduledDate] = useState('');

  useEffect(() => {
    if (nextAvailableDate) {
      setScheduledDate(nextAvailableDate);
    }
  }, [nextAvailableDate]);

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

  const addQuoteToDatabase = async () => {
    if (!text.trim()) return;

    setIsSubmitting(true);
    try {
      // Optimistically save the quote immediately with the original text
      const quoteId = await addQuote({ text: text.trim(), scheduledDate });

      // Clear the form immediately for user feedback
      setText('');

      // Mark this quote as being processed
      setProcessingQuotes(prev => new Set(prev).add(quoteId));

      // Run AI correction in the background
      try {
        const aiResponse = await fetch('/api/ai-correct', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            content: text.trim(),
          }),
        });

        if (aiResponse.ok) {
          const aiResult = await aiResponse.json();
          const correctedText = aiResult.content;

          // Only update if the text actually changed
          if (correctedText && correctedText !== text.trim()) {
            await updateQuote({ id: quoteId, text: correctedText });
          }
        }
      } catch (aiError) {
        // AI correction failed, but quote is already saved - that's fine
        console.log('AI correction failed, but quote was saved successfully:', aiError);
      } finally {
        // Remove from processing set when done
        setProcessingQuotes(prev => {
          const newSet = new Set(prev);
          newSet.delete(quoteId);
          return newSet;
        });
      }
    } catch (err) {
      console.error('Failed to add quote:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddQuote = async (e: React.FormEvent) => {
    e.preventDefault();
    await addQuoteToDatabase();
  };

  const handleDelete = async (id: Id<"quotes">) => {
    try {
      await deleteQuote({ id });
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

        <Link href="/" className="back-link">← Back to home</Link>
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
            onKeyDown={(e) => {
              if (e.ctrlKey && e.key === 'Enter') {
                e.preventDefault();
                addQuoteToDatabase();
              }
            }}
            placeholder="Enter your quote here... (will be AI-corrected in the background)"
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
          {isSubmitting ? 'Saving...' : 'Add Quote'}
        </button>
      </form>

      {quotes && quotes.length > 0 && (
        <>
          <h2 style={{ marginTop: '48px', marginBottom: '24px', fontSize: '24px', fontWeight: 400 }}>
            Existing Quotes
          </h2>
          <div className="quotes-list">
            {quotes
              .sort((a, b) => b.createdAt - a.createdAt)
              .map((quote) => (
              <div key={quote._id} className="quote-card">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                  <p className="quote-card-text">&ldquo;{quote.text}&rdquo;</p>
                  {processingQuotes.has(quote._id) && (
                    <span style={{
                      backgroundColor: '#007bff',
                      color: 'white',
                      padding: '2px 6px',
                      borderRadius: '4px',
                      fontSize: '11px',
                      fontWeight: '500',
                      whiteSpace: 'nowrap'
                    }}>
                      AI Processing...
                    </span>
                  )}
                </div>
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

      <Link href="/" className="back-link">← Back to home</Link>
    </div>
  );
}
