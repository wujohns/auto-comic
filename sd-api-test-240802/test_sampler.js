/**
 * 采样方法测试相关
 *
 * @author nobody
 * @date 24/08/04
 */
const fse = require('fs-extra')
const path = require('path')
const { Consts } = require('./libs/constants')
const { txt2img } = require('./libs/api_sd')
const { convertImg } = require('./libs/utils')

const samplerDir = path.join(__dirname, './outputs/sampler')
fse.removeSync(samplerDir)
fse.ensureDirSync(samplerDir)

const sd15Data = {
  prompt: '1girl',
  steps: 20,
  width: 512,
  height: 512,
  seed: 34324235,
  override_settings: {
    sd_model_checkpoint: 'darkSushiMixMix_225D.safetensors'
  },
  override_settings_restore_afterwards: false
}

const sdxlData = {
  prompt: '1girl',
  steps: 20,
  width: 1024,
  height: 1024,
  seed: 34324235,
  override_settings: {
    sd_model_checkpoint: 'sd_xl_base_1.0.safetensors'
  },
  override_settings_restore_afterwards: false
}

const samplerTest = async () => {
  console.log('start sampler test list')
  const data = sdxlData

  // 批量测试各类采样方法(sd1.5)
  for (const samplerName of Consts.SamplerList) {
    console.log(`start test sd1.5 sampler: ${ samplerName }`)
    sd15Data.sampler_name = samplerName
    const sd15ResData = await txt2img(sd15Data)

    const sd15SavePath = `${ samplerDir }/SD15 ${ samplerName }.png`
    fse.removeSync(sd15SavePath)
    convertImg(sd15ResData.images[0], sd15SavePath)
  }

  // 批量测试各类采样方法(sdxl)
  for (const samplerName of Consts.SamplerList) {
    console.log(`start test sdxl sampler: ${ samplerName }`)
    sdxlData.sampler_name = samplerName
    const sdxlResData = await txt2img(sdxlData)

    const sdxlSavePath = `${ samplerDir }/SDXL ${ samplerName }.png`
    fse.removeSync(sdxlSavePath)
    convertImg(sdxlResData.images[0], sdxlSavePath)
  }
}
samplerTest().then(() => {
  console.log('finish sampler test!')
  process.exit(0)
})
