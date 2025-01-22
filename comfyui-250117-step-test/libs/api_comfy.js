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
const { doComfyReq } = require('./utils')

exports.getApiJson = (jsonFileName) => {
  const jsonFileDir = path.join(__dirname, '../api_json')
  const jsonFilePath = path.join(jsonFileDir, jsonFileName)
  const jsonStr = fs.readFileSync(jsonFilePath)
  return JSON.parse(jsonStr)
}

/**
 * 获取指定的 history
 * @param promptId - comfyui quene 的 promptId
 */
exports.queryHistory = async (promptId) => {
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
exports.createTask = async (workflow) => {
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
// exports.loopQueryHistory = async (promptId, key) => {
//   let finish = false
//   while (!finish) {
//     const resData = await exports.queryHistory(promptId)
//     if (resData) {
//       const { status } = resData
//       if (
//         status.status_str === 'success' &&
//         status.completed
//       ) {
//         const resImgInfo = _.get(resData, key)
//         const resImgPath = path.join(resImgInfo.subfolder, resImgInfo.filename)
//         const resImgUrl = await getImageUrl(
//           path.join(process.env.S3_OUTPUT_DIR, resImgPath)
//         )
//         return resImgUrl
//       }
//     }
//     await delay(1000)
//   }
// }
