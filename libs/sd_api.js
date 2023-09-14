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
      // url: '/sdapi/v1/progress',
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
 * @param auth - api 鉴权
 */
exports.txt2img = async (data, auth) => {
  const config = {
    url: '/sdapi/v1/txt2img',
    method: 'POST',
    params: {},
    data
  }
  if (auth) config.auth = auth
  const res = await doReq(Consts.sdBaseURL, config)
  return res.data
}

/**
 * sd 的 img2img 调用
 * @param data - 调用参数
 */
exports.img2img = async (data) => {
  const res = await doReq(
    Consts.sdBaseURL,
    {
      url: '/sdapi/v1/img2img',
      method: 'POST',
      params: {},
      data
    }
  )
  return res.data
}

/**
 * sd 的 controlnet 预处理调用
 * @param data - 调用参数
 */
exports.controlnetDetect = async (data) => {
  const res = await doReq(
    Consts.sdBaseURL,
    {
      url: '/controlnet/detect',
      method: 'POST',
      params: {},
      data
    }
  )
  return res.data
}

/**
 * sd 的 interrupt 调用
 */
exports.interrupt = async () => {
  const res = await doReq(
    Consts.sdBaseURL,
    {
      url: '/sdapi/v1/interrupt',
      method: 'POST',
      params: {},
      data: {}
    }
  )
  return res.data
}
