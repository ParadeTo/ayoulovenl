const CONF = {
  port: '5757',
  rootPathname: '',

  // 微信小程序 App ID
  appId: 'wxf0c947b2fdaf2214',

  // 微信小程序 App Secret
  appSecret: '51dbdd0da1b909d205542332c40def2a',

  // 是否使用腾讯云代理登录小程序
  useQcloudLogin: true,

  /**
   * MySQL 配置，用来存储 session 和用户信息
   * 若使用了腾讯云微信小程序解决方案
   * 开发环境下，MySQL 的初始密码为您的微信小程序 appid
   */
  mysql: {
    host: 'localhost',
    port: 3306,
    user: 'root',
    db: 'ayoulovenl',
    pass: 'a12345678',
    char: 'utf8'
  },

  cos: {
    /**
     * 地区简称
     * @查看 https://cloud.tencent.com/document/product/436/6224
     */
    region: 'ap-guangzhou',
    // Bucket 名称
    fileBucket: 'qcloudtest',
    // 文件夹
    uploadFolder: ''
  },

  // 微信登录态有效期
  wxLoginExpires: 7200,

  // 其他配置 ...
  serverHost: '你的域名',
  tunnelServerUrl: 'https://tunnel.ws.qcloud.la',
  tunnelSignatureKey: '27fb7d1c161b7ca52d73cce0f1d833f9f5b5ec89',
  // 腾讯云相关配置可以查看云 API 秘钥控制台：https://console.qcloud.com/capi
  qcloudAppId: '你的腾讯云 AppID',
  qcloudSecretId: 'AKID54rT0ehQWQBlDVJcT9e0CC0c3IMJAi9O',
  qcloudSecretKey: 'CD2g9chgTfkcIm6RaaXjoiR1g9Rjroja',
  wxMessageToken: 'weixinmsgtoken',
  networkTimeout: 30000
}

module.exports = CONF
