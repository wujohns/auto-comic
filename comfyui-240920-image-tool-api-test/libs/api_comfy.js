/**
 * comfyui api 封装
 * 接口参考:
 * 官方请求脚本案例: https://github.com/comfyanonymous/ComfyUI/tree/master/script_examples  
 * http请求模式参考: https://docs.comfy.org/essentials/comms_routes  
 *
 * @author nobody
 * @date 24/08/23
 */
const _ = require('lodash')
const fs = require('fs')
const path = require('path')
const uuidv4 = require('uuid').v4
const { doComfyReq, delay, getImageUrl } = require('./utils')
const { Consts } = require('./constants')

const getApiJson = (jsonFileName) => {
  const jsonFileDir = path.join(__dirname, '../api_json')
  const jsonFilePath = path.join(jsonFileDir, jsonFileName)
  const jsonStr = fs.readFileSync(jsonFilePath)
  return JSON.parse(jsonStr)
}

/**
 * 获取指定的 history
 * @param promptId - comfyui quene 的 promptId
 */
const queryHistory = async (promptId) => {
  const res = await doComfyReq({
    url: `/history/${ promptId }`,
    method: 'GET'
  })

  // 需要注意的是没有执行完成时，该部分为空
  return res.data[promptId]
}

/**
 * 发起请求任务请求
 * @param workflow - 工作流配置
 */
const createTask = async (workflow) => {
  // 获取队列 id
  const res = await doComfyReq({
    url: '/prompt',
    method: 'POST',
    data: {
      prompt: workflow,
      client_id: uuidv4()   // client_id 可以作为请求标识
    }
  })
  const promptId = res.data.prompt_id
  return promptId
}

/**
 * 轮询查询队列历史获取图片绘制结果
 * @param promptId - 任务 id
 * @param key - 图片信息路径
 */
const loopQueryHistory = async (promptId, key) => {
  let finish = false
  while (!finish) {
    const resData = await queryHistory(promptId)
    if (resData) {
      const { status } = resData
      if (
        status.status_str === 'success' &&
        status.completed
      ) {
        const resImgInfo = _.get(resData, key)
        const resImgPath = path.join(resImgInfo.subfolder, resImgInfo.filename)
        const resImgUrl = await getImageUrl(
          path.join(process.env.S3_OUTPUT_DIR, resImgPath)
        )
        return resImgUrl
      }
    }
    await delay(1000)
  }
}

/**
 * comfyui 移除背景处理
 * @param imgUrl - 图片地址链接
 */
exports.removeBg = async (imgUrl) => {
  // 构建请求结构
  const workflow = getApiJson('remove_bg_api.json')
  workflow['17'].inputs.url_or_path = imgUrl
  workflow['18'].inputs.filename_prefix = uuidv4()

  // 创建任务
  const promptId = await createTask(workflow)

  // 获取图片地址
  const resImgUrl = await loopQueryHistory(promptId, `outputs['18'].images[0]`)
  return resImgUrl
}

/**
 * comfyui 移除对象处理
 * @param imgUrl - 图片地址链接
 * @param maskUrl - 遮罩图片地址链接
 */
exports.removeObj = async (imgUrl, maskUrl) => {
  // 构建请求结构
  const workflow = getApiJson('remove_obj_api.json')
  workflow['49'].inputs.url_or_path = imgUrl
  workflow['50'].inputs.url_or_path = maskUrl
  workflow['44'].inputs.filename_prefix = uuidv4()

  // 创建任务
  const promptId = await createTask(workflow)

  // 获取图片地址
  const resImgUrl = await loopQueryHistory(promptId, `outputs['44'].images[0]`)
  return resImgUrl
}

/**
 * comfyui 替换背景处理
 * @param imgUrl - 图片地址
 * @param bgPrompt - 目标背景描述
 */
exports.replaceBg = async (imgUrl, bgPrompt) => {
  // 构建请求结构
  const workflow = getApiJson('replace_bg_api.json')
  workflow['60'].inputs.url_or_path = imgUrl
  workflow['59'].inputs.filename_prefix = uuidv4()
  workflow['32'].inputs.text = bgPrompt

  // 创建任务
  const promptId = await createTask(workflow)

  // 获取图片地址
  const resImgUrl = await loopQueryHistory(promptId, `outputs['59'].images[0]`)
  return resImgUrl
}

/**
 * comfyui 放大图片
 * @param imgUrl - 图片地址
 */
exports.upscale = async (imgUrl) => {
  // 构建请求结构
  const workflow = getApiJson('upscale_api.json')
  workflow['19'].inputs.url_or_path = imgUrl
  workflow['20'].inputs.filename_prefix = uuidv4()

  // 创建任务
  const promptId = await createTask(workflow)

  // 获取图片地址
  const resImgUrl = await loopQueryHistory(promptId, `outputs['20'].images[0]`)
  return resImgUrl
}

/**
 * comfyui 移除文字
 * @param imgUrl - 图片地址
 */
exports.removeTxt = async (imgUrl) => {
  // 构建请求结构
  const workflow = getApiJson('remove_txt_api.json')
  workflow['55'].inputs.model_name = 'sam2_hiera_base_plus.pt'
  workflow['56'].inputs.model_name = 'GroundingDINO_SwinB (938MB)'
  workflow['69'].inputs.url_or_path = imgUrl
  workflow['70'].inputs.filename_prefix = uuidv4()

  // 创建任务
  const promptId = await createTask(workflow)

  // 获取图片地址
  const resImgUrl = await loopQueryHistory(promptId, `outputs['70'].images[0]`)
  return resImgUrl
}
