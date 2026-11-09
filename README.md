# Grasdouble — Sites & projets

A React project gallery configured from a local JSON file.

## Run locally

Install the pinned tool versions with asdf, then install dependencies and start the development server:

```sh
asdf install
pnpm install
pnpm dev
```

Run `pnpm test` to execute the project-filter tests. `.github/workflows/ci.yml` runs tests and a production build on pull requests and pushes to `main`; it validates workflow files with the shared `Lufa-CICD` actions.

## GitHub Pages deployment

`.github/workflows/deploy.yml` is separate from CI. It runs only after a successful push-triggered CI run on the default branch, then rebuilds that exact tested revision and deploys it to GitHub Pages.

In the repository settings, set **Pages → Build and deployment → Source** to **GitHub Actions** and configure the custom domain under **Pages → Custom domain**. Point the domain's DNS records to GitHub Pages as instructed by GitHub. Vite uses its default root base path, so assets work at the custom domain root.

## Google Analytics

The site initializes GA4 with its Measurement ID in `src/main.jsx`. The ID is public and can be committed to the application.

The site sends the default `page_view` event and a `link_click` event for clicked links. Each click includes `link_id`, `link_text`, `link_url`, `link_domain`, and `link_location`; project links have stable IDs such as `<project-id>_website` and `<project-id>_repository`.


## Data and site links

The displayed projects are maintained in `src/projects.json`; the application does not query GitHub at runtime. Each entry contains a string `id` (the project/repository name), a display `name`, optional `description` and `language`, a `siteUrl`, and a `repositoryUrl`. The array order is the display order. Search and language filtering are derived from this file.

Add each project's preview image as `public/images/projects/<id>.webp`, using the string `id` from the JSON. For example, `Lufa-Design-System` uses `public/images/projects/Lufa-Design-System.webp`. Cards show their styled fallback when an image is not present.

To add a project, add its metadata to `src/projects.json` and copy its WebP preview into the image directory. Leave `siteUrl` empty when the project has no published site; the card then links directly to `repositoryUrl`.
