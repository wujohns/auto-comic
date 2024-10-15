# gpt_sovits 处理
目前 comfyui 下有两个和 gpt_sovits 相关的项目:  
AIFSH/ComfyUI-GPT_SoVITS -- 适配 gpt_sovits v1  
AIFSH/GSTTS-ComfyUI -- 适配 gpt_sovits v2  

原始项目: https://github.com/RVC-Boss/GPT-SoVITS  
NOTICE:
1. audio 相关的部分和 image 相关的部分存在一些依赖冲突，这里采用新建 comfyui 环境做处理  

## GSTTS-ComfyUI 方案
### 使用节点: GSTTS-ComfyUI
项目地址: https://github.com/AIFSH/GSTTS-ComfyUI  
模型文件:  
https://huggingface.co/lj1995/GPT-SoVITS 下的所有文件
放在 /custom_nodes/GSTTS-ComfyUI/GPT_SoVITS/pretrained_models 目录下，可以使用以下方式
```python
# 这里的 models_dir 即为 /custom_nodes/GSTTS-ComfyUI/GPT_SoVITS/pretrained_models
from huggingface_hub import snapshot_download
snapshot_download(repo_id="lj1995/GPT-SoVITS",local_dir=models_dir)
```

https://paddlespeech.bj.bcebos.com/Parakeet/released_models/g2p/G2PWModel_1.1.zip  
解压到 /custom_nodes/GSTTS-ComfyUI/GPT_SoVITS/pretrained_models 目录下，并重命名为 G2PWModel，同时解压的 G2PWModel_1.1 也需要保留  

nltk 数据准备:
```python
nltk_dir = getAbsPath('./nltk_data')  # 为用户根目录下的 nltk_data 目录(~/nltk_data)
nltk.download('averaged_perceptron_tagger_eng', download_dir=nltk_dir)
nltk.download('averaged_perceptron_tagger', download_dir=nltk_dir)
nltk.download('cmudict', download_dir=nltk_dir)
```

依赖准备:
apt install ffmpeg  

https://github.com/r9y9/pyopenjtalk 这个包会触发下载
日语合成部分的 https://github.com/r9y9/open_jtalk/releases/download/v1.11.1/open_jtalk_dic_utf_8-1.11.tar.gz 的文件处理需要做复查

### 使用节点: ComfyS3Plus
项目地址: https://github.com/wujohns/ComfyS3Plus

备注: 该节点新增的功能为从连接加载音频以及上传音频到S3

TODO 构建全语种测试案例
