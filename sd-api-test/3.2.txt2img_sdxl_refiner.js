/**
 * sdxl 文生图部分 refiner 插件测试
 * 调试时参考: <webui>/extensions/sd-webui-refiner/scripts/refiner.py
 * 1. 参考其 title 函数
 * 2. 参考其 process 函数
 *
 * @author nobody
 * @date 23/08/27
 */
const fs = require('fs-extra')
const path = require('path')
const { convertImg } = require('../libs/utils')
const { txt2img } = require('../libs/sd_api')

const run = async () => {
  baseModel = 'sd_xl_base_1.0.safetensors [31e35c80fc]'
  refinerModel = 'sd_xl_refiner_1.0.safetensors [7440042bbd]'
  const resData = await txt2img({
    prompt: '1girl',
    steps: 20,
    height: 1024,
    width: 1024,
    seed: 34324235,
    sampler_name: 'Euler a',
    override_settings: {
      sd_model_checkpoint: baseModel, // 基础模型
      sd_vae: 'Automatic',            // vae 配置
      CLIP_stop_at_last_layers: 1,    // clip skip 设置
    },
    alwayson_scripts: {
      Refiner: {
        args: [
          true,           // 是否开启该插件
          refinerModel,   // refiner 模型
          20              // refiner 模型计算步骤
        ]
      }
    }
  })

  // 保存图片
  const fileName = '3.2.txt2img_sdxl_refiner.png'
  const savePath = path.join(__dirname, `../temp/${ fileName }`)
  fs.removeSync(savePath)

  convertImg(resData.images[0], savePath)
}
run().then(() => process.exit(0))
