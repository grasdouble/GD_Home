export function filterProjects(projects, { tag = 'Tous', query = '' } = {}) {
  const normalizedQuery = query.trim().toLowerCase();

  return projects.filter((project) => {
    const matchesTag = tag === 'Tous' || project.tags.includes(tag);
    const searchableText = `${project.name} ${Object.values(project.description).join(' ')} ${project.tags.join(' ')}`.toLowerCase();
    return matchesTag && searchableText.includes(normalizedQuery);
  });
}
