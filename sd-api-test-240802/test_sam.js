/**
 * 分割接口单测
 * ui 效果确认
 *
 * @author nobody
 * @date 24/08/08
 */
const _ = require('lodash')
const fse = require('fs-extra')
const path = require('path')
const { convertImg, convertBase64 } = require('./libs/utils')
const { samMask } = require('./libs/api_sd')

const samMaskDir = path.join(__dirname, './outputs/sam_mask')
fse.removeSync(samMaskDir)
fse.ensureDirSync(samMaskDir)

const samMaskTest = async () => {
  console.log('start sam mask test')
  const oriImgPath = path.join(__dirname, './img2img/img2img_init.png')
  const data = {
    sam_model_name: 'sam_vit_h_4b8939.pth',
    input_image: convertBase64(oriImgPath),
    sam_positive_points: [],
    sam_negative_points: [],
    dino_enabled: true,
    dino_model_name: 'GroundingDINO_SwinT_OGC (694MB)',
    dino_text_prompt: 'eyes',
    dino_box_threshold: 0.3,
    dino_preview_checkbox: false,
    dino_preview_boxes_selection: [2]
  }

  const resData = await samMask(data)
  const { msg, blended_images, masks, masked_images } = resData
  for (let i = 0; i < blended_images.length; i++) {
    convertImg(blended_images[i], `${ samMaskDir }/blended_${ i }.png`)
    convertImg(masks[i], `${ samMaskDir }/mask_${ i }.png`)
    convertImg(masked_images[i], `${ samMaskDir }/masked_image_${ i }.png`)
  }
}
samMaskTest().then(() => {
  console.log('finish sam mask test!')
  process.exit(0)
})
