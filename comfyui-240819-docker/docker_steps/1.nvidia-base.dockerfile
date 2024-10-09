# 初始镜像
FROM nvidia/cuda:12.2.2-cudnn8-runtime-ubuntu22.04

# 基础依赖安装
RUN apt update \
  && apt install -y python3 \
  && apt install -y python-is-python3 \
  && apt install -y pip \
  && apt install -y git \
  && apt install -y ffmpeg libsm6 libxext6
