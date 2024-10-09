LOCAL_PROXY = http://192.168.10.100:7890
# LOCAL_PROXY = http://192.168.1.2:7890
PROXY = http://192.168.10.100:7890

# 启动 sd(由于显卡版本过老用的是p40，不支持半精度，所以 --no-half)
sd:
	cd tools/stable-diffusion-webui && \
	/root/.virtualenvs/auto-comic/bin/python launch.py --listen --xformers --api --no-half --no-half-vae --theme=dark

sd-proxy:
	export http_proxy=${LOCAL_PROXY} && \
	export https_proxy=${LOCAL_PROXY} && \
	cd tools/stable-diffusion-webui && \
	/root/.virtualenvs/auto-comic/bin/python launch.py --listen --xformers --api --no-half --no-half-vae --theme=dark

sd-auth:
	cd tools/stable-diffusion-webui && \
	/root/.virtualenvs/auto-comic/bin/python launch.py --listen --xformers --api --api-auth=kk:mm --no-half --no-half-vae --theme=dark

sd-share:
	cd tools/stable-diffusion-webui && \
	/root/.virtualenvs/auto-comic/bin/python launch.py --xformers --no-half --no-half-vae --theme=dark --share

bark:
	cd tools/Bark-Voice-Cloning && \
	python app.py

# controlnet 下载
controlnet:
	export http_proxy=${PROXY} && \
	export https_proxy=${PROXY} && \
	git lfs clone https://huggingface.co/lllyasviel/ControlNet-v1-1
	cd ControlNet-v1-1 && \
	mv *.yaml ../tools/stable-diffusion-webui/extensions/sd-webui-controlnet/models/ && \
	mv *.pth ../tools/stable-diffusion-webui/extensions/sd-webui-controlnet/models/

# 给 sd 安装插件
# 插件列表地址: https://raw.githubusercontent.com/wiki/AUTOMATIC1111/stable-diffusion-webui/Extensions-index.md
sd-plugin:
	cd tools/stable-diffusion-webui/extensions && \
	git clone https://github.com/wcde/sd-webui-refiner

# 模型下载
model-download:
	cd tools/stable-diffusion-webui/models/Stable-diffusion && \
	wget -e "https_proxy=${PROXY}" https://huggingface.co/stabilityai/stable-diffusion-xl-refiner-1.0/resolve/main/sd_xl_refiner_1.0.safetensors 

# vae 下载
vae-download:
	cd tools/stable-diffusion-webui/models/VAE && \
	wget -e "https_proxy=${PROXY}" https://huggingface.co/swl-models/ClearVAE/resolve/main/ClearVAE.safetensors

# sdxl vae 模型下载
sdxl-vae:
	cd tools/stable-diffusion-webui/models/VAE-approx && \
	wget -e "https_proxy=${PROXY}" https://github.com/AUTOMATIC1111/stable-diffusion-webui/releases/download/v1.0.0-pre/vaeapprox-sdxl.pt

# lora 下载
lora-download:
	cd tools/stable-diffusion-webui/models/Lora && \
	wget -e "https_proxy=${PROXY}" https://civitai.com/api/download/models/52053 -O ./HoshinoAi_v9-000007.safetensors

# lycoris 下载
lyco-download:
	cd tools/stable-diffusion-webui/models/LyCORIS && \
	wget -e "https_proxy=${PROXY}" https://civitai.com/api/download/models/110362

# text embedding 下载
ti-download:
	cd tools/stable-diffusion-webui/embeddings && \
	wget -e "https_proxy=${PROXY}" https://civitai.com/api/download/models/2786 -O ./WEBUI.pt

# 反向推理 pt 下载
booru-download:
	cd tools/stable-diffusion-webui/models/torch_deepdanbooru && \
	wget -e "https_proxy=${PROXY}" https://github.com/AUTOMATIC1111/TorchDeepDanbooru/releases/download/v1/model-resnet_custom_v3.pt -O ./model-resnet_custom_v3.pt

# controlnet 主模型下载
controlnet-download:
	cd tools/stable-diffusion-webui/extensions/sd-webui-controlnet/models && \
	wget -e "https_proxy=${PROXY}" https://huggingface.co/lllyasviel/ControlNet-v1-1/resolve/main/control_v11p_sd15_lineart.pth
