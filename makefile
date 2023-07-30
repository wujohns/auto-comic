# 启动 sd(由于显卡版本过老用的是p40，不支持半精度，所以 --no-half)
sd:
	cd tools/stable-diffusion-webui && \
	python launch.py --listen --xformers --api --no-half

# 给 sd 安装插件
# 插件列表地址: https://raw.githubusercontent.com/wiki/AUTOMATIC1111/stable-diffusion-webui/Extensions-index.md
sd-plugin:
	cd tools/stable-diffusion-webui/extensions && \
	git clone https://github.com/Uminosachi/sd-webui-inpaint-anything

# 模型下载
model-download:
	cd tools/stable-diffusion-webui/models/Stable-diffusion && \
	wget -e "https_proxy=http://192.168.101.216:7890" https://huggingface.co/stabilityai/stable-diffusion-2-1/resolve/main/v2-1_768-nonema-pruned.safetensors -O ./v2-1_768-nonema-pruned.safetensors

# vae 下载
vae-download:
	cd tools/stable-diffusion-webui/models/VAE && \
	wget -e "https_proxy=http://192.168.101.216:7890" https://huggingface.co/swl-models/ClearVAE/resolve/main/ClearVAE.safetensors

# lora 下载
lora-download:
	cd tools/stable-diffusion-webui/models/Lora && \
	wget -e "https_proxy=http://192.168.101.216:7890" https://civitai.com/api/download/models/52053 -O ./HoshinoAi_v9-000007.safetensors

# lycoris 下载
lyco-download:
	cd tools/stable-diffusion-webui/models/LyCORIS && \
	wget -e "https_proxy=http://192.168.101.216:7890" https://civitai.com/api/download/models/110362

# text embedding 下载
ti-download:
	cd tools/stable-diffusion-webui/embeddings && \
	wget -e "https_proxy=http://192.168.101.216:7890" https://civitai.com/api/download/models/2786 -O ./WEBUI.pt

# 反向推理 pt 下载
booru-download:
	cd tools/stable-diffusion-webui/models/torch_deepdanbooru && \
	wget -e "https_proxy=http://192.168.101.216:7890" https://github.com/AUTOMATIC1111/TorchDeepDanbooru/releases/download/v1/model-resnet_custom_v3.pt -O ./model-resnet_custom_v3.pt

# controlnet 主模型下载
controlnet-download:
	cd tools/stable-diffusion-webui/extensions/sd-webui-controlnet/models && \
	wget -e "https_proxy=http://192.168.101.216:7890" https://huggingface.co/lllyasviel/ControlNet-v1-1/resolve/main/control_v11p_sd15_lineart.pth
#	wget -e "https_proxy=http://192.168.101.216:7890" https://huggingface.co/lllyasviel/ControlNet-v1-1/resolve/main/control_v11p_sd15_seg.pth && \
# wget -e "https_proxy=http://192.168.101.216:7890" https://huggingface.co/lllyasviel/ControlNet-v1-1/resolve/main/control_v11p_sd15_openpose.pth && \
# wget -e "https_proxy=http://192.168.101.216:7890" https://huggingface.co/lllyasviel/ControlNet-v1-1/resolve/main/control_v11f1p_sd15_depth.pth && \
# wget -e "https_proxy=http://192.168.101.216:7890" https://huggingface.co/lllyasviel/ControlNet-v1-1/resolve/main/control_v11p_sd15_canny.pth && \
# wget -e "https_proxy=http://192.168.101.216:7890" https://huggingface.co/lllyasviel/ControlNet-v1-1/resolve/main/control_v11p_sd15_softedge.pth && \
# wget -e "https_proxy=http://192.168.101.216:7890" https://huggingface.co/lllyasviel/ControlNet-v1-1/resolve/main/control_v11p_sd15_scribble.pth && \
# wget -e "https_proxy=http://192.168.101.216:7890" https://huggingface.co/lllyasviel/ControlNet-v1-1/resolve/main/control_v11f1e_sd15_tile.pth && \

# controlnet 辅助模型下载
# cdownload:
# 	cd tools/stable-diffusion-webui/extensions/sd-webui-controlnet/annotator/downloads/oneformer/ && \
# 	wget -e "https_proxy=http://192.168.101.216:7890" https://huggingface.co/lllyasviel/Annotators/resolve/main/250_16_swin_l_oneformer_ade20k_160k.pth

# cdownload:
# 	cd tools/stable-diffusion-webui/extensions/sd-webui-controlnet/annotator/clip_vision/ && \
# 	wget -e "https_proxy=http://192.168.101.216:7890" https://huggingface.co/openai/clip-vit-large-patch14/resolve/main/pytorch_model.bin

cdownload:
	cd tools/stable-diffusion-webui/extensions/sd-webui-controlnet/annotator/downloads/lama/ && \
	wget -e "https_proxy=http://192.168.101.216:7890" https://huggingface.co/lllyasviel/Annotators/resolve/main/ControlNetLama.pth

# contorlnet for sd2.1 下载
controlnet2:
	cd tools/stable-diffusion-webui/extensions/sd-webui-controlnet/models && \
	wget -e "https_proxy=http://192.168.101.216:7890" https://huggingface.co/thibaud/controlnet-sd21/resolve/main/control_v11p_sd21_scribble.safetensors && \
	wget -e "https_proxy=http://192.168.101.216:7890" https://huggingface.co/thibaud/controlnet-sd21/raw/main/control_v11p_sd21_scribble.yaml

# controlnet for t2i 下载
controlnet-t2i:
	cd tools/stable-diffusion-webui/extensions/sd-webui-controlnet/models && \
	wget -e "https_proxy=http://192.168.101.216:7890" https://huggingface.co/TencentARC/T2I-Adapter/resolve/main/models/t2iadapter_color_sd14v1.pth

# 方法算法依赖的模型下载
up-download:
	cd tools/stable-diffusion-webui/models/RealESRGAN && \
	wget -e "https_proxy=http://192.168.101.216:7890" https://github.com/xinntao/Real-ESRGAN/releases/download/v0.2.2.4/RealESRGAN_x4plus_anime_6B.pth

# sam 模型下载
sam-download:
	cd tools/stable-diffusion-webui/models/sam && \
	wget -e "https_proxy=http://192.168.101.216:7890" https://dl.fbaipublicfiles.com/segment_anything/sam_vit_h_4b8939.pth

# groundingdino 模型下载
groundingdino-download:
	cd tools/stable-diffusion-webui/extensions/sd-webui-segment_anything/models/grounding-dino && \
	wget -e "https_proxy=http://192.168.101.216:7890" https://huggingface.co/ShilongLiu/GroundingDINO/resolve/main/groundingdino_swinb_cogcoor.pth && \
	wget -e "https_proxy=http://192.168.101.216:7890" https://huggingface.co/ShilongLiu/GroundingDINO/resolve/main/groundingdino_swint_ogc.pth
