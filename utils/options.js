/**
 * Author: Omindu Dissanayaka
 * Software Engineering Undergraduate
 * Website: https://www.omindu.dev
 * Email: hellow@omindu.dev
 *
 *  _     _                                                                                   
 * | |__ (_)_ __ _   _ _ __  _   _  _____      _____       ___  ___ _ __ __ _ _ __   ___ _ __ 
 * | '_ \| | '__| | | | '_ \| | | |/ _ \ \ /\ / / __|_____/ __|/ __| '__/ _` | '_ \ / _ \ '__|
 * | | | | | |  | |_| | | | | |_| |  __/\ V  V /\__ \_____\__ \ (__| | | (_| | |_) |  __/ |   
 * |_| |_|_|_|   \__,_|_| |_|\__,_|\___| \_/\_/ |___/     |___/\___|_|  \__,_| .__/ \___|_|   
 *                                                                           |_|              
 */

const packageInfo = require('../package.json');

/**
 * Module-level overrides applied when a `Hiru` instance is created.
 * These act as global defaults for internal scraper instances created at
 * require-time.
 * @type {Object}
 */
let _globalOverrides = {}; 

/**
 * Merge provided overrides into module-global defaults. These defaults are
 * applied when a `Hiru` instance is constructed.
 *
 * @param {Object} [overrides={}] - Options to merge into module defaults
 * @returns {void}
 */
function setDefaults(overrides = {}) {
  _globalOverrides = Object.assign({}, _globalOverrides, overrides);
}

/**
 * Parse a proxy configuration value.
 * - Accepts a URL string (e.g. "http://user:pass@host:8080") and returns an
 *   axios-style object.
 * - Returns the original value if it's already an object or not a valid URL.
 *
 * @param {string|Object|null} proxy
 * @returns {Object|string|null}
 */
function _parseProxy(proxy) {
  if (!proxy) return null;
  if (typeof proxy === 'string') {
    try {
      const u = new URL(proxy);
      return {
        protocol: u.protocol ? u.protocol.replace(':', '') : undefined,
        host: u.hostname,
        port: u.port ? parseInt(u.port, 10) : (u.protocol === 'https:' ? 443 : 80),
        auth: u.username ? { username: u.username, password: u.password } : undefined
      };
    } catch (err) {
      return proxy;
    }
  }
  return proxy;
}

/**
 * Build the effective options object by merging defaults, module-global
 * overrides and the provided overrides. Merge precedence:
 * defaults <- module-global overrides <- provided overrides.
 *
 * Supports shorthand aliases `userAgent` and `ua` (both map to
 * `headers['User-Agent']`) and accepts `proxy` as a URL string or an
 * axios-style object.
 *
 * @param {Object} [overrides={}] - Instance-level option overrides
 * @returns {Object} Resolved options
 */
function Options(overrides = {}) {
  const mergedGlobals = Object.assign({}, _globalOverrides);
  const mergedOverrides = Object.assign({}, overrides);

  if (mergedGlobals.userAgent) {
    mergedGlobals.headers = Object.assign({}, mergedGlobals.headers, { 'User-Agent': mergedGlobals.userAgent });
    delete mergedGlobals.userAgent;
  }
  if (mergedGlobals.ua) {
    mergedGlobals.headers = Object.assign({}, mergedGlobals.headers, { 'User-Agent': mergedGlobals.ua });
    delete mergedGlobals.ua;
  }
  if (mergedOverrides.userAgent) {
    mergedOverrides.headers = Object.assign({}, mergedOverrides.headers, { 'User-Agent': mergedOverrides.userAgent });
    delete mergedOverrides.userAgent;
  }
  if (mergedOverrides.ua) {
    mergedOverrides.headers = Object.assign({}, mergedOverrides.headers, { 'User-Agent': mergedOverrides.ua });
    delete mergedOverrides.ua;
  }

  const defaults = {
    timeout: 30000,
    maxRetries: 3,
    retryDelay: 1000,
    headers: {
      'User-Agent': `Mozilla/5.0 (hirunews-scrap/${packageInfo.version}; +https://github.com/OminduDissanayaka/hirunews-scrap)`
    },
    followRedirects: true,
    validateStatus: (s) => s >= 200 && s < 400,
    rateLimit: 2,
    proxy: null,
    rotateUserAgent: false,
    cache: true
  };

  const headers = Object.assign({}, defaults.headers, mergedGlobals.headers || {}, mergedOverrides.headers || {});
  const proxy = _parseProxy((mergedOverrides.hasOwnProperty('proxy') ? mergedOverrides.proxy : mergedGlobals.proxy) ?? defaults.proxy);

  const result = Object.assign({}, defaults, mergedGlobals, mergedOverrides, { headers, proxy });

  if (typeof result.validateStatus !== 'function') result.validateStatus = defaults.validateStatus;

  return result;
}

module.exports = { Options, setDefaults };