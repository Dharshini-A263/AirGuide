import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AirGuide — Know your air. Plan your day.',
  description: 'Real-time AQI prediction and personalized outdoor activity recommendation platform.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full font-sans antialiased text-slate-900 dark:text-slate-100 bg-slate-50 dark:bg-slate-950">
        {children}
      </body>
    </html>
  );
}
