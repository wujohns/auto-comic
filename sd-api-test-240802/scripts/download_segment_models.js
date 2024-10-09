/**
 * segment 相关模型下载
 *
 * @author nobody
 * @date 24/08/08
 */
const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '../.env') })
const { Downloader } = require('nodejs-file-downloader')

// 分割模型列表(这里)
const samModelList = [
  // sam from meta ai
  {
    // 2.56g
    downloadLink: 'https://dl.fbaipublicfiles.com/segment_anything/sam_vit_h_4b8939.pth',
    file: 'sam_vit_h_4b8939.pth'
  },
  {
    // 1.25g
    downloadLink: 'https://dl.fbaipublicfiles.com/segment_anything/sam_vit_l_0b3195.pth',
    file: 'sam_vit_l_0b3195.pth'
  },
  {
    // 375mb
    downloadLink: 'https://dl.fbaipublicfiles.com/segment_anything/sam_vit_b_01ec64.pth',
    file: 'sam_vit_b_01ec64.pth'
  },

  // sam_hq from syscv -- sam 的改良版
  {
    // 2.57g
    downloadLink: 'https://huggingface.co/lkeab/hq-sam/resolve/main/sam_hq_vit_h.pth',
    file: 'sam_hq_vit_h.pth'
  },
  {
    // 1.25g
    downloadLink: 'https://huggingface.co/lkeab/hq-sam/resolve/main/sam_hq_vit_l.pth',
    file: 'sam_hq_vit_l.pth'
  },
  {
    // 379mb
    downloadLink: 'https://huggingface.co/lkeab/hq-sam/resolve/main/sam_hq_vit_b.pth',
    file: 'sam_hq_vit_b.pth'
  }
]

// 语意识别模型列表
const groundingDINOModelList = [
  {
    // 938mb
    downloadLink: 'https://huggingface.co/ShilongLiu/GroundingDINO/resolve/main/groundingdino_swinb_cogcoor.pth',
    file: 'groundingdino_swinb_cogcoor.pth'
  },
  {
    // 694mb
    downloadLink: 'https://huggingface.co/ShilongLiu/GroundingDINO/resolve/main/groundingdino_swint_ogc.pth',
    file: 'groundingdino_swint_ogc.pth'
  }
]

// 模型存放目录
const webuiDir = path.join(__dirname, '../../tools/sd-webui-240802')
const samModelDir = path.join(webuiDir, 'extensions/sd-webui-segment-anything/models/sam')
const groundingDINODir = path.join(webuiDir, 'extensions/sd-webui-segment-anything/models/grounding-dino')

const downloadSameModelList = async () => {
  let start = false
  for (const fileInfo of samModelList) {
    const { file, downloadLink } = fileInfo
    console.log(`start download file: ${ file }`)

    // 自动重试
    let finish = false
    while (!finish) {
      try {
        // 手动断点重新下载处理
        // if (file === 'tPonynai3_v6.safetensors') start = true
        // if (!start) break
  
        const downloader = new Downloader({
          url: downloadLink,
          directory: samModelDir,
          fileName: path.basename(file),
          proxy: process.env.HG_RPOXY
        })
        await downloader.download()
        finish = true
      } catch (err) {
        console.log(`download failed: ${ file }`)
        console.log(err.message)
        console.log(`restart download file: ${ file }`)
      }
    }
  }
}

const downloadGroundingDINOModelList = async () => {
  let start = false
  for (const fileInfo of groundingDINOModelList) {
    const { file, downloadLink } = fileInfo
    console.log(`start download file: ${ file }`)

    // 自动重试
    let finish = false
    while (!finish) {
      try {
        // 手动断点重新下载处理
        // if (file === 'tPonynai3_v6.safetensors') start = true
        // if (!start) break
  
        const downloader = new Downloader({
          url: downloadLink,
          directory: groundingDINODir,
          fileName: path.basename(file),
          proxy: process.env.HG_RPOXY
        })
        await downloader.download()
        finish = true
      } catch (err) {
        console.log(`download failed: ${ file }`)
        console.log(err.message)
        console.log(`restart download file: ${ file }`)
      }
    }
  }
}

const run = async () => {
  // await downloadSameModelList()
  await downloadGroundingDINOModelList()
}
run().then(() => process.exit(0))
