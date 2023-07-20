import { render, screen } from '@testing-library/react';
import { SidebarLink } from './SidebarLink';
import { ISidebar, icons } from '@/helpers/side-bar';
import * as NextNavigation from 'next/navigation';
import { assertType } from '@/helpers/testing-utils';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

describe('SidebarLink', () => {
  const mockLink: ISidebar = {
    label: 'Mock Link',
    link: '/mock-link',
    icon: 'Settings',
  };

  beforeEach(() => {
    assertType<jest.Mock>(NextNavigation.usePathname).mockReturnValue(
      '/mock-link'
    );
    icons['Settings'] = () => <svg data-testid="mock-icon"></svg>;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders SidebarLink component', () => {
    render(<SidebarLink link={mockLink} />);

    expect(screen.getByTestId('mock-icon')).toBeInTheDocument();
  });
});
