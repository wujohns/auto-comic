# 替换背景方案

## sdxl inpaint controlnet + BrushNet blend 方案 -- 目前效果最佳的方案
### 使用节点: ComfyUI's ControlNet Auxiliary Preprocessors
项目地址: https://github.com/Fannovel16/comfyui_controlnet_aux  
模型文件:  
https://huggingface.co/kataragi/controlnetXL_inpaint/resolve/main/Kataragi_inpaintXL-lora128.safetensors  
放在 models/controlnet 目录下  

sdxl 模型文件:  
https://huggingface.co/misri/juggernautXL_juggXIByRundiffusion/resolve/main/juggernautXL_juggXIByRundiffusion.safetensors
放在 models/checkpoints 目录下

### 使用节点: BrushNet
项目地址: https://github.com/nullquant/ComfyUI-BrushNet  
在该流程中主要是使用其 Blend Inpaint 节点用来保持没有被 inpaint 部分的细节特征，可以有效避免细节被误改  

## BrushNet 配合 Controlnet 方案(sdxl) -- 不推荐仅作为记录(效果比纯 controlnet 的方案要差些)
### 使用节点: BrushNet
项目地址: https://github.com/nullquant/ComfyUI-BrushNet  
模型文件:  
在 https://drive.google.com/drive/folders/1fqmS1CEOvXCxNWFrsSYd_jHYXxrydh1n  
选择下载 segmentation_mask_brushnet_ckpt_sdxl_v1 中的 safetensors 文件  
放在 models/inpaint/brushnet_xl 目录下

sdxl 模型文件:  
https://huggingface.co/misri/juggernautXL_juggXIByRundiffusion/resolve/main/juggernautXL_juggXIByRundiffusion.safetensors
放在 models/checkpoints 目录下

备注:  
1. 谷歌云盘中的文件下载参考: https://medium.com/@gauravkachariya/download-google-drive-files-on-linux-via-command-line-c0ce06b51dba  
1. 对于 sd1.5 的 segementation_mask 可以下载 https://huggingface.co/spaces/TencentARC/BrushNet/tree/main/data/ckpt 目录中对应的文件并放在 models/inpaint/brushnet/segmentation_mask.safetensors  

## 其他潜在的方案
1. https://github.com/meap158/ComfyUI-Background-Replacement
1. 可以做到 sota 级别的 https://myaiforce.com/flux-replace-background  
  - https://www.youtube.com/watch?v=dkkyrv53Rp8&t=94s
  - 可以参考其修复细节丢失的处理方案
1. sota: flux inpaint controlnet + brushnet blend 后置处理方案

## 效果不佳的方案
1. sd1.5 inpaint controlnet -- 背景不贴合以及会篡改原图  
1. sdxl inpaint controlnet -- 背景贴合但会篡改原图  
1. sdxl inpaint controlnet + brushnet segemations -- 效果较差  

测试用例:
a cozy marble kitchen with wine glasse
a car run on forest
