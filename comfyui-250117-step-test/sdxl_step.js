/**
 * sdxl 分步输出测试
 *
 * @author nobody
 * @date 25/01/22
 */
const { getApiJson, queryHistory, createTask } = require('./libs/api_comfy')

const createTaskTest = async () => {
  const workflow = getApiJson('text_to_image_sdxl_api.json')
  workflow['3'].inputs.seed = 1017882198680995
  workflow['5'].inputs.width = 1024
  workflow['5'].inputs.height = 1024
  workflow['6'].inputs.text = "1 dog"

  const promptId = await createTask(workflow)
  console.log(promptId)
  return promptId
}

// bd8bf101-764d-4106-a3c8-ef6c66d3c4be
const run = async () => {
  await createTaskTest()
  // const history = await queryHistory('bd8bf101-764d-4106-a3c8-ef6c66d3c4be')
}
run().then(() => process.exit(0))
