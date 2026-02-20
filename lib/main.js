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
 * Module: main
 * High-level extractors for the Hiru News site (breaking, main,
 * trending and international sections). Each exported helper returns a
 * standardized `{ code, code_creator, results }` object.
 */
const Scrapely = require('@omindu/scrapely');
const { Options } = require('../utils/options');
const { clean } = require('../utils/clean');
const { ValidationError, logError } = require('../utils/errors');
const scraper = new Scrapely(Options());


/**
 * Fetches and extracts article details from a listing selector.
 *
 * @param {string} urlSelector - CSS selector used to locate the article link
 * @returns {Promise<{title:string,news:string|null,thumb:string,date:string,newsURL:string}>}
 * @throws {ValidationError|Error} When URL can't be found or scraping fails
 */
async function extractNewsData(urlSelector) {
    try {
        const baseUrl = 'https://www.hirunews.lk/';
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
        logError(error, 'main.extractNewsData');
        throw error;
    }
}

async function BreakingNews() {
    const newsData = await extractNewsData('.home_banner > .section-inner-wrp > .container > .row > .col-lg-6 > a ');
    return { code: 200, code_creator: { name: 'Omindu_Dissanayaka', github: '@OminduDissanayaka', website: 'https://www.omindu.dev' }, results: newsData };
}

async function MainNews() {
    const newsData = await extractNewsData('body > section.home_banner > div > div > div > div:nth-child(1) > a');
    return { code: 200, code_creator: { name: 'Omindu_Dissanayaka', github: '@OminduDissanayaka', website: 'https://www.omindu.dev' }, results: newsData };
}

async function TrendingNews() {
    const newsData = await extractNewsData('body > section:nth-child(8) > div > div > div > div.col-lg-8 > div.row > div:nth-child(2) > div > div.content-wrp > a:nth-child(1)');
    return { code: 200, code_creator: { name: 'Omindu_Dissanayaka', github: '@OminduDissanayaka', website: 'https://www.omindu.dev' }, results: newsData };
}

async function InternationalNews() {
    const newsData = await extractNewsData('body > section:nth-child(8) > div > div > div > div.col-lg-4.d-none.d-lg-block > div > div.content-wrp > a:nth-child(1)');
    return { code: 200, code_creator: { name: 'Omindu_Dissanayaka', github: '@OminduDissanayaka', website: 'https://www.omindu.dev' }, results: newsData };
}

module.exports = { BreakingNews, MainNews, TrendingNews, InternationalNews };
