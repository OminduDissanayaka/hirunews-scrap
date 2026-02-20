const assert = require('assert');
const Hiru = require('../index');

/**
 * Simple smoke tests for all public API methods. No test framework required —
 * plain Node.js script so CI/npm test works out of the box.
 *
 * Usage:
 *   HIRU_PROXY='https://...' node test/run-tests.js
 *   or just: npm test
 */

const proxy = process.env.HIRU_PROXY || null;
const api = new Hiru(proxy ? { proxy } : {});
const TIMEOUT = 20000; // ms per request

async function run() {
  const tests = [
    {
      name: 'BreakingNews',
      fn: () => api.BreakingNews()
    },
    {
      name: 'MainNews',
      fn: () => api.MainNews()
    },
    {
      name: 'TrendingNews',
      fn: () => api.TrendingNews()
    },
    {
      name: 'InternationalNews',
      fn: () => api.InternationalNews()
    },
    {
      name: 'SportNews',
      fn: () => api.SportNews()
    },
    {
      name: 'EntertainmentNews',
      fn: () => api.EntertainmentNews()
    },
    {
      name: 'BusinessNews',
      fn: () => api.BusinessNews()
    },
    {
      name: 'getNews',
      fn: () => api.getNews('https://www.hirunews.lk/385920/\u0dbf\u0db4\u0dca\u0db4\u0dd2\u0db4\u0dd2\u0db1\u0dd2\u0db4\u0dca-\u0dc3\u0dd2\u0dbb\u0dca\u0db4\u0db1\u0dd2\u0db4\u0dca\u0db4\u0dd2\u0db1\u0dd4-26-\u0db6\u0dd2\u0db7\u0dcf\u0dbd\u0dcf')
    }
  ];

  console.log(`Running ${tests.length} smoke tests (proxy=${proxy || 'none'})`);

  let failures = 0;

  for (const t of tests) {
    process.stdout.write(`- ${t.name} ... `);
    try {
      const res = await promiseTimeout(t.fn(), TIMEOUT);
      assert.ok(res && typeof res === 'object', 'response must be an object');
      assert.strictEqual(res.code, 200, 'response.code must be 200');
      assert.ok(res.results, 'results must be present');

      // results can be object or array depending on API; check title for article.
      if (res.results && typeof res.results === 'object') {
        if (res.results.title !== undefined) {
          assert.ok(res.results.title && String(res.results.title).length > 0, 'title must be non-empty');
        }
      }

      console.log('OK');
    } catch (err) {
      failures += 1;
      console.log('FAILED');
      console.error(formatError(err));
    }
  }

  if (failures) {
    console.error(`\n${failures} test(s) failed`);
    process.exitCode = 1;
  } else {
    console.log('\nAll tests passed ✅');
    process.exitCode = 0;
  }
}

function promiseTimeout(p, ms) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error('timeout')), ms);
    Promise.resolve(p).then((v) => {
      clearTimeout(timer);
      resolve(v);
    }, (err) => {
      clearTimeout(timer);
      reject(err);
    });
  });
}

function formatError(err) {
  if (!err) return String(err);
  if (err instanceof Error) return `${err.message}\n${err.stack}`;
  try { return JSON.stringify(err, null, 2); } catch (e) { return String(err); }
}

run();
