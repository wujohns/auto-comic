# sdxl 相关部署准备
sdxl 是 stability ai 最近新出的模型，有着更高的分辨率和表现效果  

## 准备工作
1. 更新 stable-webui 版本(直接 git pull 即可)  
1. 下载对应的模型  
base: https://huggingface.co/stabilityai/stable-diffusion-xl-base-1.0/resolve/main/sd_xl_base_1.0.safetensors  
refer: https://huggingface.co/stabilityai/stable-diffusion-xl-refiner-1.0/resolve/main/sd_xl_refiner_1.0.safetensors  

备注:  
1. 考虑到网速缘故，可以使用国内 liblibai 的节点  
base: https://www.liblibai.com/modelinfo/77a9ca05a2c7c93ceb05f4dceae9ed97  
refer: https://www.liblibai.com/modelinfo/65de1f3239e946e8b6fc02fc6452b3d9  
1. 推荐安装插件 Refiner: https://github.com/wcde/sd-webui-refiner  
1. sdxl 推荐宽高为 1024*1024  
1. 目前 sdxl vae 部分暂不支持半精度，需要在 webui 的启动项中加入 --no-half-vae

## vae 模型
在 https://github.com/AUTOMATIC1111/stable-diffusion-webui/releases/tag/v1.0.0-pre 下载 vaeapprox-sdxl.pt 到 `models/VAE-approx/` 目录

## base 模型与 refiner 模型
1. sdxl 的结构图  
![struc.png](/imgs/sdxl-struc.png)  

1. 作为对比的 sd1.5 的结构图  
![imgs/sd-struct.webp](/imgs/sd-struct.webp)  

说明:  
1. sdxl 比 sd1.5 多了一组 refer 的处理(实际使用中也可以只用base)  
1. refer 的作用实际是将 base 的输出作为噪音图，然后再做去噪处理，相当于可以实现更细腻的效果  
1. sd-webui-refiner 的插件即可以动态的开启或关闭 refer 部分的使用，避免切换策略时每次都需要重新从硬盘中载入模型数据  

## 相关参考
SDXL1.0模型: https://www.bilibili.com/video/BV1xM4y1H7J4  
SDXL内部细节解析: https://zhuanlan.zhihu.com/p/642496862  
