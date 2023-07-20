'use client';
import Link from 'next/link';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import { ISidebar, icons } from '@/helpers/side-bar';

interface SidebarProps {
  link: ISidebar;
}

export const SidebarLink = ({ link }: SidebarProps) => {
  const pathname = usePathname();
  let isActive = false;

  if (pathname === link.link) {
    isActive = true;
  }

  const Icon = icons[link.icon];

  return (
    <Link href={link.link} className="flex w-full items-center justify-center">
      <Icon
        size={40}
        className={clsx(
          'stroke-gray-400 transition duration-200 ease-in-out hover:stroke-violet-600',
          isActive && 'stroke-violet-600'
        )}
      />
    </Link>
  );
};
