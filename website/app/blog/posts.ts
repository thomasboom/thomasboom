export interface Post {
  slug: string;
  title: string;
  date: string;
  content: string;
}

export const posts: Post[] = [
  {
    slug: 'how-making-bad-decisions-for-the-people-does-not-impact-businesses-long-term',
    title: 'How making bad decisions for the people does not impact businesses long term.',
    date: '2026-01-26',
    content: `Every time there is a major hiccup in tech, people are mad. Really mad. When we look back at the massive Reddit "shutdown" of 2023, where [over 8000 subreddits turned black after Reddit started charging for API access](https://techcrunch.com/2023/06/12/reddit-blackout-8000-subreddits-went-dark-protest-api/), this was one of the largest internet boycotts ever. But now, less than 2 years later, engagement is back to where it was before, and literally nothing changed, other than that some subreddits are now moderated by the official Reddit team, because they seized control of them. How can we accept this? Companies should take people over profit, not the other way around. The main problem is that all the people are already on the large platforms, and that it is hard to migrate them. Even when we look at one of the largest internet moves, when Elon Musk acquired X (then still good old Twitter), [a lot of people moved to Mastodon and Bluesky, which technically are way better for the users](https://www.theverge.com/23686584/twitter-alternative-social-media-platforms-mastodon-bluesky-activitypub-protocol) and less for (nonexistent) investors. They still don't have any kind of power against X, even though it has become one of the most toxic places on the internet.
  
  The main takeaway? Big tech has too much power over its users, and even if there are problems, people will stick anyway. Take action. Switch to platforms like [Bluesky](https://bsky.app) and [Nooki](https://nooki.me/). Take action, don't let big tech control you.`
  }
];
