# svd 视频合成处理
svd 的流程依赖的节点已经是 comfyui 的内置节点了，所以不需要额外处理。
参考: https://www.youtube.com/watch?v=CFbFJW8-tNQ

## 模型下载
svd 模型:
https://huggingface.co/stabilityai/stable-video-diffusion-img2vid/resolve/main/svd.safetensors
放在 models/checkpoints 目录下

### 使用节点: ComfyUI Frame Interpolation
项目地址: https://github.com/Fannovel16/ComfyUI-Frame-Interpolation
补帧模型: 
https://github.com/styler00dollar/VSGAN-tensorrt-docker/releases/download/models/rife49.pth
放在 custom_nodes/ComfyUI-Frame-Interpolation/ckpts 目录下

### 使用节点: ComfyUI - VideoHelperSuite
项目地址: https://github.com/Kosinkadink/ComfyUI-VideoHelperSuite
