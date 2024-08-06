/**
 * 常量相关
 *
 * @author wujohns
 * @date 23/09/15
 */
// 预先处理器部分(预处理器是对图片的预处理，sd1.5 和 sdxl 使用的是相同的预处理器)
const PrepocessorMap = {
  // 线条
  Canny: [
    { module: 'canny', controlnet_threshold_a: 100, controlnet_threshold_b: 200 },
    { module: 'invert (from white bg & black line)' }
  ],

  // 景深
  Depth: [
    { module: 'depth_midas' },
    { module: 'depth_zoe' },
    { module: 'depth_leres++', controlnet_threshold_a: 0, controlnet_threshold_b: 0 },
    { module: 'depth_leres', controlnet_threshold_a: 0, controlnet_threshold_b: 0 },

    // 相比于之前新增的部分
    { module: 'depth_hand_refiner' },
    { module: 'depth_anything_v2' },
    { module: 'depth_anything' },
  ],

  // 风格迁移
  // NOTICE: 之前只有 ip-adapter_clip_sd15 现在完全不同
  'IP-Adapter': [
    // { module: 'ip-adapter-auto' },      // 自动选择，但是貌似部分 GPU 无法使用
    { module: 'ip-adapter_clip_h' },
    { module: 'ip-adapter_pulid' },         // 偏向于面部风格 -- 有独特的搭配模型参考: https://github.com/huchenlei/sd-webui-controlnet-evaclip
    { module: 'ip-adapter_face_id_plus' },
    { module: 'ip-adapter_face_id' },
    { module: 'ip-adapter_clip_sdxl_plus_vith' },
    { module: 'ip-adapter_clip_g' }     // 资源消耗大
  ],

  // 遮罩重绘
  // https://www.bilibili.com/video/BV1pk4y1L7nH
  // TODO 需要确认实际方法后，再做处理，改写脚本直接进行测试
  Inpaint: [
    { module: 'inpaint_only' },
    { module: 'inpaint_only+lama' },
    { module: 'inpaint_global_harmonious' },
  ],

  // 面部信息
  'Instant-ID': [
    { module: 'instant_id_face_keypoints' },
    { module: 'instant_id_face_embedding' }
  ],

  // InstructP2P -- none

  // 线条
  Lineart: [
    { module: 'lineart_standard (from white bg & black line)' },
    { module: 'invert (from white bg & black line)' },
    { module: 'lineart_realistic' },
    { module: 'lineart_coarse' },
    { module: 'lineart_anime_denoise' },
    { module: 'lineart_anime' },
  ],

  // 直线检测(常用于建筑行业)
  MLSD: [
    { module: 'mlsd', controlnet_threshold_a: 0.1, controlnet_threshold_b: 0.1 },
    { module: 'invert (from white bg & black line)' }
  ],

  // 法线贴图(引入了3d游戏中模型制作的策略)
  // https://www.youtube.com/watch?v=eDb75HVQeOo
  NormalMap: [
    { module: 'normal_bae' },
    { module: 'normal_midas', controlnet_threshold_a: 0.4 },

    // APIBUG: 这个为新增，但是接口调用时会有问题(图片处理方式导致的参数不一致)
    // { module: 'normal_dsine', controlnet_threshold_a: 60, controlnet_threshold_b: 5 }
  ],

  // 姿态控制
  OpenPose: [
    { module: 'openpose_full' },
    { module: 'openpose_hand' },
    { module: 'openpose_faceonly' },
    { module: 'openpose_face' },
    { module: 'openpose' },
    { module: 'dw_openpose_full' },

    // 以下为新增
    { module: 'densepose_parula' },   // { module: 'densepose_parula(black bg & blue torso)' },
    { module: 'densepose' },          // { module: 'densepose(pruple bg & purple torso)' },
    { module: 'animal_openpose' }
  ],

  // 参考：https://www.bilibili.com/video/BV1wF411r7x8/
  // 重置颜色(例如老照片修复颜色/指定元素换色)
  Recolor: [
    { module: 'recolor_luminance', controlnet_threshold_a: 1 },
    { module: 'recolor_intensity', controlnet_threshold_a: 1 }
  ],

  // 风格参考
  Reference: [
    { module: 'reference_only', controlnet_threshold_a: 0.5 },
    { module: 'reference_adain+attn', controlnet_threshold_a: 0.5 },
    { module: 'reference_adain', controlnet_threshold_a: 0.5 },
  ],

  // 用图片作为提示词
  Revision: [
    { module: 'revision_clipvision', controlnet_threshold_a: 0 },
    { module: 'revision_ignore_prompt', controlnet_threshold_a: 0 }
  ],

  // 涂鸦
  Scribble: [
    { module: 'scribble_pidinet' },
    { module: 'invert (from white bg & black line)' },
    { module: 'scribble_xdog', controlnet_threshold_a: 32 },
    { module: 'scribble_hed' }
  ],

  // 语义分割(分割为色块，然后按照色块绘制)
  Segmentation: [
    { module: 'seg_ofade20k' },
    { module: 'seg_ufade20k' },
    { module: 'seg_ofcoco' },

    // 以下是新增
    { module: 'seg_anime_face' },
    // { module: 'mobile_sam' },  // NOTICE: 该预处理器有问题，这里不进行使用
  ],

  // 扭曲后作为重绘参考
  Shuffle: [
    { module: 'shuffle' }
  ],

  // 边缘检测(更粗的线条)
  SoftEdge: [
    { module: 'softedge_pidinet' },
    { module: 'softedge_pidisafe' },
    { module: 'softedge_hedsafe' },
    { module: 'softedge_hed' },

    // 以下是新增
    // APIBUG 接口层未适配(图片处理方式导致的参数不一致)
    // { module: 'softedge_teed', controlnet_threshold_a: 2 },
    // { module: 'softedge_anyline', controlnet_threshold_a: 2 }
  ],

  // 主要服务于 animatediff 流程，用于视频工作流
  SparseCtrl: [
    { module: 'scribble_pidinet' },
    { module: 'scribble_xdog', controlnet_threshold_a: 32 },
    { module: 'scribble_hed' }
  ],

  // 颜色/涂鸦/样式 迁移(色块模式)
  // 参考: https://huggingface.co/TencentARC/T2I-Adapter/tree/main/models
  // 推荐策略: 由于项目活跃度低，且较多特性与 controlnet 作者重复，且与webui融合较差，这里建议舍弃该部分
  // 'T2I-Adapter': [
  //   { module: 't2ia_style_clipvision' },
  //   { module: 't2ia_sketch_pidi' },
  //   { module: 't2ia_color_grid' }
  // ]

  // 提升细节
  Tile: [
    { module: 'tile_resample', controlnet_threshold_a: 1 },
    { module: 'tile_colorfix+sharp', controlnet_threshold_a: 8, controlnet_threshold_b: 1 },
    { module: 'tile_colorfix', controlnet_threshold_a: 8 },
    { module: 'blur_gaussian', controlnet_threshold_a: 9 }
  ]
}

