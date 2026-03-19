"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";
import { useEffect, useState } from "react";

const getTodayDate = () => {
  const now = new Date();
  const tzOffsetMs = now.getTimezoneOffset() * 60_000;
  return new Date(now.getTime() - tzOffsetMs).toISOString().slice(0, 10);
};

const getUserId = () => {
  if (typeof window === "undefined") return "";
  let userId = localStorage.getItem("quote_user_id");
  if (!userId) {
    userId = crypto.randomUUID();
    localStorage.setItem("quote_user_id", userId);
  }
  return userId;
};

function QuoteVoting({
  quoteId,
  userId,
}: {
  quoteId: Id<"quotes">;
  userId: string;
}) {
  const voteCounts = useQuery(api.quotes.getVoteCounts, { quoteId });
  const userVote = useQuery(api.quotes.getUserVote, { quoteId, userId });
  const voteMutation = useMutation(api.quotes.vote);

  const handleVote = (vote: number) => {
    voteMutation({ quoteId, userId, vote });
  };

  return (
    <div className="quote-voting">
      <button
        className={`vote-btn upvote ${userVote === 1 ? "active" : ""}`}
        onClick={() => handleVote(1)}
        aria-label="Upvote"
      >
        ▲
      </button>
      <span className="vote-score">{voteCounts?.score ?? 0}</span>
      <button
        className={`vote-btn downvote ${userVote === -1 ? "active" : ""}`}
        onClick={() => handleVote(-1)}
        aria-label="Downvote"
      >
        ▼
      </button>
    </div>
  );
}

export default function QuoteOfTheDay() {
  const [userId, setUserId] = useState("");
  const today = getTodayDate();
  const scheduledQuote = useQuery(api.quotes.getQuoteForDate, { date: today });
  const randomQuote = useQuery(api.quotes.getRandomQuote);

  const quote = scheduledQuote ?? randomQuote;

  useEffect(() => {
    setUserId(getUserId());
  }, []);

  return (
    <div id="quotes" className="section quotes-section">
      <h2 className="section-title">
        Quote<span className="accent"> of the Day</span>
      </h2>
      {quote ? (
        <div className="quote-display">
          <blockquote className="quote-text">
            &ldquo;{quote.text}&rdquo;
          </blockquote>
          {quote.scheduledDate && (
            <p className="quote-date">
              {new Date(quote.scheduledDate).toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          )}
          {userId && <QuoteVoting quoteId={quote._id} userId={userId} />}
        </div>
      ) : (
        <div className="empty-state">
          <p>No quotes yet. Add some in the admin dashboard!</p>
        </div>
      )}
    </div>
  );
}
