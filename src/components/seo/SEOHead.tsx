
import React from 'react';

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

  // Temporarily render basic HTML head tags instead of using Helmet
  // This prevents the "Cannot read properties of undefined" error
  React.useEffect(() => {
    document.title = fullTitle;
    
    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description);
    
    // Update meta keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', keywords.join(', '));
  }, [fullTitle, description, keywords]);

  return null; // Component doesn't render anything
};

export default SEOHead;
