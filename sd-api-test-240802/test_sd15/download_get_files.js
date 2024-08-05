/**
 * sd1.5 文件下载相关(获取需要下载的文件列表)
 *
 * @author nobody
 * @date 24/08/05
 */
const fs = require('fs')
const path = require('path')
const { ProxyAgent, fetch } = require('undici')
const { listFiles } = require('@huggingface/hub')
require('dotenv').config({ path: path.join(__dirname, '../.env') })

const dispatcher = new ProxyAgent(process.env.HG_RPOXY)
const customFetch = (input, init) => {
  const reqInit = init || {}
  reqInit.dispatcher = dispatcher
  return fetch(input, reqInit)
}

const fileList = []
const run = async () => {
  const repo = 'lllyasviel/ControlNet-v1-1'
  const files = await listFiles({repo, fetch: customFetch})
  for await (const file of files) {
    const filePath = file.path
    const extName = path.extname(filePath)
    if (extName === '.yaml' || extName === '.pth') {
      fileList.push({
        repo,
        file: filePath
      })
    }
  }

  fs.writeFileSync(
    path.join(__dirname, './download_files.json'),
    JSON.stringify(fileList, null, 2),
    { encoding: 'utf8' }
  )
}
run().then(() => process.exit(0))
