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
图章模式尝试: https://civitai.com/models/24833/minimalist-anime-style

## 简易服饰参考
服饰简化(只有纯色和阴影): https://civitai.com/images/1470378?period=AllTime&periodMode=published&sort=Newest&view=categories&modelVersionId=24519&modelId=20606&postId=375022  

服饰简化参考: https://civitai.com/images/1187066?period=AllTime&periodMode=published&sort=Newest&view=categories&modelVersionId=98112&modelId=92027&postId=310232

## 简易服饰绘制策略
尝试记录1
正向提示词:  
需要重点突出的人 + 人物特征/元素 + 人物动态 + 服饰整体 + 服饰细节元素  
```
masterpiece,best quality,high-definition details,ultra-detailed,
(all clothes configuration:1.15),(character sheet:1.3),beautiful detailed eyes,solo,standing,
1girl,cute,white skin,round face,(brown eyes:1.2),teenage,tall,skinny,medium breasts,(pure dark gray t-shirt,pure black pants:1.2),short straight hair,tall,
cohesive background,ray tracing,cohesive background,masterpiece,best quality
```

负面提示词:
```

```

使用标准立绘

