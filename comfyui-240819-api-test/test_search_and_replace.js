/**
 * 搜索替换相关
 *
 * @author nobody
 * @date 24/08/23
 */
const { searchAndReplace } = require('./libs/api_comfy')
const { downloadS3File } = require('./libs/utils')
const { Consts } = require('./libs/constants')

const run = async () => {
  const resImgUrl = await searchAndReplace(
    Consts.baseImg, 'eyes', 'red eyes'
  )
  console.log(resImgUrl)
  await downloadS3File(resImgUrl, 'inpaint_auto.png')
}
run().then(() => process.exit(0))
