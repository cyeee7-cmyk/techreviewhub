'use client';

import { useState } from 'react';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
  fallbackSrc?: string;
  fill?: boolean;
}

export default function ImageWithFallback({
  src,
  alt,
  className = '',
  fallbackSrc = 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=450&fit=crop',
  fill = false,
}: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setImgSrc(fallbackSrc);
    }
  };

  return (
    <>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse" />
      )}
      <img
        src={imgSrc}
        alt={alt}
        className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        onError={handleError}
        onLoad={() => setIsLoading(false)}
        loading="lazy"
        {...(fill
          ? { style: { position: 'absolute', inset: 0, width: '100%', height: '100%' } }
          : { width: '100%', height: '100%' })}
      />
    </>
  );
}
