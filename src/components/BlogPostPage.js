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
          {(() => {
            const elements = [];
            let listItems = [];
            let listKey = 0;
            blocks.forEach((block, idx) => {
              if (block.type === 'ul') {
                // flush any pending list just in case
                if (listItems.length) {
                  elements.push(
                    <ul key={`ul-${listKey++}`} className="list">
                      {listItems}
                    </ul>
                  );
                  listItems = [];
                }
                // start a new list context; items will follow as 'li'
                // if no li items follow, render an empty list for structure
                elements.push(<ul key={`ul-${listKey++}`} className="list" />);
                return;
              }
              if (block.type === 'li') {
                listItems.push(<li key={`li-${idx}`}>{block.text}</li>);
                return;
              }
              // flush list when a non-list block appears
              if (listItems.length) {
                elements.push(
                  <ul key={`ul-${listKey++}`} className="list">
                    {listItems}
                  </ul>
                );
                listItems = [];
              }
              if (block.type === 'h2') {
                elements.push(<h2 key={idx}>{block.text}</h2>);
              } else if (block.type === 'p') {
                elements.push(<p key={idx}>{block.text}</p>);
              } else if (block.type === 'note') {
                elements.push(
                  <p key={idx} className="note">
                    {block.text}
                  </p>
                );
              }
            });
            // flush any remaining list items at the end
            if (listItems.length) {
              elements.push(
                <ul key={`ul-${listKey++}`} className="list">
                  {listItems}
                </ul>
              );
            }
            return elements;
          })()}
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
