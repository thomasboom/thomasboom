import Link from 'next/link';
import { posts } from '../posts';

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = posts.find(p => p.slug === slug);

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
