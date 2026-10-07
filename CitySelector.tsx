'use client';

import React, { useState } from 'react';
import { Search, MapPin, X, Check } from 'lucide-react';

interface CitySelectorProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCity: string;
  onSelectCity: (city: string) => void;
  supportedCities: string[];
}

export default function CitySelector({
  isOpen,
  onClose,
  selectedCity,
  onSelectCity,
  supportedCities,
}: CitySelectorProps) {
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const filteredCities = supportedCities.filter((c) =>
    c.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-md overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-sky-500" />
            <h3 className="font-bold text-lg text-slate-900 dark:text-white">Select Location</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-4 bg-slate-50 dark:bg-slate-900/50">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search city (e.g. Chennai, Bengaluru)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
              autoFocus
            />
          </div>
        </div>

        {/* City List */}
        <div className="max-h-64 overflow-y-auto p-2 no-scrollbar">
          {filteredCities.length > 0 ? (
            filteredCities.map((city) => {
              const isSelected = city === selectedCity;
              return (
                <button
                  key={city}
                  onClick={() => {
                    onSelectCity(city);
                    onClose();
                  }}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                    isSelected
                      ? 'bg-sky-50 dark:bg-sky-950/40 text-sky-600 dark:text-sky-400'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-sky-500" />
                    <span>{city}</span>
                  </div>
                  {isSelected && <Check className="w-4 h-4 text-sky-500 stroke-[3]" />}
                </button>
              );
            })
          ) : (
            <div className="p-6 text-center text-slate-500 text-sm">
              No matching city found. Try searching another metro.
            </div>
          )}
        </div>

        <div className="p-4 bg-slate-50 dark:bg-slate-800/40 text-center text-xs text-slate-500 border-t border-slate-100 dark:border-slate-800">
          Showing ML-supported monitoring locations
        </div>
      </div>
    </div>
  );
}
