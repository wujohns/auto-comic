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

// 在 txt2img 模式下的配置(为了简化这里暂时不加入来自 controlnet 部分的影响)
// controlnet 对该部分的影响参考 sd-webui-controlnet/scripts/xyz_grid_support.py
const XYZPlotAvailableScripts = [
  'Nothing',
  'Seed',
  'Var. seed',
  'Var. strength',
  'Steps',
  'Hires steps',
  'CFG Scale',
  'Prompt S/R',
  'Prompt order',
  'Sampler',
  'Checkpoint name',
  'Negative Guidance minimum sigma',
  'Sigma Churn',
  'Sigma min',
  'Sigma max',
  'Sigma noise',
  'Schedule type',
  'Schedule min sigma',
  'Schedule max sigma',
  'Schedule rho',
  'Eta',
  'Clip skip',
  'Denoising',
  'Hires upscaler',
  'VAE',
  'Styles',
  'UniPC Order',
  'Face restore',
  'Token merging ratio',
  'Token merging ratio high-res',
  'Always discard next-to-last sigma'
]

const XAxisType = 'Steps'
const XAxisValues = '8,16'
const YAxisType = 'Sampler'
const YAxisValues = 'Euler,DPM++ 2S a Karras'
const ZAxisType = 'Nothing'
const ZAxisValues = ''

const drawLegend = true
const includeLoneImage = false
const includeSubGrids = false
const noFixedSeeds = false
const marginSize = 0

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
    script_name: 'X/Y/Z plot',    // 名称为脚本 title 函数返回值
    script_args: [                // 参数对应为脚本中 run 函数中的参数
      XYZPlotAvailableScripts.indexOf(XAxisType), XAxisValues, [],
      XYZPlotAvailableScripts.indexOf(YAxisType), '', YAxisValues.split(','),
      XYZPlotAvailableScripts.indexOf(ZAxisType), ZAxisValues, [],
      drawLegend, includeLoneImage, includeSubGrids, noFixedSeeds, marginSize
    ]
  })

  const fileName = '2.4.txt2img_plot.png'
  const savePath = path.join(__dirname, `../temp/${ fileName }`)
  fs.removeSync(savePath)
  convertImg(resData.images[0], savePath)
}
run().then(() => process.exit(0))
