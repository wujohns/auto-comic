# stable diffusion 基础
该部分整理汇总 stable diffusion 的理论基础部分，以便于辅助理解 ai 绘画中各个参数的实际作用

## 整体结构
![imgs/sd-struct.webp](/imgs/sd-struct.webp)  

如图所示 stable diffusion 主要包含三个板块，每个板块都是一个独立的神经网络:  
1. `Clip Text` 用于文本编码，即将用户输入的提示词转换为一个 77 * 768 的张量    
1. `UNet + Scheduler` 逐步处理/扩散信息，主要是接收上述的 `Clip Text` 的输入和一个由噪声组成的多维数组(张量)，并最终输出一个固定大小的张量  
1. `Autoencoder Decoder` 自解码器，将上述输出解码为对应的图片  

备注:  
1. 由此可知 stable diffusion 实际是由图片降噪算法演变而来（即最早该部分技术用于图片降噪处理）  

这里附带一张b站up秋叶的一个说明图：  
![imgs/qy-struct.png](/imgs/qy-struct.png)  

## 各类模型的作用机制
在实际的工程使用中我们经常会需要用到各种类型的模型，例如:  
1. Text Inversion(T.I.Embedding) - 作用于 `Clip Text` 部分的模型  
1. Checkpoints(ckpt) - 作用于整体的模型（三个部分都涉及，但主要为 `UNet + Scheduler` 这层） 
1. lora - 作用于 `Clip Text` 和 `UNet + Scheduler` 部分，由于 lora 的原理机制需要配合基础模型使用，主要用于生成指定的角色(由于其降秩的原理，在训练上表现优异)  
1. vae - 作用于 `Autoencoder Decoder` 部分，主要会影响画面 温度/锐度/色彩  
1. controlnet - 作用于 `UNet + Scheduler` 部分，虽然策略上和 lora 类似采用的是相加策略，但是计算机制由所区别，主要用于做精细化控制(动作)  

这里没有提到 hypernetwork 需要在后续进一步确认，目前仅知到其风评不佳  

## 参考
整体结构: https://www.ithome.com/0/668/981.htm  
不同的训练方式: https://zhuanlan.zhihu.com/p/611310582  
controlnet 原理：https://juejin.cn/post/7210369671656505399  
详细的视频讲解: https://www.bilibili.com/video/BV1x8411m76H  
