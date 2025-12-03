import { useEffect } from 'react';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  canonicalUrl?: string;
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title = 'Kachchapi - AI Skills Training & Industry-Ready Software Development Courses',
  description = 'Master AI skills, machine learning, and software development with industry-ready training. Learn from experienced professionals with project-based learning, interview preparation, and career guidance.',
  keywords = 'AI skills training, machine learning courses, software development training, industry-ready skills, AI training online, Gen AI courses, data science training, deep learning courses, interview preparation, career guidance, project-based learning, online tech training, software engineering courses, AI certification, programming bootcamp',
  ogImage = '/og-image.jpg',
  canonicalUrl = 'https://demo.kachchapi.com/'
}) => {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, attribute: string = 'name') => {
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Update meta tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    updateMetaTag('og:title', title, 'property');
    updateMetaTag('og:description', description, 'property');
    updateMetaTag('og:image', ogImage, 'property');
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', ogImage);

    // Update canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', canonicalUrl);
  }, [title, description, keywords, ogImage, canonicalUrl]);

  return null;
};

export default SEOHead;

