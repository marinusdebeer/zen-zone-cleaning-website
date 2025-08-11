import React from 'react';
import { useParams, Link } from 'react-router-dom';
import SEO from './SEO';
import { blogs } from './blogsData';
import { blogContentBySlug } from './blogsContent';
import './BlogPostPage.css';

export default function BlogPostPage() {
  const { slug } = useParams();
  const post = blogs.find((b) => b.slug === slug);
  const blocks = blogContentBySlug[slug] || [];

  if (!post) {
    return (
      <main>
        <section className="section">
          <h1 className="section-title">Article not found</h1>
          <p className="section__subtitle">The blog post you are looking for does not exist.</p>
          <Link className="btn" to="/blog">
            Back to Blog
          </Link>
        </section>
      </main>
    );
  }

  const title = `${post.title} | Zen Zone Cleaning`;
  const description = post.summary;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    image: `https://zenzonecleaning.com${post.image}`,
    datePublished: post.date,
    author: {
      '@type': 'Organization',
      name: 'Zen Zone Cleaning',
    },
    mainEntityOfPage: `https://zenzonecleaning.com/blog/${post.slug}`,
  };

  return (
    <main>
      <SEO
        title={title}
        description={description}
        path={`/blog/${post.slug}`}
        image={post.image}
        jsonLd={jsonLd}
      />
      <article className="section blog-post" aria-label={post.title}>
        <header className="blog-post__header">
          <div className="blog-post__eyebrow">
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
            <span aria-hidden>·</span>
            <span>{post.readTime} min read</span>
          </div>
          <h1 className="section-title blog-post__title">{post.title}</h1>
          <p className="section__subtitle blog-post__subtitle">{post.summary}</p>
          <img className="blog-post__hero" src={post.image} alt="" loading="lazy" />
        </header>

        <div className="blog-post__content">
          {blocks.map((block, idx) => {
            if (block.type === 'h2') return <h2 key={idx}>{block.text}</h2>;
            if (block.type === 'p') return <p key={idx}>{block.text}</p>;
            if (block.type === 'ul') return <ul key={idx} className="list" />;
            if (block.type === 'li') return <li key={idx}>{block.text}</li>;
            if (block.type === 'note')
              return (
                <p key={idx} className="note">
                  {block.text}
                </p>
              );
            return null;
          })}
        </div>

        <footer className="blog-post__footer">
          <Link to="/blog" className="btn btn--outline">
            ← Back to Blog
          </Link>
          <Link to="/book" className="btn">
            Request Estimate
          </Link>
        </footer>
      </article>
    </main>
  );
}
