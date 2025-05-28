
import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product' | 'event';
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  noIndex?: boolean;
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title = 'NuFlow - Explore, Pedale, Compre, Conecte',
  description = 'Encontre experiências de ciclismo, compre bikes e equipamentos, conecte-se com a comunidade cycling em um só lugar.',
  keywords = ['ciclismo', 'bike', 'mtb', 'speed', 'gravel', 'eventos', 'marketplace', 'comunidade'],
  image = '/placeholder.svg',
  url = 'https://nuflow.com.br',
  type = 'website',
  author = 'NuFlow',
  publishedTime,
  modifiedTime,
  noIndex = false
}) => {
  const siteTitle = 'NuFlow';
  const fullTitle = title.includes(siteTitle) ? title : `${title} | ${siteTitle}`;
  const fullUrl = url.startsWith('http') ? url : `https://nuflow.com.br${url}`;
  const fullImage = image.startsWith('http') ? image : `https://nuflow.com.br${image}`;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": type === 'website' ? 'WebSite' : 'WebPage',
    "name": fullTitle,
    "description": description,
    "url": fullUrl,
    "image": fullImage,
    "author": {
      "@type": "Organization",
      "name": author
    },
    ...(publishedTime && { "datePublished": publishedTime }),
    ...(modifiedTime && { "dateModified": modifiedTime })
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />
      <meta name="author" content={author} />
      <link rel="canonical" href={fullUrl} />
      
      {/* Robots */}
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
      
      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:site_name" content={siteTitle} />
      <meta property="og:locale" content="pt_BR" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />
      
      {/* Article specific */}
      {type === 'article' && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {type === 'article' && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};

export default SEOHead;
