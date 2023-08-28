/**
 * sd 获取并展示 options
 *
 * @author nobody
 * @date 23/08/24
 */
const { getOptions } = require('../libs/sd_api')

const run = async () => {
  const options = await getOptions()
  console.log(options)
}
run().then(() => process.exit(0))
