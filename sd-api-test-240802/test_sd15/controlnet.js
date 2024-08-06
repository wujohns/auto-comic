/**
 * sd1.5 的 controlnet 测试
 *
 * @author nobody
 * @date 24/08/05
 */
const _ = require('lodash')
const fse = require('fs-extra')
const path = require('path')
const { Consts } = require('../libs/constants')
const { txt2img } = require('../libs/api_sd')
const { convertImg, convertBase64 } = require('../libs/utils')

const controlnetDir = path.join(__dirname, '../outputs/controlnet_sd15')
fse.removeSync(controlnetDir)
fse.ensureDirSync(controlnetDir)

const oriImgPath = path.join(__dirname, '../img2img/img2img_init.png')
const oriImgBase64 = convertBase64(oriImgPath)
const data = {
  prompt: '1girl',
  steps: 20,
  seed: 34324235,
  override_settings: {
    sd_model_checkpoint: 'darkSushiMixMix_225D.safetensors'
  },
  override_settings_restore_afterwards: false
}

/**
 * 单个 controlnet 测试
 * @param name - 类别
 * @param model - 模型名
 * @param prepocessorList - 预处理器列表
 */
const partTest = async (name, model, prepocessorList) => {
  const partDir = `${ controlnetDir }/${ name }`
  fse.ensureDirSync(partDir)

  if (!prepocessorList) {
    // 只有模型的场景
    console.log(`test ${ name }, model: ${ model }`)
    const resData = await txt2img({
      ...data,
      alwayson_scripts: {
        ControlNet: {
          args: [{
            enabled: true,
            image: oriImgBase64,
            model,
            processor_res: 512
          }]
        }
      }
    })

    const fileName = `${ model }`
    for (let i = 0; i < resData.images.length; i++) {
      const image = resData.images[i]
      const savePath = `${ partDir }/${ fileName }_${ i }.png`
      fse.removeSync(savePath)
      convertImg(image, savePath)
    }
    return
  }

  // 有预处理的场景
  for (const prepocessor of prepocessorList) {
    const { module, controlnet_threshold_a, controlnet_threshold_b } = prepocessor
    console.log(`test ${ name }, model: ${ model }, prepocessor: ${ module }`)
    const config = {
      ...data,
      alwayson_scripts: {
        ControlNet: {
          args: [{
            enabled: true,
            image: oriImgBase64,
            module: module,
            model,
            processor_res: 512,
            threshold_a: controlnet_threshold_a,
            threshold_b: controlnet_threshold_b
          }]
        }
      }
    }
    const resData = await txt2img(config)

    const fileName = `${ model }_${ module }`
    for (let i = 0; i < resData.images.length; i++) {
      const image = resData.images[i]
      const savePath = `${ partDir }/${ fileName }_${ i }.png`
      fse.removeSync(savePath)
      convertImg(image, savePath)
    }
  }
}

const controlnetTest = async () => {
  console.log('start controlnet test list')

  // 进行测试
  for (const controlnetInfo of Consts.SD15ControlNetList) {
    const { name, model, prepocessorList, modelList } = controlnetInfo
    if (modelList) {
      for (const modelName of modelList) {
        await partTest(name, modelName, prepocessorList)
      }
    } else {
      await partTest(name, model, prepocessorList)
    }
  }
}
controlnetTest().then(() => {
  console.log('finish controlnet test!')
  process.exit(0)
})
