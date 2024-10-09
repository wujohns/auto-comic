/**
 * sd 图生图接口基础案例
 * 不加 mask 的场景
 *
 * @author nobody
 * @date 23/09/06
 */
const fs = require('fs-extra')
const path = require('path')
const { convertImg, convertBase64 } = require('../libs/utils')
const { img2img } = require('../libs/sd_api')

const run = async () => {
  const img2imgPath = path.join(__dirname, './img2img/5.1.img2img_init.png')
  const img2imgBase64 = convertBase64(img2imgPath)
  const resData = await img2img({
    init_images: [img2imgBase64],   // 用于重绘的图片

    prompt: '1girl',
    steps: 20,
    seed: 34324235,

    override_settings: {
      sd_model_checkpoint: 'darkSushiMixMix_225D.safetensors [cca17b08da]',   // 基础模型配置
      sd_vae: 'animevae.pt',        // vae 配置
      CLIP_stop_at_last_layers: 1,  // clip skip 设置
    },
    override_settings_restore_afterwards: false
  })

  const fileName = '5.1.img2img_base.png'
  const savePath = path.join(__dirname, `../temp/${ fileName }`)
  fs.removeSync(savePath)

  convertImg(resData.images[0], savePath)
}
run().then(() => process.exit(0))
