/**
 * 工具方法相关
 *
 * @author nobody
 * @date 23/08/24
 */
const fs = require('fs')
const axios = require('axios')
const HttpsProxyAgent = require('https-proxy-agent')

// 发送请求
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

// 将 base64 以图片方式存储到指定路径
exports.convertImg = async (base64Str, savePath) => {
  // TODO
}
