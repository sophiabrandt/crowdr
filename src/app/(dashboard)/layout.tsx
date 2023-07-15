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
      <body className="h-screen w-screen candy-mesh p-6">
        <GlassPane className="w-full h-full p-6 flex align-center container mx-auto">
          <Sidebar />
          {children}
        </GlassPane>
      </body>
    </html>
  );
}
