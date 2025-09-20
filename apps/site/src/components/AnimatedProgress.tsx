"use client";
import { useState, useEffect } from 'react';

interface AnimatedProgressProps {
  value: number;
  showPercentage?: boolean;
  className?: string;
}

export function AnimatedProgress({ value, showPercentage = false, className }: AnimatedProgressProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(value);
    }, 100);

    return () => clearTimeout(timer);
  }, [value]);

  return (
    <div className={`w-full ${className}`}>
      <div className="w-full bg-muted rounded-full h-2">
        <div
          className="bg-primary h-2 rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      {showPercentage && (
        <span className="text-sm text-muted-foreground">
          {progress}%
        </span>
      )}
    </div>
  );
}
