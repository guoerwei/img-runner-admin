# 说明

本项目为 [https://github.com/guoerwei/img-runner](https://github.com/guoerwei/img-runner) 项目的前端部分，使用的是 typescript + react 来开发，仅为试验用，功能很不完善。

# 修改前端代码，构建完发到后端

如果需要修改前端资源发布地址，可以修改 `tool/build-helper.js` ，将 publicPath 里的地址改成实际需要的publicPath，目前为 `/static/`，构建后放到后端项目的`static/`目录中。

执行 `yarn` 或 `npm install` 来安装项目代码

执行 `npm run build` 会把代码构建至 `dist/` 目录中

复制 `js/`和`css/`目录至后端项目的 `static/` 目录中覆盖

重新启动后端，可以直接

```bash
docker-compose stop
docker-compose rm
```

后，重新

```bash
docker-compose up -d
```
