module.exports = (app) => {
  const { controller } = app;
  const picture = app.router.namespace('/picture');
  picture.post('/', controller.url.add);
  picture.get('/picAndAllCount', controller.url.getAndCount);
  picture.del('/:id', controller.url.deleteById);
};
