/**
 * 工具方法相关
 *
 * @author nobody
 * @date 23/08/24
 */
const axios = require('axios')
const HttpsProxyAgent = require('https-proxy-agent')

exports.doReq = async (baseURL, config, proxy) => {
  const doReqOri = axios.create({
    baseURL,
    timeout: 35000,
    headers: config.headers
  })
  if (proxy) {
    const httpsAgent = new HttpsProxyAgent(proxy)
    config.proxy = false
    config.httpsAgent = httpsAgent
  }

  const res = await doReqOri(config)
  return res
}

exports.convertImg = async (base64Str) => {
  // base64 转换为图片并保存
  // TODO 需要完善
}
