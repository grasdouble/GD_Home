# Grasdouble — Sites & projets

A React project gallery configured from a local JSON file.

## Run locally

Install the pinned tool versions with asdf, then install dependencies and start the development server:

```sh
asdf install
pnpm install
pnpm dev
```

Run `pnpm test` to execute the project-filter tests. The GitHub Actions workflow runs the same tests and production build on pushes and pull requests; it validates workflow files with the shared `Lufa-CICD` actions.

## GitHub Pages deployment

`.github/workflows/ci.yml` runs workflow validation, tests, and a production build on pushes and pull requests. A passing run on the default branch deploys the Pages artifact; the workflow can also be started manually from the Actions tab.

In the repository settings, set **Pages → Build and deployment → Source** to **GitHub Actions** and configure the custom domain under **Pages → Custom domain**. Point the domain's DNS records to GitHub Pages as instructed by GitHub. Vite uses its default root base path, so assets work at the custom domain root.


## Data and site links

The displayed projects are maintained in `src/projects.json`; the application does not query GitHub at runtime. Each entry contains a string `id` (the project/repository name), a display `name`, optional `description` and `language`, a `siteUrl`, and a `repositoryUrl`. The array order is the display order. Search and language filtering are derived from this file.

Add each project's preview image as `public/images/projects/<id>.webp`, using the string `id` from the JSON. For example, `Lufa-Design-System` uses `public/images/projects/Lufa-Design-System.webp`. Cards show their styled fallback when an image is not present.

To add a project, add its metadata to `src/projects.json` and copy its WebP preview into the image directory. Leave `siteUrl` empty when the project has no published site; the card then links directly to `repositoryUrl`.