exports.Consts = {
  // 采样方法列表
  // 在 webui 1.9.4 中 txt2img 和 img2img 使用相同的采样方法
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
    'Latent',
    'Latent (antialiased)',
    'Latent (bicubic)',
    'Latent (bicubic antialiased)',
    'Latent (nearest)',
    'Latent (nearest-exact)',
    'Lanczos',
    'Nearest',

    // 需要手动下载的模型
    'DAT x2',
    'DAT x3',
    'DAT x4',

    'ESRGAN_4x',
    'LDSR',
    'R-ESRGAN 4x+',
    'R-ESRGAN 4x+ Anime6B',

    'ScuNET',
    'ScuNET PSNR',
    'SwinIR_4x'
  ],

  // sd controlnet 预处理器信息
  PrepocessorMap,

  // sd 1.5 的 controlnet 列表
  SD15ControlNetList: [
    // 线条
    {
      name: 'Canny',
      model: 'control_v11p_sd15_canny',
      prepocessorList: PrepocessorMap['Canny']
    },
  ],

  // sdxl 的 controlnet 列表
  SDXLControlNetList: [
    // 线条
    {
      name: 'Canny',
      model: 'bdsqlsz_controlllite_xl_canny',
      prepocessorList: PrepocessorMap['Canny']
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
