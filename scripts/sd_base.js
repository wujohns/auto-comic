/**
 * stable diffusion 基础接口调用案例
 *
 * @author nobody
 * @date 23/08/23
 */
const fs = require('fs')
const path = require('path')
const { convertImg } = require('../libs/utils')
const { getOptions, sd15Txt2img } = require('../libs/sd_api')

const run = async () => {
  const options = await getOptions()
  console.log(options)

  // await sd15Txt2img({

  // })
}
run().then(() => process.exit(0))
