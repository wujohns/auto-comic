/**
 * sd 文生图接口基础案例
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
    seed: 34324235
  })
  const fileName = '2.1.txt2img_base.png'
  const savePath = path.join(__dirname, `../temp/${ fileName }`)
  fs.removeSync(savePath)

  convertImg(resData.images[0], savePath)
}
run().then(() => process.exit(0))
