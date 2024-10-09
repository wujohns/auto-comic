# 三段式提示词策略
三段式提示词策略是目前社区摸索出来的较为有效且简介的提示词编写方案，这里对其做汇总与尝试作为后续提示词编写的规范参考  

## 基本格式
基础结构为 前缀 + 主体 + 场景(+后缀)  

### 前缀(基本前缀 + 画风词 + 整体效果器)  
用于确定图片的总体生成质量  
1. 基本前缀为强调图片质量的词汇：masterpiece,bestquality等  
1. 画风词用于凸显图片的画风：插画illustration, 水彩watercolor_medium, 厚涂impasto  
1. 效果器为光线效果bestlighting，炫光lensflare，景深Depthoffield等用于图像整体光效的词汇  

### 主体(画面中的主体部分)
主体为图画想要凸显的主体，可以是人物，建筑，景物等  
1. 主体部分要进行丰富的描述才能获得细节丰富的图像  
1. 可以给主体部分适当增加权重用以突出  
1. 对于角色来说，通常包括了面部，头发，身体，衣着，姿态等描写  
1. 对于事物来说，将重点进行描述例如高耸入云的城堡，绽放的花朵，破碎的钟表等，想要位于画面中心的物体进行描述  

### 场景(背景，环境)
场景是主体存在的周围场景  
1. 没有场景描述时容易生成纯色背景或者是效果tag相关的背景，且主体会显得很大  
1. 单独的环境词汇会形成环绕与主体周边充斥整个画面的场景  
1. 背景词汇即环境词添加background做背景，例如 clockbackground 使用钟表做背景  

这里有一个案例:  
`masterpiece,a girl,clockbackground,feather,brokenglass`  
![imgs/clock-bg.png](/imgs/clock-bg.png)

## 权重控制综合案例
这里以站在花丛中的少女作为案例  
基础提示词: `masterpiece,a girl,flowers,tree,dog`  
基于此做了对 girl 和 flowers 的调整，具体对比参考如下:  
1. 强化 flowers 的显示时，flowers 会溢出到其他元素上(头上的花环)  
1. 强化/弱化 girl 的显示时，均会影响其画面占比  
1. 权重虽有影响，但是影响不大，所以实际使用中该部分作为微调的参考  

![imgs/weight-plot.png](/imgs/weight-plot.png)

## 自己尝试的风格测试
seed = 388382932  
正向提示词  
```
masterpiece, best quality,
1girl, white camisole, blue shorts, (exquisitely detailed skin),
underwater, fishes, plants, fantasy, best shadow,intricate, cinematic light,(coolcolor:1.4),perfect anatomy,water,yushuishu,Forest system, (original), underwater
```

反向提示词
```
NSFW, (worst quality:2), (low quality:2), (normal quality:2), lowres, normal quality, ((monochrome)), ((grayscale)), skin spots, acnes, skin blemishes, age spot, (ugly:1.331), (duplicate:1.331), (morbid:1.21), (mutilated:1.21), (tranny:1.331), mutated hands, (poorly drawn hands:1.5), (blurry:2), (bad anatomy:1.21), (bad proportions:1.331), extra limbs, (disfigured:1.331), (missing arms:1.331), (extra legs:1.331), (fused fingers:1.61051), (too many fingers:1.61051), (unclear eyes:1.331), lowers, bad hands, missing fingers, extra digit,bad hands, missing fingers, (((extra arms and legs))),nsfw
```

效果:
![imgs/cus.png](/imgs/cus.png)

备注:  
1. 这里有两个技巧，一个是在场景描述中用同样的大背景提示词做前后包裹(这里使用的是 underwater), 可以背景把人物给囊括进去起到一个整体氛围的效果  
1. 另一个是反向提示词中也采用了类似的包裹策略(nsfw)  

## 相关参考
[Tags基本编写逻辑及三段术式入门与解析v3](https://docs.qq.com/doc/DSHBGRmRUUURjVmNM)  
