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
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setImgSrc(fallbackSrc);
    }
  };

  if (fill) {
    return (
      <img
        src={imgSrc}
        alt={alt}
        onError={handleError}
        loading="lazy"
        className={`absolute inset-0 w-full h-full object-cover ${className}`}
      />
    );
  }

  return (
    <img
      src={imgSrc}
      alt={alt}
      onError={handleError}
      loading="lazy"
      className={`w-full h-full object-cover ${className}`}
    />
  );
}
