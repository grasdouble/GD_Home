# Grasdouble — Sites & projets

A React project gallery configured from a local JSON file.

## Run locally

Install the pinned tool versions with asdf, then install dependencies and start the development server:

```sh
asdf install
pnpm install
pnpm dev
```

Build for production with `pnpm build`; serve the generated `dist/` directory with a static host.

## Data and site links

The displayed projects are maintained in `src/projects.json`; the application does not query GitHub at runtime. Each entry contains a string `id` (the project/repository name), a display `name`, optional `description` and `language`, a `siteUrl`, and a `repositoryUrl`. The array order is the display order. Search and language filtering are derived from this file.

Add each project's preview image as `public/images/projects/<id>.webp`, using the string `id` from the JSON. For example, `Lufa-Design-System` uses `public/images/projects/Lufa-Design-System.webp`. Cards show their styled fallback when an image is not present.

To add a project, add its metadata to `src/projects.json` and copy its WebP preview into the image directory. Leave `siteUrl` empty when the project has no published site; the card then links directly to `repositoryUrl`.
