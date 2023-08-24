/**
 * stable diffusion 基础接口调用案例
 *
 * @author nobody
 * @date 23/08/23
 */
const fs = require('fs')
const path = require('path')
const { convertImg } = require('../libs/utils')
const { getOptions } = require('../libs/sd_api')

// TODO 先尝试无授权的实验
const run = async () => {
  const options = await getOptions()
  console.log(options)
}
run().then(() => process.exit(0))
