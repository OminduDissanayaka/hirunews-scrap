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
 * Lightweight article extractor used by the public `getNews(url)` API.
 * Returns a single `results` object with article details extracted from the
 * provided URL.
 */
const Scrapely = require('@omindu/scrapely');
const { Options } = require('../utils/options');
const { clean } = require('../utils/clean');
const { ValidationError, logError } = require('../utils/errors');

const scraper = new Scrapely(Options());

/**
 * Extract article details from a full article URL.
 *
 * @param {string} newsUrl - Fully qualified article URL
 * @returns {Promise<{title:string,news:string|null,thumb:string,date:string,newsURL:string}>}
 * @throws {ValidationError|Error}
 */
async function extractNewsData(newsUrl) {
    try {
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
        logError(error, 'getnews.extractNewsData');
        throw error;
    }
} 
/**
 * Public helper: extract structured article data for a given URL.
 *
 * @param {string} newsUrl - Article page URL
 * @returns {Promise<object>} Standardized response with `results` containing extracted fields
*/
async function getNews(newsUrl) {
    const newsData = await extractNewsData(newsUrl);
    return { 
        code: 200, 
        code_creator: { 
            name: 'Omindu_Dissanayaka', 
            github: '@OminduDissanayaka', 
            website: 'https://www.omindu.dev' 
        }, 
        results: newsData 
    };
}

module.exports = { getNews };
