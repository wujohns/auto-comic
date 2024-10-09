# gpt_sovits 处理
目前 comfyui 下有两个和 gpt_sovits 相关的项目:  
AIFSH/ComfyUI-GPT_SoVITS -- 适配 gpt_sovits v1  
AIFSH/GSTTS-ComfyUI -- 适配 gpt_sovits v2  

原始项目: https://github.com/RVC-Boss/GPT-SoVITS  
NOTICE:
1. audio 相关的部分和 image 相关的部分存在一些依赖冲突，这里采用新建 comfyui 环境做处理  

## GSTTS-ComfyUI 方案
### 使用节点: GSTTS-ComfyUI
项目地址: https://github.com/AIFSH/GSTTS-ComfyUI  
模型文件:  
TODO -- 模型文件需要核对插件 fetch model 部分的 code

依赖准备:
apt install ffmpeg

TODO:  
1. audio 与之前的逻辑相冲突，采取新建 comfyui 的方式  
1. 完成基础测试工作 -- 跑通单测  
