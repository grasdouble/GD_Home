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
  const description = document.createElement('meta');
  description.name = 'description';
  document.head.append(description);
});

it('uses the first supported browser language when no preference is saved', async () => {
  render(<App />);

  expect(screen.getByRole('heading', { level: 1 }).textContent).toContain('Des idées qui');
  expect(screen.getByText(/Interface en terminal pour découvrir/)).toBeInTheDocument();
  await waitFor(() => expect(document.documentElement).toHaveAttribute('lang', 'fr'));
  expect(document.title).toBe('Grasdouble — Sites & projets');
  expect(document.querySelector('meta[name="description"]')).toHaveAttribute('content', "Explorez les sites et projets web de l'organisation GitHub grasdouble.");
});

it('prefers a saved language and persists later user changes', async () => {
  localStorage.setItem('grasdouble-locale', 'en');
  render(<App />);

  expect(screen.getByRole('heading', { level: 1 }).textContent).toContain('Ideas that');
  expect(screen.getByText(/A terminal UI for discovering/)).toBeInTheDocument();
  await waitFor(() => expect(document.documentElement).toHaveAttribute('lang', 'en'));
  expect(document.title).toBe('Grasdouble — Websites & projects');
  expect(document.querySelector('meta[name="description"]')).toHaveAttribute('content', 'Explore the websites and web projects of the Grasdouble GitHub organization.');

  fireEvent.click(screen.getByRole('button', { name: 'FR' }));

  await waitFor(() => expect(document.documentElement).toHaveAttribute('lang', 'fr'));
  expect(document.title).toBe('Grasdouble — Sites & projets');
  expect(document.querySelector('meta[name="description"]')).toHaveAttribute('content', "Explorez les sites et projets web de l'organisation GitHub grasdouble.");
  expect(localStorage.getItem('grasdouble-locale')).toBe('fr');
  expect(screen.getByText(/Interface en terminal pour découvrir/)).toBeInTheDocument();
});
