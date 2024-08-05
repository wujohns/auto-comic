# webui 生产镜像
webui 生产镜像主要锁定以下内容:  
1. 确保采样方法和高清放大算法依赖的正常  
1. controlnet 相关  

## 采样方法/高清算法/图生图 依赖准备
1. 载入 webui 最小化镜像
2. 执行以下指令，手动下载依赖的模型(原因是webui的缺陷导致无法自动下载):  
```bash
# ScuNET
cd /root/autodl-fs/models
mkdir ScuNET
cd ScuNET
wget -e "https_proxy=http://127.0.0.1:7890" https://github.com/cszn/KAIR/releases/download/v1.0/scunet_color_real_gan.pth -O ./ScuNET.pth

# SwinIR
cd /root/autodl-fs/models
mkdir SwinIR
cd SwinIR
wget -e "https_proxy=http://127.0.0.1:7890" https://github.com/JingyunLiang/SwinIR/releases/download/v0.0/003_realSR_BSRGAN_DFOWMFC_s64w8_SwinIR-L_x4_GAN.pth -O ./SwinIR_4x.pth
```
3. 执行
```
export http_proxy="http://127.0.0.1:7890"
export https_proxy="http://127.0.0.1:7890"
```
启用全局代理，以便于后续启动 stable-diffusion-webui 时其内部初始化下载能正常下载  
4. 进入到 `stable-diffusion-webui` 目录，执行 `python launch.py --listen --xformers --api --listen --no-hashing --port=6006`，启动 webui  
5. 配置本项目的 `.env` 中的 `SD_BASEURL` autodl 对应实例的自定义服务链接  
6. 在本项目中执行:  
```
npm install
node ./test/sampler.js
node ./test/hr_upscaler.js
node ./test/img2img.js
```
即可自动对全部采样算法和高清算法做检查，检查过程中也会同时下载对应的模型依赖  

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

