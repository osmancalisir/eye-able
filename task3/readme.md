I think, the first step is Link Extraction, using Sitemaps and robots.txt files is useful to locate the URLs and its sub URLs. This is especially useful if the website has static links, but this approach may commonly be blocked by websites and won't capture all internal links that aren't listed in sitemaps.

Another thing is finding pages that return 404 errors and tracking redirects to broken pages. With that, it's useful to keep analytics of these failed links and their response codes so that we can also understand which links are failing and identify patterns.

We can implement rate limiting(most commonly GitHub uses this for example) especially when making HTTP requests to avoid being blocked, along with user-agent rotation and proxy rotation to prevent detection. We should also consider handling different types of failures like timeouts and SSL errors beyond just 404s.

For the backend, we can use libraries like Cheerio (Node.js) or jsoup (Java) for HTML parsing and link extraction, with HTTP clients like axios (Node.js) or HttpClient (Java/.NET) for making requests, while the frontend uses "axios" or "React Query" to fetch, cache and error handle the data from our API endpoints.

Additionally, it could be helpful to have an app (internal or a third party) lists the links data and display it in a table on the frontend.

Lastly, we can use testing libraries like "Playwright" to handle JavaScript-heavy websites (I believe, Eye-Able is using JavaScript intensely due to adaptation to each browsers) during the crawling process to ensure we capture dynamically loaded links.