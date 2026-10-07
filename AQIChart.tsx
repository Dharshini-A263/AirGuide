'use client';

import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceLine,
} from 'recharts';
import { HistoryRecord } from '@/lib/types';

interface AQIChartProps {
  data: HistoryRecord[];
}

export default function AQIChart({ data }: AQIChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="p-8 text-center text-slate-400 text-sm">
        No AQI trend data available yet.
      </div>
    );
  }

  return (
    <div className="w-full h-64 sm:h-72">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
          <XAxis dataKey="dayName" stroke="#94a3b8" fontSize={12} tickLine={false} />
          <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} domain={[0, 'auto']} />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const item: HistoryRecord = payload[0].payload;
                return (
                  <div className="p-3 bg-slate-900 text-white rounded-xl shadow-xl border border-slate-700 text-xs">
                    <p className="font-bold">{item.dayName} ({item.date})</p>
                    <p className="text-sky-400 font-semibold mt-0.5">AQI: {item.aqi}</p>
                    <p className="text-slate-300">{item.category}</p>
                  </div>
                );
              }
              return null;
            }}
          />
          <ReferenceLine y={100} stroke="#f59e0b" strokeDasharray="3 3" label={{ value: 'Moderate Limit', fill: '#f59e0b', fontSize: 10 }} />
          <Line
            type="monotone"
            dataKey="aqi"
            stroke="#0284c7"
            strokeWidth={3}
            dot={{ r: 5, fill: '#0284c7', strokeWidth: 2, stroke: '#fff' }}
            activeDot={{ r: 7, fill: '#0369a1' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
