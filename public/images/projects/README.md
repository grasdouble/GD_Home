# Project preview images

Place one WebP image per project in this directory. The filename must be the project's string `id` from `src/projects.json`, for example `Lufa-Design-System.webp`.

The gallery loads images from this directory using the configured project ID. If an image is missing, the project card uses the project's configured themed placeholder image instead.

When a project preview is missing, the card loads the `placeholderImage` WebP filename configured for that project from `../project-placeholders/`.
