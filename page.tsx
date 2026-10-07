'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import BottomNavigation from '@/components/BottomNavigation';
import CitySelector from '@/components/CitySelector';
import UserProfileModal from '@/components/UserProfileModal';

import { UserProfile } from '@/lib/types';
import { SUPPORTED_CITIES } from '@/lib/cities';
import { getUserProfile, saveUserProfile, saveSavedCity } from '@/lib/storage';
import { User, Bell, MapPin, ShieldAlert, Moon, Info, Check } from 'lucide-react';

export default function SettingsPage() {
  const [profile, setProfile] = useState<UserProfile>(getUserProfile());
  const [isCityModalOpen, setIsCityModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  useEffect(() => {
    setProfile(getUserProfile());
  }, []);

  const toggleNotifications = () => {
    const updated = saveUserProfile({ notifications: !profile.notifications });
    setProfile(updated);
  };

  return (
    <div className="min-h-screen pb-24 md:pb-12 flex flex-col">
      <Header
        currentCity={profile.defaultCity}
        onOpenCitySelector={() => setIsCityModalOpen(true)}
        userProfile={profile}
        onOpenProfileModal={() => setIsProfileModalOpen(true)}
      />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 pt-6 space-y-6">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">Settings</h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Manage your personal profile, notification alerts, location defaults, and app preferences.
          </p>
        </div>

        {/* User Profile Card */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-sky-500 text-white flex items-center justify-center font-bold text-xl shadow-md">
              {profile.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white">{profile.name}</h3>
              <p className="text-xs text-slate-500">
                Age: <span className="font-semibold text-slate-700 dark:text-slate-300">{profile.ageGroup.toUpperCase()}</span> | Health: <span className="font-semibold text-slate-700 dark:text-slate-300">{profile.healthCondition.toUpperCase()}</span>
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsProfileModalOpen(true)}
            className="px-3.5 py-1.5 rounded-xl bg-sky-50 dark:bg-sky-950 text-sky-600 dark:text-sky-400 font-bold text-xs hover:bg-sky-100"
          >
            Edit Profile
          </button>
        </div>

        {/* Settings Options List */}
        <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden">
          {/* Location */}
          <div
            onClick={() => setIsCityModalOpen(true)}
            className="p-5 flex items-center justify-between cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-sky-500" />
              <div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">Default Location</h4>
                <p className="text-xs text-slate-500">Currently set to {profile.defaultCity}</p>
              </div>
            </div>
            <span className="text-xs font-bold text-sky-600">{profile.defaultCity} &rarr;</span>
          </div>

          {/* Notifications Toggle */}
          <div className="p-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-amber-500" />
              <div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">AQI Alert Notifications</h4>
                <p className="text-xs text-slate-500">Receive alerts when predicted AQI exceeds 150</p>
              </div>
            </div>
            <button
              onClick={toggleNotifications}
              className={`w-12 h-6 rounded-full transition-colors relative ${profile.notifications ? 'bg-sky-500' : 'bg-slate-300 dark:bg-slate-700'}`}
            >
              <span className={`w-5 h-5 rounded-full bg-white shadow-md absolute top-0.5 transition-transform ${profile.notifications ? 'right-0.5' : 'left-0.5'}`} />
            </button>
          </div>
        </div>

        {/* About & Medical Disclaimer */}
        <div className="p-6 rounded-3xl bg-slate-100 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800 space-y-3">
          <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-sm">
            <Info className="w-4 h-4 text-sky-500" /> About AirGuide
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            <strong>AirGuide</strong> (&quot;Know your air. Plan your day.&quot;) bridges machine-learning air quality predictions with personalized outdoor activity and health advisory recommendations.
          </p>
          <div className="pt-2 text-[11px] text-slate-500 dark:text-slate-400 border-t border-slate-200/60 dark:border-slate-800">
            <strong>Disclaimer:</strong> AirGuide provides general AQI-based outdoor activity guidance and is not a substitute for professional medical diagnosis or personalized healthcare advice.
          </div>
        </div>
      </main>

      <BottomNavigation />

      <CitySelector
        isOpen={isCityModalOpen}
        onClose={() => setIsCityModalOpen(false)}
        selectedCity={profile.defaultCity}
        onSelectCity={(city) => {
          saveSavedCity(city);
          setProfile(getUserProfile());
        }}
        supportedCities={SUPPORTED_CITIES}
      />

      <UserProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        profile={profile}
        onSave={(updated) => {
          setProfile(saveUserProfile(updated));
        }}
      />
    </div>
  );
}
