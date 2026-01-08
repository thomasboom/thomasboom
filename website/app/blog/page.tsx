import Link from 'next/link';

interface Post {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
}

const posts: Post[] = [];

export default function BlogPage() {
  return (
    <div className="blog-container">
      <div className="blog-header">
        <h1 className="name">
          <span>Blog</span>
        </h1>
        <p className="meta">
          Thoughts & Writing
          <span>On development, technology, and more</span>
        </p>
      </div>
      
      <div className="posts-list">
        {posts.length === 0 ? (
          <div className="empty-state">
            <p>No posts yet</p>
          </div>
        ) : (
          posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="post-link">
              <div className="post-card">
                <div className="post-date">{post.date}</div>
                <h2 className="post-title">{post.title}</h2>
                <p className="post-excerpt">{post.excerpt}</p>
              </div>
            </Link>
          ))
        )}
      </div>

      <Link href="/" className="back-link">← Back to home</Link>
    </div>
  );
}
