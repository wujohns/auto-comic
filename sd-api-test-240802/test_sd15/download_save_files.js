/**
 * sd1.5 文件下载相关(获取需要下载的文件列表)
 *
 * @author nobody
 * @date 24/08/05
 */
const fs = require('fs')
const path = require('path')
const { ProxyAgent, request } = require('undici')
const { pipeline } = require('stream/promises')
require('dotenv').config({ path: path.join(__dirname, '../.env') })

const dispatcher = new ProxyAgent(process.env.HG_RPOXY)

const targetDir = path.join(
  __dirname,
  '../../tools/sd-webui-240802/extensions/sd-webui-controlnet/models'
)
const fileList = require('./download_files.json')

const { Downloader } = require('nodejs-file-downloader')
const run = async () => {
  for (const fileInfo of fileList) {
    const { repo, file } = fileInfo
    console.log(`start download file: ${ repo } - ${ file }`)
    const downloadLink = `https://huggingface.co/${ repo }/resolve/main/${ file }`
    const targetPath = path.join(targetDir, path.basename(file))
    const downloader = new Downloader({
      url: downloadLink,
      directory: targetDir,
      fileName: path.basename(file),
      proxy: process.env.HG_RPOXY
    })
    await downloader.download()

    // const writeStream = fs.createWriteStream(targetPath)
    // const response = await request(downloadLink, { dispatcher })
    // try {
    //   await pipeline(response.body, writeStream)
    // } catch (error) {
    //   console.error(`download ${ repo } - ${ file } failed:`, error.message)
    // } finally {
    //   writeStream.close()
    // }
    break
  }
}
run().then(() => process.exit(0))
