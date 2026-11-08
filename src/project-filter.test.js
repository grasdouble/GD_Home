import assert from 'node:assert/strict';
import test from 'node:test';
import { filterProjects } from './project-filter.js';
import configuredProjects from './projects.json' with { type: 'json' };
const projects = [
  { id: 'lufa-design', name: 'Lufa Design', description: { en: 'Design system', fr: 'Système de design' }, tags: ['TypeScript', 'Design System', 'Storybook'] },
  { id: 'kitia', name: 'Kitia', description: { en: 'AI tools', fr: 'Outils d’IA' }, tags: ['TUI', 'CLI', 'AI'] },
  { id: 'dashboard', name: 'Dashboard', description: { en: 'Repository tools', fr: 'Outils de dépôt' }, tags: ['JavaScript', 'Automation'] },
];

test('filters by tag and search together without changing configured order', () => {
  const result = filterProjects(projects, { tag: 'AI', query: 'tools' });

  assert.deepEqual(result.map((project) => project.id), ['kitia']);
  assert.deepEqual(projects.map((project) => project.id), ['lufa-design', 'kitia', 'dashboard']);
});

test('searches names, descriptions, and tags without case sensitivity', () => {
  assert.deepEqual(filterProjects(projects, { query: 'DASHBOARD' }).map((project) => project.id), ['dashboard']);
  assert.deepEqual(filterProjects(projects, { query: 'ai tools' }).map((project) => project.id), ['kitia']);
  assert.deepEqual(filterProjects(projects, { query: 'typescript' }).map((project) => project.id), ['lufa-design']);
  assert.deepEqual(filterProjects(projects, { query: 'storybook' }).map((project) => project.id), ['lufa-design']);
});

test('searches descriptions in either supported language', () => {
  assert.deepEqual(filterProjects(projects, { query: 'outils d’ia' }).map((project) => project.id), ['kitia']);
});

test('every configured project has a non-empty description in both supported languages', () => {
  for (const project of configuredProjects) {
    assert.deepEqual(Object.keys(project.description).sort(), ['en', 'fr']);
    assert.ok(project.description.en.trim(), `${project.id} is missing its English description`);
    assert.ok(project.description.fr.trim(), `${project.id} is missing its French description`);
    assert.ok(Array.isArray(project.tags) && project.tags.length > 1, `${project.id} must have multiple tags`);
    assert.ok(project.tags.every((tag) => typeof tag === 'string' && tag.trim()), `${project.id} has an invalid tag`);
    assert.equal(Object.hasOwn(project, 'language'), false, `${project.id} still uses the old language field`);
  }
});

test('trims search input and returns projects in config order for an empty query', () => {
  assert.deepEqual(filterProjects(projects, { query: '   ' }).map((project) => project.id), ['lufa-design', 'kitia', 'dashboard']);
});
