'use strict';

/**
 * review-comment service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::review-comment.review-comment');
