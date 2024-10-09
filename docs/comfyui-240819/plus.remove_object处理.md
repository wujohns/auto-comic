# 移除图片对象处理(with mask)
这里主要整理移除图片中涂抹的对象的方案

## 前置处理
前置处理主要是指使用 lama 模型直接对涂抹区域做对象移除处理:  
1. lama 本身就是用于移除对象的模型，市面上的 saas 服务有的就是直接使用该模型做处理  
1. 使用 lama 作预处理可以得到一张做了移除处理的图片  
1. 后续的流程使用经过该预处理处理的图片可以得到更好的效果

### 使用节点: Comfyui lama remover
项目地址: https://github.com/Layer-norm/comfyui-lama-remover  
模型文件  
- https://github.com/Sanster/models/releases/download/add_big_lama/big-lama.pt
放在 custom_nodes/comfyui-lama-remover/ckpts 目录下

备注:
- 经过对比该节点的实现比 ComfyUI Inpaint Nodes（https://github.com/Acly/comfyui-inpaint-nodes）中的 lama 效果要好  
- lama 适合较小的图片，后续采用 reszie -> lama -> refiner -> upscale-resize 的流程可能会有效果的提升  

## lama + powerpaint 方案(目前采用，效果最好)
### 使用节点: BrushNet  
项目地址: https://github.com/nullquant/ComfyUI-BrushNet  
模型文件:  
powerpaint 的 inpaint 模型:
https://huggingface.co/JunhaoZhuang/PowerPaint-v2-1/resolve/main/PowerPaint_Brushnet/diffusion_pytorch_model.safetensors
https://huggingface.co/JunhaoZhuang/PowerPaint-v2-1/resolve/main/PowerPaint_Brushnet/pytorch_model.bin
放在 models/inpaint/powerpaint 目录下

sd1.5 clip 模型:
https://huggingface.co/nmkd/stable-diffusion-1.5-fp16/resolve/main/text_encoder/model.safetensors
放在 models/clip/sd15_fp16.safetensors

sd1.5 模型
https://huggingface.co/moiu2998/mymo/resolve/main/realisticVisionV60B1_v51VAE.safetensors
放在 models/checkpoints 目录下

## lama + flux controlnet inpaint 方案(有潜力做到sota)
TODO  
1. 该部分依赖 flux controlnet inpaint  
1. 追踪该项目 https://huggingface.co/alimama-creative/FLUX.1-dev-Controlnet-Inpainting-Alpha

## 效果不佳的方案
img2img 会导致图片整体变化，所以不合适:
1. lama + sdxl refiner img2img  
1. lama + flux dev img2img  

img2img inpaint 效果也较为有限:  
1. lama + flux dev img2img inpaint
