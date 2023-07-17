import '@/styles/global.css';
import clsx from 'clsx';
import { GlassPane } from '@/components/Glasspane';
import { Inter } from 'next/font/google';
import { Sidebar } from '@/components/Sidebar';

const inter = Inter({ subsets: ['latin'] });

export default function DashboardRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={clsx(inter.className, 'dark')}>
      <head />
      <body className="candy-mesh h-screen w-screen p-6">
        <GlassPane className="align-center container mx-auto flex h-full w-full p-6">
          <Sidebar />
          {children}
        </GlassPane>
      </body>
    </html>
  );
}
