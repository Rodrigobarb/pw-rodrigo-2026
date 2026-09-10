import { render, screen } from '@testing-library/react';
import App from './App';

test('renderiza o menu da aplicação', () => {
  render(<App />);
  const marca = screen.getAllByText(/pw-rodrigo-2026/i);
  expect(marca.length).toBeGreaterThan(0);
});
