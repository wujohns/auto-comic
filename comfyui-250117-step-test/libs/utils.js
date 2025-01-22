/**
 * 工具方法相关
 *
 * @author nobody
 * @date 24/08/23
 */
const fs = require('fs')
const path = require('path')
const axios = require('axios')
const { HttpsProxyAgent } = require('https-proxy-agent')

require('dotenv').config({ path: path.join(__dirname, '../.env') })
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0

// 发送 comfyui 请求
exports.doComfyReq = async (config) => {
  const baseURL = process.env.COMFYUI_BASEURL
  const doReqOri = axios.create({
    baseURL,
    timeout: 350000,
    headers: {
      Authorization: `Bearer ${ process.env.COMFYUI_TOKEN }`
    }
  })

  if (process.env.COMFYUI_PROXY) {
    config.proxy = false
    config.httpsAgent = new HttpsProxyAgent(process.env.COMFYUI_PROXY)
  }

  const targetConfig = { ...config }
  const res = await doReqOri(targetConfig)
  return res
}

// 延迟实现
exports.delay = async (delayTime) => {
  const p = new Promise((res, rej) => {
    setTimeout(() => res(), delayTime)
  })
  await p
}

