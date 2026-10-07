'use client';

import React from 'react';
import { ActivityGuidance } from '@/lib/types';
import { ChevronRight } from 'lucide-react';

interface ActivityCardProps {
  guidance: ActivityGuidance;
  onClick?: () => void;
}

export default function ActivityCard({ guidance, onClick }: ActivityCardProps) {
  return (
    <div
      onClick={onClick}
      className="group cursor-pointer p-4 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-100 dark:border-slate-700/60 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-700/60 text-xl flex items-center justify-center group-hover:scale-110 transition-transform">
            {guidance.icon}
          </div>
          <div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">
              {guidance.title}
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
              {guidance.recommendationText}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${guidance.bgClass} ${guidance.colorClass}`}>
            {guidance.statusLabel}
          </span>
          <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-white transition-colors" />
        </div>
      </div>
    </div>
  );
}
