# 【划水】Canacitor构建基于Vue/React的移动端应用


最近工作需要开发一个移动端应用，考虑到我们团队前端已经有Vue/React的开发经验，所以决定使用[Canacitor](https://capacitorjs.com/)来构建。

{{< admonition abstract "Canacitor简介" false>}}

Canacitor是一个基于Vue/React的移动端应用开发框架，它提供了一套完整的开发工具和组件库，可以帮助开发者快速构建移动端应用。

{{< /admonition >}}

## 安装&创建项目

根据[官方文档](https://capacitorjs.com/docs)的指示，我选择在VSCode中使用`Ionic`插件来安装Canacitor。

根据提示，我构建了一个如下配置的应用：

![1720724734347](https://img.dodolalorc.cn/i/2024/07/12/66902d18ac540.png)

点击`Create Project`，创建项目。

项目结构像这样：

```bash
├───.vscode
├───android
├───ios
├───node_modules
├───public
├───src
│   ├───components
│   ├───router
│   ├───theme
│   └───views
└───tests
...
```

## 构建项目

除了通过网页预览项目，`capacitor`项目还可以构建为Android应用和IOS应用，在`Project`中依次`Build`、`Sync`即可。

![1720726718467](https://img.dodolalorc.cn/i/2024/07/12/6690352294158.png)

## Bugs

假如发现运行`Android`失败，同时感觉控制台输出的信息有点难懂，可以时候`Open in Android Studio`，在`Android Studio`中运行，再根据提示信息去debug（比如一些环境配置或者版本支持等导致的问题...

所以还是推荐多平台开发的时候能够同时利用各个平台的开发工具(●'◡'●)

