module.exports = (options, app) => async function authLogin(ctx, next) {
  const { secret } = ctx.app.config.jwt;
  const whiteUrls = options.whiteUrls || [];
  const { url } = ctx;
  console.log('authLogin -> url', url);
  // 如果ctx.url在白名单中
  const isWhiteUrl = whiteUrls.some((whiteUrl) => ctx.url.startsWith(whiteUrl));
  console.log('authLogin -> isWhiteUrl', isWhiteUrl);
  if (!isWhiteUrl) {
    try {
      const [, token] = ctx.request.header.authorization.split(' ');
      const { user } = app.jwt.verify(token, secret);
      if (user) {
        [ctx.state.user] = user;
        await next();
      } else {
        ctx.helper.fail({ app, code: 401, res: 'toke1获取失败' });
      }
    } catch (err) {
      console.log('authLogin -> err', err);
      ctx.helper.fail({ ctx, code: 401, res: err });
    }
  } else {
    // 白名单
    console.log('authLogin -> ctx.url', ctx.url);
    ctx.url = url;
    await next();
  }
};
