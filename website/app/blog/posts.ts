export interface Post {
  slug: string;
  title: string;
  date: string;
  content: string;
}

export const posts: Post[] = [
  {
    slug: 'my-craving-for-a-better-youtube',
    title: 'My craving for a better YouTube',
    date: '2026-02-12',
    content: `When I open up YouTube, the algorithm and my subscriptions are an absolute mess. Why should I watch all kinds of fail compilations? I mean, they are funny, but do they bring any value to my life? No.

It slowly became clearer that I wanted a better YouTube alternative, so I started searching. But here is the problem: there is no better YouTube alternative. The only serious ones are [Odysee](https://odysee.com/) and [Peertube](https://joinpeertube.org/), and both of those have the exact same problem: content.

Odysee is reasonably large, and if you like a lot of Linux/privacy content, you might stick here for a while, but the majority of the content is typical content of a 40-year-old male having a half-on-half midlife crisis in his garage with all kinds of DIY tools—not my vibe—and we haven't even talked about all the gun-related content. The UI/UX experience is, let's just say, a bit messy. The UI is very much usable and does its job reasonably well, but it has far less polish than the YouTube UI. There is sadly also a lot of crypto involved, "Web 3 Decentralization" and stuff. If this is your vibe, great, you found yourself a better alternative. If not, let's try PeerTube.

Oh man, the Peertube experience. It is... let's just say, not so clean. When you first try to make an account, you'd expect the main landing page, [joinpeertube.org](joinpeertube.org) to show a big sign-up button, right? Nope. And here comes the beauty of decentralization: Peertube is part of the Fediverse, an open and decentralized alternative to big tech social media. Things like [Mastodon](https://joinmastodon.org/), [Loops](https://joinloops.org/), and [Pixelfed](https://pixelfed.org/) are a part of it, so there is no central company involved, and where most Fediverse social media have a central server, Peertube has none. It wasn't easy to find a list of instances you can join—it's quite hidden in the UI—but hey, I found it at [this link](https://joinpeertube.org/instances), and even then, it wasn't easy to find a proper instance. Many of them don't allow open registration, and there is no way to filter for that. The language selector is also completely broken and didn't filter out non-English instances. The best I could find is [GNU/Linux Tube](https://gnulinux.tube/), but I couldn't just make an account—I have to request one and go through this whole process explaining why I wanted to use the platform: what do you think yourself? To watch videos and manage subscriptions maybe? I kinda got frustrated and quit, and so I declared an end to the amazing search for a YouTube alternative.

At least, I thought so. As I am a massive Linux nerd, I was searching for a native client for YouTube on Linux. Google is such a small adorable company that they don't have the engineering money to develop something so incredible, so instead I turned to the open-source community, and specifically [Pipeline](https://mobile.schmidhuberj.de/pipeline/), and it was the best YouTube experience I ever had. It has no shorts, no comments, no upvotes, no downvotes (YouTube doesn't either), no discovery algorithm—it's just your subscriptions on long-form videos in one inbox, which allowed me to fine-tune exactly what I wanted as my "algorithm," and it still has search, so I can find the videos I like, and a special Watch Later feature, which allows you to save videos for later. It is such an incredible app. The stability of this app is also really impressive, as platforms like [Invidious](https://invidious.io/) are quite unstable and go down all the time. I did just catch my first few days of "downtime" recently, but with the update after that, everything was solved. The theme is so beautiful too: nice GTK, works fast, and looks good. About that fast thing: it does take some time to fetch all of your subscriptions from YouTube, but that is so worth it. If you want, you can also point Pipeline at your own hosted Piped instance. Another fun thing: Pipeline also has support for the glorious Peertube, without an account! It's so nice—everyone with a Linux phone (that is what it was originally created for, as I learned from the super creative splash texts) or desktop should 100% [download](https://flathub.org/en/apps/de.schmidhuberj.tubefeeder) it now!`
  },
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
    date: "2026-02-01",
    content: `I just opened a pull request on the Rust-based [Zed](https://zed.dev) editor, a massive open source project with over [74k stars on GitHub](https://github.com/zed-industries/zed). It changed the way I look at open source.

I always imagined contributing to a large-scale open source project to be really intimidating. I thought that I was going to be asked all kinds of things I didn't understand, my code being roasted like crazy and maintainers flipping. I know this might sound a bit absurd, but this is actually how I thought, and that is what kept me from contributing to big projects for a while, and keeping it to smaller ones, until I changed my mind one day.

One day, I thought: what is the worst that could happen? Like, really, the worst thing is that they say that my code "IS GARBAGE", so I said to myself: let's do this! I quickly cloned the repository of Zed and got off to a good start with my fellow friend [Codex](https://openai.com/codex/).

One of the most important things when contributing to open source is, I think, an idea. You should never contribute because of your [contribution graph](https://github.com/thomasboom), but because you want to change software for the better, and that is what I did.

In Visual Studio Code, you have a button in your file view that allows you to collapse all subfolders, and I use it a lot, for when I am so deep into the code that I have literally every folder open. In Zed, you don't have a direct button for it, but you have to right-click the main folder and then click "Collapse All", and I say: room for improvement!

As I consider myself a "Vibe coder" now, I booted up the Codex CLI and got to work. In a literal one-prompt this feature was added. I created a new branch, made the commit, opened a PR, and boom, there we go! I felt so excited! I did have to sign a digital contract real quick, did I read it? No. The builds ran, and finished successfully!

When that was ready, I looked at my implementation, and thought: oh no. I forgot to include a small fact into the implementation. I rushed a new commit out the door, and saw that the builds weren't running again, because they needed moderator approval.

At this moment, I am waiting for my PR to get merged and approved, and if it doesn't, I get it, I am just a random dude on the internet doing some stuff with some AI. But it's more about the lessons that I learned from this experience. Contributing doesn't have to be scary, and the open source community is nice and accessible. I'll post an update once my PR gets merged, and then: good night, fellow coders!`
  },
  {
    slug: "my-mastodon-setup",
    title: "My Mastodon setup",
    date: "2026-01-28",
    content: `After deciding to switch from [Bluesky](https://bsky.app) to [Mastodon](https://joinmastodon.org/), here's how I set everything up.

  How did the move go? Because the protocols differ, there's no import/export yet, so I did it manually. Surprisingly, lots of people and communities already mirror to Mastodon, either by hand or via [Bridgy Fed](https://fed.brid.gy), though plenty of personal accounts still aren't there.

  I registered on [mastodon.social](https://mastodon.social), the largest server. Sign-up was straightforward, but the UI had less polish and it wouldn't accept my [addy.io](https://addy.io) email alias.

  As for the UI/UX, I now use [elk.zone](https://elk.zone), a FOSS third-party frontend with great UI/UX.

  And the rest? I'll post a longer-term review after I've used the platform for a few days.`
  },
  {
    slug: "why-i-switched-to-mastodon",
    title: "Why I switched to Mastodon",
    date: "2026-01-28",
    content: `Yesterday, I decided to make the switch: I fully moved from [Bluesky](https://bsky.app) to [Mastodon](https://joinmastodon.org/). Here are my reasons for making the move.

  The first reason is country of origin. Bluesky is made and registered in the USA, which, depending on your views, might already be a good reason to switch; for me, I'm simply trying to rely less on US-based tech and pick EU alternatives. Mastodon is officially registered in Germany but can be hosted anywhere.

  That leads to my second point: decentralization. Bluesky can only be partially self-hosted with a PDS; on Mastodon, each "instance" is a full server that handles community membership, UI, hosting and feeds. On Bluesky, a PDS mostly just holds your personal account data while feeds and UI are aggregated elsewhere.

  Third point: customization. Bluesky has third-party frontends, but they're less common than on Mastodon. When you pick a Mastodon server, you can choose one whose moderation rules fit you.

  Fourth: interoperability. Because Mastodon is part of the Fediverse, it can talk to many other social networks, so I can see content from [Threads](https://threads.net), [Loops](https://joinloops.org) and [Pixelfed](https://pixelfed.org).`
  },
  {
    slug: "how-making-bad-decisions-for-the-people-does-not-impact-businesses-long-term",
    title:
      "How making bad decisions for the people does not impact businesses long term.",
    date: "2026-01-26",
    content: `Every time there is a major hiccup in tech, people are mad. Really mad. When we look back at the massive Reddit "shutdown" of 2023, where [over 8000 subreddits turned black after Reddit started charging for API access](https://techcrunch.com/2023/06/12/reddit-blackout-8000-subreddits-went-dark-protest-api/), this was one of the largest internet boycotts ever. But now, less than 2 years later, engagement is back to where it was before, and literally nothing changed, other than that some subreddits are now moderated by the official Reddit team, because they seized control of them. How can we accept this? Companies should take people over profit, not the other way around. The main problem is that all the people are already on the large platforms, and that it is hard to migrate them. Even when we look at one of the largest internet moves, when Elon Musk acquired X (then still good old Twitter), [a lot of people moved to Mastodon and Bluesky, which technically are way better for the users](https://www.theverge.com/23686584/twitter-alternative-social-media-platforms-mastodon-bluesky-activitypub-protocol) and less for (nonexistent) investors. They still don't have any kind of power against X, even though it has become one of the most toxic places on the internet.

  The main takeaway? Big tech has too much power over its users, and even if there are problems, people will stick anyway. Take action. Switch to platforms like [Bluesky](https://bsky.app) and [Nooki](https://nooki.me/). Take action, don't let big tech control you.`
  },
];