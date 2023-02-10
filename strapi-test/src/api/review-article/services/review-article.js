'use strict';

/**
 * review-article service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::review-article.review-article');
