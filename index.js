/**
 * Author: Omindu Dissanayaka
 * Software Engineer Student
 * Website: https://www.omindu.dev
 *
 *  _     _                                                                                   
 * | |__ (_)_ __ _   _ _ __  _   _  _____      _____       ___  ___ _ __ __ _ _ __   ___ _ __ 
 * | '_ \| | '__| | | | '_ \| | | |/ _ \ \ /\ / / __|_____/ __|/ __| '__/ _` | '_ \ / _ \ '__|
 * | | | | | |  | |_| | | | | |_| |  __/\ V  V /\__ \_____\__ \ (__| | | (_| | |_) |  __/ |   
 * |_| |_|_|_|   \__,_|_| |_|\__,_|\___| \_/\_/ |___/     |___/\___|_|  \__,_| .__/ \___|_|   
 *                                                                           |_|              
 */

/**
 * Hiru — top-level API class that exposes scraper helpers for different
 * sections on hirunews.lk.
 *
 * The constructor accepts the same options described in `utils/options.js`.
 * Passing an `options` object applies those values as instance/global
 * defaults before internal scraper modules are required.
 *
 * @example
 * const api = new Hiru({ userAgent: 'MyBot/1.0', proxy: 'https://proxy/' });
 */
class Hiru {
  /**
   * Create a Hiru API instance.
   * @param {Object} [options={}] - Instance/global options forwarded to internal scrapers
   */
  constructor(options = {}) {
    const { setDefaults } = require('./utils/options');
    if (options && Object.keys(options).length) setDefaults(options);

    const { BreakingNews, MainNews, TrendingNews, InternationalNews } = require('./lib/main');
    const { SportNews } = require('./lib/sport');
    const { EntertainmentNews } = require('./lib/entertainment');
    const { BusinessNews } = require('./lib/business');
    const { getNews } = require('./lib/getnews');

    this.BreakingNews = BreakingNews;
    this.MainNews = MainNews;
    this.TrendingNews = TrendingNews;
    this.InternationalNews = InternationalNews;
    this.SportNews = SportNews;
    this.EntertainmentNews = EntertainmentNews;
    this.BusinessNews = BusinessNews;
    this.getNews = getNews;
  }
}

module.exports = Hiru;