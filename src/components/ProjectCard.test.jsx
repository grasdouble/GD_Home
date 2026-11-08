import { fireEvent, render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import ProjectCard from './ProjectCard.jsx';

const text = {
  web: 'WEB PROJECT', project: 'Project', online: 'LIVE', github: 'ON GITHUB',
  orgProject: 'A Grasdouble project.', visit: 'Visit website', view: 'View project',
};

it('renders a live project with its preview and website destination', () => {
  render(
    <ProjectCard
      project={{ id: 'kitia', name: 'Kitia', description: 'AI tools', language: 'TypeScript', siteUrl: 'https://kitia.example', repositoryUrl: 'https://github.com/grasdouble/Kitia', placeholderImage: 'placeholder-analytics.webp' }}
      index={0}
      locale="en"
      text={text}
    />,
  );

  expect(screen.getByRole('heading', { name: 'Kitia' })).toBeInTheDocument();
  expect(screen.getByRole('img', { name: 'Preview of Kitia' })).toHaveAttribute('src', '/images/projects/kitia.webp');
  expect(screen.getByText('LIVE')).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /Visit website/ })).toHaveAttribute('href', 'https://kitia.example');
  expect(screen.getByRole('link', { name: 'GitHub Kitia' })).toHaveAttribute('href', 'https://github.com/grasdouble/Kitia');
});

it('uses the repository as the main destination when the project has no website', () => {
  render(
    <ProjectCard
      project={{ id: 'lufa', name: 'Lufa', description: '', language: 'JavaScript', siteUrl: '', repositoryUrl: 'https://github.com/grasdouble/Lufa', placeholderImage: 'placeholder-coding.webp' }}
      index={1}
      locale="fr"
      text={text}
    />,
  );

  expect(screen.getByText('ON GITHUB')).toBeInTheDocument();
  expect(screen.getByText('A Grasdouble project.')).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /View project/ })).toHaveAttribute('href', 'https://github.com/grasdouble/Lufa');
  expect(screen.getByRole('img', { name: 'Aperçu de Lufa' })).toBeInTheDocument();
  const preview = screen.getByRole('img', { name: 'Aperçu de Lufa' });
  expect(preview).toHaveAttribute('src', '/images/projects/lufa.webp');

  fireEvent.error(preview);
  expect(preview).toHaveAttribute('src', '/images/project-placeholders/placeholder-coding.webp');
});
