<p align="center">
  <a href="https://www.hirunews.lk/" rel="noopener">
    <img width=100px height=100px src="https://cdn.hirunews.lk/newassets/logo-3.png" alt="Hiru News Logo">
  </a>
</p>

<h2 align="center">Hiru News Scrap</h2>

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![GitHub Issues](https://img.shields.io/github/issues/OminduDissanayaka/hirunews-scrap.svg)](https://github.com/OminduDissanayaka/hirunews-scrap/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/OminduDissanayaka/hirunews-scrap.svg)](https://github.com/OminduDissanayaka/hirunews-scrap/pulls)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

</div>

---

<p align="center">This unofficial scraper for Hiru News is by <a href="https://www.omindu.dev">Omindu Dissanayaka</a>. The news given here belongs to <a href="https://www.hirunews.lk/">hirunews.lk</a>.</p>

## Installation

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

```sh
yarn add hirunews-scrap
```

or

```sh
npm i hirunews-scrap
```

## 🎈 Usage

```js
const Hiru = require('hirunews-scrap');

const api = new Hiru();

const apiWithOptions = new Hiru({
  proxy: 'https://example.workers.dev',
  userAgent: 'MyScraper/1.0 (+https://example.com)',
  headers: { 'Accept-Language': 'en-US' },
  timeout: 15000,
  rateLimit: 1,
  cache: { ttl: 300000, maxSize: 200 }
});
```

### TypeScript (typed) example

```ts
import Hiru = require('hirunews-scrap');

const api = new Hiru({ userAgent: 'MyBot/1.0' });

async function main() {
  const res = await api.BreakingNews();
  console.log(res.results.title);
}

main();
```

## Options

All options available in `utils/options.js` can be passed to `new Hiru({...})`. Key items:

- `timeout` (ms) — request timeout
- `maxRetries` — retry attempts
- `retryDelay` — base delay between retries (ms)
- `headers` — default HTTP headers (deep-merged)
- `userAgent` / `ua` — shorthand aliases for `headers['User-Agent']`
- `followRedirects` — follow 3xx redirects
- `validateStatus` — function to validate HTTP status codes
- `rateLimit` — requests per second
- `proxy` — string (e.g. `http://user:pass@host:8080`) or axios-style object
- `rotateUserAgent` — enable UA rotation
- `cache` — `true` or `{ ttl, maxSize }`

Notes:

- `headers` from your options are deep-merged with library defaults.
- `proxy` accepts a URL string (auto-parsed) or an object with `{ host, port, protocol, auth }`.
- Options passed to `new Hiru({...})` are applied when the instance is constructed; create a new instance to change defaults at runtime.

## Error handling

Library errors are structured and include `name`, `code`, `message` and optional `meta`.
Check `err.code` or `err.name` when catching errors:

```js
try {
  await api.MainNews();
} catch (err) {
  console.error(err.code || err.name, err.message);
  if (err.meta) console.debug('meta:', err.meta);
}
```

## API

### Get Latest Breaking News

```js
const News = await api.BreakingNews();
console.log(News);
```

```json
{
  "code": 200,
  "code_creator": {
    "name": "Omindu_Dissanayaka",
    "github": "@OminduDissanayaka",
    "website": "https://www.omindu.dev"
  },
  "results": {
    "title": "රාජිතට එරෙහි නඩුවේ තීන්දුව ප්‍රකාශ කිරීම නොවැම්බර් 29 වැනිදා",
    "news": "2019 වසරේ පැවැති ජනාධිපතිවරණ සමයේ...",
    "thumb": "https://cdn.hirunews.lk/Data/News_Images/202410/1729749426_3059902_hirunews.jpg",
    "date": "Thursday, 24 October 2024 - 11:27",
    "newsURL": "https://www.hirunews.lk/385906/රාජිතට-එරෙහි-නඩුවේ-තීන්දුව-ප්‍රකාශ-කිරීම-නොවැම්බර්-29-වැනිදා"
  }
}
```

### Get Latest Main News

```js
const News = await api.MainNews();
console.log(News);
```

```json
{
  "code": 200,
  "code_creator": {
    "name": "Omindu_Dissanayaka",
    "github": "@OminduDissanayaka",
    "website": "https://www.omindu.dev"
  },
  "results": {
    "title": "ඊශ්‍රායල ජාතිකයින්ට ප්‍රහාරයක් එල්ල කිරීමට සැලසුම් කළ බව කියන පුද්ගලයින් දෙදෙනෙකු අත්අඩංගුවට",
    "news": "මෙරට රැදී සිටින ඊශ්‍රායල ජාතිකයන්ට ප්‍රහාරයක් එල්ල කිරීමට සැලසුම් කළ...",
    "thumb": "https://cdn.hirunews.lk/Data/News_Images/202410/1729732149_1977919_hirunews.jpg",
    "date": "Thursday, 24 October 2024 - 6:39",
    "newsURL": "https://www.hirunews.lk/385878/ඊශ්‍රායල-ජාතිකයින්ට-ප්‍රහාරයක්-එල්ල-කිරීමට-සැලසුම්-කළ-බව-කියන-පුද්ගලයින්-දෙදෙනෙකු-අත්අඩංගුවට"
  }
}
```

### Get Latest Trending News

```js
const News = await api.TrendingNews();
console.log(News);
```

```json
{
  "code": 200,
  "code_creator": {
    "name": "Omindu_Dissanayaka",
    "github": "@OminduDissanayaka",
    "website": "https://www.omindu.dev"
  },
  "results": {
    "title": "ශ්‍රී ලංකාවේ බටහිර හා නැගෙනහිර වෙරළ තීරවලින් ඉවත් වන්නැයි, ඊශ්‍රායලය සිය ජනතාවගෙන් ඉල්ලයි (වීඩියෝ)",
    "news": "පවත්නා තර්ජන හේතු කොටගෙන ශ්‍රී ලංකාවේ සංචාරක නිකේතනවලින් ඉවත් වන ලෙස...",
    "thumb": "https://cdn.hirunews.lk/Data/News_Images/202410/1729682513_1674880_hirunews.jpg",
    "date": "Wednesday, 23 October 2024 - 16:52",
    "newsURL": "https://www.hirunews.lk/385838/ශ්‍රී-ලංකාවේ-බටහිර-හා-නැගෙනහිර-වෙරළ-තීරවලින්-ඉවත්-වන්නැයි-ඊශ්‍රායලය-සිය-ජනතාවගෙන්-ඉල්ලයි-වීඩියෝ"
  }
}
```

### Get Latest International News

```js
const News = await api.InternationalNews();
console.log(News);
```

```json
{
  "code": 200,
  "code_creator": {
    "name": "Omindu_Dissanayaka",
    "github": "@OminduDissanayaka",
    "website": "https://www.omindu.dev"
  },
  "results": {
    "title": "පිටසක්වල ජීවීන් සොයා උඩුගුවනට යන අභ්‍යවකාශ යානය",
    "news": "පිටසක්වල ජීවීන්ගේ සලකුණු සෙවීම සඳහා ෆ්ලොරීඩාවෙන් Europa Clipper නම් අභ්‍යවකාශ යානය...",
    "thumb": "https://cdn.hirunews.lk/Data/News_Images/202410/1728921378_9976226_hirunews.jpg",
    "date": "Monday, 14 October 2024 - 21:26",
    "newsURL": "https://www.hirunews.lk/384964/පිටසක්වල-ජීවීන්-සොයා-උඩුගුවනට-යන-අභ්‍යවකාශ-යානය"
  }
}
```

### Get Latest Sport News

```js
const News = await api.SportNews();
console.log(News);
```

```json
{
  "code": 200,
  "code_creator": {
    "name": "Omindu_Dissanayaka",
    "github": "@OminduDissanayaka",
    "website": "https://www.omindu.dev"
  },
  "results": {
    "title": "නවසීලන්ත සහ ශ්‍රී ලංකාව අතර පැවැත්වීමට නියමිත ක්‍රිකට් තරගාවලියේ කාල සටහන නිකුත් කෙරේ",
    "news": "සංචාරක නවසීලන්ත සහ ශ්‍රී ලංකා ක්‍රිකට් කණ්ඩායම් අතර පැවැත්වීමට නියමිත...",
    "thumb": "https://cdn.hirunews.lk/Data/News_Images/202410/1728927505_8411631_hirunews.jpg",
    "date": "Monday, 14 October 2024 - 23:18",
    "newsURL": "https://www.hirunews.lk/sports/384971/නවසීලන්ත-සහ-ශ්‍රී-ලංකාව-අතර-පැවැත්වීමට-නියමිත-ක්‍රිකට්-තරගාවලියේ-කාල-සටහන-නිකුත්-කෙරේ"
  }
}
```

### Get Latest Entertainment News

```js
const News = await api.EntertainmentNews();
console.log(News);
```

```json
{
  "code": 200,
  "code_creator": {
    "name": "Omindu_Dissanayaka",
    "github": "@OminduDissanayaka",
    "website": "https://www.omindu.dev"
  },
  "results": {
    "title": "Elon Muskගේ නවතම දොර දෙකේ රොබෝටැක්සිය (ඡායාරූප)",
    "news": "එලෝන් මස්ක්, දොරවල් දෙකක් සහ සුක්කානම් රෝදයක් හෝ පැඩල් නොමැති රොබෝටැක්සියක් හඳුනවා දී තිබෙනවා...",
    "thumb": "https://cdn.hirunews.lk/Data/News_Images/202410/1728638540_9280318_hirunews.jpg",
    "date": "Friday, 11 October 2024 - 14:52",
    "newsURL": "https://www.hirunews.lk/entertainment/384617/elon-muskගේ-නවතම-දොර-දෙකේ-රොබෝටැක්සිය-ඡායාරූප"
  }
}
```

### Get Latest Business News

```js
const News = await api.BusinessNews();
console.log(News);
```

```json
{
  "code": 200,
  "code_creator": {
    "name": "Omindu_Dissanayaka",
    "github": "@OminduDissanayaka",
    "website": "https://www.omindu.dev"
  },
  "results": {
    "title": "ලොවක් බලා සිටි iPhone 16 මිල ගණන් මෙන්න",
    "news": "ඇපල් සමාගම iPhone 16 මාදිලිය ඊයේ නිල වශයෙන් වෙලඳපොළට නිකුත් කරනු ලැබුවා...",
    "thumb": "https://cdn.hirunews.lk/Data/News_Images/202409/1725984481_5709076_hirunews.jpg",
    "date": "Tuesday, 10 September 2024 - 19:31",
    "newsURL": "https://www.hirunews.lk/business/381534/ලොවක්-බලා-සිටි-iphone-16-මිල-ගණන්-මෙන්න"
  }
}
```

### Get News

```js
const result = await api.getNews("https://www.hirunews.lk/385920/ට්‍රෑමි-සුළිකුණාටුවෙන්-පිලිපීන‍යේ-26-දෙනෙකු-ජීවිතක්ෂයට");
console.log(result);
```

```json
{
  "code": 200,
  "code_creator": {
    "name": "Omindu_Dissanayaka",
    "github": "@OminduDissanayaka",
    "website": "https://www.omindu.dev"
  },
  "results": {
    "title": "ට්‍රෑමි සුළිකුණාටුවෙන් පිලිපීන‍යේ 26 දෙනෙකු ජීවිතක්ෂයට",
    "news": "පිලිපීනයට බලපා ඇති ට්‍රෑමි සුළිකුණාටුව හේතුවෙන් පුද්ගලයන් 26 දෙනෙකු ජීවිතක්ෂයට පත්ව...",
    "thumb": "https://cdn.hirunews.lk/Data/News_Images/202410/1729759421_6149283_hirunews.jpg",
    "date": "Thursday, 24 October 2024 - 14:14",
    "newsURL": "https://www.hirunews.lk/385920/ට්‍රෑමි-සුළිකුණාටුවෙන්-පිලිපීන‍යේ-26-දෙනෙකු-ජීවිතක්ෂයට"
  }
}
```

## Proxy Setup

### Cloudflare Workers (Free)

You can run a tiny Cloudflare Worker to forward requests to `hirunews.lk` and use the worker URL as the `proxy` option for `Hiru`.

```js
// Cloudflare Worker
export default {
  async fetch(request) {
    const url = new URL(request.url);
    url.hostname = 'hirunews.lk';
    return fetch(url.toString());
  }
}
```

### Setup Steps

1. Create an account at https://cloudflare.com
2. Open the **Workers** section in the dashboard
3. Create a new Worker and paste the code above
4. Deploy the Worker and note the worker URL (e.g. `https://your-worker.workers.dev`)
5. Use the Worker as proxy:

```js
const api = new Hiru({
  proxy: 'https://your-worker.workers.dev'
});
```

> Note: this Worker simply forwards requests to `hirunews.lk`. Use it responsibly and obey the target site's terms of service and robots.txt.

## Contributing

Contributions are welcome — open issues or submit pull requests. Please include tests where appropriate and follow the repository style.

## License

MIT — see [LICENSE](LICENSE) file.

## ✍️ Author

[@OminduDissanayaka](https://github.com/OminduDissanayaka/hirunews-scrap) — Hiru News Unofficial Scraper

## Disclaimer

This is an unofficial package and is not affiliated with, endorsed by, or
connected to Hiru News in any way. All content belongs to hirunews.lk.

This package is intended for educational purposes only. Use at your own risk.
The author is not responsible for any misuse or legal issues arising from the
use of this package.