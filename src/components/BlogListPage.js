import React from 'react';
import { Link } from 'react-router-dom';
import SEO from './SEO';
import './BlogListPage.css';
import { blogs } from './blogsData';

export default function BlogListPage() {
  const pageTitle = 'Blog | Zen Zone Cleaning';
  const pageDescription =
    'Cleaning tips, checklists, and guides from Zen Zone Cleaning. Learn how to keep your home fresh between professional cleans.';

  const articleLd = blogs.map((post) => ({
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    image: `https://zenzonecleaning.com${post.image}`,
    datePublished: post.date,
    author: {
      '@type': 'Organization',
      name: 'Zen Zone Cleaning',
    },
    mainEntityOfPage: `https://zenzonecleaning.com/blog#${post.slug}`,
  }));

  return (
    <main>
      <SEO title={pageTitle} description={pageDescription} path="/blog" jsonLd={articleLd} />

      <section className="section blog" aria-label="Zen Zone Cleaning blog">
        <h1 className="section-title" style={{ textAlign: 'left' }}>Blog</h1>
        <p className="section__subtitle" style={{ textAlign: 'left' }}>
          Practical cleaning guides, checklists, and tips. New posts added regularly.
        </p>

        <ul className="blog-list" aria-label="All blog posts">
          {blogs.map((post) => (
            <li key={post.slug} className="blog-card card" id={post.slug}>
              <Link to={`/blog/${post.slug}`} className="blog-card__link" aria-label={post.title}>
                <span className="blog-card__media" aria-hidden="true">
                  <img src={post.image} alt="" loading="lazy" />
                </span>
                <div className="blog-card__content">
                  <div className="blog-card__meta">
                    <time dateTime={post.date} className="blog-card__date">
                      {new Date(post.date).toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'short',
                        day: '2-digit',
                      })}
                    </time>
                    <span aria-hidden>·</span>
                    <span>{post.readTime} min read</span>
                  </div>
                  <h2 className="blog-card__title">{post.title}</h2>
                  <p className="blog-card__summary">{post.summary}</p>
                  <div className="blog-card__tags">
                    {post.tags.map((tag) => (
                      <span className="blog-tag" key={tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="blog-card__actions">
                    <span className="blog-card__read">Read Article →</span>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}


