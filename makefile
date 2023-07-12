# 启动 sd
sd:
	cd tools/stable-diffusion-webui && \
	python launch.py --listen --xformers --api

# 给 sd 安装插件
# 插件列表地址: https://raw.githubusercontent.com/wiki/AUTOMATIC1111/stable-diffusion-webui/Extensions-index.md
sd-plugin:
	cd tools/stable-diffusion-webui/extensions && \
	git clone https://github.com/yfszzx/stable-diffusion-webui-images-browser

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
