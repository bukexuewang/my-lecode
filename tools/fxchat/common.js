import path from 'path';
import url from 'node:url';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
/**
 *
 * @param {string} str
 * @returns {string}
 */
export const resolve = (str) => path.join(__dirname, str);

/**
 *
 * @param {unknown} v
 * @returns {boolean}
 */
export const isObj = (v) => typeof v === 'object' && v !== null;
