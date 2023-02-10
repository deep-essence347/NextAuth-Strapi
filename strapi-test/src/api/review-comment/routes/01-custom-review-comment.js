module.exports = {
  routes: [
    {
      method: "POST",
      path: "/review-article/:id/review-comment",
      handler: "review-comment.create",
    },
  ],
};
