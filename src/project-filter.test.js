import assert from 'node:assert/strict';
import test from 'node:test';
import { filterProjects } from './project-filter.js';
import configuredProjects from './projects.json' with { type: 'json' };
const projects = [
  { id: 'lufa-design', name: 'Lufa Design', description: { en: 'Design system', fr: 'Système de design' }, language: 'TypeScript' },
  { id: 'kitia', name: 'Kitia', description: { en: 'AI tools', fr: 'Outils d’IA' }, language: 'TypeScript' },
  { id: 'dashboard', name: 'Dashboard', description: { en: 'Repository tools', fr: 'Outils de dépôt' }, language: 'JavaScript' },
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

test('searches descriptions in either supported language', () => {
  assert.deepEqual(filterProjects(projects, { query: 'outils d’ia' }).map((project) => project.id), ['kitia']);
});

test('every configured project has a non-empty description in both supported languages', () => {
  for (const project of configuredProjects) {
    assert.deepEqual(Object.keys(project.description).sort(), ['en', 'fr']);
    assert.ok(project.description.en.trim(), `${project.id} is missing its English description`);
    assert.ok(project.description.fr.trim(), `${project.id} is missing its French description`);
  }
});

test('trims search input and returns projects in config order for an empty query', () => {
  assert.deepEqual(filterProjects(projects, { query: '   ' }).map((project) => project.id), ['lufa-design', 'kitia', 'dashboard']);
});
