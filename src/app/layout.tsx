import type {Metadata} from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import ChatAssistant from '@/components/chat-assistant';
import { AuthProvider } from '@/components/auth-provider';

export const metadata: Metadata = {
  title: 'Zyro API - Simple & Reliable Song API',
  description: 'A powerful API to download YouTube audio and video with ease. Reliable, fast, and easy to integrate.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className={cn('font-body antialiased bg-background min-h-screen flex flex-col')}>
        <AuthProvider>
          {children}
        </AuthProvider>
        <ChatAssistant />
        <Toaster />
      </body>
    </html>
  );
}
