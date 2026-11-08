import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import Hero from './Hero.jsx';

it('renders the localized headline, intro, explore anchor, and illustration label', () => {
  render(
    <Hero
      headline={<>Ideas that<br /><span>come to life.</span></>}
      intro={<>Web projects by <strong>Grasdouble</strong>.</>}
      explore="Explore projects"
      illustrationLabel="GrasDouble panda at a computer"
    />,
  );

  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Ideas thatcome to life.');
  expect(screen.getByText('Grasdouble')).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /Explore projects/ })).toHaveAttribute('href', '#projets');
  expect(screen.getByRole('img', { name: 'GrasDouble panda at a computer' })).toHaveAttribute('src', '/images/hero-panda.webp');
});
