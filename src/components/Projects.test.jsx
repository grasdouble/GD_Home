import { fireEvent, render, screen, within } from '@testing-library/react';
import { useState } from 'react';
import { expect, it } from 'vitest';
import Projects from './Projects.jsx';

const repos = [
  { id: 'kitia', name: 'Kitia', description: { en: 'AI tools', fr: 'Outils d’IA' }, tags: ['TUI', 'CLI', 'AI'], siteUrl: 'https://kitia.example', repositoryUrl: 'https://github.com/grasdouble/Kitia' },
  { id: 'lufa', name: 'Lufa', description: { en: 'Design system', fr: 'Système de design' }, tags: ['TypeScript', 'Design System', 'Storybook'], siteUrl: '', repositoryUrl: 'https://github.com/grasdouble/Lufa' },
  { id: 'dashboard', name: 'Dashboard', description: { en: 'Repository tools', fr: 'Outils de dépôt' }, tags: ['JavaScript', 'Automation'], siteUrl: '', repositoryUrl: 'https://github.com/grasdouble/Dashboard' },
];

const text = {
  discover: 'Discover', visible: 'projects shown', filter: 'Filter by tag', search: 'Search projects',
  empty: 'No projects match your search.', online: 'LIVE',
  github: 'ON GITHUB', visit: 'Visit website', view: 'View project',
};


function ProjectsHarness() {
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('Tous');
  return <Projects repos={repos} locale="en" text={text} query={query} onQueryChange={setQuery} activeFilter={activeFilter} onFilterChange={setActiveFilter} />;
}

it('filters by any assigned tag and displays all tags on each project', () => {
  render(<ProjectsHarness />);

  fireEvent.click(screen.getByRole('button', { name: 'CLI' }));

  const card = screen.getByRole('article');
  expect(screen.getAllByRole('article')).toHaveLength(1);
  expect(screen.getByRole('heading', { name: 'Kitia' })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'CLI' })).toHaveAttribute('aria-pressed', 'true');
  expect(within(card).getAllByText('TUI')).toHaveLength(2);
  expect(within(card).getByText('AI')).toBeInTheDocument();
});

it('applies search within the active tag and shows the empty state', () => {
  render(<ProjectsHarness />);

  fireEvent.click(screen.getByRole('button', { name: 'TypeScript' }));
  fireEvent.change(screen.getByRole('textbox', { name: 'Search projects' }), { target: { value: 'missing' } });

  expect(screen.queryByRole('article')).not.toBeInTheDocument();
  expect(screen.getByText('No projects match your search.')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'TypeScript' })).toHaveAttribute('aria-pressed', 'true');
});
