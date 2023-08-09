# 辅助插件相关
这里整理一些常用的辅助插件，用于提高效率  
插件列表: https://gitcode.net/rubble7343/sd-webui-extensions/raw/master/index.json

## 中文翻译
纯中文: https://github.com/dtlnor/stable-diffusion-webui-localization-zh_CN  
双语翻译: https://github.com/journey-ad/sd-webui-bilingual-localization  

## C站助手
测试其是否可以用于替代当前需要手动执行的 make 指令  
https://github.com/butaixianran/Stable-Diffusion-Webui-Civitai-Helper.git  

## 提示词自动补全(补全规则来自于Danbooru)
参考: https://zhuanlan.zhihu.com/p/637341375  
tag自动补全: https://github.com/DominikDoom/a1111-sd-webui-tagcomplete  

备注:  
1. 默认情况是只有英语自动补全，如果需要中文支持，则需要更换对应的翻译配置  
1. 对应的配置可以参考: https://github.com/ChinaGPT/a1111-sd-webui-tagcomplete-10w  中 tags/danbooru-10w-zh_cn.csv 文件复制到 extensions/a1111-sd-webui-tagcomplete/tags 目录中  
1. 在 a1111-sd-webui-tagcomplete 的翻译配置中选择 danbooru-10w-zh_cn.csv 即可  
1. 微软自带的中文输入法在该插件上表现有较大的问题(无法唤起提示窗)  

## 抠图插件
人物抠图:  
参考: https://zhuanlan.zhihu.com/p/632888046  
https://github.com/AUTOMATIC1111/stable-diffusion-webui-rembg  

备注: 
1. 需要手动安装 python 包 rembg 以及 onnxruntime  
1. 该功能属于 `附加功能` 板块  
1. 部分模型需要手动下载(可以参考切换抠图模型时的命令行的信息)    

基于 segement-anything 的抠图(和重绘配合有较好的效果):  
参考1: https://github.com/continue-revolution/sd-webui-segment-anything  
参考2: https://github.com/Uminosachi/sd-webui-inpaint-anything  

备注:  
1. 这两个插件是相互配合的，可以实现较为顺滑的流程衔接  
1. segement-anything 模型存放位置为 ${sd-webui}/models/sam  
1. GroundingDINO 模型存放位置为 ${sd-webui}/extensions/sd-webui-segment-anything/models/grounding-dino  
1. 缺失的模型可以按照webui上的关键字+huggingface进行搜索，然后手动下载  

## 历史图片生成查看
https://github.com/yfszzx/stable-diffusion-webui-images-browser  
备注：该插件质量非常糟糕，后续如果有替代品则果断替换  

## 任务队列管理
任务队列管理: https://github.com/ArtVentureX/sd-webui-agent-scheduler  
备注：  
1. 其任务历史管理非常不错，可以作为初期的重要笔记记录  
1. 支持 api 调用，可以用于后续的工作流程中  

## lycoris 插件
lycoris 作用和 lora 类似，但是是更新的格式和策略  
参考: https://github.com/KohakuBlueleaf/a1111-sd-webui-lycoris  
文章参考：https://www.bilibili.com/read/cv23595878/  

## 手部畸形修复
https://github.com/jexom/sd-webui-depth-lib  
参考: https://www.bilibili.com/video/BV1Mv4y1a7qu  

## openpose 3d
https://github.com/nonnonstop/sd-webui-3d-open-pose-editor
备注:  
1. 使用3d辅助可以极大程度上修复手部描绘问题  
1. 但与此同时，其操作代价也较高  

## sdxl 相关
Refiner(减少sdxl切换时间): https://github.com/wcde/sd-webui-refiner

## 待观察的插件
该类插件可能很好用，但是有很多的 bug
tag翻译：https://github.com/Physton/sd-webui-prompt-all-in-one.git
