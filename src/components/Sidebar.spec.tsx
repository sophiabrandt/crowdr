import { render, screen } from '@testing-library/react';
import { Sidebar } from './Sidebar';

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ priority, ...props }: { priority: boolean | undefined }) => {
    // eslint-disable-next-line jsx-a11y/alt-text, react/react-in-jsx-scope
    return <img {...props} />;
  },
}));

jest.mock('@/helpers/side-bar', () => ({
  links: [
    { label: 'Link1', href: '/link1' },
    { label: 'Link2', href: '/link2' },
  ],
}));

jest.mock('./SidebarLink', () => ({
  __esModule: true,
  SidebarLink: ({ link }: { link: { label: string; href: string } }) => (
    // eslint-disable-next-line react/react-in-jsx-scope
    <a href={link.href}>{link.label}</a>
  ),
}));

describe('Sidebar', () => {
  it('renders Sidebar component', () => {
    render(<Sidebar />);

    const logo = screen.getByAltText('Able logo');
    expect(logo).toBeInTheDocument();

    const links = screen.getAllByRole('link');
    expect(links.length).toBe(2);
  });
});
