/**
 * 对高清放大算法的测试
 * 备注: 除了 Latent 大部分都会触发下载
 * 
 * @author nobody
 * @date 23/09/15
 */
const fse = require('fs-extra')
const path = require('path')
const { Consts } = require('./libs/constants')
const { txt2img } = require('./libs/api_sd')
const { convertImg } = require('./libs/utils')

const hrUpscalerDir = path.join(__dirname, './outputs/hr_upscaler')
fse.removeSync(hrUpscalerDir)
fse.ensureDirSync(hrUpscalerDir)

const sd15Data = {
  prompt: '1girl',
  steps: 20,
  seed: 34324235,
  sampler_name: 'Euler',
  enable_hr: true,
  hr_scale: 2,
  denoising_strength: 0.8,
  override_settings: {
    sd_model_checkpoint: 'darkSushiMixMix_225D.safetensors'
  },
  override_settings_restore_afterwards: false
}
const sdxlData = {
  prompt: '1girl',
  steps: 20,
  seed: 34324235,
  width: 1024,
  height: 1024,
  sampler_name: 'Euler',
  enable_hr: true,
  hr_scale: 2,
  denoising_strength: 0.8,
  override_settings: {
    sd_model_checkpoint: 'sd_xl_base_1.0.safetensors'
  },
  override_settings_restore_afterwards: false
}

const hrUpscalerTest = async () => {
  console.log('start hr upscaler test list')

  // 批量测试各类高清放大算法(sd1.5)
  for (const hrUpscaler of Consts.HrUpscalerList) {
    console.log(`start test hr upscaler: ${ hrUpscaler }`)
    sd15Data.hr_upscaler = hrUpscaler
    const resData = await txt2img(sd15Data)

    const savePath = `${ hrUpscalerDir }/SD15 ${ hrUpscaler }.png`
    fse.removeSync(savePath)
    convertImg(resData.images[0], savePath)
  }

  // 批量测试各类采样方法(sdxl)
  // for (const hrUpscaler of Consts.HrUpscalerList) {
  //   console.log(`start test hr upscaler: ${ hrUpscaler }`)
  //   sdxlData.hr_upscaler = hrUpscaler
  //   const resData = await txt2img(sdxlData)

  //   const savePath = `${ hrUpscalerDir }/SDXL ${ hrUpscaler }.png`
  //   fse.removeSync(savePath)
  //   convertImg(resData.images[0], savePath)
  // }
}
hrUpscalerTest().then(() => {
  console.log('finish hr upscaler test!')
  process.exit(0)
})
