module.exports = (app) => {
  const { controller } = app;
  const activity = app.router.namespace('/activity');
  activity.get('/', controller.activity.getAllAndCount);
  activity.get('/all', controller.activity.getAllAndCount);
  activity.post('/', controller.activity.createActivity);
  activity.put('/', controller.activity.updateActivity);
  activity.del('/', controller.activity.deleteActivity);
};
