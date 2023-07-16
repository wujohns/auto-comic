# 辅助插件相关
这里整理一些常用的辅助插件，用于提高效率

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
参考: https://zhuanlan.zhihu.com/p/632888046  
https://github.com/AUTOMATIC1111/stable-diffusion-webui-rembg  

备注: 
1. 需要手动安装 python 包 rembg 以及 onnxruntime  
1. 该功能属于 `附加功能` 板块  
1. 部分模型需要手动下载(可以参考切换抠图模型时的命令行的信息)    

## 历史图片生成查看
https://github.com/yfszzx/stable-diffusion-webui-images-browser  
备注：该插件质量非常糟糕，后续如果有替代品则果断替换  

## 任务队列管理
任务队列管理: https://github.com/ArtVentureX/sd-webui-agent-scheduler  
备注：  
1. 其任务历史管理非常不错，可以作为初期的重要笔记记录  
1. 支持 api 调用，可以用于后续的工作流程中  

## lycoris 插件
参考: https://github.com/KohakuBlueleaf/a1111-sd-webui-lycoris  
文章参考：https://www.bilibili.com/read/cv23595878/  

## 待观察的插件
该类插件可能很好用，但是有很多的 bug
tag翻译：https://github.com/Physton/sd-webui-prompt-all-in-one.git
