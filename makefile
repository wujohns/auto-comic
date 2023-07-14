# 启动 sd
sd:
	cd tools/stable-diffusion-webui && \
	python launch.py --listen --xformers --api

# 给 sd 安装插件
# 插件列表地址: https://raw.githubusercontent.com/wiki/AUTOMATIC1111/stable-diffusion-webui/Extensions-index.md
sd-plugin:
	cd tools/stable-diffusion-webui/extensions && \
	git clone https://github.com/huchenlei/sd-webui-openpose-editor

# 模型下载
model-download:
	cd tools/stable-diffusion-webui/models/Stable-diffusion && \
	wget -e "https_proxy=http://192.168.101.216:7890" https://civitai.com/api/download/models/103436 -O ./flat2DAnimerge_v30.safetensors

# vae 下载
vae-download:
	cd tools/stable-diffusion-webui/models/VAE && \
	wget -e "https_proxy=http://192.168.101.216:7890" https://huggingface.co/swl-models/ClearVAE/resolve/main/ClearVAE.safetensors

# lora 下载
vae-download:
	cd tools/stable-diffusion-webui/models/Lora && \
	wget -e "https_proxy=http://192.168.101.216:7890" https://civitai.com/api/download/models/52053 -O ./HoshinoAi_v9-000007.safetensors

# 反向推理 pt 下载
booru-download:
	cd tools/stable-diffusion-webui/models/torch_deepdanbooru && \
	wget -e "https_proxy=http://192.168.101.216:7890" https://github.com/AUTOMATIC1111/TorchDeepDanbooru/releases/download/v1/model-resnet_custom_v3.pt -O ./model-resnet_custom_v3.pt

# controlnet 主模型下载
controlnet-download:
	cd tools/stable-diffusion-webui/extensions/sd-webui-controlnet/models && \
	wget -e "https_proxy=http://192.168.101.216:7890" https://huggingface.co/lllyasviel/ControlNet-v1-1/resolve/main/control_v11p_sd15_openpose.pth && \
	wget -e "https_proxy=http://192.168.101.216:7890" https://huggingface.co/lllyasviel/ControlNet-v1-1/resolve/main/control_v11f1p_sd15_depth.pth && \
	wget -e "https_proxy=http://192.168.101.216:7890" https://huggingface.co/lllyasviel/ControlNet-v1-1/resolve/main/control_v11p_sd15_canny.pth && \
	wget -e "https_proxy=http://192.168.101.216:7890" https://huggingface.co/lllyasviel/ControlNet-v1-1/resolve/main/control_v11p_sd15_softedge.pth && \
	wget -e "https_proxy=http://192.168.101.216:7890" https://huggingface.co/lllyasviel/ControlNet-v1-1/resolve/main/control_v11p_sd15_scribble.pth && \
	wget -e "https_proxy=http://192.168.101.216:7890" https://huggingface.co/lllyasviel/ControlNet-v1-1/resolve/main/control_v11f1e_sd15_tile.pth

# controlnet 辅助模型下载
cdownload:
	cd tools/stable-diffusion-webui/extensions/sd-webui-controlnet/annotator/downloads/midas && \
	wget -e "https_proxy=http://192.168.101.216:7890" https://huggingface.co/lllyasviel/ControlNet/resolve/main/annotator/ckpts/dpt_hybrid-midas-501f0c75.pt
