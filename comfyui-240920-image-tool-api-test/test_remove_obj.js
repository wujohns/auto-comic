/**
 * 移除对象单测处理
 *
 * @author nobody
 * @date 24/09/23
 */
const path = require('path')
const { removeObj } = require('./libs/api_comfy')
const { downloadS3File, uploadS3File } = require('./libs/utils')

const run = async () => {
  const rmobjImgPath = path.join(__dirname, './images/api_test_rmobj.png')
  const rmobjMaskPath = path.join(__dirname, './images/api_test_rmobj_mask.png')
  const rmobjImgUrl = await uploadS3File(rmobjImgPath)
  const rmobjMaskUrl = await uploadS3File(rmobjMaskPath)

  const resImgUrl = await removeObj(rmobjImgUrl, rmobjMaskUrl)
  await downloadS3File(resImgUrl, 'api_test_rmobj.png')
}
run().then(() => process.exit(0))
