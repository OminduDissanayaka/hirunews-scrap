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
 * Development/test script — quick smoke-test for library functions.
 * Run with: `node test.js`
 */
const Hiru = require('./index');

/** @type {import('./utils/options').Options|Object} */
const api = new Hiru({
});

/**
 * Execute a single call and log output.
 * @returns {Promise<void>}
 */
async function News() {
    try {
        const News = await api.EntertainmentNews();
        console.log(News);
       
    } catch (error) {
        console.error('Error getting Entertainment news data:', error.message);
    }
}

News();