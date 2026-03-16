'use client';

import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import Link from 'next/link';

const getTodayDate = () => {
  const now = new Date();
  const tzOffsetMs = now.getTimezoneOffset() * 60_000;
  return new Date(now.getTime() - tzOffsetMs).toISOString().slice(0, 10);
};

export default function QuotesPage() {
  const today = getTodayDate();
  const scheduledQuote = useQuery(api.quotes.getQuoteForDate, { date: today });
  const randomQuote = useQuery(api.quotes.getRandomQuote);

  const quote = scheduledQuote ?? randomQuote;

  return (
    <div className="quotes-container">
      <div className="quotes-header">
        <h1 className="name">
          <span>Quote</span>
          <span className="accent">of the Day</span>
        </h1>
        {scheduledQuote ? (
          <p className="meta">
            Today&apos;s featured quote
          </p>
        ) : (
          <p className="meta">
            A random quote for you
          </p>
        )}
      </div>

      {quote ? (
        <div className="quote-display">
          <blockquote className="quote-text">
            &ldquo;{quote.text}&rdquo;
          </blockquote>
          {quote.scheduledDate && (
            <p className="quote-date">
              {new Date(quote.scheduledDate).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          )}
        </div>
      ) : (
        <div className="empty-state">
          <p>No quotes yet. Add some in the admin dashboard!</p>
        </div>
      )}

      <Link href="/" className="back-link">← Back to home</Link>
    </div>
  );
}
