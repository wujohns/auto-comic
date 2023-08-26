# 接口调用插件功能
这里以对接口 `/sdapi/v1/txt2img` 调用 `controlnet` 插件功能为例

## 相关参数
在对 `/sdapi/v1/txt2img` 接口调用，需要引入 `controlnet` 插件功能时，需要额外传入以下参数:  
1. `alwayson_scripts` - 插件调用配置

## 参考
关于 controlnet 的调用参考讨论: https://github.com/AUTOMATIC1111/stable-diffusion-webui/discussions/10468  
