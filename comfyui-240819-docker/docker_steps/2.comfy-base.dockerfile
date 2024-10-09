# 初始镜像
# FROM nvidia/cuda:12.2.2-cudnn8-runtime-ubuntu22.04

# # 基础依赖安装
# RUN apt update \
#   && apt install -y python3 \
#   && apt install -y python-is-python3 \
#   && apt install -y pip \
#   && apt install -y git \
#   && apt install -y ffmpeg libsm6 libxext6

# # nvidia-base image 节点 ----
FROM nvidia-base:xxx
# # ---------------------------

# comfyui 基础准备
WORKDIR /projects
RUN git clone https://github.com/comfyanonymous/ComfyUI.git

WORKDIR /projects/ComfyUI
RUN git checkout a60620dcea1302ef5c7f555e5e16f70b39c234ef
RUN pip install -r requirements.txt