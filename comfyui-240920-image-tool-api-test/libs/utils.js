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
const { GetObjectCommand, PutObjectCommand, S3Client } = require('@aws-sdk/client-s3')
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner')
const { Downloader } = require('nodejs-file-downloader')

require('dotenv').config({ path: path.join(__dirname, '../.env') })
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0

const s3ClientConfig = {
  region: process.env.S3_REGION,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_KEY
  }
}
if (process.env.S3_PROXY) {
  s3ClientConfig.requestHandler = {
    httpsAgent: new HttpsProxyAgent(process.env.S3_PROXY)
  }
}
const s3Client = new S3Client(s3ClientConfig)

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

// TODO 替换为 s3 模式后，该部分不再使用 base64 模式
// 将 base64 以图片方式存储到指定路径
// exports.convertImg = (base64Str, savePath) => {
//   const dataBuffer = Buffer.from(base64Str, 'base64')
//   fs.writeFileSync(savePath, dataBuffer)
// }

// 将图片转换为 base64
// exports.convertBase64 = (imgPath) => {
//   const extName = path.extname(imgPath)
//   let prefix = ''
//   if (extName === 'png') prefix = 'data:image/png;base64,'
//   if (extName === 'jpg' || extName === 'jpeg') prefix = 'data:image/jpeg;base64,'
//   const imgBase64 = fs.readFileSync(imgPath, 'base64')
//   const base64 = `${ prefix }${ imgBase64 }`
//   return base64
// }

// 获取 comfyui 图片可访问 url(s3)
exports.getImageUrl = async (imagePath) => {
  const command = new GetObjectCommand({
    Bucket: process.env.S3_BUCKET_NAME,
    Key: imagePath
  })
  const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 })
  return url
}

// 延迟实现
exports.delay = async (delayTime) => {
  const p = new Promise((res, rej) => {
    setTimeout(() => res(), delayTime)
  })
  await p
}

// 文件下载
exports.downloadS3File = async (url, fileName) => {
  const downloadConfig = {
    url, fileName,
    directory: path.join(__dirname, '../outputs'),
  }
  if (process.env.S3_PROXY) {
    downloadConfig.proxy = process.env.S3_PROXY
  }
  const downloader = new Downloader(downloadConfig)
  await downloader.download()
}

// 文件上传
exports.uploadS3File = async (filePath) => {
  const filename = path.basename(filePath)
  const savePath = path.join(process.env.S3_OUTPUT_DIR, filename)
  const command = new PutObjectCommand({
    Bucket: process.env.S3_BUCKET_NAME,
    Key: savePath,
    Body: fs.createReadStream(filePath)
  })
  await s3Client.send(command)
  const url = await exports.getImageUrl(savePath)
  return url
}
