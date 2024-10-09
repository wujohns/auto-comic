/**
 * controlnet 预处理器调用
 * 需要注意的时即使预处理调用成功，部分场景下依旧不会返回图片，主要原因与 controlnet 插件内部的接口的图片格式化步骤有关，参考 issue:
 * https://github.com/Mikubill/sd-webui-controlnet/issues/1830
 *
 * @author nobody
 * @date 24/08/02
 */
const _ = require('lodash')
const fse = require('fs-extra')
const path = require('path')
const { Consts } = require('./libs/constants')
const { controlnetDetect } = require('./libs/api_sd')
const { convertImg, convertBase64 } = require('./libs/utils')

const controlnetDetectDir = path.join(__dirname, './outputs/controlnet_detect')
fse.removeSync(controlnetDetectDir)
fse.ensureDirSync(controlnetDetectDir)

const controlnetDetectTest = async () => {
  console.log('start controlnet detect test list')
  const oriImgPath = path.join(__dirname, './img2img/img2img_init.png')
  const data = {
    controlnet_input_images: [convertBase64(oriImgPath)],
    controlnet_processor_res: 512  // 预处理结果分辨率
  }

  for (const typeKey in Consts.PrepocessorMap) {
    const prepocessorList = Consts.PrepocessorMap[typeKey]
    for (const prepocessor of prepocessorList) {
      const { module, controlnet_threshold_a, controlnet_threshold_b } = prepocessor
      console.log(`start test controlnet detect: ${ module }`)
      data.controlnet_module = module
      _.unset(data, 'controlnet_threshold_a')
      _.unset(data, 'controlnet_threshold_b')
      if (controlnet_threshold_a || controlnet_threshold_a === 0) data.controlnet_threshold_a = controlnet_threshold_a
      if (controlnet_threshold_b || controlnet_threshold_b === 0) data.controlnet_threshold_b = controlnet_threshold_b

      const queryData = { ...data }
      if (typeKey === 'Inpaint') {
        // APIBUG Inpaint detect 也有数据不一致的问题
        // Inpaint webui 端没有问题的原因是采用了前端的 inpaint 预处理方式
        // const maskImgPath = path.join(__dirname, './img2img/img2img_mask.png')
        // queryData.controlnet_masks = [convertBase64(maskImgPath)]
        continue
      }
      if (typeKey === 'Revision') {
        // revision 明确不支持 detect，但流程可用
        continue
      }

      let resData
      try {
        resData = await controlnetDetect(queryData)
      } catch (err) {
        console.log(err.message, err.response.data)
      }

      if (_.isEmpty(_.get(resData, 'images[0]'))) {
        if (resData.info !== 'Success') console.log(`!!!!! prepocessor ${ module } faild!`)
        else console.log(`---- prepocessor ${ module } detect api return empty image`)
        continue
      }
      const savePath = `${ controlnetDetectDir }/${ module }.png`
      fse.removeSync(savePath)
      convertImg(resData.images[0], savePath)
    }
  }
}
controlnetDetectTest().then(() => {
  console.log('finish controlnet detect test!')
  process.exit(0)
})
