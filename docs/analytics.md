# Visitor analytics

Analytics are optional. The website works without an analytics account or script. `src/data/visitor-stats.json` starts as `null`, and the public visitor section renders nothing until a valid aggregate snapshot exists. There are no example counts in the production data.

## Private traffic dashboard

For a simple private dashboard, create a site in [Cloudflare Web Analytics](https://developers.cloudflare.com/web-analytics/get-started/) and add its token as the build variable `PUBLIC_CLOUDFLARE_ANALYTICS_TOKEN`. The page template reads this variable to include the official beacon. Rebuild after changing it.

Cloudflare Web Analytics works with GitHub Pages and other hosts; moving DNS is unnecessary. It includes countries, referrers, and devices. The beacon token is a public site identifier, not an account API secret. Its private dashboard does not automatically populate the public visitor section. See [Cloudflare's overview](https://developers.cloudflare.com/web-analytics/about/) and [available dimensions](https://developers.cloudflare.com/web-analytics/data-metrics/dimensions/).

## Umami and the optional public footer

Use managed Umami if you want its dashboard and the custom country/traffic footer. Add the site in Umami Cloud, then configure these build variables:

| Variable | Purpose |
| --- | --- |
| `PUBLIC_UMAMI_WEBSITE_ID` | The site's public Umami website identifier. |
| `PUBLIC_UMAMI_SCRIPT_URL` | The script URL from Umami's installation instructions, usually `https://cloud.umami.is/script.js`. |

The page template uses these variables to include Umami's tracker. Use the installation values from your account; only those public values belong in client-facing configuration. You can use Umami alone instead of installing both providers.

The public section is a snapshot prepared during the build, not a live dashboard or a new tracking service. It displays total visitors, page views, known countries, and visitor counts by country over the latest **30 complete UTC days**. The visible date range remains accurate if a build or sync is delayed. The globe is an illustration; the country list contains the measured location data. Unknown locations are listed separately and do not increase the country count.

### Fetch real aggregate data

Confirm that your Umami Cloud plan includes API access, then create an API key in the account settings. API availability may depend on your plan; this integration does not promise that the managed service's free tier includes it.

Configure these environment variables only in your local shell or the deployment workflow's secret store:

| Variable | Purpose |
| --- | --- |
| `UMAMI_API_KEY` | Secret Umami Cloud API key. Never prefix it with `PUBLIC_`, put it in browser JavaScript, or commit it. |
| `UMAMI_WEBSITE_ID` | Website to query. If omitted, the script uses `PUBLIC_UMAMI_WEBSITE_ID`. |
| `UMAMI_API_REGION` | Optional `us` or `eu`; omit to use the account's default region. |

With these variables already set, run:

```sh
node scripts/sync-visitor-stats.mjs
npm run build
```

Use a workflow that proceeds to the build only if the sync succeeds. The script uses Node's built-in `fetch`; it does not load `.env` files itself. For local work on Node 22, a private, gitignored env file can be loaded with `node --env-file=.env.local scripts/sync-visitor-stats.mjs`. Do not put the key in a shell command that will be saved or logged.

The script queries the [documented Umami Cloud API](https://docs.umami.is/docs/cloud/api-key) using `Authorization: Bearer`, at `https://api.umami.is/v1` (or its `/us` or `/eu` region path):

- `GET /websites/:websiteId/stats?startAt=…&endAt=…`
- `GET /websites/:websiteId/metrics?startAt=…&endAt=…&type=country&limit=500`

The [statistics reference](https://docs.umami.is/docs/api/website-stats) defines timestamps in milliseconds, numeric page-view/visitor totals, and country rows as `{ x, y }`, where `y` is visitors. Only those intended public aggregates are saved. No API key, visitor identifiers, IP addresses, cities, browsing histories, or account configuration are written to the snapshot.

Both requests must succeed and validate before the file is replaced atomically. A timeout, HTTP error, malformed response, or incomplete country result exits with an error and leaves the existing snapshot untouched. There is no fallback to invented counts. An initial successful query with no measured traffic can correctly display zero. Country counts need not sum to the overall visitor total when a visitor is observed in more than one country.

### Refresh and publish

Run the sync before deployment, and optionally schedule a daily deployment to refresh it. Store the API key as a repository or hosting secret, passed only to the Node sync step. A GitHub Pages site can use this build-time flow without running a server. The generated JSON is intentionally public aggregate data; publish it in the build or commit it if you want historical diffs. Avoid logging the API key or raw API responses.

The initial `null` file can remain until an account is configured. To remove the public section later, set `src/data/visitor-stats.json` back to `null` and rebuild. Removing an analytics provider's public environment variables and rebuilding disables its client script.

Traffic and geolocation are estimates from the provider and can be affected by blocked scripts, network errors, bots, VPNs, and location changes. Present the numbers as a dated traffic snapshot, not an exact count of identifiable people. For more display options, see [Umami's official embedding guide](https://docs.umami.is/docs/guides/embed-analytics-in-your-app).
