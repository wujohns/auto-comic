# 移除文字处理(with mask)
这里主要整理移除图片中涂抹的文字的方案

-- 采用 without lama 的方案并进行适当优化处理
## powerpaint 方案 + lama(comfyui inpaint nodes)
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

### 使用节点: ComfyUI Inpaint Nodes
项目地址: https://github.com/Acly/comfyui-inpaint-nodes
模型文件: https://github.com/Sanster/models/releases/download/add_big_lama/big-lama.pt
放在 models/inpaint 目录下

### 使用节点: ComfyUI SAM2(Segment Anything 2)
项目地址: https://github.com/neverbiasu/ComfyUI-SAM2
模型文件: 
https://huggingface.co/ShilongLiu/GroundingDINO/resolve/main/GroundingDINO_SwinB.cfg.py
https://huggingface.co/ShilongLiu/GroundingDINO/resolve/main/groundingdino_swinb_cogcoor.pth
放在 models/grounding-dino 目录下

https://dl.fbaipublicfiles.com/segment_anything_2/072824/sam2_hiera_large.pt
放在 models/sam2 目录下

备注: 
1. 效果比 clipdrop 要差一些
1. ComfyUI Inpaint Nodes 中的 lama 对文字部分的预处理比 Comfyui lama remover 效果要好
1. 所以使用 ComfyUI Inpaint Nodes 中的 lama 对图片做预处理也是一种选择

## 效果不佳的方案
lama 在移除物体上有较好的效果，但是文字移除上反而是负面作用:  
1. Comfyui lama remover + powerpaint -- 画面很脏
1. ComfyUI-BrushNet-Wrapper 配合 guess_mode 为 true -- 画面很脏
1. 基于 https://github.com/Acly/comfyui-inpaint-nodes 配合 Juggernaut_X_RunDiffusion.safetensors 的 fooocus 重绘方案效果比 powerpaint 方案要差些
1. controlnet inpaint 的移除方案也比 powerpaint 的方案要差
