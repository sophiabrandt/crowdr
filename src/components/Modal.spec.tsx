import { render, act, screen } from '@testing-library/react';
import { Modal, useModal } from './Modal';

describe('useModal', () => {
  it('should handle modal state correctly', () => {
    let result: ReturnType<typeof useModal>;
    const TestComponent = () => {
      result = useModal();
      return null;
    };

    render(<TestComponent />);

    act(() => {
      result.setIsOpen(true);
    });

    expect(result!.isOpen).toBe(true);
  });
});

describe('Modal', () => {
  it('should render correctly', async () => {
    const portalRoot = document.createElement('div');
    document.body.appendChild(portalRoot);
    render(
      <Modal description="test description">
        <p>Child Component</p>
      </Modal>,
      {
        container: portalRoot,
      }
    );

    expect(screen.getByText('Child Component')).toBeInTheDocument();
    expect(screen.getByRole('dialog')).toHaveAccessibleName();
  });
});
