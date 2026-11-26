import { useState } from 'react';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
  priority?: boolean;
  draggable?: boolean;
}

export function ResilientImage({
  src,
  alt,
  className = 'w-full h-full object-cover',
  fallbackTitle = 'Porsche 911 GT3 RS',
  priority = false,
  draggable = false,
}: ResilientImageProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  if (hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#16181D] via-[#0F1014] to-[#0A0A0C] border border-white/10 p-6 text-center"
      >
        <svg
          width="48"
          height="24"
          viewBox="0 0 64 28"
          fill="none"
          aria-hidden="true"
          className="text-white/30 mb-3"
        >
          <path
            d="M4 20h56M10 20c1.5-5 6.5-9 14-10l12-2c6 0 12 3 16 7l6 2v3"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="17" cy="20" r="4" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="47" cy="20" r="4" stroke="currentColor" strokeWidth="1.5" />
        </svg>
        <p className="text-sm font-medium text-white/70">{fallbackTitle}</p>
        <p className="text-xs text-white/40 mt-1 max-w-xs">{alt}</p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full overflow-hidden bg-[#0D0E11]">
      {!isLoaded && (
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-[#101216] via-[#171A20] to-[#101216] animate-pulse"
        />
      )}
      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        draggable={draggable}
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={`${className} transition-opacity duration-500 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
}
