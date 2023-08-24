# txt2img 参数对照整理
TODO 这里需要整理出 txt2img 接口处理中的参数对应关系

相关单元测试可以参考:  
extensions/sd-webui-controlnet/tests/web_api/txt2img_test.py

直接按照接口路径搜索可以查看其具体代码实现  
/sdapi/v1/txt2img

详细参数完整参考:  
https://zhuanlan.zhihu.com/p/612572004

txt2img 请求参数汇总:
```json
{
  // 第一阶段宽高，依据源码得知:
  // 当其不为0时，firstphase_width 会覆盖 width 和 hr_upscale_to_x(初始化时)
  // 当其不为0时，firstphase_height 会覆盖 width 和 hr_upscale_to_y(初始化时)
  // 默认直接将其设定为 0 即可(不引入过度复杂的策略)
  "firstphase_width": 0,
  "firstphase_height": 0,

  // 高清修复相关参数 start -----------------------------------------------------
  "enable_hr": false,           // 是否开启高清修复
  "denoising_strength": 0,      // 去噪强度/重绘幅度        TODO: 该参数需要进行实际测试验证(构建对应的测试用例进行检验)
  "hr_scale": 2,                // 高清放大倍率
  "hr_upscaler": "Latent",      // 放大算法，默认为 None
  "hr_second_pass_steps": 20,   // 采样次数
  "hr_resize_x": 0,             // 高清重绘到的宽度(默认为0, 采用hr_scale计算)
  "hr_resize_y": 0,             // 高清重绘到的高度(默认为0, 采用hr_scale计算)
  "hr_sampler_name": "Euler a", // 高清采样方法(webui界面默认没有此配置，需要在 Settings - Show all pages 中开启)
  "hr_prompt": "",              // 高清修复正向提示词(webui界面默认没有此配置，需要在 Settings - Show all pages 中开启)
  "hr_negative_prompt": "",     // 高清修复反向提示词(webui界面默认没有此配置，需要在 Settings - Show all pages 中开启)
  // 高清修复相关参数 end -------------------------------------------------------

  // 普通绘制流程相关参数 start -----------------------------------------------------------
  "prompt": "",                   // 正向提示词
  "negative_prompt": "",          // 反向提示词
  "sampler_name": "Euler a",      // 采样方法(依据源码发现该值的规则/作用和 sampler_index 相同, 同时设定时, sampler_name的优先级更高)
  "sampler_index": "Euler a",     // 采样方法
  "steps": 50,                    // 迭代步数
  "restore_faces": false,   // 面部修复
  "tiling": false,          // 平铺分块
  "width": 512,       // 高度
  "height": 512,      // 宽度
  "n_iter": 1,        // 生成批次
  "batch_size": 1,    // 每批数目
  "cfg_scale": 7,     // 提示词相关性

  // 种子相关
  // 参考: https://huke88.com/article/8093.html
  "seed": -1,                 // 随机种子
  "subseed": -1,              // 差异随机种子(主要用于两张不同的种子的画图结果融合)
  "subseed_strength": 0,      // 差异随机种子强度(大于0时才会生效)
  "seed_resize_from_h": -1,   // 差异种子范围(-1为全图)
  "seed_resize_from_w": -1,   // 差异种子范围(-1为全图)

  // 覆盖设定
  "override_settings": {
    "sd_model_checkpoint": "darkSushiMixMix_225D.safetensors [cca17b08da]",   // 基础模型配置
    "sd_vae": "animevae.pt"  // vae 配置
  },
  "override_settings_restore_afterwards": false,   // 任务完成后是否恢复设定(待验证)
  // 普通绘制流程相关参数 end -----------------------------------------------------------

  // 采样方法技术类参数 start -----------------------------------------------------
  // 备注: 
  // 1. 该参数在 webui txt2img 界面中没有设定途径，其设定在 X/Y/Z plot 或 sd-webui 的采样器设定中
  // 2. 详细作用参考: https://zhuanlan.zhihu.com/p/612572004 中的 采样方法 - eta/sigma参数 部分
  // 3. 该部分具体起到的作用时控制生成图片的 “多样性” 或 “想象力
  // 4. 一般场景下可以不对该参数做调整
  "eta": 0,             // 通过对采样器的影响，控制图片的收敛/稳定情况
  "s_min_uncond": 0,    // 当图片即将准备好时，跳过某些对负面提示的处理(该参数在 设置-Optimization 中设定)
  "s_churn": 0,         // 决定sigma noise值如何被使用(类似于权重)
  "s_tmax": 0,          // 决定最大值范围的限制
  "s_tmin": 0,          // 决定最小值范围的限制
  "s_noise": 1,         // 噪声本身的数值大小(churn>0时，噪声值本身才有意义)

  // 采样方法技术类参数 end -------------------------------------------------------

  // 未知作用参数
  "styles": [],     // 大部分场景保持为 []，按照关键字 "模板风格" 进行查找
  "do_not_save_samples": false,
  "do_not_save_grid": false,
  "script_args": [],
  "script_name": "string",
  "send_images": true,
  "save_images": false,
  "alwayson_scripts": {}
}
```
