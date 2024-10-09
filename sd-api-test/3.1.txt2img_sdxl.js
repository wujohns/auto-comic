/**
 * sdxl 文生图部分测试
 * 备注: 这里测试只采用 base 模型，未引入 refiner 模型的场景
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
    prompt: '1girl',
    steps: 20,
    height: 1024,
    width: 1024,
    seed: 34324235,
    override_settings: {
      sd_model_checkpoint: 'sd_xl_base_1.0.safetensors [31e35c80fc]',   // 基础模型配置
      sd_vae: 'Automatic',          // vae 配置
      CLIP_stop_at_last_layers: 1,  // clip skip 设置
    },
    override_settings_restore_afterwards: false
  })
  const fileName = '3.1.txt2img_sdxl.png'
  const savePath = path.join(__dirname, `../temp/${ fileName }`)
  fs.removeSync(savePath)

  convertImg(resData.images[0], savePath)
}
run().then(() => process.exit(0))
