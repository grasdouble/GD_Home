import { fireEvent, render, screen } from '@testing-library/react';
import { useState } from 'react';
import { expect, it } from 'vitest';
import Projects from './Projects.jsx';

const repos = [
  { id: 'kitia', name: 'Kitia', description: { en: 'AI tools', fr: 'Outils d’IA' }, language: 'TypeScript', siteUrl: 'https://kitia.example', repositoryUrl: 'https://github.com/grasdouble/Kitia' },
  { id: 'lufa', name: 'Lufa', description: { en: 'Design system', fr: 'Système de design' }, language: 'TypeScript', siteUrl: '', repositoryUrl: 'https://github.com/grasdouble/Lufa' },
  { id: 'dashboard', name: 'Dashboard', description: { en: 'Repository tools', fr: 'Outils de dépôt' }, language: 'JavaScript', siteUrl: '', repositoryUrl: 'https://github.com/grasdouble/Dashboard' },
];

const text = {
  discover: 'Discover', visible: 'projects shown', filter: 'Filter by technology', search: 'Search projects',
  empty: 'No projects match your search.', web: 'WEB PROJECT', project: 'Project', online: 'LIVE',
  github: 'ON GITHUB', visit: 'Visit website', view: 'View project',
};

function ProjectsHarness() {
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('Tous');
  return <Projects repos={repos} locale="en" text={text} query={query} onQueryChange={setQuery} activeFilter={activeFilter} onFilterChange={setActiveFilter} />;
}

it('filters projects by technology and keeps the selected category visible', () => {
  render(<ProjectsHarness />);

  fireEvent.click(screen.getByRole('button', { name: 'TypeScript' }));

  expect(screen.getAllByRole('article')).toHaveLength(2);
  expect(screen.getByRole('button', { name: 'TypeScript' })).toHaveAttribute('aria-pressed', 'true');
  expect(screen.queryByRole('heading', { name: 'Dashboard' })).not.toBeInTheDocument();
});

it('applies search within the active category and shows the empty state', () => {
  render(<ProjectsHarness />);

  fireEvent.click(screen.getByRole('button', { name: 'TypeScript' }));
  fireEvent.change(screen.getByRole('textbox', { name: 'Search projects' }), { target: { value: 'missing' } });

  expect(screen.queryByRole('article')).not.toBeInTheDocument();
  expect(screen.getByText('No projects match your search.')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'TypeScript' })).toHaveAttribute('aria-pressed', 'true');
});
