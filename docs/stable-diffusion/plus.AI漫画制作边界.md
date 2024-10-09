# AI漫画制作边界
这里记录在实际测试中得到的反馈，对 AI 在漫画制作方向的边界做汇总总结，用于后续漫画制作的参考

## 当前AI能做到的
1. 固定角色面部特征(controlnet reference_only 或 lora)  
1. 同一张图中角色的服饰是较为统一的(例如三视图设计中角色的服饰基本保持统一)  
1. 使用纯色简易服饰配合漫画画风的 lora 可以实现服饰上的统一(20张图中有两张是一致的，需要进行批量抽卡)  

## 当前AI不能做到的
1. 跨图片时的复杂服饰固定  
1. 较大的动作幅度会导致人物变形严重  

## 可以尝试的方向（需要测试）
对经典漫画做汇总，确认当前 AI 加持下，大致能做哪些题材或风格的漫画  

## 简易服饰的提示词尝试
若成功实现简易服饰的固定，则做一个可以支持固定化的服饰提示词汇总  
图章模式尝试: https://civitai.com/models/24833/minimalist-anime-style

## 简易服饰参考
服饰简化(只有纯色和阴影): https://civitai.com/images/1470378?period=AllTime&periodMode=published&sort=Newest&view=categories&modelVersionId=24519&modelId=20606&postId=375022  

服饰简化参考: https://civitai.com/images/1187066?period=AllTime&periodMode=published&sort=Newest&view=categories&modelVersionId=98112&modelId=92027&postId=310232


一些问题与技巧汇总:  
1. 对于 flat2DAnimerge 这个模型来说，纯色背景较难实现  
1. 背景颜色会影响衣服颜色，在调试时需要注意  
1. 目前发现棕色的背景颜色会比较好抠图，虽然会有诡异的背景  
1. 换动作骨骼图后衣服的样式注定会改变，需要采用简易化的衣服配置加暴力多出图的方案，在生成的图中找到附和要求的服饰  
1. 对于服饰细节有难以对上的部分（杂图或logo），可以采用局部重绘的方式进行修正  

TODO:  
1. 目前已经确定服饰只能通过抽卡进行满足，但是面部特征的固定是可以通过 controlnet 这里可以做额外尝试  

使用标准立绘

