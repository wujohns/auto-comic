/**
 * sd1.5 文件下载相关(获取需要下载的文件列表)
 *
 * @author nobody
 * @date 24/08/05
 */
const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '../.env') })

const targetDir = path.join(
  __dirname,
  '../../tools/sd-webui-240802/extensions/sd-webui-controlnet/models'
)
const fileList = require('./download_files.json')

const { Downloader } = require('nodejs-file-downloader')
const run = async () => {
  let start = false
  for (const fileInfo of fileList) {
    const { repo, file } = fileInfo
    console.log(`start download file: ${ repo } - ${ file }`)
    const downloadLink = `https://huggingface.co/${ repo }/resolve/main/${ file }`

    // 自动重试
    let finish = false
    while (!finish) {
      try {
        // 手动断点重新下载处理
        if (file === 'control_v11p_sd15s2_lineart_anime.pth') start = true
        if (!start) break
  
        const downloader = new Downloader({
          url: downloadLink,
          directory: targetDir,
          fileName: path.basename(file),
          proxy: process.env.HG_RPOXY
        })
        await downloader.download()
        finish = true
      } catch (err) {
        console.log(`download failed: ${ repo } - ${ file }`)
        console.log(err.message)
        console.log(`restart download file: ${ repo } - ${ file }`)
      }
    }
  }
}
run().then(() => process.exit(0))
