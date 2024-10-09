# 相关插件和模型汇总

## 使用的插件
### ComfyUI-SAM2:
repo: https://github.com/neverbiasu/ComfyUI-SAM2.git  
commit: 76edf7029237baac70253e5a2e0ff30d645321b6
文件: 
```
models
  /grounding-dino
    GroundingDINO_SwinB.cfg.py - https://huggingface.co/ShilongLiu/GroundingDINO/resolve/main/GroundingDINO_SwinB.cfg.py
    groundingdino_swinb_cogcoor.pth - https://huggingface.co/ShilongLiu/GroundingDINO/resolve/main/groundingdino_swinb_cogcoor.pth

  /sam2
    sam2_hiera_large.pt - https://dl.fbaipublicfiles.com/segment_anything_2/072824/sam2_hiera_large.pt

  /bert-base-uncased
    tokenizer_config.json - https://huggingface.co/google-bert/bert-base-uncased/resolve/main/tokenizer_config.json
    tokenizer.json - https://huggingface.co/google-bert/bert-base-uncased/resolve/main/tokenizer.json
    config.json - https://huggingface.co/google-bert/bert-base-uncased/resolve/main/config.json
    vocab.txt - https://huggingface.co/google-bert/bert-base-uncased/resolve/main/vocab.txt
    model.safetensors - https://huggingface.co/google-bert/bert-base-uncased/resolve/main/model.safetensors
```

### ComfyUI-Advanced-ControlNet
repo: https://github.com/Kosinkadink/ComfyUI-Advanced-ControlNet.git  
commit: 85d4970caed3e45be9de56c3058c334379fc4894
文件:  
```
models
  /controlnet
    Kataragi_inpaintXL-lora128.safetensors - https://huggingface.co/kataragi/controlnetXL_inpaint/resolve/main/Kataragi_inpaintXL-lora128.safetensors
```

### comfyui_controlnet_aux
repo: https://github.com/Fannovel16/comfyui_controlnet_aux.git
commit: 4cd233c5d7afe2e51bf57ee7a5ba7e6fcb9cbb22
文件:
```
// 暂无，后续如果有特性需要则需要补充预处理模型
```

对于 dwpose 的 onnxruntime 警告问题，主要时由于 onnxruntime 只支持 cuda 11.8，但现在一般都用 cuda 12.x 导致，解决方法参考:  
https://github.com/Fannovel16/comfyui_controlnet_aux/issues/75

### comfyui-easyapi-nodes
repo: https://github.com/lldacing/comfyui-easyapi-nodes
commit: c11ff7751659b03b9b1442e5f41d41f7b3ccd85f

### ComfyS3
repo: https://github.com/TemryL/ComfyS3
commit: 1634259aa3f4ac8e2e44ab3166b475488061c15d
文件:
```
custom_nodes
  /ComfyS3
    .env - 按照项目 readme 准备对应的内容
```

### ComfyUI-Login
repo: https://github.com/liusida/ComfyUI-Login
commit: 38bfb4009308a2af4d3de227100290375446d43e
文件:
```
login
  PASSWORD - 放置对应的密钥配置
```

另外需要移除 ComfyUI-Login/js/free_memory.js 避免强制清空 gpu 导致模型重复加载耗时

## 相关的模型
### realDream_sdxlPony10.safetensors
下载地址: https://civitai.com/api/download/models/712493?type=Model&format=SafeTensor&size=pruned&fp=fp16
