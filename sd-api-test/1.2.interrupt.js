/**
 * sd 中断当前任务
 * 备注:  
 * 1. 每次只会中断一个任务
 * 2. 中断后会直接对之前的请求做响应，但是返回的图片是当前处理到中途的图片
 *
 * @author nobody
 * @date 23/08/28
 */
const { interrupt } = require('../libs/sd_api')

const run = async () => {
  const resData = await interrupt()
  console.log(resData)
}
run().then(() => process.exit(0))
