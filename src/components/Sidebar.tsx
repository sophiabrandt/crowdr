import Image from 'next/image';
import logo from '@/assets/images/logo.svg';
import { Card } from './Card';
import { SidebarLink } from './SidebarLink';
import { links } from '@/shared/side-bar';

export const Sidebar = () => {
  return (
    <Card className="h-full w-40 flex items-center justify-between flex-wrap">
      <div className="w-full flex justify-center items-center">
        <Image src={logo} alt="Able logo" priority className="w-14" />
      </div>
      {links.map((link) => (
        <SidebarLink link={link} key={link.label} />
      ))}
    </Card>
  );
};
