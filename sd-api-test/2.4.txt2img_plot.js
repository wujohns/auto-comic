/**
 * sd 文生图部分 x/y/z plot脚本 测试
 * 参考: https://github.com/mix1009/sdwebuiapi/commit/fe269dc2d4f8a98e96c63c8a7d3b5f039625bc18
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
    seed: 34324235,
    override_settings: {
      sd_model_checkpoint: 'darkSushiMixMix_225D.safetensors [cca17b08da]',   // 基础模型配置
      sd_vae: 'animevae.pt',        // vae 配置
      CLIP_stop_at_last_layers: 1,  // clip skip 设置
    },
    script_name: 'X/Y/Z plot',    // 目前推测名称来自 title
    script_args: [                // 目前推测参数对应关系为 run 函数中的参数
      // TODO
    ]
  })
  const fileName = '2.4.txt2img_plot.png'
  const savePath = path.join(__dirname, `../temp/${ fileName }`)
  fs.removeSync(savePath)

  convertImg(resData.images[0], savePath)
}
run().then(() => process.exit(0))
