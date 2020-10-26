module.exports = (app) => {
  const { router, controller } = app;
  // router.get('/:shortUrl', controller.home.index);
  router.post('/login', controller.user.login);
  router.all('/sts', controller.sts.index);
  require('./router/url')(app);
  require('./router/user')(app);
  require('./router/picture')(app);
  require('./router/activity')(app);
  router.all('/', controller.home.homePage);
};
