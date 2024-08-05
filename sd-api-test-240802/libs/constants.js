/**
 * 常量相关
 *
 * @author wujohns
 * @date 23/09/15
 */
exports.Consts = {
  // 采样方法列表
  // 在 webui 1.9.4 中 txt2img 和 img2img 使用相同的采样
  SamplerList: [
    'DPM++ 2M',
    'DPM++ SDE',
    'DPM++ 2M SDE',
    'DPM++ 2M SDE Heun',
    'DPM++ 2S a',
    'DPM++ 3M SDE',

    'Euler a',
    'Euler',
    'LMS',
    'Heun',

    'DPM2',
    'DPM2 a',
    'DPM fast',
    'DPM adaptive',

    'Restart',
    'DDIM',
    'PLMS',
    'UniPC',
    'LCM'
  ],

  // 高清放大方法列表
  HrUpscalerList: [
    // 不需要手动下载
    // 'Latent',
    // 'Latent (antialiased)',
    // 'Latent (bicubic)',
    // 'Latent (bicubic antialiased)',
    // 'Latent (nearest)',
    // 'Latent (nearest-exact)',
    // 'Lanczos',
    // 'Nearest',

    // 需要手动下载的模型
    // 'DAT x2',
    // 'DAT x3',
    // 'DAT x4',

    // 'ESRGAN_4x',
    // 'LDSR',
    // 'R-ESRGAN 4x+',
    // 'R-ESRGAN 4x+ Anime6B',

    // TODO 需要额外测试
    // 以下三个可能和之前的有所区别，同时依赖的模型也是需要手动下载的
    // 'ScuNET',
    // 'ScuNET PSNR',
    // 'SwinIR_4x'
  ],

  // controlnet 列表
  ControlNetList: [
    // 线条
    {
      name: 'Canny',
      model: 'control_v11p_sd15_canny',
      prepocessorList: [
        { module: 'canny', controlnet_threshold_a: 100, controlnet_threshold_b: 200 },
        { module: 'invert (from white bg & black line)' }
      ]
    },

    // 景深
    {
      name: 'Depth',
      model: 'control_v11f1p_sd15_depth',
      prepocessorList: [
        { module: 'depth_leres', controlnet_threshold_a: 0, controlnet_threshold_b: 0 },
        { module: 'depth_leres++', controlnet_threshold_a: 0, controlnet_threshold_b: 0 },
        { module: 'depth_midas' },
        { module: 'depth_zoe' }
      ]
    },

    // 法线贴图(引入了3d游戏中模型制作的策略)
    // https://www.youtube.com/watch?v=eDb75HVQeOo
    {
      name: 'NormalMap',
      model: 'control_v11p_sd15_normalbae',
      prepocessorList: [
        { module: 'normal_bae' },
        { module: 'normal_midas', controlnet_threshold_a: 0.4 }
      ]
    },

    // 姿态控制
    {
      name: 'OpenPose',
      model: 'control_v11p_sd15_openpose',
      prepocessorList: [
        { module: 'dw_openpose_full' },
        { module: 'openpose' },
        { module: 'openpose_face' },
        { module: 'openpose_faceonly' },
        { module: 'openpose_full' },
        { module: 'openpose_hand' }
      ]
    },

    // 直线检测(常用于建筑行业)
    {
      name: 'MLSD',
      model: 'control_v11p_sd15_mlsd',
      prepocessorList: [
        { module: 'mlsd', controlnet_threshold_a: 0.1, controlnet_threshold_b: 0.1 },
        { module: 'invert (from white bg & black line)' }
      ]
    },

    // 线条
    {
      name: 'Lineart',
      modelList: [
        'control_v11p_sd15_lineart',
        'control_v11p_sd15s2_lineart_anime'
      ],
      prepocessorList: [
        { module: 'lineart_anime' },
        { module: 'lineart_anime_denoise' },
        { module: 'lineart_coarse' },
        { module: 'lineart_realistic' },
        { module: 'lineart_standard (from white bg & black line)' },
        { module: 'invert (from white bg & black line)' }
      ]
    },

    // 边缘检测(更粗的线条)
    {
      name: 'SoftEdge',
      model: 'control_v11p_sd15_softedge',
      prepocessorList: [
        { module: 'softedge_hed' },
        { module: 'softedge_hedsafe' },
        { module: 'softedge_pidinet' },
        { module: 'softedge_pidisafe' }
      ]
    },

    // 涂鸦
    {
      name: 'Scribble',
      model: 'control_v11p_sd15_scribble',
      prepocessorList: [
        { module: 'scribble_hed' },
        { module: 'scribble_pidinet' },
        { module: 'scribble_xdog', controlnet_threshold_a: 32 },
        { module: 't2ia_sketch_pidi' },
        { module: 'invert (from white bg & black line)' }
      ]
    },

    // 语义分割(分割为色块，然后按照色块绘制)
    {
      name: 'Segmentation',
      model: 'control_v11p_sd15_seg',
      prepocessorList: [
        { module: 'seg_ofade20k' },
        { module: 'seg_ofcoco' },
        { module: 'seg_ufade20k' }
      ]
    },

    // 扭曲后作为重绘参考
    {
      name: 'Shuffle',
      model: 'control_v11e_sd15_shuffle',
      prepocessorList: [{ module: 'shuffle' }]
    },

    // 提升细节
    {
      name: 'Tile',
      model: 'control_v11f1e_sd15_tile',
      prepocessorList: [
        { module: 'blur_gaussian', controlnet_threshold_a: 9 },
        { module: 'tile_colorfix', controlnet_threshold_a: 8 },
        { module: 'tile_colorfix+sharp', controlnet_threshold_a: 8, controlnet_threshold_b: 1 },
        { module: 'tile_resample', controlnet_threshold_a: 1 }
      ]
    },

    // 遮罩重绘
    // https://www.bilibili.com/video/BV1pk4y1L7nH
    {
      name: 'Inpaint',
      model: 'control_v11p_sd15_inpaint',
      prepocessorList: [
        { module: 'inpaint_global_harmonious' },
        { module: 'inpaint_only' },
        { module: 'inpaint_only+lama' }   // NOTICE: 该部分会触发一个 error, 但不影响结果的生成
      ]
    },

    // 通过描绘修改图片
    {
      name: 'InstructP2P',
      model: 'control_v11e_sd15_ip2p'
    },

    // 风格参考
    {
      name: 'Reference',
      prepocessorList: [
        { module: 'reference_adain', controlnet_threshold_a: 0.5 },
        { module: 'reference_adain+attn', controlnet_threshold_a: 0.5 },
        { module: 'reference_only', controlnet_threshold_a: 0.5 }
      ]
    },

    // 参考：https://www.bilibili.com/video/BV1wF411r7x8/
    // 重置颜色(例如老照片修复颜色/指定元素换色)
    {
      name: 'Recolor',
      model: 'ioclab_sd15_recolor',
      prepocessorList: [
        { module: 'recolor_intensity', controlnet_threshold_a: 1 },
        { module: 'recolor_luminance', controlnet_threshold_a: 1 }
      ]
    },

    // 用图片作为提示词
    // 备注: 该部分执行很耗资源(消耗时间长)
    {
      name: 'Revision',
      prepocessorList: [
        { module: 'revision_clipvision', controlnet_threshold_a: 0 },
        { module: 'revision_ignore_prompt', controlnet_threshold_a: 0 }
      ]
    },

    // 颜色/涂鸦/样式 迁移(色块模式)
    // 参考: https://huggingface.co/TencentARC/T2I-Adapter/tree/main/models
    // 推荐策略: 由于项目活跃度低，且较多特性与 controlnet 作者重复，且与webui融合较差，这里建议舍弃该部分
    // {
    //   name: 'T2I-Adapter',
    //   // TODO 需要补充 model
    //   prepocessorList: [
    //     't2ia_color_grid', 't2ia_sketch_pidi', 't2ia_style_clipvision'
    //   ]
    // },

    // 风格迁移
    {
      name: 'IP-Adapter',
      model: 'ip-adapter_sd15_plus',
      prepocessorList: [
        { module: 'ip-adapter_clip_sd15' }
      ]
    }
  ],

  // 极端测试相关内容
  MaxConfig: {
    prompt:
      'masterpiece,best quality,ancient China, ' +
      'fortress, majestic, grand, traditional architecture, ' +
      'red lanterns, intricate patterns, detailed wood carvings, ' +
      'tiled roof, stone walls, watchtowers, gate, pagoda, flag, ' +
      'mountains in the background, mist, sunset, warm colors, ' +
      'dramatic lighting, reflection in water, cherry blossom trees, ' +
      'flying birds, traditional costumes, palace guards, dragons, ' +
      'mythical creatures, calligraphy, silk banners, incense',

    loraList: [
      '【朋友圈神器】试衣间自拍',
      '东方镜 from 《王者荣耀》',
      '人物-科幻铠甲',
      '国风水彩角色-v2',
      '姬小满 王者荣耀'
    ],

    controlnetList: [
      {
        module: 'canny',
        model: 'control_v11p_sd15_canny',
        threshold_a: 100, threshold_b: 200
      },
      {
        module: 'depth_leres++',
        model: 'control_v11f1p_sd15_depth',
        threshold_a: 0, threshold_b: 0
      },
      {
        module: 'openpose',
        model: 'control_v11p_sd15_openpose'
      },
      {
        module: 'reference_only'
      },
      {
        module: 'ip-adapter_clip_sd15',
        model: 'ip-adapter_sd15_plus'
      }
    ]
  }
}
