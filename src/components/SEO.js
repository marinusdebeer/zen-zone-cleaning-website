import React from 'react';
import { Helmet } from 'react-helmet-async';

const absoluteUrl = (path = '') => `https://zenzonecleaning.com${path}`;

/**
 * SEO renders standard meta tags, Open Graph/Twitter tags, canonical link,
 * and optional JSON-LD structured data blocks.
 */
export default function SEO({
  title = 'Zen Zone Cleaning Services',
  description = 'House cleaning in Simcoe County. Reliable, background‑checked cleaners. Get a free estimate.',
  path = '/',
  image = '/images/hero.avif',
  jsonLd = null,
  robots = 'index,follow',
}) {
  const url = absoluteUrl(path);
  const img = absoluteUrl(image);
  const jsonBlocks = Array.isArray(jsonLd) ? jsonLd : jsonLd ? [jsonLd] : [];

  return (
    <Helmet>
      <title>{title}</title>
      <link rel="canonical" href={url} />
      <meta name="description" content={description} />
      <meta name="robots" content={robots} />
      <meta name="theme-color" content="#0ea5e9" />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={img} />
      <meta property="og:site_name" content="Zen Zone Cleaning" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={img} />

      {jsonBlocks.map((obj, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(obj)}
        </script>
      ))}
    </Helmet>
  );
}
