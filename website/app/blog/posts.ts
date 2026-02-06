export interface Post {
  slug: string;
  title: string;
  date: string;
  content: string;
}

export const posts: Post[] = [
  {
    slug: 'why-i-moved-back-to-bluesky',
    title: 'Why I moved back to Bluesky',
    date: '2026-02-06',
    content: `A few days ago, I made a [blogpost](https://thomasboom.vercel.app/blog/why-i-switched-to-mastodon) about my journey switching to [Mastodon](https://joinmastodon.org/), and the reasons why I didn't switch with [Bluesky](https://bsky.social), and I still 100% stand with those opinions: Bluesky isn't perfect and with the current architecture it never will be.

As I mentioned in my [Mastodon setup blogpost](https://thomasboom.vercel.app/blog/my-mastodon-setup), [elk.zone](https://elk.zone) fixed the second largest problem I had with Mastodon: its UI/UX. Even though Elk is still in Alpha, it is so incredible, and I can't wait for the future of the project.

But the largest problem wasn't UI/UX: it was user engagement and, surprisingly, discovery. I'm a big chronological feed guy, and on both of the platforms, that is possible. On Mastodon though, it was a little too good. There, depending on your instance, is no discoverability, or a really bad one, and I just need some fresh content in my feed from time to time. Engagement was by far the largest bottleneck in this entire experiment: at Bluesky, every time I refreshed my feed, something new appeared, but on Mastodon, I would easily go hours without.

Should I follow more people then? Yes. Are there enough high quality accounts to do so? No. Please, if you use Bluesky, setup a bridge via [Bridgy Fed](https://fed.brid.gy/), it's a one time effort, but a huge lifesaver for us Mastodon users.

I did say "us" Mastodon users, but I really should say "them", even though the decentralization and interoperability is so cool, it's just not worth it to me (yet). Once Bluesky (maybe ever) joins the Fediverse, or there is a huge user gain at Mastodon, it's a 100% switch for me.`
  },
  {
    slug: "i-opened-a-pr-on-an-open-source-project-it-changed-the-way-i-think",
    title:
      "I opened a PR on an open source project. It changed the way I think.",
    date: "",
    content: `I just opened a pull request on the Rust-based [Zed](https://zed.dev) editor, a massive open source project with over [74k stars on GitHub](https://github.com/zed-industries/zed). It changed the way I look at open source.

I always imagined contributing to a large-scale open source project to be really intimidating. I thought that I was going to be asked all kinds of things I didn't understand, my code being roasted like crazy and maintainers flipping. I know this might sound a bit absurd, but this is actually how I thought, and that is what kept me from contributing to big projects for a while, and keeping it to smaller ones, until I changed my mind one day.

One day, I thought: what is the worst that could happen? Like, really, the worst thing is that they say that my code "IS GARBAGE", so I said to myself: let's do this! I quickly cloned the repository of Zed and got off to a good start with my fellow friend [Codex](https://openai.com/codex/).

One of the most important things when contributing to open source is, I think, an idea. You should never contribute because of your [contribution graph](https://github.com/thomasboom), but because you want to change software for the better, and that is what I did.

In Visual Studio Code, you have a button in your file view that allows you to collapse all subfolders, and I use it a lot, for when I am so deep into the code that I have literally every folder open. In Zed, you don't have a direct button for it, but you have to right-click the main folder and then click "Collapse All", and I say: room for improvement!

As I consider myself a "Vibe coder" now, I booted up the Codex CLI and got to work. In a literal one-prompt this feature was added. I created a new branch, made the commit, opened a PR, and boom, there we go! I felt so excited! I did have to sign a digital contract real quick, did I read it? No. The builds ran, and finished successfully!

When that was ready, I looked at my implementation, and thought: oh no. I forgot to include a small fact into the implementation. I rushed a new commit out the door, and saw that the builds weren't running again, because they needed moderator approval.

At this moment, I am waiting for my PR to get merged and approved, and if it doesn't, I get it, I am just a random dude on the internet doing some stuff with some AI. But it's more about the lessons that I learned from this experience. Contributing doesn't have to be scary, and the open source community is nice and accessible. I'll post an update once my PR gets merged, and then: good night, fellow coders!`,
  },
  {
    slug: "my-mastodon-setup",
    title: "My Mastodon setup",
    date: "2026-01-28",
    content: `After deciding to switch from [Bluesky](https://bsky.app) to [Mastodon](https://joinmastodon.org/), here's how I set everything up.

  How did the move go? Because the protocols differ, there's no import/export yet, so I did it manually. Surprisingly, lots of people and communities already mirror to Mastodon, either by hand or via [Bridgy Fed](https://fed.brid.gy), though plenty of personal accounts still aren't there.

  I registered on [mastodon.social](https://mastodon.social), the largest server. Sign-up was straightforward, but the UI had less polish and it wouldn't accept my [addy.io](https://addy.io) email alias.

  As for the UI/UX, I now use [elk.zone](https://elk.zone), a FOSS third-party frontend with great UI/UX.

  And the rest? I'll post a longer-term review after I've used the platform for a few days.`,
  },
  {
    slug: "why-i-switched-to-mastodon",
    title: "Why I switched to Mastodon",
    date: "2026-01-28",
    content: `Yesterday, I decided to make the switch: I fully moved from [Bluesky](https://bsky.app) to [Mastodon](https://joinmastodon.org/). Here are my reasons for making the move.

  The first reason is country of origin. Bluesky is made and registered in the USA, which, depending on your views, might already be a good reason to switch; for me, I'm simply trying to rely less on US-based tech and pick EU alternatives. Mastodon is officially registered in Germany but can be hosted anywhere.

  That leads to my second point: decentralization. Bluesky can only be partially self-hosted with a PDS; on Mastodon, each "instance" is a full server that handles community membership, UI, hosting and feeds. On Bluesky, a PDS mostly just holds your personal account data while feeds and UI are aggregated elsewhere.

  Third point: customization. Bluesky has third-party frontends, but they're less common than on Mastodon. When you pick a Mastodon server, you can choose one whose moderation rules fit you.

  Fourth: interoperability. Because Mastodon is part of the Fediverse, it can talk to many other social networks, so I can see content from [Threads](https://threads.net), [Loops](https://joinloops.org) and [Pixelfed](https://pixelfed.org).`,
  },
  {
    slug: "how-making-bad-decisions-for-the-people-does-not-impact-businesses-long-term",
    title:
      "How making bad decisions for the people does not impact businesses long term.",
    date: "2026-01-26",
    content: `Every time there is a major hiccup in tech, people are mad. Really mad. When we look back at the massive Reddit "shutdown" of 2023, where [over 8000 subreddits turned black after Reddit started charging for API access](https://techcrunch.com/2023/06/12/reddit-blackout-8000-subreddits-went-dark-protest-api/), this was one of the largest internet boycotts ever. But now, less than 2 years later, engagement is back to where it was before, and literally nothing changed, other than that some subreddits are now moderated by the official Reddit team, because they seized control of them. How can we accept this? Companies should take people over profit, not the other way around. The main problem is that all the people are already on the large platforms, and that it is hard to migrate them. Even when we look at one of the largest internet moves, when Elon Musk acquired X (then still good old Twitter), [a lot of people moved to Mastodon and Bluesky, which technically are way better for the users](https://www.theverge.com/23686584/twitter-alternative-social-media-platforms-mastodon-bluesky-activitypub-protocol) and less for (nonexistent) investors. They still don't have any kind of power against X, even though it has become one of the most toxic places on the internet.

  The main takeaway? Big tech has too much power over its users, and even if there are problems, people will stick anyway. Take action. Switch to platforms like [Bluesky](https://bsky.app) and [Nooki](https://nooki.me/). Take action, don't let big tech control you.`,
  },
];
