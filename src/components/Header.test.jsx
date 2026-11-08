import { fireEvent, render, screen } from '@testing-library/react';
import { expect, it, vi } from 'vitest';
import Header from './Header.jsx';

it('exposes the current locale and reports the selected language', () => {
  const onLocaleChange = vi.fn();
  render(
    <Header
      locale="fr"
      onLocaleChange={onLocaleChange}
      organizationLabel="Organisation GitHub"
      languageLabel="Langue"
    />,
  );

  expect(screen.getByRole('button', { name: 'FR' })).toHaveAttribute('aria-pressed', 'true');
  expect(screen.getByRole('button', { name: 'EN' })).toHaveAttribute('aria-pressed', 'false');
  expect(screen.getByRole('link', { name: /Organisation GitHub/ })).toHaveAttribute('href', 'https://github.com/grasdouble');

  fireEvent.click(screen.getByRole('button', { name: 'EN' }));
  expect(onLocaleChange).toHaveBeenCalledWith('en');
});
