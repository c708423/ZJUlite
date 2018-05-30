const CONF = {
    port: '5757',
    rootPathname: '',

    // 微信小程序 App ID
    appId: 'wxf867ed248fc6afa6',

    // 微信小程序 App Secret
    appSecret: 'd2fb52cbc2878908c1a3980f1f5b31cb',

    // 是否使用腾讯云代理登录小程序
    useQcloudLogin: true,

    /**
     * MySQL 配置，用来存储 session 和用户信息
     * 若使用了腾讯云微信小程序解决方案
     * 开发环境下，MySQL 的初始密码为您的微信小程序 appid
     */
    mysql: {
        host: 'gz-cdb-il7l822i.sql.tencentcdb.com',
        port: 62581,
        user: 'root',
        db: 'cAuth',
        pass: '0MXEHZUC4T0t',
        char: 'utf8mb4'
    },

    cos: {
        /**
         * 地区简称
         * @查看 https://cloud.tencent.com/document/product/436/6224
         */
        region: 'ap-guangzhou',
        // Bucket 名称
        fileBucket: 'qcloudtest-1253153042',
        // 文件夹
        uploadFolder: ''
    },

    // 微信登录态有效期
    wxLoginExpires: 7200,
    serverHost: 'c708423.top',
    tunnelServerUrl: 'https://tunnel.ws.qcloud.la',
    tunnelSignatureKey: '27fb7d1c161b7ca52d73cce0f1d833f9f5b5ec89',
    // 腾讯云相关配置可以查看云 API 秘钥控制台：https://console.qcloud.com/capi
    qcloudAppId: '1253153042',
    qcloudSecretId: 'AKIDa0B6qyXXw4xaw4rYu1sToBlAoIYgwSzG',
    qcloudSecretKey: 'A6mCMGvNdeRyINDo9E3cvylIbgX9XhcJ',
    wxMessageToken: 'weixinmsgtoken',
    networkTimeout: 30000
}

module.exports = CONF
