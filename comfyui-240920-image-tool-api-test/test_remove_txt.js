/**
 * 移除文字单测处理
 *
 * @author nobody
 * @date 24/09/24
 */
const path = require('path')
const { removeTxt } = require('./libs/api_comfy')
const { downloadS3File, uploadS3File } = require('./libs/utils')

const run = async () => {
  const filePath = path.join(__dirname, './images/api_test_rmtxt.png')
  const imgUrl = await uploadS3File(filePath)

  const resImgUrl = await removeTxt(imgUrl)
  await downloadS3File(resImgUrl, 'api_test_rmtxt.png')
}
run().then(() => process.exit(0))
