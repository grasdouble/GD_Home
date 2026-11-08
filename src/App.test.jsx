import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, expect, it } from 'vitest';
import App from './App.jsx';

function setBrowserLanguages(languages) {
  Object.defineProperty(navigator, 'languages', { configurable: true, value: languages });
  Object.defineProperty(navigator, 'language', { configurable: true, value: languages[0] });
}

beforeEach(() => {
  localStorage.clear();
  setBrowserLanguages(['fr-CA', 'en-US']);
});

it('uses the first supported browser language when no preference is saved', async () => {
  render(<App />);

  expect(screen.getByRole('heading', { level: 1 }).textContent).toContain('Des idées qui');
  await waitFor(() => expect(document.documentElement).toHaveAttribute('lang', 'fr'));
});

it('prefers a saved language and persists later user changes', async () => {
  localStorage.setItem('grasdouble-locale', 'en');
  render(<App />);

  expect(screen.getByRole('heading', { level: 1 }).textContent).toContain('Ideas that');
  await waitFor(() => expect(document.documentElement).toHaveAttribute('lang', 'en'));

  fireEvent.click(screen.getByRole('button', { name: 'FR' }));

  await waitFor(() => expect(document.documentElement).toHaveAttribute('lang', 'fr'));
  expect(localStorage.getItem('grasdouble-locale')).toBe('fr');
});
