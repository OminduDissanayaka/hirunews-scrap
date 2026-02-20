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
 * Remove HTML tags from a chunk of HTML and convert line breaks to newlines.
 *
 * @param {string} data - HTML string to clean
 * @returns {string} Cleaned text (or original value when falsy)
 */
function clean(data) {
  if (!data) return data;
  const regex = /(<([^>]+)>)/gi;
  data = data.replace(/(<br\s*(?:class="")?\s*\/?>)/gi, ' \n');
  return data.replace(regex, '');
}

module.exports = { clean };