/**
 * sd 文生图高清重绘部分测试
 *
 * @author nobody
 * @date 23/08/24
 */
const fs = require('fs-extra')
const path = require('path')
const { convertImg } = require('../libs/utils')
const { txt2img } = require('../libs/sd_api')

// TODO 主要确认 denoising_strength 是否是对标
const run = async () => {
  const resData = await txt2img({
    prompt: '1girl',
    steps: 20,
    seed: 34324235,
  })

}
