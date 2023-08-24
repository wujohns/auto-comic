/**
 * sd 文生图接口基础案例
 *
 * @author nobody
 * @date 23/08/24
 */
const { txt2img } = require('../libs/sd_api')

const run = async () => {
  const res = await txt2img({
    prompt: '1girl',
    steps: 20
  })
  console.log(res)
}
run().then(() => process.exit(0))
