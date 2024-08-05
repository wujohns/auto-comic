# webui 生产镜像
webui 生产镜像主要锁定以下内容:  
1. 确保采样方法和高清放大算法依赖的正常  
1. controlnet 相关  

## controlnet 部分
1. 执行以下指令安装插件:  
```bash
# controlnet 插件安装(并锁定分支)
cd /root/autodl-fs/extensions
git clone -c http.proxy="http://127.0.0.1:7890" https://github.com/Mikubill/sd-webui-controlnet.git
cd /root/autodl-fs/extensions/sd-webui-controlnet
git checkout e67e017731aad05796b9615dc6eadce911298ea1

# 再次启动 webui 安装 controlnet 的依赖
cd /root/stable-diffusion-webui
python launch.py --listen --xformers --api --listen --port=6006
```

2. 执行以下指令下载 controlnet 必要的文件(需要有卡模式):  
```bash
# 下载
cd /root/autodl-fs
git clone -c http.proxy="http://127.0.0.1:7890" https://huggingface.co/lllyasviel/ControlNet-v1-1

# 文件转移
cd /root/autodl-fs/ControlNet-v1-1
mv *.yaml /root/autodl-fs/extensions/sd-webui-controlnet/models/
mv *.pth /root/autodl-fs/extensions/sd-webui-controlnet/models/

# 需要单独下载的两个模型 recolor/ip-adapter
# 参考: https://www.bilibili.com/video/BV1wF411r7x8
cd /root/autodl-fs/extensions/sd-webui-controlnet/models
wget -e "https_proxy=http://127.0.0.1:7890" https://huggingface.co/lllyasviel/sd_control_collection/resolve/main/ioclab_sd15_recolor.safetensors
wget -e "https_proxy=http://127.0.0.1:7890" https://huggingface.co/lllyasviel/sd_control_collection/resolve/main/ip-adapter_sd15_plus.pth
```

舍弃 T2I-Adapter controlnet 说明:  
a. 舍弃的缘故是该项目活跃度低，且较多特性与 controlnet 作者重复  
b. 以及在后续的 sdxl 版本中 T2I-Adapter 逐渐和 controlnet 作者的项目合并  
c. 即在 1.6 之后的版本规范化引入 T2I-Adapter 更为合适  

3. 在本工程中执行以下指令
```bash
# 对 controlnet 的预处理器的自动下载
node ./test/controlnet_detect.js

# 对 controlnet 特性的全量检查
node ./test/controlnet.js
```

5. 需要手动将 controlnet 的最大数目调整到 5

备注:
1. 大部分预处理都是从这个 repo 中下载的: https://huggingface.co/lllyasviel/Annotators

