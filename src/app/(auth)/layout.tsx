import '@/styles/global.css';
import { Inter } from 'next/font/google';
import { GlassPane } from '@/components/Glasspane';

const inter = Inter({ subsets: ['latin'] });

export default function AuthRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <head />
      <body className="h-screen w-screen rainbow-mesh p-6">
        <GlassPane className="w-full h-full flex items-center justify-center">
          {children}
        </GlassPane>
      </body>
    </html>
  );
}
