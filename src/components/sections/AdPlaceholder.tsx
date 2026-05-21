import { cn } from '@/lib/utils';

interface AdPlaceholderProps {
  width?: string;
  height?: string;
  label?: string;
  className?: string;
}

export default function AdPlaceholder({ width, height, label, className }: AdPlaceholderProps) {
  const displayLabel = label || `Ad Space — ${width || '300'}×${height || '250'}`;

  return (
    <div
      className={cn(
        'rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 flex items-center justify-center',
        className
      )}
      style={{ width: width ? `${width}px` : '100%', height: height ? `${height}px` : '250px' }}
    >
      <span className="text-sm text-gray-400 dark:text-gray-500 font-medium">
        {displayLabel}
      </span>
    </div>
  );
}
