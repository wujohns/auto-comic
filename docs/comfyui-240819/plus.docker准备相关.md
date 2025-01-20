# docker 准备相关
## 前提条件
1. linux 环境 docker 就绪  
1. nvidia-container 就绪: https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/install-guide.html  

## docker 代理准备
参考: https://www.cnblogs.com/Chary/p/18096678  

### 配置 pull 时的代理
```bash
mkdir -p /etc/systemd/system/docker.service.d
vim /etc/systemd/system/docker.service.d/proxy.conf
```

在 `/etc/systemd/system/docker.service.d/proxy.conf` 写入  
```conf
[Service]
Environment="HTTP_PROXY=http://192.168.10.100:7890"
Environment="HTTPS_PROXY=http://192.168.10.100:7890"
Environment="NO_PROXY=localhost, 127.0.0.1/8, ::1"
```

配置后执行下述内容后生效:  
```bash
systemctl daemon-reload
systemctl restart docker
```

执行 `systemctl show --property=Environment docker` 查看配置是否生效  

### 配置 Container 代理（容器运行阶段）
~/.docker/config.json 中写入:  
```json
{
 "proxies":
 {
   "default":
   {
     "httpProxy": "http://192.168.10.100:7890",
     "httpsProxy": "http://192.168.10.100:7890",
     "noProxy": "NO_PROXY=localhost, 127.0.0.1/8, ::1"
   }
 }
}
```

### 配置 Docker build 代理
执行 docker build 时带上参数即可:  
```bash
docker build . \
    --build-arg "HTTP_PROXY=http://192.168.10.100:7890" \
    --build-arg "HTTPS_PROXY=http://192.168.10.100:7890" \
    --build-arg "NO_PROXY=localhost, 127.0.0.1/8, ::1" \
    -t your/image:tag
```

## dockerfile 准备
1. 初始镜像在: https://hub.docker.com/r/nvidia/cuda/tags  
1. 选择策略为 12.2.2-cudnn8-runtime-ubuntu22.04  
1. 简单验证:  
```bash
docker run --rm --runtime=nvidia --gpus all nvidia/cuda:12.2.2-cudnn8-runtime-ubuntu22.04 nvidia-smi  
```

备注:  
1. 采用启动容器后，进入容器的策略整理对应的 dockerfile 该编写的内容  
```bash
docker run -dit --shm-size 1g --gpus all --name comfy-dev --restart=always nvidia/cuda:12.2.2-cudnn8-runtime-ubuntu22.04
docker exec -it comfy-dev-1 /bin/bash
```

## 镜像启动参考
1. 启动时带上参数 `-dit` 保证容器不会执行后立即退出，或无限重启  
1. 启动时带上参数 `--gpus all` 即可使容器调用宿主机的 gpu  
1. 启动时可通过类似 `--shm-size 1g` 设定修改容器的共享内存（该内存非容器占有内存，而是容器中的多进程程序间共享的内存空间大小，在机器学习中对该部分占用较大，该值默认为 `64m`，一般修改到 `1g` 可以满足基本需求）  
1. 使用 `-v <本地绝对路径>:<docker内的绝对路径>` 进行目录挂载，以便于文件传输  
1. 可以在经过调整后将容器封装为镜像 `docker commit <当前容器名> <新镜像名称>:<版本号>`  
1. 使用 docker commit <containerId> <imageName> 可以基于对应的容器创建镜像  

## 镜像工作记录
nvidia-base - 在官方镜像(nvidia/cuda:12.2.2-cudnn8-runtime-ubuntu22.04 )基础上完成基础依赖安装的镜像  
comfyui-base - nvidia-base 基础上完成 comfyui 依赖安装的镜像  
comfyui-nodes - 在 comfyui-base 的基础上完成必要插件的安装  
comfyui-models - 在 comfyui-nodes 的基础上补全必要的模型  

## 镜像构建
在 comfyui-240819-docker 目录中  
docker build . \
    --build-arg "HTTP_PROXY=http://192.168.10.100:7890" \
    --build-arg "HTTPS_PROXY=http://192.168.10.100:7890" \
    --build-arg "NO_PROXY=localhost, 127.0.0.1/8, ::1" \
    -t <image_name>:<tag>

## 临时记录
sudo docker build -t comfyui-svd:0.0.2 .
sudo docker build -t comfyui-image-tool-models:0.0.3 .

sudo docker build -t comfyui-image-tool-models:0.0.5 .

sudo docker run \
  -dit --shm-size 1g --gpus all \
  --name my2024 \
  --restart=always \
  -p 8188:8188 \
  nvidia-base:0.0.1

sudo docker exec -it my2024 /bin/bash

python main.py --listen --port 8188 --highvram

python /projects/ComfyUI/main.py --listen --port 8188 --highvram
先做简易验收 -- 对已经可以运行的 comfy-node 做验收
