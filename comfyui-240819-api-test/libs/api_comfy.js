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
 * comfyui 的调用自动切图
 * @param prompt - auto sam 提示词
 * @param imgUrl - 图片地址链接
 */
exports.autoSam = async (prompt, imgUrl) => {
  // 构建请求结构
  const workflow = getApiJson('auto_sam_api.json')
  workflow['12'].inputs.prompt = prompt
  workflow['26'].inputs.urls = imgUrl

  // 创建任务
  const promptId = await createTask(workflow)

  // 获取图片地址
  const resImgUrl = await loopQueryHistory(promptId, `outputs['30'].images[0]`)
  return resImgUrl
}

/**
 * comfyui 的搜索替换实现
 * @param imageUrl - 图片地址
 * @param itemPrompt - 需要被替换的对象描述 prompt
 * @param replacePrompt - 替换的 prompt
 */
exports.searchAndReplace = async (imageUrl, itemPrompt, replacePrompt) => {
  // 构建请求结构
  const workflow = getApiJson('search_and_replace.json')
  workflow['3'].inputs.urls = imageUrl
  workflow['4'].inputs.prompt = itemPrompt
  workflow['10'].inputs.text = replacePrompt
  workflow['11'].inputs.text = Consts.staticNegativePrompt
  workflow['26'].inputs.filename_prefix = 'Image'

  // 创建任务
  const promptId = await createTask(workflow)

  // 获取最终图片
  const resImgUrl = await loopQueryHistory(promptId, `outputs['26'].images[0]`)
  return resImgUrl
}

/**
 * comfyui 的 inpaint 实现
 * @param imageUrl - 图片地址
 * @param maskUrl - 遮罩地址
 * @param replacePrompt - 替换的 prompt
 */
exports.inpaint = async (imageUrl, maskUrl, replacePrompt) => {
  // 构建请求结构
  const workflow = getApiJson('inpaint.json')
  workflow['1'].inputs.urls = imageUrl
  workflow['2'].inputs.urls = maskUrl
  workflow['8'].inputs.text = replacePrompt

  // 创建任务
  const promptId = await createTask(workflow)

  // 获取最终图片
  const resImgUrl = await loopQueryHistory(promptId, `outputs['24'].images[0]`)
  return resImgUrl
}

/**
 * comfyui 的人像改图实现
 * @param config
 * @param config.imageUrl - 图片地址
 * @param config.prompt - 经过 AI 处理后的提示词
 * @param config.width - 图片宽度
 * @param config.height - 图片高度
 */
exports.reference = async (config) => {
  // 构建请求结构
  const { imageUrl, prompt, width, height } = config
  const workflow = getApiJson('reference.json')
  workflow['2'].inputs.urls = imageUrl
  workflow['5'].inputs.text = prompt
  workflow['6'].inputs.text = Consts.staticNegativePrompt
  workflow['11'].inputs.width = width
  workflow['11'].inputs.height = height

  // 创建任务
  const promptId = await createTask(workflow)

  // 获取最终图片
  const resImgUrl = await loopQueryHistory(promptId, `outputs['16'].images[0]`)
  return resImgUrl
}
