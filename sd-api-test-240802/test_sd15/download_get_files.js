/**
 * sd1.5 文件下载相关(获取需要下载的文件列表)
 * 参考: https://github.com/Mikubill/sd-webui-controlnet/wiki/Model-download
 *
 * @author nobody
 * @date 24/08/05
 */
const fs = require('fs')
const path = require('path')
const { hgCustomFetch } = require('../libs/utils')
const { listFiles } = require('@huggingface/hub')

const fileList = []
const run = async () => {
  // 目前仅获取 https://huggingface.co/lllyasviel/ControlNet-v1-1/tree/main
  const repo = 'lllyasviel/ControlNet-v1-1'
  const files = await listFiles({repo, fetch: hgCustomFetch})
  for await (const file of files) {
    const filePath = file.path
    const extName = path.extname(filePath)
    if (extName === '.pth') {
      fileList.push({
        downloadLink: `https://huggingface.co/${ repo }/resolve/main/${ filePath }`,
        repo,
        file: filePath
      })
    }
  }

  // TODO: 后续的优化中可以考虑添加以下模型
  // https://huggingface.co/spaces/limingcv/ControlNet-Plus-Plus/tree/main/checkpoints

  fs.writeFileSync(
    path.join(__dirname, './download_files.json'),
    JSON.stringify(fileList, null, 2),
    { encoding: 'utf8' }
  )
}
run().then(() => process.exit(0))
