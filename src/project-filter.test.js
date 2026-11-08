import assert from 'node:assert/strict';
import test from 'node:test';
import { filterProjects } from './project-filter.js';

const projects = [
  { id: 'lufa-design', name: 'Lufa Design', description: 'Design system', language: 'TypeScript' },
  { id: 'kitia', name: 'Kitia', description: 'AI tools', language: 'TypeScript' },
  { id: 'dashboard', name: 'Dashboard', description: 'Repository tools', language: 'JavaScript' },
];

test('filters by language and search together without changing configured order', () => {
  const result = filterProjects(projects, { language: 'TypeScript', query: 'tools' });

  assert.deepEqual(result.map((project) => project.id), ['kitia']);
  assert.deepEqual(projects.map((project) => project.id), ['lufa-design', 'kitia', 'dashboard']);
});

test('searches names, descriptions, and languages without case sensitivity', () => {
  assert.deepEqual(filterProjects(projects, { query: 'DASHBOARD' }).map((project) => project.id), ['dashboard']);
  assert.deepEqual(filterProjects(projects, { query: 'ai tools' }).map((project) => project.id), ['kitia']);
  assert.deepEqual(filterProjects(projects, { query: 'typescript' }).map((project) => project.id), ['lufa-design', 'kitia']);
});

test('trims search input and returns projects in config order for an empty query', () => {
  assert.deepEqual(filterProjects(projects, { query: '   ' }).map((project) => project.id), ['lufa-design', 'kitia', 'dashboard']);
});
