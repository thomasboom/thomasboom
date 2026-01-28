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
  },
{
    slug: 'why-i-switched-to-mastodon',
    title: 'Why I switched to Mastodon',
    date: '2026-01-28',
    content: `Yesterday, I decided to make the switch: I fully moved from [Bluesky](https://bsky.app) to [Mastodon](https://joinmastodon.org/). Here are my reasons for making the move.
  
  The first reason is country of origin. Bluesky is made and registered in the USA, which, depending on your views, might already be a good reason to switch; for me, I'm simply trying to rely less on US-based tech and pick EU alternatives. Mastodon is officially registered in Germany but can be hosted anywhere.
  
  That leads to my second point: decentralization. Bluesky can only be partially self-hosted with a PDS; on Mastodon, each "instance" is a full server that handles community membership, UI, hosting and feeds. On Bluesky, a PDS mostly just holds your personal account data while feeds and UI are aggregated elsewhere.
  
  Third point: customization. Bluesky has third-party frontends, but they're less common than on Mastodon. When you pick a Mastodon server, you can choose one whose moderation rules fit you.
  
  Fourth: interoperability. Because Mastodon is part of the Fediverse, it can talk to many other social networks, so I can see content from [Threads](https://threads.net), [Loops](https://joinloops.org) and [Pixelfed](https://pixelfed.org).`
  },
  {
    slug: 'my-mastodon-setup',
    title: 'My Mastodon setup',
    date: '2026-01-28',
    content: `After deciding to switch from [Bluesky](https://bsky.app) to [Mastodon](https://joinmastodon.org/), here's how I set everything up.
  
  How did the move go? Because the protocols differ, there's no import/export yet, so I did it manually. Surprisingly, lots of people and communities already mirror to Mastodon, either by hand or via [Bridgy Fed](https://fed.brid.gy), though plenty of personal accounts still aren't there.
  
  I registered on [mastodon.social](https://mastodon.social), the largest server. Sign-up was straightforward, but the UI had less polish and it wouldn't accept my [addy.io](https://addy.io) email alias.
  
  As for the UI/UX, I now use [elk.zone](https://elk.zone), a FOSS third-party frontend with great UI/UX.
  
  And the rest? I'll post a longer-term review after I've used the platform for a few days.`
  }
];
