import { ISidebar, links } from './side-bar';

describe('Sidebar links', () => {
  it('should contain the correct labels, icons and links', () => {
    const expectedLinks: ISidebar[] = [
      { label: 'Home', icon: 'Grid', link: '/home' },
      { label: 'Profile', icon: 'User', link: '/profile' },
      { label: 'Settings', icon: 'Settings', link: '/settings' },
    ];

    expectedLinks.forEach((expectedLink, index) => {
      expect(links[index].label).toEqual(expectedLink.label);
      expect(links[index].icon).toEqual(expectedLink.icon);
      expect(links[index].link).toEqual(expectedLink.link);
    });
  });
});
