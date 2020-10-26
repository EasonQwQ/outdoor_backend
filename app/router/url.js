module.exports = (app) => {
  const { controller } = app;
  const url = app.router.namespace('/url');
  url.get('/:shortUrl', controller.url.index);
  url.post('/', controller.url.add);
};
