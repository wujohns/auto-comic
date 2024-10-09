# 接口鉴权
sd-webui 在 api 接口调用特性上支持 http basic auth，在启动参数时加上以下参数即可启用该特性:  
```bash
# 设置API身份验证，如 "username:password"；或逗号分隔多个，如 "u1:p1,u2:p2,u3:p3"
--api-auth username:password

# 例如
python launch.py --listen --api --api-auth=kk:mm
```

同时
1. `nodejs` 的 `axios` 也是支持该特性的  
1. 例如在上述案例中在请求配置中加上 `auth: { kk: 'mm' }` 即可  
1. 其中 http basic auth 的实现原理是在请求 header 中的 Authorization 字段上添加了指定的内容，详细参考 [HTTP Authorization 之 Basic Auth](https://www.jianshu.com/p/4cd42f7359f4)   
1. 故此对于缺乏支持该特性的语言，可以手动实现该机制  

## 调用案例参考
[sd-api-test/plus.auth.js](sd-api-test/plus.auth.js)  

## 参考文档
[sd-webui官方参数汇总(原版)](https://github.com/AUTOMATIC1111/stable-diffusion-webui/wiki/Command-Line-Arguments-and-Settings)  
[sd-webui官方参数汇总(翻译)](https://www.lategege.com/?p=963)  
[MDN http auth说明文档](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Authentication)  
[HTTP Authorization 之 Basic Auth](https://www.jianshu.com/p/4cd42f7359f4)  
