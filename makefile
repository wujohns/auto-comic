# 启动 sd
sd:
	cd tools/stable-diffusion-webui && \
	python launch.py --listen --xformers --api

# 给 sd 安装插件
# 插件列表地址: https://raw.githubusercontent.com/wiki/AUTOMATIC1111/stable-diffusion-webui/Extensions-index.md
sd-plugin:
	cd tools/stable-diffusion-webui/extensions && \
	git clone https://github.com/dtlnor/stable-diffusion-webui-localization-zh_CN

# 模型下载
model-download:
	cd tools/stable-diffusion-webui/models/Stable-diffusion && \
	wget -e "https_proxy=http://192.168.101.216:7890" https://civitai.com/api/download/models/112251

# vae 下载
vae-download:
	cd tools/stable-diffusion-webui/models/VAE && \
	wget -e "https_proxy=http://192.168.101.216:7890" https://huggingface.co/swl-models/ClearVAE/resolve/main/ClearVAE.safetensors
