/**
 * 移除背景单测处理
 *
 * @author nobody
 * @date 24/09/23
 */
const path = require('path')
const { removeBg } = require('./libs/api_comfy')
const { downloadS3File, uploadS3File } = require('./libs/utils')

const run = async () => {
  const filePath = path.join(__dirname, './images/api_test_rmbg.png')
  const imgUrl = await uploadS3File(filePath)

  const resImgUrl = await removeBg(imgUrl)
  await downloadS3File(resImgUrl, 'api_test_rmbg.png')
}
run().then(() => process.exit(0))
