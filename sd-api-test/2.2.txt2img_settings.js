/**
 * sb 文生图 override_settings 变更测试
 * 该部分影响的参数为:  
 * 1.sd_model_checkpoint - 基础模型
 * 2.sd_vae - vae 配置
 * 3.CLIP_stop_at_last_layers - clip skip 配置
 *
 * @author nobody
 * @date 23/08/24
 */
const fs = require('fs-extra')
const path = require('path')
const { convertImg } = require('../libs/utils')
const { txt2img } = require('../libs/sd_api')

const run = async () => {
  const resData = await txt2img({
    prompt: '1girl, <lora:anime_minimalist_v1:1>',
    steps: 20,
    seed: 34324235,
    override_settings: {
      // sd_model_checkpoint: 'darkSushiMixMix_225D.safetensors [cca17b08da]',   // 基础模型配置
      sd_model_checkpoint: 'flat2DAnimerge_v30.safetensors',   // 基础模型配置
      sd_vae: 'animevae.pt',        // vae 配置
      CLIP_stop_at_last_layers: 2,  // clip skip 设置
    },
    override_settings_restore_afterwards: false
  })
  const fileName = '2.2.txt2img_settings.png'
  const savePath = path.join(__dirname, `../temp/${ fileName }`)
  fs.removeSync(savePath)

  convertImg(resData.images[0], savePath)
}
run().then(() => process.exit(0))
