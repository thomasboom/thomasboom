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
    slug: 'why-i-moved-from-bluesky-to-mastodon',
    title: 'Why I moved from Bluesky to Mastodon',
    date: '2026-01-28',
    content: `Yesterday, I decided to make the switch: I fully moved from [Bluesky](https://bsky.app) to [Mastodon](https://joinmastodon.org/). Here are my choices, tradeoffs and tips/suggestions.
  
  The first reason why I moved to Mastodon, is the country of origin. Bluesky is made and registered in the USA, which, depending on your political views, might be already a good reason to switch, but for me, I did it because I want to become more free of US based tech, and switch to EU based alternatives. Mastodon is officially registered in Germany, but can be hosted everywhere around the planet.
  
  That leads me to my second point: decentralization: Bluesky can only partially be self-hosted, with a PDS: on Mastodon, each “instance” is a full server that handles community membership, UI, hosting, and feeds. On Bluesky, a PDS mostly just holds your personal account data; feeds and UI are usually aggregated elsewhere but still pull in your data.
  
  My third point also is connected to my second one: customization. With Bluesky, you can have third-party frontends, but they aren't as common as with Mastodon. When you pick a Mastodon server, you can also pick one based on moderation rules.
  
  Fourth one: interoperability. Because Mastodon is part of the Fediverse, it can interoperate with many other social media, so I can see all content from other platforms, like [Threads](https://threads.net), [Loops](https://joinloops.org/) and [Pixelfed](https://pixelfed.org/)
  
  These are my points why I decided to make the switch, but how did the switch actually go? Because you are moving between different protocols, there sadly isn't a straight import/export feature yet, so I had to do it all manually. Surprisingly many people and communities have setup a mirror on Mastodon, manually or by using [Bridgy Fed](https://fed.brid.gy/), but I did still notice that a lot of (primarily personal) accounts aren't on Mastodon yet.
  
  I registered my account on [mastodon.social](https://mastodon.social), by far the largest server out there. The signup process was straightforward, but I did notice the UI had way less polish. I also can't sign up with a [addy.io](https://addy.io) email alias. 
  
  As I just mentioned, the UI/UX of Mastodon isn't the greatest thing out there, but, as always, there is a fix for that. I now use [elk.zone](https://elk.zone/), a FOSS third-party frontend with an amazing UI/UX.
  
  And for the rest? I'll do a longer term review later, when I have used the platform for a few days.`
  }
];
