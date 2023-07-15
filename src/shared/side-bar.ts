import { Grid, Settings, User } from 'react-feather';

export type IconKeys = 'Settings' | 'User' | 'Grid';

export interface ISidebar {
  label: string;
  icon: IconKeys;
  link: string;
}

export const links: ISidebar[] = [
  { label: 'Home', icon: 'Grid', link: '/home' },
  { label: 'Profile', icon: 'User', link: '/profile' },
  {
    label: 'Settings',
    icon: 'Settings',
    link: '/settings',
  },
];

export const icons = { Settings, User, Grid };
