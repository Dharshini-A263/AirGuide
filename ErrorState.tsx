import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export default function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div className="p-8 rounded-3xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900 text-center space-y-3">
      <AlertCircle className="w-10 h-10 text-rose-500 mx-auto" />
      <h3 className="font-bold text-base text-rose-900 dark:text-rose-200">Unable to load prediction</h3>
      <p className="text-xs text-rose-700 dark:text-rose-400 max-w-xs mx-auto">
        {message || "We couldn't retrieve the latest air quality prediction for this city."}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 rounded-xl bg-rose-600 text-white font-bold text-xs shadow-md hover:bg-rose-700 transition-colors inline-flex items-center gap-2"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Try Again
        </button>
      )}
    </div>
  );
}
