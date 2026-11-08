export function filterProjects(projects, { language = 'Tous', query = '' } = {}) {
  const normalizedQuery = query.trim().toLowerCase();

  return projects.filter((project) => {
    const matchesLanguage = language === 'Tous' || project.language === language;
    const searchableText = `${project.name} ${Object.values(project.description).join(' ')} ${project.language || ''}`.toLowerCase();
    return matchesLanguage && searchableText.includes(normalizedQuery);
  });
}
