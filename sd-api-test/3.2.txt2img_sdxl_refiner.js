/**
 * sdxl 文生图部分 refiner 插件测试
 *
 * @author nobody
 * @date 23/08/27
 */
const fs = require('fs-extra')
const path = require('path')
const { convertImg } = require('../libs/utils')
const { txt2img } = require('../libs/sd_api')

const run = async () => {
  const resData = await txt2img({
    prompt: '1girl',
    steps: 20,
    seed: 34324235,
    override_settings: {
      sd_model_checkpoint: 'sd_xl_base_1.0.safetensors [31e35c80fc]',   // 基础模型配置
      sd_vae: 'Automatic',          // vae 配置
      CLIP_stop_at_last_layers: 1,  // clip skip 设置
    },
    alwayson_scripts: {
      // TODO 进行测试与规划
    }
  })

  // 保存图片
  const fileName = '3.2.txt2img_sdxl_refiner'
  for (let i = 0; i < resData.images.length; i++) {
    const image = resData.images[i]
    const savePath = path.join(__dirname, `../temp/${ fileName }_${ i }.png`)
    fs.removeSync(savePath)
    convertImg(image, savePath)
  }
}
run().then(() => process.exit(0))
