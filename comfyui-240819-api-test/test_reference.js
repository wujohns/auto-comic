/**
 * reference 测试相关
 *
 * @author nobody
 * @date 24/08/23
 */
const { reference } = require('./libs/api_comfy')
const { downloadS3File } = require('./libs/utils')
const { Consts } = require('./libs/constants')

const run = async () => {
  const resImgUrl = await reference({
    imageUrl: Consts.baseImg,
    prompt: Consts.baseImgReference,
    width: Consts.baseImgWidth,
    height: Consts.baseImgHeight
  })
  await downloadS3File(resImgUrl, 'reference.png')
}
run().then(() => process.exit(0))
