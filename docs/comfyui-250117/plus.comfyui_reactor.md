# comfyui reactor

## 版本选择
参考信息: https://www.reddit.com/r/comfyui/comments/1i43l3v/guidehow_to_disable_comfyuireactors_nsfw_filter/

在 github 上的版本被 ban 了，这里采用 codeberg 上的版本:  
https://codeberg.org/Gourieff/comfyui-reactor-node

## 节点依赖安装
切换到 `comfyui-250117/custom_nodes/comfyui-reactor-node` 目录  
执行 `python install.py` 安装对应的依赖  

安装前使用以下指令启用代理，避免部分文件下载失败:  
```shell
export http_proxy="http://192.168.10.100:7990"
export https_proxy="http://192.168.10.100:7990"
export no_proxy="localhost, 127.0.0.1/8, ::1"
```

## 依赖的模型
依赖的模型被整理到以下的 repo 中:  
https://huggingface.co/datasets/Gourieff/ReActor

在安装完成后初次启动时 reactor 会自动下载部分依赖的模型文件

sam 模型需要手动下载:
切换到 `/comfyui-250117/models/sams` 目录
执行
`wget -e "https_proxy=http://192.168.10.100:7990" https://huggingface.co/datasets/Gourieff/ReActor/resolve/main/models/sams/sam_vit_b_01ec64.pth`  
`wget -e "https_proxy=http://192.168.10.100:7990" https://huggingface.co/datasets/Gourieff/ReActor/resolve/mazin/models/sams/sam_vit_l_0b3195.pth`  

face_yolov8m.pt 模型需要手动下载
切换到 `/comfyui-250117/models/ultralytics/bbox` 目录
执行
`wget -e "https_proxy=http://192.168.10.100:7990" https://huggingface.co/datasets/Gourieff/ReActor/resolve/main/models/detection/bbox/face_yolov8m.pt`

## 对于环境的一些依赖
comfyui-reactor-node 这个包用了较多的 onnx 的模型，且 onnxruntime-gpu 的版本为 1.20.1
参考以下的版本适配: 
https://onnxruntime.ai/docs/execution-providers/CUDA-ExecutionProvider.html#requirements  
得知 onnxruntime 1.20.x 需要 cuda 12.x 和 cudnn 9.x 的组合进行支持

参考: https://developer.nvidia.com/cudnn-downloads?target_os=Linux&target_arch=x86_64&Distribution=Ubuntu&target_version=22.04&target_type=deb_local
完成对应环境的准备(可能需要重启)

