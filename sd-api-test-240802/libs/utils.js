/**
 * 工具方法相关
 *
 * @author wujohns
 * @date 23/08/24
 */
const fs = require('fs')
const path = require('path')
const axios = require('axios')
const { NodeSSH } = require('node-ssh')
const { ProxyAgent, fetch } = require('undici')
require('dotenv').config({ path: path.join(__dirname, '../.env') })
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0

// huggingface 自定义 fetch(支持 proxy 特性)
const hgDispatcher = new ProxyAgent(process.env.HG_RPOXY)
exports.hgCustomFetch = (input, init) => {
  const reqInit = init || {}
  reqInit.dispatcher = hgDispatcher
  return fetch(input, reqInit)
}

// 发送请求
exports.doSdReq = async (config) => {
  const baseURL = process.env.SD_BASEURL
  const doReqOri = axios.create({
    baseURL,
    timeout: 350000,
    headers: config.headers
  })

  const targetConfig = { ...config }
  if (process.env.SD_USERNAME) targetConfig.auth = {
    username: process.env.SD_USERNAME,
    password: process.env.SD_PASSWORD
  }

  const res = await doReqOri(targetConfig)
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

// 获取远端目录的文件列表
exports.getRemoteFileList = async (dirPath) => {
  const ssh = new NodeSSH()
  await ssh.connect({
    host: process.env.SD_SSH_HOST,
    port: process.env.SD_SSH_PORT,
    username: 'root',
    password: process.env.SD_SSH_PASS
  })

  const res = await ssh.execCommand('ls', { cwd: dirPath })
  const fileListStr = res.stdout
  const fileList = fileListStr.split('\n')
  return fileList
}

// 移除文件名尾缀
exports.removeExt = (filename) => {
  return path.basename(filename).replace(/\.[^/.]+$/, "")
}
