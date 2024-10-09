# 移除背景处理
这里主要整理移除图片背景的方案

## BRIA_AI 方案
### 使用节点: ComfyUI-BRIA_AI-RMBG
项目地址: https://github.com/ZHO-ZHO-ZHO/ComfyUI-BRIA_AI-RMBG  
模型文件:  
https://huggingface.co/briaai/RMBG-1.4/resolve/main/model.pth  
放在 /custom_nodes/ComfyUI-BRIA_AI-RMBG/RMBG-1.4 目录下  

备注:
1. 效果较好  
1. 模型较新  

## InSPyReNet 方案（弃用）
### 使用节点: ComfyUI-Inspyrenet-Rembg
项目地址: https://github.com/john-mnz/ComfyUI-Inspyrenet-Rembg  
模型文件: 这里的模型文件会在第一次启动后自动下载  

备注:  
1. 自动下载模型文件的机制导致无法较好的整合到 docker 镜像制作流程中  
1. 在对应的 issue 中作者放弃手动导入模型的方案