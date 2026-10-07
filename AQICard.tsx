'use client';

import React from 'react';
import { AQIPrediction, AQIRecommendation, UserProfile } from '@/lib/types';
import { Wind, ShieldAlert, Sparkles, AlertTriangle } from 'lucide-react';

interface AQICardProps {
  prediction: AQIPrediction;
  recommendation: AQIRecommendation;
  userProfile: UserProfile;
}

export default function AQICard({ prediction, recommendation, userProfile }: AQICardProps) {
  return (
    <div className={`relative overflow-hidden rounded-3xl p-6 sm:p-8 border shadow-lg transition-all ${recommendation.bgColor} ${recommendation.borderColor}`}>
      {/* Background Decorative Accent */}
      <div
        className="absolute -right-10 -bottom-10 w-48 h-48 rounded-full opacity-10 blur-2xl pointer-events-none"
        style={{ backgroundColor: recommendation.badgeColor }}
      />

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Wind className="w-5 h-5 text-slate-600 dark:text-slate-300" />
          <h2 className="text-xs sm:text-sm font-bold tracking-wider uppercase text-slate-600 dark:text-slate-300">
            Predicted Air Quality • {prediction.city}
          </h2>
        </div>
        <span
          className="px-3 py-1 rounded-full text-xs font-bold text-white shadow-sm"
          style={{ backgroundColor: recommendation.badgeColor }}
        >
          {recommendation.category.toUpperCase()}
        </span>
      </div>

      {/* Hero AQI Numeric Display */}
      <div className="flex items-baseline gap-4 my-2">
        <span className="text-6xl sm:text-7xl font-black tracking-tight text-slate-900 dark:text-white">
          {prediction.aqi}
        </span>
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">
            AQI Score
          </span>
          <span className={`text-sm font-bold ${recommendation.textColor}`}>
            {recommendation.category}
          </span>
        </div>
      </div>

      {/* Today's Main Outdoor Recommendation */}
      <div className="mt-6 pt-5 border-t border-slate-200/60 dark:border-slate-800">
        <div className="flex items-center gap-2 mb-1.5">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Today&apos;s Outdoor Recommendation
          </h3>
        </div>
        <h4 className={`text-lg sm:text-xl font-extrabold ${recommendation.textColor} leading-tight`}>
          {recommendation.headline}
        </h4>
        <p className="mt-1.5 text-sm font-medium text-slate-700 dark:text-slate-300 leading-relaxed">
          {recommendation.primaryAdvice}
        </p>

        {/* Personalized Health Alert Callout */}
        {recommendation.userVulnerabilityNotice && (
          <div className="mt-4 p-3.5 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-amber-300 dark:border-amber-700/60 flex items-start gap-3 shadow-sm">
            <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div className="text-xs text-slate-800 dark:text-slate-200 leading-snug font-medium">
              <span className="font-bold text-amber-700 dark:text-amber-400">
                Personalized Advice for {userProfile.name}:
              </span>{' '}
              {recommendation.userVulnerabilityNotice}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
