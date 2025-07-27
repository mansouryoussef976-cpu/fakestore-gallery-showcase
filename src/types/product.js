// Product type definitions for JSDoc comments

/**
 * @typedef {Object} Product
 * @property {number} id
 * @property {string} title
 * @property {number} price
 * @property {string} description
 * @property {string} category
 * @property {string} image
 * @property {Object} rating
 * @property {number} rating.rate
 * @property {number} rating.count
 */

/**
 * @typedef {Product & {quantity: number}} CartItem
 */

export {};