/**
 * img2img 相关
 *
 * @author nobody
 * @date 23/09/15
 */
const fse = require('fs-extra')
const path = require('path')
const { img2img } = require('./libs/api_sd')
const { convertImg, convertBase64 } = require('./libs/utils')

const img2imgDir = path.join(__dirname, './outputs/img2img')
fse.removeSync(img2imgDir)
fse.ensureDirSync(img2imgDir)

const img2imgPath = path.join(__dirname, './img2img/img2img_init.png')
const img2imgBase64 = convertBase64(img2imgPath)
const maskPath = path.join(__dirname, './img2img/img2img_mask.png')
const maskBase64 = convertBase64(maskPath)
const sd15Data = {
  init_images: [img2imgBase64],
  mask: maskBase64,
  inpaint_full_res: 0,

  prompt: '1girl',
  steps: 20,
  seed: 34324235,
  override_settings: {
    sd_model_checkpoint: 'darkSushiMixMix_225D.safetensors'
  },
  override_settings_restore_afterwards: false
}

const sdxlData = {
  init_images: [img2imgBase64],
  mask: maskBase64,
  inpaint_full_res: 0,

  width: 1024,
  height: 1024,
  prompt: '1girl',
  steps: 20,
  seed: 34324235,
  override_settings: {
    sd_model_checkpoint: 'sd_xl_base_1.0.safetensors'
  },
  override_settings_restore_afterwards: false
}

const draw1 = async (data, type) => {
  console.log(`start test img2img ${ type } 1`)
  const resData1 = await img2img(data)
  const savePath1 = `${ img2imgDir }/${type}_1.png`
  fse.removeSync(savePath1)
  convertImg(resData1.images[0], savePath1)
}

const draw2 = async (data, type) => {
  console.log(`start test img2img ${ type } 2`)
  const resData2 = await img2img({
    ...data,
    restore_faces: true,
    tiling: true
  })
  const savePath2 = `${ img2imgDir }/${type}_2.png`
  fse.removeSync(savePath2)
  convertImg(resData2.images[0], savePath2)
}

const img2imgTest = async () => {
  console.log('start img2img')
  // await draw1(sd15Data, 'sd15')
  // await draw2(sd15Data, 'sd15')

  await draw1(sdxlData, 'sdxl')
  await draw2(sdxlData, 'sdxl')
}
img2imgTest().then(() => {
  console.log('finish img2img test!')
  process.exit(0)
})
