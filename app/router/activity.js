module.exports = (app) => {
  const { controller } = app;
  const activity = app.router.namespace('/activity');
  activity.get('/all', controller.activity.getAllAndCount);
};
