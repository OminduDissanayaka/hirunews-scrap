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

/**
 * Entertainment section extractor — returns the primary entertainment
 * article as a structured object.
 */
const Scrapely = require('@omindu/scrapely');
const { Options } = require('../utils/options');
const { clean } = require('../utils/clean');
const { ValidationError, logError } = require('../utils/errors');

const scraper = new Scrapely(Options());


/**
 * Extract entertainment article details from the listing page.
 * @param {string} urlSelector - CSS selector for the article link
 * @returns {Promise<object>} Extracted article fields
 * @throws {ValidationError|Error}
 */
async function extractNewsData(urlSelector) {
    try {
        const baseUrl = 'https://www.hirunews.lk/entertainment/';
        const newsUrl = await scraper.getAttribute(baseUrl, urlSelector, 'href');
        if (!newsUrl) {
            throw new ValidationError('Unable to extract news URL');
        }

        const data = await scraper.extract(newsUrl, {
            title: { selector: 'body > section.single_news > div > div.section-inner-wrp > div.head-content > h1', type: 'text' },
            news: { selector: '#this-article', type: 'html', transform: (html) => clean(html) },
            thumbnail: { selector: 'body > section.single_news > div > div.section-inner-wrp > div.article-content-wrp.row > div.article-content.col-lg-8 > div.featured-image > img', type: 'attribute', attribute: 'src' },
            date: { selector: '.head-content .update-category+ span', type: 'text' }
        });

        return {
            title: data.title || '',
            news: data.news || null,
            thumb: data.thumbnail,
            date: data.date || '',
            newsURL: newsUrl
        }; 
    } catch (error) {
        logError(error, 'entertainment.extractNewsData');
        throw error;
    }
}
/**
 * Public: get the latest entertainment article.
 * @returns {Promise<object>} Standardized response object
 */
async function EntertainmentNews() {
    const newsData = await extractNewsData('.main-article-topic a');
    return { code: 200, code_creator: { name: 'Omindu_Dissanayaka', github: '@OminduDissanayaka', website: 'https://www.omindu.dev' }, results: newsData };
}

module.exports = { EntertainmentNews };
