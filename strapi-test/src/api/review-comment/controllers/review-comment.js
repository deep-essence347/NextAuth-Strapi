"use strict";

/**
 * review-comment controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::review-comment.review-comment",
  ({ strapi }) => ({
    async create(ctx) {
      const { id } = ctx.params;

      // const { query } = ctx;

      // const entity = await strapi
      //   .service("api::review-article.review-article")
      //   .findOne(id, query);
      // const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
      // console.log(sanitizedEntity);
      console.log(ctx.request.body);
      ctx.request.body.review_article = id;
      const response = await super.create(ctx);

      return response;
    },
  })
);
