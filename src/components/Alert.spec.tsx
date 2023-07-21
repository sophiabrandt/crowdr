import { render, act, screen } from '@testing-library/react';
import { useAlert, Alert } from './Alert'; // Replace with your actual file

jest.useFakeTimers();

describe('useAlert', () => {
  it('should handle alert state correctly', () => {
    let result: any;
    const TestComponent = () => {
      result = useAlert();
      return null;
    };

    render(<TestComponent />);

    act(() => {
      result.setIsAlertOpen(true);
    });

    expect(result.isAlertOpen).toBe(true);

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(result.isAlertOpen).toBe(false);
  });
});

describe('Alert', () => {
  it('should render correctly', async () => {
    const portalRoot = document.createElement('div');
    document.body.appendChild(portalRoot);
    render(<Alert message="Test Error Message" />, {
      container: portalRoot,
    });

    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByText('Test Error Message')).toBeInTheDocument();
  });
});