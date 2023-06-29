# 自动漫画视频生成器
## 概述
使用 AI 技术完成可以在有固定剧本的情况下实现配音漫画的自动生成

## 案例参考
较好的成品案例: https://www.bilibili.com/video/BV1tc411u7ew  
业内的相关尝试：https://www.bilibili.com/video/BV1WL411i7mF  

备注：https://space.bilibili.com/3493106383063541/channel/collectiondetail?sid=1353270 这个合集都是可以作为不错的参考  

## 相关结构图
![imgs/struct.png](/imgs/struct.png)

## 开发工作
1. 视频拼接自动化 -- wujohns  
1. prompt 开发 -- yapril
1. prompt 链路组装  -- wujohns

## prompt 编写规范
这里采用表现稳定且工程性较好的 `分区模板` 策略，具体可以参考 [docs/prompt.md](/docs/prompt.md) 中的内容  
