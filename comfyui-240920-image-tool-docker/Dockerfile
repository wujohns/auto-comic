# 初始镜像
FROM nvidia/cuda:12.2.2-cudnn8-runtime-ubuntu22.04

# 基础依赖安装
RUN apt update \
  && apt install -y python3 \
  && apt install -y python-is-python3 \
  && apt install -y pip \
  && apt install -y git \
  && apt install -y ffmpeg libsm6 libxext6

# # nvidia-base image 节点 ----
# FROM nvidia-base:0.0.1
# # ---------------------------

# comfyui 基础准备
WORKDIR /projects
RUN git clone https://github.com/comfyanonymous/ComfyUI.git

WORKDIR /projects/ComfyUI
RUN git checkout 5cbaa9e07c97296b536f240688f5a19300ecf30d
RUN pip install -r requirements.txt

# comfyui 通用基础节点
WORKDIR /projects/ComfyUI/custom_nodes
RUN git clone https://github.com/tsogzark/ComfyUI-load-image-from-url
RUN git clone https://github.com/TemryL/ComfyS3.git
RUN git clone https://github.com/liusida/ComfyUI-Login.git

WORKDIR /projects/ComfyUI/custom_nodes/ComfyUI-load-image-from-url
RUN git checkout 66e4c91ffa13ea86be149c0f1a11ad6479bcf0cf

WORKDIR /projects/ComfyUI/custom_nodes/ComfyS3
RUN git checkout 87a7cbc45b1a8c021c0a4d9242edffd2f959b9a5
RUN pip install -r requirements.txt

WORKDIR /projects/ComfyUI/custom_nodes/ComfyUI-Login
RUN git checkout 7278270bff2cb3d3c12e3582ebc55cba6500cd38
RUN pip install -r requirements.txt
RUN rm ./js/freeMemory.js

WORKDIR /projects/ComfyUI
RUN pip install -r requirements.txt

# comfyui 通用节点依赖的文件
# comfyui s3 配置准备
# NOTICE:
# 1. 在这个阶段使用的是测试环境的配置，主要是方便测试
# 2. 可以在后面的阶段替换为生产用的配置
WORKDIR /projects/ComfyUI
COPY comfys3_env /projects/ComfyUI/custom_nodes/ComfyS3/.env

# comfyui 鉴权密钥准备
WORKDIR /projects/ComfyUI/login
COPY comfyui_login_pwd PASSWORD

# # comfyui-base image 节点 ----
# FROM comfyui-base:0.0.1
# # ---------------------------

# comfyui 插件下载
WORKDIR /projects/ComfyUI/custom_nodes
RUN git clone https://github.com/ZHO-ZHO-ZHO/ComfyUI-BRIA_AI-RMBG.git
RUN git clone https://github.com/Layer-norm/comfyui-lama-remover.git
RUN git clone https://github.com/nullquant/ComfyUI-BrushNet.git
RUN git clone https://github.com/Fannovel16/comfyui_controlnet_aux.git
RUN git clone https://github.com/neverbiasu/ComfyUI-SAM2.git
RUN git clone https://github.com/Acly/comfyui-inpaint-nodes

# comfyui 插件依赖安装
WORKDIR /projects/ComfyUI/custom_nodes/ComfyUI-BRIA_AI-RMBG
RUN git checkout 827fcd63ff0cfa7fbc544b8d2f4c1e3f3012742d

WORKDIR /projects/ComfyUI/custom_nodes/comfyui-lama-remover
RUN git checkout 070c0226dfda85e29f2484a9ba321cc02ef8a6b0
RUN pip install -r requirements.txt

WORKDIR /projects/ComfyUI/custom_nodes/ComfyUI-BrushNet
RUN git checkout 4f1992e27dc1e42dc87c75f113e58c9b07cfb197
RUN pip install -r requirements.txt

WORKDIR /projects/ComfyUI/custom_nodes/comfyui_controlnet_aux
RUN git checkout 302a3891d15b4285d9c9e0a00f4d8daa2eb46f25
RUN pip install -r requirements.txt

WORKDIR /projects/ComfyUI/custom_nodes/ComfyUI-SAM2
RUN git checkout 61a97f2fe8094a1da48b4313394a1e18b529cccf
RUN pip install -r requirements.txt

WORKDIR /projects/ComfyUI/custom_nodes/comfyui-inpaint-nodes
RUN git checkout d3655fc0fd7ebb16f17724d6afa98dd9030e10a1

WORKDIR /projects/ComfyUI
RUN pip install -r requirements.txt

# comfyui-nodes image 节点 ---
# FROM comfyui-image-tool:0.0.1
# ---------------------------

# comfyui 模型文件准备(模型文件的来源参考 makefile 中的 download 指令部分)
WORKDIR /projects/ComfyUI/custom_nodes/ComfyUI-BRIA_AI-RMBG/RMBG-1.4
COPY brai_ai.pth model.pth

WORKDIR /projects/ComfyUI/custom_nodes/comfyui-lama-remover/ckpts
COPY models/inpaint/big-lama.pt big-lama.pt

WORKDIR /projects/ComfyUI
COPY models /projects/ComfyUI/models

# # comfyui-models image 节点 --
# FROM comfyui-image-tool-models:0.0.1
# # ---------------------------

WORKDIR /projects/ComfyUI
EXPOSE 8188
ENTRYPOINT ["python", "main.py", "--listen", "--port 8188", "--highvram"]
