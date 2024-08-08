/**
 * sd api 调用封装
 *
 * @author nobody
 * @date 24/08/04
 */
const { doSdReq } = require('./utils')

/**
 * sd 的 txt2img 调用
 * @param data - 调用参数
 */
exports.txt2img = async (data) => {
  const config = {
    url: '/sdapi/v1/txt2img',
    method: 'POST',
    params: {},
    data
  }
  const res = await doSdReq(config)
  return res.data
}

/**
 * sd 的 img2img 调用
 * @param data - 调用参数
 */
exports.img2img = async (data) => {
  const config = {
    url: '/sdapi/v1/img2img',
    method: 'POST',
    params: {},
    data
  }
  const res = await doSdReq(config)
  return res.data
}

/**
 * sd 的 controlnet 预处理调用
 * @param data - 调用参数
 */
exports.controlnetDetect = async (data) => {
  const config = {
    url: '/controlnet/detect',
    method: 'POST',
    params: {},
    data
  }
  const res = await doSdReq(config)
  return res.data
}

/**
 * sd 的 sam 相关
 * @param data - 调用参数
 */
exports.samMask = async (data) => {
  const config = {
    url: '/sam/sam-predict',
    method: 'POST',
    params: {},
    data
  }
  const res = await doSdReq(config)
  return res.data
}
