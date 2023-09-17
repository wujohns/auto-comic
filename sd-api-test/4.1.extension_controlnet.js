/**
 * 直接调用 controlnet 对外暴露的接口
 * 备注：
 * 1. 该接口即为预处理获取图片的接口
 * 2. 按照关键字 /controlnet/detect 可以在插件中找到具体的实现源码
 * 3. 依据源码可知，该实现是一个可批量操作的接口
 *
 * @author nobody
 * @date 23/08/27
 */
const fs = require('fs-extra')
const path = require('path')
const { convertImg, convertBase64 } = require('../libs/utils')
const { controlnetDetect } = require('../libs/sd_api')

const run = async () => {
  const cannyOriPath = path.join(__dirname, './controlnet/canny-ori.png')
  const resData = await controlnetDetect({
    controlnet_module: 'canny',   // 预处理器
    // controlnet_module: 'invert (from white bg & black line)',
    // controlnet_module: 'invert',
    controlnet_input_images: [    // 需要处理的图片(base64)
      convertBase64(cannyOriPath)
    ],
    controlnet_processor_res: 512,  // 预处理结果分辨率
    controlnet_threshold_a: 100,    // 参数a，对于 canny 来说是 Canny Low Threshold
    controlnet_threshold_b: 200,    // 参数b，对于 canny 来说是 Canny High Threshold
  })
  
  const fileName = '4.1.extension_controlnet'
  for (let i = 0; i < resData.images.length; i++) {
    const image = resData.images[i]
    const savePath = path.join(__dirname, `../temp/${ fileName }_${ i }.png`)
    fs.removeSync(savePath)
    convertImg(image, savePath)
  }
}
run().then(() => process.exit(0))
