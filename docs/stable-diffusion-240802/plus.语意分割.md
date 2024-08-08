# 语意分割
语意分割是指直接通过提示词获取需要重绘区域的蒙版

## 方案策略信息
1. 采用的插件为 https://github.com/continue-revolution/sd-webui-segment-anything  
1. 语意化的支持采用的是 GroundingDINO 模型处理  

备注: sam2 已经在 comfyui 的流程中被支持了但是否有语意化流程支持有待确认

## 插件安装
### 下载插件
```bash
# controlnet 插件安装(并锁定分支)
cd sd-webui-240802/extensions
git clone -c http.proxy="http://192.168.10.100:7890" https://github.com/continue-revolution/sd-webui-segment-anything.git
cd sd-webui-240802/extensions/sd-webui-segment-anything
git checkout 982138cfb505de61a3cbb257b2fa9d461d9b5493
```

### python 依赖:
插件下载就绪后，启动 webui 让其自动按转对应的 python 依赖
备注: 其中 groundingdino 会在初次使用 groundingdino 特性时触发安装

### 依赖的模型下载
在 `sd-api-test-240802/scripts/download_segment_models.js` 即为对应的下载实现

## 接口调用
TODO: 完善对应的单测，使之可以获取指定的 mask

## comfyui 情报
在处理该类的任务中，comfyui 是更好的选择，相关的情报如下:  
1. https://github.com/neverbiasu/ComfyUI-SAM2  
1. https://github.com/storyicon/comfyui_segment_anything  

