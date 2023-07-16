# AI漫画制作边界
这里记录在实际测试中得到的反馈，对 AI 在漫画制作方向的边界做汇总总结，用于后续漫画制作的参考

## 当前AI能做到的
1. 固定角色面部特征(controlnet reference_only 或 lora)  
1. 同一张图中角色的服饰是较为统一的(例如三视图设计中角色的服饰基本保持统一)  
1. 使用纯色简易服饰配合漫画画风的 lora 可以实现服饰上的统一(5张图中有两张是一致的)  

## 当前AI不能做到的
1. 跨图片时的复杂服饰固定  
1. 较大的动作幅度会导致人物变形严重  

## 可以尝试的方向（需要测试）
对经典漫画做汇总，确认当前 AI 加持下，大致能做哪些题材或风格的漫画  

## 简易服饰的提示词尝试
若成功实现简易服饰的固定，则做一个可以支持固定化的服饰提示词汇总  

## 简易服饰参考
服饰简化(只有纯色和阴影): https://civitai.com/images/1470378?period=AllTime&periodMode=published&sort=Newest&view=categories&modelVersionId=24519&modelId=20606&postId=375022  

服饰简化参考: https://civitai.com/images/1187066?period=AllTime&periodMode=published&sort=Newest&view=categories&modelVersionId=98112&modelId=92027&postId=310232
