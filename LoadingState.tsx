import React from 'react';

export default function LoadingState() {
  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 animate-pulse space-y-4">
      <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/3" />
      <div className="h-14 bg-slate-200 dark:bg-slate-700 rounded w-1/2" />
      <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-3/4" />
      <div className="pt-4 grid grid-cols-2 gap-3">
        <div className="h-16 bg-slate-200 dark:bg-slate-700 rounded-2xl" />
        <div className="h-16 bg-slate-200 dark:bg-slate-700 rounded-2xl" />
      </div>
    </div>
  );
}
