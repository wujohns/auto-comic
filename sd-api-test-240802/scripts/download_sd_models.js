/**
 * 模型下载准备
 *
 * @author nobody
 * @date 24/08/06
 */
const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '../.env') })

const civitaiHeader = {
  Cookie: process.env.CIVITAI_HEADER
}

const modelList = [
  // 室内设计(该模型需要搭配 lora) -- sd1.5
  {
    downloadLink: 'https://civitai.com/api/download/models/50722',
    file: 'xsarchitectural_v11.ckpt'
  },

  // 摄影真人写实(麦橘写实)
  // clip skip: 2
  {
    downloadLink: 'https://civitai.com/api/download/models/176425',
    file: 'majicmixRealistic_v7.safetensors'
  },

  // 产品 - sd 1.5
  // clip skip: 2
  {
    downloadLink: 'https://civitai.com/api/download/models/85831',
    file: 'productDesign_eddiemauro20.safetensors'
  },

  // 儿童绘本插画 -- sd1.5 搭配 lora
  // clip skip: 2
  {
    downloadLink: 'https://civitai.com/api/download/models/192071',
    file: 'hellokid2d_V152g.safetensors'
  },

  // 3d游戏 -- sd 1.5 搭配 lora
  {
    downloadLink: 'https://civitai.com/api/download/models/46846',
    file: 'revAnimated_v122EOL.safetensors'
  },

  // 二次元动漫 sdxl -- pony
  {
    downloadLink: 'https://civitai.com/api/download/models/673299',
    file: 'tPonynai3_v6.safetensors'
  }
]
const loraList = [
  // 室内设计 lora -- xsarchitectural_v11.ckpt
  {
    downloadLink: 'https://civitai.com/api/download/models/30384',
    file: 'xsarchitectural-7.safetensors',
  },

  // Logo - 该模型的 base model 可以直接使用 sdxl 默认模型 sdxl-lora
  {
    downloadLink: 'https://civitai.com/api/download/models/177492',
    file: 'LogoRedmondV2-Logo-LogoRedmAF.safetensors'
  },

  // 儿童绘本插画 -- sd1.5 -- hellokid2d_V152g.safetensors
  {
    downloadLink: 'https://civitai.com/api/download/models/67980',
    file: 'COOLKIDS_MERGE_V2.5.safetensors'
  },

  // 3d游戏 -- revAnimated_v122EOL.safetensors
  {
    downloadLink: 'https://civitai.com/api/download/models/107366',
    file: '3DMM_V12.safetensors'
  }
]

const webuiDir = path.join(__dirname, '../../tools/sd-webui-240802')
const modelDir = path.join(webuiDir, 'models/Stable-diffusion')
const loraDir = path.join(webuiDir, 'models/Lora')

const { Downloader } = require('nodejs-file-downloader')
const downloadModelList = async () => {
  let start = false
  for (const fileInfo of modelList) {
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
          directory: modelDir,
          fileName: path.basename(file),
          proxy: process.env.HG_RPOXY,
          headers: civitaiHeader
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

const downloadLoraList = async () => {
  let start = false
  for (const fileInfo of loraList) {
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
          directory: loraDir,
          fileName: path.basename(file),
          proxy: process.env.HG_RPOXY,
          headers: civitaiHeader
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
  await downloadLoraList()
}
run().then(() => process.exit(0))
