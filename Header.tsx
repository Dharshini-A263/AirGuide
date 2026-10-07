'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Wind, MapPin, User, Bell, Sun, Moon } from 'lucide-react';
import { UserProfile } from '@/lib/types';

interface HeaderProps {
  currentCity: string;
  onOpenCitySelector: () => void;
  userProfile: UserProfile;
  onOpenProfileModal: () => void;
}

export default function Header({
  currentCity,
  onOpenCitySelector,
  userProfile,
  onOpenProfileModal,
}: HeaderProps) {
  const pathname = usePathname();

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Activity', href: '/activity' },
    { name: 'History', href: '/history' },
    { name: 'Settings', href: '/settings' },
  ];

  return (
    <header className="sticky top-0 z-30 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-sky-500 text-white flex items-center justify-center shadow-md shadow-sky-500/20 group-hover:scale-105 transition-transform">
            <Wind className="w-5 h-5 stroke-[2.5]" />
          </div>
          <div>
            <span className="font-bold text-lg tracking-tight text-slate-900 dark:text-white leading-none block">
              AirGuide
            </span>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium tracking-wide uppercase">
              Know your air
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-100 dark:bg-slate-800/60 p-1 rounded-xl">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-white dark:bg-slate-900 text-sky-600 dark:text-sky-400 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Header Action Buttons */}
        <div className="flex items-center gap-2">
          {/* City Button */}
          <button
            onClick={onOpenCitySelector}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs sm:text-sm font-semibold transition-colors"
          >
            <MapPin className="w-4 h-4 text-sky-500" />
            <span>{currentCity}</span>
          </button>

          {/* User Profile Pill Button */}
          <button
            onClick={onOpenProfileModal}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-sky-500 text-slate-700 dark:text-slate-300 text-xs font-medium transition-colors"
            title="Edit Profile & Health Details"
          >
            <User className="w-4 h-4 text-slate-500" />
            <span className="hidden sm:inline max-w-[90px] truncate">{userProfile.name}</span>
            {userProfile.healthCondition !== 'none' && (
              <span className="w-2 h-2 rounded-full bg-amber-500" title="Pre-existing Condition Active" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
