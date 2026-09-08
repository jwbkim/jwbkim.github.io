# Ji Woong (Brian) Kim — academic website

A custom static Astro site with warm editorial typography, research videos, compact news, and a complete publication list. Content and media are local; optional analytics are configured separately.

## Run locally

Use Node.js **22.12 or newer** (the deployment uses Node 22).

```sh
npm install
npm run dev
```

Open **http://localhost:4321**. To check and preview the production build:

```sh
npm run check
npm run build
npm run preview
```

The generated site is in `dist/`. For browser checks, use an installed Chrome or install Playwright's Chromium once:

```sh
npx playwright install chromium
npm test
```

`PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` can point to a local Chromium/Chrome executable. On Linux, Playwright may also require its system browser dependencies. In a restricted workspace, `ASTRO_TELEMETRY_DISABLED=1` avoids Astro trying to persist telemetry preferences outside the project.

## Update content

| File | What to edit |
| --- | --- |
| `src/data/profile.ts` | Contact/CV/Scholar links and the three featured projects |
| `src/data/news.ts` | News, newest first; dates use `YYYY-MM` or `YYYY-MM-DD` |
| `src/data/publications.ts` | Publication titles, authors, venues, types, and verified links |
| `src/pages/index.astro` | Introduction, recruitment announcement, and main page sections |
| `src/pages/personal.astro`, `src/data/personal.ts` | Simple Personal page and the two original video embeds |
| `src/components/SiteHeader.astro` | Main / Personal navigation |
| `src/styles/global.css` | Typography, spacing, colors, and responsive layout |
| `public/media/` | Portrait, video posters, and short research clips |
| `public/cv.pdf` | Replace with your updated CV, keeping this stable filename |

Set `upcoming: true` on future news and remove it after the event. Keep stable publication IDs. The full migrated bibliography includes journal, conference, preprint, and workshop records; source discrepancies are documented in [content sources](docs/content-sources.md). See [media sources](docs/media-sources.md) before replacing project footage.

## Publish with GitHub Pages

The supplied [deployment workflow](.github/workflows/deploy.yml) runs **only when manually started**. Uploading or pushing the source alone does not publish it. No remote repository or live site has been created as part of this project.

1. Add these source files, including `package-lock.json`, to your chosen GitHub repository. Keep `.env` files and `node_modules/` excluded.
2. In the repository, open **Settings → Pages → Build and deployment**, then choose **GitHub Actions** as the source.
3. Ensure `deploy.yml` is on the repository's default branch. Open **Actions → Deploy academic website → Run workflow** and select the branch to publish.
4. The workflow installs locked dependencies, checks the site, builds `dist/`, and deploys the result. Its deployment summary links to the live site.

The workflow reads the site's origin and path from GitHub's Pages configuration. It supports both `username.github.io` repositories and project repositories such as `website`, which publish under `/website/`. No path setting is needed for the usual setup. This follows GitHub's [custom workflow guidance](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages) and the [official Pages metadata outputs](https://github.com/actions/configure-pages/blob/main/action.yml).

Optional repository **variables** under **Settings → Secrets and variables → Actions → Variables** can override the generated address:

| Variable | Value |
| --- | --- |
| `SITE_URL` | Origin only, e.g. `https://username.github.io` or `https://your-domain.org` |
| `BASE_PATH` | `/` for a root site, or `/website/` for a project site |

For a custom domain, configure it in **Settings → Pages**, then configure DNS following [GitHub's domain instructions](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site). Re-run the workflow after the change. An Actions deployment does not require a `CNAME` file.

For a local build that simulates a project URL, supply the configuration as environment variables:

```sh
SITE_URL=https://username.github.io BASE_PATH=/website/ npm run build
```

Any static host can serve `dist/`; set its build command to `npm run build` and its publish directory to `dist`.

## Optional visitor analytics

The public traffic section is hidden until a valid snapshot from real analytics data exists. There are no invented visitor counts. The website runs normally without an analytics account.

Copy `.env.example` to a private `.env` for local public tracking settings. In GitHub, add the corresponding `PUBLIC_*` values as repository **variables**. Choose Cloudflare Web Analytics for a private dashboard, or Umami for tracking plus the optional public visitor/country summary. See the complete [analytics setup](docs/analytics.md).

For the public summary, configure `PUBLIC_UMAMI_WEBSITE_ID` and `PUBLIC_UMAMI_SCRIPT_URL` as variables, `UMAMI_API_KEY` as a repository **secret**, and optionally `UMAMI_API_REGION` (`us` or `eu`) as a variable. The manual workflow then syncs the latest 30 complete UTC days before building. A configured sync failure stops deployment. Without the secret, it skips syncing and uses the existing snapshot, initially `null`. Run the workflow again when you want to refresh the published numbers.

To sync locally with the private credentials in `.env.local`:

```sh
node --env-file=.env.local scripts/sync-visitor-stats.mjs
npm run build
```

If those variables are already in your shell, use `npm run stats:sync`. API credentials are only used by the sync script; the browser receives the public tracker identifier and the intended aggregate statistics.
