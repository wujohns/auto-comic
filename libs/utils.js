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
    timeout: 350000,
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
exports.convertImg = (base64Str, savePath) => {
  const dataBuffer = Buffer.from(base64Str, 'base64')
  fs.writeFileSync(savePath, dataBuffer)
}

// 将图片转换为 base64
exports.convertBase64 = (imgPath) => {
  const base64 = fs.readFileSync(imgPath, 'base64')
  return base64
}
