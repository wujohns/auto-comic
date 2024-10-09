/**
 * inpaint 操作相关
 *
 * @author nobody
 * @date 24/08/29
 */
const path = require('path')
const { inpaint } = require('./libs/api_comfy')
const { downloadS3File, uploadS3File, getImageUrl } = require('./libs/utils')
const { Consts } = require('./libs/constants')

const getMaskUrl = async () => {
  const filePath = path.join(__dirname, './images/eyes_mask.png')
  const savePath = path.join(process.env.S3_OUTPUT_DIR, 'eyes_mask.png')
  await uploadS3File(filePath, savePath)
  const url = await getImageUrl(savePath)
  return url
}

const run = async () => {
  const imageUrl = Consts.baseImg
  const maskUrl = await getMaskUrl()
  const resImgUrl = await inpaint(imageUrl, maskUrl, 'red eyes')
  await downloadS3File(resImgUrl, 'inpaint_manual.png')
}
run().then(() => process.exit(0))
