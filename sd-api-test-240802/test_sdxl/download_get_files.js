/**
 * sdxl 文件下载相关
 * 参考: https://github.com/Mikubill/sd-webui-controlnet/wiki/Model-download
 *
 * @author nobody
 * @date 24/08/06
 */
const fs = require('fs')
const path = require('path')
const { hgCustomFetch } = require('../libs/utils')
const { listFiles } = require('@huggingface/hub')

const fileList = []
const run = async () => {
  // controlnet 来源列表
  // https://huggingface.co/lllyasviel/sd_control_collection/tree/main
  // https://huggingface.co/bdsqlsz/qinglong_controlnet-lllite/tree/main
  // https://civitai.com/models/330313/ttplanetsdxlcontrolnettilerealistic
  // https://huggingface.co/TheMistoAI/MistoLine
  // https://huggingface.co/kataragi
  // https://huggingface.co/xinsir

  // 当前选择A
  // 模型较为齐全，且都是小体积便于快速尝试
  // https://huggingface.co/bdsqlsz/qinglong_controlnet-lllite/tree/main
  const qlRepo = 'bdsqlsz/qinglong_controlnet-lllite'
  const qlFiles = await listFiles({ repo: qlRepo, fetch: hgCustomFetch })
  for await (const file of qlFiles) {
    const filePath = file.path
    const extName = path.extname(filePath)
    if (extName === '.safetensors') {
      fileList.push({
        downloadLink: `https://huggingface.co/${ qlRepo }/resolve/main/${ filePath }`,
        repo: qlRepo,
        file: filePath
      })
    }
  }

  // 当前选择B
  // https://huggingface.co/kataragi 中的 inpaint 效果较好
  // https://huggingface.co/kataragi/controlnetXL_inpaint/tree/main
  const kataInpaintRepo = 'kataragi/controlnetXL_inpaint'
  const kataInpaintFiles = await listFiles({ repo: kataInpaintRepo, fetch: hgCustomFetch })
  for await (const file of kataInpaintFiles) {
    const filePath = file.path
    const extName = path.extname(filePath)
    if (extName === '.safetensors') {
      fileList.push({
        downloadLink: `https://huggingface.co/${ kataInpaintRepo }/resolve/main/${ filePath }`,
        repo: qlRepo,
        file: filePath
      })
    }
  }

  fs.writeFileSync(
    path.join(__dirname, './download_files.json'),
    JSON.stringify(fileList, null, 2),
    { encoding: 'utf8' }
  )
}
run().then(() => process.exit(0))
