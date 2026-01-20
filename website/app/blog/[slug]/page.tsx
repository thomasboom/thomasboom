import Link from 'next/link';

const posts: { [key: string]: { title: string; date: string; content: string } } = {
  'hello-world': {
    title: 'Hello World',
    date: '2026-01-08',
    content: `Welcome to my new blog!

This is where I'll be sharing thoughts on development, technology, and more. I'm excited to start this journey and share what I learn along the way.

## Why I Started This Blog

I've been thinking about starting a blog for a while now. I want to have a place where I can:

- Share my experiences working with different technologies
- Document solutions to problems I encounter
- Reflect on my growth as a developer
- Connect with others in the tech community

## What to Expect

In the coming weeks and months, you can expect posts about:
- Next.js and React
- Mobile development
- Web development tools and workflows
- Personal projects and their challenges

Thanks for reading, and stay tuned for more!`
  },
  'getting-started-with-nextjs': {
    title: 'Getting Started with Next.js',
    date: '2026-01-07',
    content: `Next.js has become my go-to framework for building modern web applications. Here's why I think you should consider it for your next project.

## What is Next.js?

Next.js is a React framework that provides a set of features to help you build fast, SEO-friendly web applications. It handles the tooling and configuration needed for React, and provides additional features like:

- Server-side rendering (SSR)
- Static site generation (SSG)
- API routes
- Automatic code splitting
- Image optimization

## Why I Love Next.js

### 1. Developer Experience

The developer experience is fantastic. Hot reloading works out of the box, and the file-based routing makes it easy to organize your application.

### 2. Performance

Next.js optimizes your application for performance automatically. Code splitting, image optimization, and font optimization all happen with minimal configuration.

### 3. Flexibility

You can choose between SSR, SSG, or client-side rendering on a per-page basis. This flexibility allows you to optimize each page for its specific use case.

## Getting Started

To create a new Next.js app, simply run:

\`\`\`bash
npx create-next-app@latest
\`\`\`

Follow the prompts, and you'll have a working Next.js application in minutes.

## Conclusion

If you're building a React application and want better performance and SEO, give Next.js a try. It's made my development workflow much more enjoyable.`
  }
};

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = posts[slug];

  if (!post) {
    return (
      <div className="blog-container">
        <h1>Post not found</h1>
        <Link href="/blog" className="back-link">← Back to blog</Link>
      </div>
    );
  }

  return (
    <div className="blog-container">
      <div className="blog-post">
        <div className="post-meta">
          <span className="post-date">{post.date}</span>
          <Link href="/blog" className="back-to-blog">← All posts</Link>
        </div>
        <h1 className="post-title">{post.title}</h1>
        <div className="post-content">
          {post.content.split('\n').map((paragraph, index) => {
            if (paragraph.startsWith('## ')) {
              return <h2 key={index}>{paragraph.replace('## ', '')}</h2>;
            }
            if (paragraph.startsWith('### ')) {
              return <h3 key={index}>{paragraph.replace('### ', '')}</h3>;
            }
            if (paragraph.startsWith('```')) {
              return null;
            }
            if (paragraph.startsWith('- ')) {
              return <li key={index}>{paragraph.replace('- ', '')}</li>;
            }
            if (paragraph.trim() === '') {
              return null;
            }
            const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
            const parts: (string | { text: string; url: string })[] = [];
            let lastIndex = 0;
            let match;
            while ((match = linkRegex.exec(paragraph)) !== null) {
              parts.push(paragraph.slice(lastIndex, match.index));
              parts.push({ text: match[1], url: match[2] });
              lastIndex = linkRegex.lastIndex;
            }
            if (lastIndex < paragraph.length) {
              parts.push(paragraph.slice(lastIndex));
            }
            if (parts.some(part => typeof part === 'object')) {
              return <p key={index}>{parts.map((part, i) => typeof part === 'object' ? <Link key={i} href={part.url} className="inline-link">{part.text}</Link> : part)}</p>;
            }
            return <p key={index}>{paragraph}</p>;
          })}
        </div>
      </div>
      <Link href="/" className="back-link">← Back to home</Link>
    </div>
  );
}
