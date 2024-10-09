/**
 * 替换背景处理
 *
 * @author nobody
 * @date 24/09/23
 */
const path = require('path')
const { replaceBg } = require('./libs/api_comfy')
const { downloadS3File, uploadS3File } = require('./libs/utils')

const run = async () => {
  const filePath = path.join(__dirname, './images/api_test_replacebg.png')
  const imgUrl = await uploadS3File(filePath)
  const bgPrompt = 'a cozy marble kitchen with wine glasses'

  const resImgUrl = await replaceBg(imgUrl, bgPrompt)
  await downloadS3File(resImgUrl, 'api_test_replacebg.png')
}
run().then(() => process.exit(0))
