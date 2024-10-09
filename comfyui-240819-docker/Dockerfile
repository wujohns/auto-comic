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
# FROM nvidia-base:0.0.2
# # ---------------------------

# comfyui 基础准备
WORKDIR /projects
RUN git clone https://github.com/comfyanonymous/ComfyUI.git

WORKDIR /projects/ComfyUI
RUN git checkout a60620dcea1302ef5c7f555e5e16f70b39c234ef
RUN pip install -r requirements.txt

# # comfyui-base image 节点 ----
# FROM comfyui-base:0.0.2
# # ---------------------------

# comfyui 插件下载
# WORKDIR /projects/ComfyUI/custom_nodes
# RUN git clone https://github.com/neverbiasu/ComfyUI-SAM2.git
# RUN git clone https://github.com/Kosinkadink/ComfyUI-Advanced-ControlNet.git
# RUN git clone https://github.com/Fannovel16/comfyui_controlnet_aux.git
# RUN git clone https://github.com/lldacing/comfyui-easyapi-nodes.git
# RUN git clone https://github.com/TemryL/ComfyS3.git
# RUN git clone https://github.com/liusida/ComfyUI-Login.git

# # comfyui 插件依赖安装
# WORKDIR /projects/ComfyUI/custom_nodes/ComfyUI-SAM2
# RUN git checkout 76edf7029237baac70253e5a2e0ff30d645321b6
# RUN pip install -r requirements.txt

# WORKDIR /projects/ComfyUI/custom_nodes/ComfyUI-Advanced-ControlNet
# RUN git checkout 85d4970caed3e45be9de56c3058c334379fc4894

# WORKDIR /projects/ComfyUI/custom_nodes/comfyui_controlnet_aux
# RUN git checkout 4cd233c5d7afe2e51bf57ee7a5ba7e6fcb9cbb22
# RUN pip install -r requirements.txt

# WORKDIR /projects/ComfyUI/custom_nodes/comfyui-easyapi-nodes
# RUN git checkout c11ff7751659b03b9b1442e5f41d41f7b3ccd85f
# RUN pip install -r requirements.txt

# WORKDIR /projects/ComfyUI/custom_nodes/ComfyS3
# RUN git checkout 1634259aa3f4ac8e2e44ab3166b475488061c15d
# RUN pip install -r requirements.txt

# WORKDIR /projects/ComfyUI/custom_nodes/ComfyUI-Login
# RUN git checkout 38bfb4009308a2af4d3de227100290375446d43e
# RUN pip install -r requirements.txt
# RUN rm ./js/freeMemory.js

# WORKDIR /projects/ComfyUI
# RUN pip install -r requirements.txt

# comfyui-nodes image 节点 ---
FROM comfyui-nodes:0.0.3
# ---------------------------

# comfyui s3 配置准备
WORKDIR /projects/ComfyUI
COPY comfys3_env /projects/ComfyUI/custom_nodes/ComfyS3/.env

# comfyui 鉴权密钥准备
WORKDIR /projects/ComfyUI/login
COPY comfyui_login_pwd PASSWORD

# comfyui 模型文件准备
WORKDIR /projects/ComfyUI
COPY models /projects/ComfyUI/models

# # comfyui-models image 节点 --
# FROM comfyui-models:0.0.3
# # ---------------------------

# WORKDIR /projects/ComfyUI
# EXPOSE 8188
# ENTRYPOINT ["python", "main.py", "--listen", "--port 8188", "--highvram"]
