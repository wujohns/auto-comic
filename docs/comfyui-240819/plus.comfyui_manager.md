# comfyui manager
与 sd-webui 类似，comfyui 也有对应的 manger 扩展以便于管理对应的节点扩展  
工程: https://github.com/ltdrdata/ComfyUI-Manager  

备注:  
1. comfyui 的扩展(也被称为节点)是放在 conmfyui 工程目录的 `/custom_nodes` 下  
1. comfyui manager 本质上为下载对应的节点工程放在上述的目录中，并自动完成下载  

## 安装
1. 切到 `comfyui-240819/custom_nodes`  
1. comfyui manager 仓库: `git clone -c http.proxy="http://192.168.10.100:7890" https://github.com/ltdrdata/ComfyUI-Manager.git`  
1. 重启 comfyui 会自动安装依赖  

备注重启前使用以下指令启用代理，避免部分文件下载失败:  
```shell
export http_proxy="http://192.168.10.100:7890"
export https_proxy="http://192.168.10.100:7890"
export no_proxy="localhost, 127.0.0.1/8, ::1"
```

## 补充
1. 该部分可以作为信息来源  

## 辅助类插件
以下这些并不是生产部署必须，但是可以提高使用体验和效率
汉化: https://github.com/AIGODLIKE/AIGODLIKE-COMFYUI-TRANSLATION  
GPU 占用率: https://github.com/crystian/ComfyUI-Crystools  
工作流管理: https://github.com/11cafe/comfyui-workspace-manager  

TODO:
提示词翻译: https://github.com/AlekPet/ComfyUI_Custom_Nodes_AlekPet -- TODO，后续再安装(并使用deepl的freekey)  
TODO custom-script -- https://github.com/pythongosssss/ComfyUI-Custom-Scripts
