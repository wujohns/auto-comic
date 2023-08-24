/**
 * stable diffusion api 调用封装
 *
 * @author nobody
 * @date 23/08/24
 */
const { Consts } = require('./constants')
const { doReq } = require('./utils')

/**
 * 获取当前 sd 的配置
 */
exports.getOptions = async () => {
  const res = await doReq(
    Consts.sdBaseURL,
    {
      url: '/sdapi/v1/options',
      method: 'GET',
      params: {},
      data: {}
    },
    Consts.proxy
  )
  return res.data
}

/**
 * sd 的 txt2img 调用
 * @param data - 调用参数
 */
exports.txt2img = async (data) => {
  const res = await doReq(
    Consts.sdBaseURL,
    {
      url: '/sdapi/v1/txt2img',
      method: 'POST',
      params: {},
      data
    }
  )
  return res.data
}
