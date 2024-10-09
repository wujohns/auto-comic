/**
 * controlnet inpaint 测试
 *
 * @author nobody
 * @date 24/08/08
 */
const fse = require('fs-extra')
const path = require('path')
const { txt2img } = require('./libs/api_sd')
const { convertImg, convertBase64 } = require('./libs/utils')

const saveDir = path.join(__dirname, './outputs/controlnet_inpaint')
fse.removeSync(saveDir)
fse.ensureDirSync(saveDir)

const imgPath = path.join(__dirname, './img2img/img2img_init.png')
const imgBase64 = convertBase64(imgPath)
const maskPath = path.join(__dirname, './img2img/img2img_mask.png')
const maskBase64 = convertBase64(maskPath)

const run = async () => {
  const data = {
    prompt: 'red eyes',
    steps: 20,
    seed: 34324235,
    override_settings: {
      sd_model_checkpoint: 'darkSushiMixMix_225D.safetensors'
    },
    override_settings_restore_afterwards: false,
    alwayson_scripts: {
      ControlNet: {
        args: [{
          enabled: true,
          image: imgBase64,
          mask: maskBase64,
          module: 'inpaint_only',
          model: 'control_v11p_sd15_inpaint'
        }]
      }
    }
  }

  const resData = await txt2img(data)

  for (let i = 0; i < resData.images.length; i++) {
    const image = resData.images[i]
    const savePath = path.join(saveDir, `${ i }.png`)
    fse.removeSync(savePath)
    convertImg(image, savePath)
  }
}
run().then(() => process.exit(0))
