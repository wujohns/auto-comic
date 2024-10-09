# 图片放大处理

## UltimateSDUpscale 方案(效果好，但是速度慢)
### 使用节点: UltimateSDUpscale
项目地址: https://github.com/ssitu/ComfyUI_UltimateSDUpscale
模型文件: 
放大模型:
https://huggingface.co/lokCX/4x-Ultrasharp/resolve/main/4x-UltraSharp.pth
放在 models/upscale_models 目录下

sd1.5 模型
https://huggingface.co/moiu2998/mymo/resolve/main/realisticVisionV60B1_v51VAE.safetensors
放在 models/checkpoints 目录下

备注:  
1. 效果很好  
2. 速度太慢  

## 基础放大方案(纯放大模型放大，有效果，且速度快)
放大模型:
https://github.com/xinntao/Real-ESRGAN/releases/download/v0.2.2.4/RealESRGAN_x4plus_anime_6B.pth
https://github.com/xinntao/Real-ESRGAN/releases/download/v0.1.0/RealESRGAN_x4plus.pth
https://huggingface.co/lokCX/4x-Ultrasharp/resolve/main/4x-UltraSharp.pth
https://github.com/xinntao/Real-ESRGAN/releases/download/v0.2.1/RealESRGAN_x2plus.pth
https://github.com/xinntao/Real-ESRGAN/releases/download/v0.2.2.3/RealESRGAN_x2plus_netD.pth
放在 models/upscale_models 目录下

备注: 
1. 如果放大4倍最终采用 RealESRGAN_x4plus_anime_6B.pth -- 消耗时间较短  
1. 如果放大2倍最终采用 RealESRGAN_x2plus.pth -- 消耗时间最短
1. 但考虑到其他的模型效果更好，建议也放在镜像中便于后续可以直接切换  

这个放大模型体积较小可以考虑
https://github.com/Francis0625/Omni-SR?tab=readme-ov-file

