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

ntlk 数据准备(需要对以下数据做追踪):
```
[nltk_data] Downloading package averaged_perceptron_tagger to
[nltk_data]     /home/ubuntu/nltk_data...
[nltk_data]   Unzipping taggers/averaged_perceptron_tagger.zip.
[nltk_data] Downloading package cmudict to /home/ubuntu/nltk_data...
[nltk_data]   Unzipping corpora/cmudict.zip.
```

依赖准备:
apt install ffmpeg  

### TODO 需要额外开发插件
loadAudioFromUrl - 从 url 中加载 audio  
- 参考 ComfyUI 中的 comfy_extras/nodes_audio.py 对 load audio 节点的实现(需要确保输出格式一致)  
- 参考 https://github.com/tsogzark/ComfyUI-load-image-from-url 中的实现  

saveAudioToS3 - 将 audio 保存到 S3 存储中  
- 参考 ComfyUI 中的 comfy_extras/nodes_audio.py 对 save audio 节点的实现(参考其入参的格式化方法 -- torchaudio 的相关转换实现)  
- 参考 https://github.com/TemryL/ComfyS3 中的实现  
