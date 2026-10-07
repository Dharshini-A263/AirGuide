'use client';

import React, { useState } from 'react';
import { UserProfile, AgeGroup, HealthCondition } from '@/lib/types';
import { User, Heart, Shield, X, Save } from 'lucide-react';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile;
  onSave: (updated: Partial<UserProfile>) => void;
}

export default function UserProfileModal({
  isOpen,
  onClose,
  profile,
  onSave,
}: UserProfileModalProps) {
  const [name, setName] = useState(profile.name);
  const [ageGroup, setAgeGroup] = useState<AgeGroup>(profile.ageGroup);
  const [healthCondition, setHealthCondition] = useState<HealthCondition>(profile.healthCondition);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ name: name.trim() || 'Guest User', ageGroup, healthCondition });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-md overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 animate-in fade-in zoom-in-95 duration-200">
        <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-sky-500" />
            <h3 className="font-bold text-lg text-slate-900 dark:text-white">User Profile & Health Details</h3>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-slate-900 dark:hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          {/* Name */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
              Your Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Rajesh or Ananya"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-semibold text-slate-900 dark:text-white focus:ring-2 focus:ring-sky-500 outline-none"
            />
          </div>

          {/* Age Group */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
              Age Group
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { key: 'child', label: 'Child (0-14)' },
                { key: 'adult', label: 'Adult (15-59)' },
                { key: 'elderly', label: 'Elderly (60+)' },
              ].map((item) => (
                <button
                  type="button"
                  key={item.key}
                  onClick={() => setAgeGroup(item.key as AgeGroup)}
                  className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all ${
                    ageGroup === item.key
                      ? 'bg-sky-500 text-white border-sky-500 shadow-sm'
                      : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Pre-existing Health Conditions */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
              Health Record / Pre-existing Condition
            </label>
            <div className="space-y-2">
              {[
                { key: 'none', label: 'Healthy / No Pre-existing Conditions', desc: 'Standard ambient air sensitivity' },
                { key: 'asthma', label: 'Asthma / Respiratory Disorder', desc: 'Higher sensitivity to fine particulates & smog' },
                { key: 'cvd', label: 'Cardiovascular Disease / Heart Condition', desc: 'Sensitive to elevated CO & particulate vascular stress' },
              ].map((cond) => (
                <label
                  key={cond.key}
                  className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                    healthCondition === cond.key
                      ? 'bg-sky-50 dark:bg-sky-950/40 border-sky-500'
                      : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800'
                  }`}
                >
                  <input
                    type="radio"
                    name="healthCondition"
                    checked={healthCondition === cond.key}
                    onChange={() => setHealthCondition(cond.key as HealthCondition)}
                    className="mt-1 text-sky-500 focus:ring-sky-500"
                  />
                  <div>
                    <span className="block text-xs font-bold text-slate-900 dark:text-white">{cond.label}</span>
                    <span className="block text-[11px] text-slate-500 dark:text-slate-400">{cond.desc}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Action */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-sm shadow-lg shadow-sky-500/25 flex items-center justify-center gap-2 transition-all"
            >
              <Save className="w-4 h-4" />
              Save Profile & Personalize Advice
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
