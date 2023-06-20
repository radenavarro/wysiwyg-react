import { render, screen } from '@testing-library/react';
import WYSIWYGText from './WYSIWYGText';

test('renders learn react link', () => {
  render(<WYSIWYGText />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
