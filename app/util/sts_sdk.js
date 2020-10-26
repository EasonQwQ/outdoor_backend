const request = require('request');
const crypto = require('crypto');

const StsDomain = 'sts.tencentcloudapi.com';
const StsUrl = 'https://{host}/';

const util = {
  // 获取随机数
  getRandom(min, max) {
    return Math.round(Math.random() * (max - min) + min);
  },
  // obj 转 query string
  json2str(obj, $notEncode) {
    const arr = [];
    Object.keys(obj).sort().forEach((item) => {
      const val = obj[item] || '';
      arr.push(`${item}=${$notEncode ? encodeURIComponent(val) : val}`);
    });
    return arr.join('&');
  },
  // 计算签名
  getSignature(opt, key, method) {
    const formatString = `${method + StsDomain}/?${util.json2str(opt)}`;
    const hmac = crypto.createHmac('sha1', key);
    const sign = hmac.update(Buffer.from(formatString, 'utf8')).digest('base64');
    return sign;
  },
  // v2接口的key首字母小写，v3改成大写，此处做了向下兼容
  backwardCompat(data) {
    const compat = {};
    for (const key in data) {
      if (typeof (data[key]) === 'object') {
        compat[this.lowerFirstLetter(key)] = this.backwardCompat(data[key]);
      } else if (key === 'Token') {
        compat.sessionToken = data[key];
      } else {
        compat[this.lowerFirstLetter(key)] = data[key];
      }
    }

    return compat;
  },
  lowerFirstLetter(source) {
    return source.charAt(0).toLowerCase() + source.slice(1);
  },
};

// 拼接获取临时密钥的参数
const getCredential = function (options, callback) {
  if (options.durationInSeconds !== undefined) {
    console.warn('warning: durationInSeconds has been deprecated, Please use durationSeconds ).');
  }

  const { secretId } = options;
  const { secretKey } = options;
  const proxy = options.proxy || '';
  const host = options.host || '';
  const region = options.region || 'ap-beijing';
  const durationSeconds = options.durationSeconds || options.durationInSeconds || 1800;
  const { policy } = options;

  const policyStr = JSON.stringify(policy);
  const action = 'GetFederationToken';
  const nonce = util.getRandom(10000, 20000);
  const timestamp = parseInt(+new Date() / 1000, 10);
  const method = 'POST';

  const params = {
    SecretId: secretId,
    Timestamp: timestamp,
    Nonce: nonce,
    Action: action,
    DurationSeconds: durationSeconds,
    Name: 'cos-sts-nodejs',
    Version: '2018-08-13',
    Region: region,
    Policy: encodeURIComponent(policyStr),
  };
  params.Signature = util.getSignature(params, secretKey, method);

  const opt = {
    method,
    url: StsUrl.replace('{host}', host || StsDomain),
    strictSSL: false,
    json: true,
    form: params,
    headers: {
      Host: StsDomain,
    },
    proxy,
  };
  request(opt, (err, response, body) => {
    let data = body && body.Response;
    if (data) {
      if (data.Error) {
        callback(data.Error);
      } else {
        try {
          data.startTime = data.ExpiredTime - durationSeconds;
          data = util.backwardCompat(data);
          callback(null, data);
        } catch (e) {
          callback(new Error(`Parse Response Error: ${JSON.stringify(data)}`));
        }
      }
    } else {
      callback(err || body);
    }
  });
};

const getPolicy = function (scope) {
  // 定义绑定临时密钥的权限策略
  const statement = scope.map((item) => {
    const action = item.action || '';
    const bucket = item.bucket || '';
    const region = item.region || '';
    const shortBucketName = bucket.substr(0, bucket.lastIndexOf('-'));
    const appId = bucket.substr(1 + bucket.lastIndexOf('-'));
    const { prefix } = item;
    let resource = `qcs::cos:${region}:uid/${appId}:prefix//${appId}/${shortBucketName}/${prefix}`;
    if (action === 'name/cos:GetService') {
      resource = '*';
    }
    return {
      action,
      effect: 'allow',
      principal: { qcs: '*' },
      resource,
    };
  });
  return { version: '2.0', statement };
};

const cosStsSdk = {
  getCredential,
  getPolicy,
};

module.exports = cosStsSdk;
