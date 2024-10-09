/**
 * sam 测试相关
 * 备注: 测试时间短，快速验证
 *
 * @author nobody
 * @date 24/08/23
 */
const { autoSam } = require('./libs/api_comfy')
const { downloadS3File } = require('./libs/utils')
const { Consts } = require('./libs/constants')

const run = async () => {
  const resImgUrl = await autoSam('eyes', Consts.baseImg)
  await downloadS3File(resImgUrl, 'mask.png')
}
run().then(() => process.exit(0))

// https://civitai.com/api/download/models/329420
// wget -e "https_proxy=http://192.168.10.100:7890" https://civitai.com/api/download/models/329420 -O albedobaseXL_v21.safetensors