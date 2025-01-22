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
`wget -e "https_proxy=http://192.168.10.100:7990" https://huggingface.co/datasets/Gourieff/ReActor/resolve/main/models/sams/sam_vit_l_0b3195.pth`  
