import Image from 'next/image';
import logo from '@/assets/images/logo.svg';
import { Card } from './Card';
import { SidebarLink } from './SidebarLink';
import { links } from '@/helpers/side-bar';

export const Sidebar = () => {
  return (
    <Card className="flex h-full w-40 flex-wrap items-center justify-between">
      <div className="flex w-full items-center justify-center">
        <Image src={logo} alt="Able logo" priority className="w-14" />
      </div>
      {links.map((link) => (
        <SidebarLink link={link} key={link.label} />
      ))}
    </Card>
  );
};