#	wget -e "https_proxy=${PROXY}" https://huggingface.co/lllyasviel/ControlNet-v1-1/resolve/main/control_v11p_sd15_seg.pth && \
# wget -e "https_proxy=${PROXY}" https://huggingface.co/lllyasviel/ControlNet-v1-1/resolve/main/control_v11p_sd15_openpose.pth && \
# wget -e "https_proxy=${PROXY}" https://huggingface.co/lllyasviel/ControlNet-v1-1/resolve/main/control_v11f1p_sd15_depth.pth && \
# wget -e "https_proxy=${PROXY}" https://huggingface.co/lllyasviel/ControlNet-v1-1/resolve/main/control_v11p_sd15_canny.pth && \
# wget -e "https_proxy=${PROXY}" https://huggingface.co/lllyasviel/ControlNet-v1-1/resolve/main/control_v11p_sd15_softedge.pth && \
# wget -e "https_proxy=${PROXY}" https://huggingface.co/lllyasviel/ControlNet-v1-1/resolve/main/control_v11p_sd15_scribble.pth && \
# wget -e "https_proxy=${PROXY}" https://huggingface.co/lllyasviel/ControlNet-v1-1/resolve/main/control_v11f1e_sd15_tile.pth && \

# controlnet 辅助模型下载
# cdownload:
# 	cd tools/stable-diffusion-webui/extensions/sd-webui-controlnet/annotator/downloads/oneformer/ && \
# 	wget -e "https_proxy=${PROXY}" https://huggingface.co/lllyasviel/Annotators/resolve/main/250_16_swin_l_oneformer_ade20k_160k.pth

# cdownload:
# 	cd tools/stable-diffusion-webui/extensions/sd-webui-controlnet/annotator/clip_vision/ && \
# 	wget -e "https_proxy=${PROXY}" https://huggingface.co/openai/clip-vit-large-patch14/resolve/main/pytorch_model.bin

# cdownload:
# 	cd tools/stable-diffusion-webui/extensions/sd-webui-controlnet/annotator/downloads/lama/ && \
# 	wget -e "https_proxy=${PROXY}" https://huggingface.co/lllyasviel/Annotators/resolve/main/ControlNetLama.pth

cdownload:
	cd tools/stable-diffusion-webui/extensions/sd-webui-controlnet/annotator/downloads/mlsd/ && \
	wget -e "https_proxy=${PROXY}" https://huggingface.co/lllyasviel/ControlNet/resolve/main/annotator/ckpts/mlsd_large_512_fp32.pth

# contorlnet for sd2.1 下载
controlnet2:
	cd tools/stable-diffusion-webui/extensions/sd-webui-controlnet/models && \
	wget -e "https_proxy=${PROXY}" https://huggingface.co/thibaud/controlnet-sd21/resolve/main/control_v11p_sd21_scribble.safetensors && \
	wget -e "https_proxy=${PROXY}" https://huggingface.co/thibaud/controlnet-sd21/raw/main/control_v11p_sd21_scribble.yaml

# controlnet for t2i 下载
controlnet-t2i:
	cd tools/stable-diffusion-webui/extensions/sd-webui-controlnet/models && \
	wget -e "https_proxy=${PROXY}" https://huggingface.co/TencentARC/T2I-Adapter/resolve/main/models/t2iadapter_color_sd14v1.pth

# 方法算法依赖的模型下载
up-download:
	cd tools/stable-diffusion-webui/models/RealESRGAN && \
	wget -e "https_proxy=${PROXY}" https://github.com/xinntao/Real-ESRGAN/releases/download/v0.2.2.4/RealESRGAN_x4plus_anime_6B.pth

# sam 模型下载
sam-download:
	cd tools/stable-diffusion-webui/models/sam && \
	wget -e "https_proxy=${PROXY}" https://dl.fbaipublicfiles.com/segment_anything/sam_vit_h_4b8939.pth

# groundingdino 模型下载
groundingdino-download:
	cd tools/stable-diffusion-webui/extensions/sd-webui-segment_anything/models/grounding-dino && \
	wget -e "https_proxy=${PROXY}" https://huggingface.co/ShilongLiu/GroundingDINO/resolve/main/groundingdino_swinb_cogcoor.pth && \
	wget -e "https_proxy=${PROXY}" https://huggingface.co/ShilongLiu/GroundingDINO/resolve/main/groundingdino_swint_ogc.pth

# rsync 增量同步测试
sync:
	rsync -a --progress /root/projects/auto-comic/tools/stable-diffusion-webui/models/Stable-diffusion /root/projects/auto-comic/

# sd api 相关测试内容(使用 no-hashing 减少模型切换时间)
sdnew:
	cd tools/sd-webui-240802 && \
	/root/.virtualenvs/sd-webui-240802/bin/python launch.py --listen --xformers --api --no-half --no-half-vae --no-hashing

# comfy ui 启动
# https://github.com/Kosinkadink/ComfyUI-Advanced-ControlNet/issues/100
comfyui:
	export http_proxy=${LOCAL_PROXY} && \
	export https_proxy=${LOCAL_PROXY} && \
	export no_proxy="localhost, 127.0.0.1/8, ::1" && \
	cd tools/comfyui-240819 && \
	/root/.virtualenvs/comfyui-240819/bin/python main.py --listen --port 8188 --highvram
