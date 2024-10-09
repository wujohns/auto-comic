# 依赖的文件下载
download:
	mkdir -p ./models/inpaint/powerpaint
	mkdir -p ./models/clip
	mkdir -p ./models/checkpoints
	mkdir -p ./models/controlnet
	mkdir -p ./models/upscale_models
	mkdir -p ./models/grounding-dino
	mkdir -p ./models/sam2
	mkdir -p ./models/bert-base-uncased

	wget https://huggingface.co/briaai/RMBG-1.4/resolve/main/model.pth -O brai_ai.pth

	cd models/inpaint && \
	wget https://github.com/Sanster/models/releases/download/add_big_lama/big-lama.pt

	cd models/inpaint/powerpaint && \
	wget https://huggingface.co/JunhaoZhuang/PowerPaint-v2-1/resolve/main/PowerPaint_Brushnet/diffusion_pytorch_model.safetensors && \
	wget https://huggingface.co/JunhaoZhuang/PowerPaint-v2-1/resolve/main/PowerPaint_Brushnet/pytorch_model.bin

	cd models/clip && \
	wget https://huggingface.co/nmkd/stable-diffusion-1.5-fp16/resolve/main/text_encoder/model.safetensors -O sd15_fp16.safetensors

	cd models/checkpoints && \
	wget https://huggingface.co/moiu2998/mymo/resolve/main/realisticVisionV60B1_v51VAE.safetensors && \
	wget https://huggingface.co/misri/juggernautXL_juggXIByRundiffusion/resolve/main/juggernautXL_juggXIByRundiffusion.safetensors

	cd models/controlnet && \
	wget https://huggingface.co/kataragi/controlnetXL_inpaint/resolve/main/Kataragi_inpaintXL-lora128.safetensors

	cd models/upscale_models && \
	wget https://github.com/xinntao/Real-ESRGAN/releases/download/v0.2.1/RealESRGAN_x2plus.pth

	cd models/grounding-dino && \
	wget https://huggingface.co/ShilongLiu/GroundingDINO/resolve/main/GroundingDINO_SwinB.cfg.py && \
	wget https://huggingface.co/ShilongLiu/GroundingDINO/resolve/main/groundingdino_swinb_cogcoor.pth

	cd models/sam2 && \
	wget https://dl.fbaipublicfiles.com/segment_anything_2/072824/sam2_hiera_base_plus.pt

	cd models/bert-base-uncased && \
	wget https://huggingface.co/google-bert/bert-base-uncased/resolve/main/tokenizer_config.json && \
	wget https://huggingface.co/google-bert/bert-base-uncased/resolve/main/tokenizer.json && \
	wget https://huggingface.co/google-bert/bert-base-uncased/resolve/main/config.json && \
	wget https://huggingface.co/google-bert/bert-base-uncased/resolve/main/vocab.txt && \
	wget https://huggingface.co/google-bert/bert-base-uncased/resolve/main/model.safetensors
