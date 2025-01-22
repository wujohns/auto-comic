# 自动漫画视频生成器
## 概述
使用 AI 技术完成可以在有固定剧本的情况下实现配音漫画的自动生成

## 案例参考
较好的成品案例: https://www.bilibili.com/video/BV1tc411u7ew  
业内的相关尝试：https://www.bilibili.com/video/BV1WL411i7mF  

备注：https://space.bilibili.com/3493106383063541/channel/collectiondetail?sid=1353270 这个合集都是可以作为不错的参考  

## 相关结构图
![imgs/struct.png](/imgs/struct.png)

## 开发工作
1. 视频拼接自动化 -- wujohns  
1. prompt 开发 -- yapril
1. prompt 链路组装  -- wujohns

## prompt 编写规范
这里采用表现稳定且工程性较好的 `分区模板` 策略，具体可以参考 [docs/prompt.md](/docs/prompt.md) 中的内容  

## TODO
1. sd 的提示词相关参考：https://civitai.com/articles/851/stable-diffusion，需要总结出一套类似于分区模板这样有效的工程方法应用在该项目上  
1. sd 接口化的案例初始案例打通  
1. bark 服务的封装，作为语音合成的支撑  
1. 表情包的制作也可以纳入到考量  

对网页的设计也纳入到参考中  
https://www.nonfungiblelearning.com/blog/how-to-use-stable-diffusion-with-chatgpt-for-web-design  

一些计划变动:  
1. 目前社区有较为完善的开源项目可供直接使用: https://tw8go59wbr6.feishu.cn/docx/FB57d8hVPoGhZ5xpUYwciGGvngb  
1. 现在采用先用社区开源项目的方式推进，后续再做私有化定制处理  

git lfs clone -c http.proxy="http://127.0.0.1:7990" 
git lfs clone -c http.proxy="http://192.168.101.216:7890" 
https://huggingface.co/silk-road/luotuo-bert/resolve/main/pytorch_model.bin

TODO:
完善 comfyui 对应的内容

一些潜在的问题:
https://www.reddit.com/r/comfyui/comments/1epytxx/flux_is_very_slow/


// 创建图片工具描述 prompt ------------------------------
export const createImageToolDesc = `Creates a picture of the specified type`
export const createFluxImagePromptDesc = `
According to the user's needs, extract the description of the content that the user needs to draw as a prompt, the prompt must be in English
`

// 图片修改工具(搜索与替换)描述 prompt ------------------------------
export const inpaintImageToolDesc = `Search and replace specified items in an image`
export const inpaintImageNameDesc = `The name of the image to be modified`
export const inpaintImageItemDesc = `extract the item English name of the part that needs to be modified.`
export const inpaintImagePromptDesc = `Extract the target entity that the user needs to change "item" into into a single English word for editing`

// 图片修改工具(reference编辑)描述 prompt ---------------------------
export const adjustImageToolDesc = `Modify the image while keeping the image style unchanged`
export const adjustImageSubjectDesc = `Distinguish whether the subject of the image you want to modify is human or not, if so, the value is "human", otherwise the value is "other"`
export const adjustImageNameDesc = `The name of the image which need to be adjusted`
export const adjustImagePromptDesc = `
Based on the user's modification requirements, Generate the stable diffusion-style prompt which contains a detailed description of the style of the original picture and a description of the adjusted part.
The prompt format is separated by a comma into separate entity words or phrases.
The prompt must be in English.`

// 创建图片工具
const create_image = {
  description: createImageToolDesc,
  parameters: z.object({
    prompt: z.string().describe(createFluxImagePromptDesc)
  }),
  execute: async ({ prompt }: { prompt: string }) => {
    return imageUrl
  }
}

const inpaint_image = {
  description: inpaintImageToolDesc,
  parameters: z.object({
    name: z.string().describe(inpaintImageNameDesc),
    item: z.string().describe(inpaintImageItemDesc),
    prompt: z.string().describe(inpaintImagePromptDesc)
  }),
  execute: async (
    { name, item, prompt }:
    { name: string, item: string, prompt: string }
  ) => {
    return imageUrl
  }
}

const adjust_image = {
  description: adjustImageToolDesc,
  parameters: z.object({
    subject: z.string().describe(adjustImageSubjectDesc),
    name: z.string().describe(adjustImageNameDesc),
    prompt: z.string().describe(adjustImagePromptDesc)
  }),
  execute: async (
    { subject, name, prompt }:
    { subject: string, name: string, prompt: string }
  ) => {
    return imageUrl
  }
}

一些潜在的可能可用的记录:
https://swiftbrushv2.github.io


- role 方案:
  - live2d: https://human3daigc.github.io/Textoon_webpage/
  - image: https://pscgylotti.github.io/pages/RAIN/

TODO:
- 对 comfyui manager 的分步输出做测试 -- 测试 OK
