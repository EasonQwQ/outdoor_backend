const { Controller } = require('egg');
const STS = require('../util/sts_sdk');

class StsController extends Controller {
  async index() {
    const { cos } = this.app.config;
    const { ctx } = this;
    const config = {
      secretId: cos.SecretId, // 固定密钥
      secretKey: cos.SecretKey, // 固定密钥
      proxy: '',
      durationSeconds: 1800, // 密钥有效期
      // 放行判断相关参数
      bucket: 'comment-pic-1255632723',
      region: 'ap-shanghai',
      // bucket: 'test-bucket-1253653367', // 换成你的 bucket
      // region: 'ap-guangzhou', // 换成 bucket 所在地区
      allowPrefix: '*', // 这里改成允许的路径前缀，可以根据自己网站的用户登录态判断允许上传的具体路径，例子： a.jpg 或者 a/* 或者 * (使用通配符*存在重大安全风险, 请谨慎评估使用)
      allowActions: [
        // 简单上传
        'name/cos:PutObject',
        'name/cos:PostObject',
        // 分片上传
        'name/cos:InitiateMultipartUpload',
        'name/cos:ListMultipartUploads',
        'name/cos:ListParts',
        'name/cos:UploadPart',
        'name/cos:CompleteMultipartUpload',
      ],
    };
    // TODO 这里根据自己业务需要做好放行判断

    // 获取临时密钥
    const shortBucketName = config.bucket.substr(0, config.bucket.lastIndexOf('-'));
    const appId = config.bucket.substr(1 + config.bucket.lastIndexOf('-'));
    const policy = {
      version: '2.0',
      statement: [{
        action: config.allowActions,
        effect: 'allow',
        principal: { qcs: ['*'] },
        resource: [
          `qcs::cos:${config.region}:uid/${appId}:prefix//${appId}/${shortBucketName}/${config.allowPrefix}`,
        ],
      }],
    };
    const searchPromise = await new Promise((resolve, reject) => {
      STS.getCredential({
        secretId: config.secretId,
        secretKey: config.secretKey,
        proxy: config.proxy,
        durationSeconds: config.durationSeconds,
        policy,
      }, (err, tempKeys) => {
        console.log('StsController -> index -> err', err);
        const result = JSON.stringify(err || tempKeys) || '';
        console.log('StsController -> index -> result', result);
        resolve(result);
      });
    });
    ctx.body = searchPromise;
  }
}
module.exports = StsController;
