/**
 * sd 文生图部分 controlnet 插件测试
 * 参考: https://github.com/AUTOMATIC1111/stable-diffusion-webui/discussions/10468
 * 其他参数重点参考: controlnet.py 中的 parse_remote_call 函数属性
 * 
 * @author nobody
 * @date 23/08/27
 */
const fs = require('fs-extra')
const path = require('path')
const { convertImg, convertBase64 } = require('../libs/utils')
const { txt2img } = require('../libs/sd_api')

const run = async () => {
  const cannyOriPath = path.join(__dirname, './controlnet/canny-ori.png')
  const resData = await txt2img({
    prompt: '1girl',
    steps: 20,
    seed: 34324235,
    override_settings: {
      // sd_model_checkpoint: 'darkSushiMixMix_225D.safetensors [cca17b08da]',   // 基础模型配置
      sd_model_checkpoint: 'darkSushiMixMix_225D.safetensors',
      sd_vae: 'animevae.pt',        // vae 配置
      CLIP_stop_at_last_layers: 1,  // clip skip 设置
    },
    alwayson_scripts: {
      ControlNet: {
        args: [
          {
            input_image: convertBase64(cannyOriPath),     // 输入图片
            module: 'canny',                              // 预处理方法(空时为 'none')
            // module: 'invert (from white bg & black line)',
            // model: 'control_v11p_sd15_canny [d14c016b]',  // controlnet 模型
            model: 'control_v11p_sd15_canny',  // controlnet 模型
          }
        ]
      }
    }
  })

  // 保存图片
  const fileName = '2.5.txt2img_controlnet'
  for (let i = 0; i < resData.images.length; i++) {
    const image = resData.images[i]
    const savePath = path.join(__dirname, `../temp/${ fileName }_${ i }.png`)
    fs.removeSync(savePath)
    convertImg(image, savePath)
  }
}
run().then(() => process.exit(0))
