# API 相关准备

## 插件准备
### comfyui-easyapi-nodes:  
1. repo: https://github.com/lldacing/comfyui-easyapi-nodes  
1. 对输入和输出做封装，使其可以被方便调用  

### ComfyS3
1. repo: https://github.com/TemryL/ComfyS3  
1. 输出文件上传到私有桶  
s3 相关的配置在插件目录的 .env 中，参考该 repo 的 readme  

### ComfyUI-Login:  
1. repo: https://github.com/liusida/ComfyUI-Login  
1. 对部署后的服务暴露的接口做鉴权封装  
1. 首次登陆设定密码，后续会生成加密内容存储在 <ComfyUI project folder>/login 目录中  
1. 需要移除 ComfyUI-Login/js/free_memory.js  

## 参考
官方请求脚本案例: https://github.com/comfyanonymous/ComfyUI/tree/master/script_examples  
http请求模式参考: https://docs.comfy.org/essentials/comms_routes  

备注:  
1. 虽然官方推荐 ws 模式，但 ws 模式的开发代价较 http 模式更高  
1. 这里采用创建队列任务，查询队列任务的状态的方式处理  
