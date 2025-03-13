# 为twikoo添加图片功能



> 一篇私有配置图床，给twikoo评论插件添加图片功能的文章。

## 背景

背景：最近回想起来本站的twikoo评论尚未配置过图床，所以此前评论区不能上传图片，这篇就记录一下twikoo官方推荐的lsky-pro私有部署图床。

选用的图床是兰空图床👉[lsky-org/lsky-pro: ☁️兰空图床(Lsky Pro) - Your photo album on the cloud. (github.com)](https://github.com/lsky-org/lsky-pro)

文档：[Lsky Pro](https://docs.lsky.pro/)

服务器环境：

* 宝塔面板 8.0.6
* PHP 8.0.26
* MySQL 5.7.43
* Nginx 1.22.1

要注意版本哦(

## 添加站点

进入宝塔后，在左侧`网站`导航页内点击`添加站点`，新建一个网站，配置如图：

![添加站点](https://cdn.jsdelivr.net/gh/Florae006/dodolaPicBed/image-20240529160531123.png)

## 配置站点

在[Releases · lsky-org/lsky-pro (github.com)](https://github.com/lsky-org/lsky-pro/releases)选择`Assets`中的第一个`.zip`下载下来。定位到上述创建的站点的根目录(`/www/wwwroot/img.dodolalorc.cn`)下，将解压后的文件放在该目录下。

将程序所在目录的所有文件夹、子文件夹、文件的权限，用户组和所有者改为 `www`，权限改为 `0755`

回到网站导航页，点击刚刚创建的站点，进行如下修改：

* 网站目录下，将网站目录中的路径后添加`/public`，并保存

* Nginx需要设置伪静态，点击伪静态，添加如下代码并保存：

  ```bash
  location / {
    try_files $uri $uri/ /index.php?$query_string;
  }
  ```

* 在SSL中，申请`Let's Encrypt`证书，申请成功并安装保存之后，在证书页开启强制`HTTPS`

## PHP扩展+禁用函数

根据文档所提示的安装要求，我们需要添加两个扩展：`Fileinfo PHP 扩展`和`Imagick 拓展`。

在宝塔软件商店内搜索使用的PHP，点击管理，在安装扩展中选择下载fileinfo和imagemagick扩展。

在禁用函数页面，删除exec、shell_exec、readlink、symlink、putenv、getenv、chmod、chown、fileperms 函数。

若由于可用内存小于1G，没有安装上fileinfo，可以在软件商店搜索找到Linux工具箱，在工具箱中的`Swap/虚拟内存`中添加Swap，设置为1024MB并确定，重试即可。

## 安装程序

在完成上述内容后，访问站点，显示符合要求之后，点击下一步，填写配置后进行安装。

## 获取token

在站点的仪表盘页，点击接口，复制接口URL。

在这个网站[Getman.cn](https://getman.cn/)，按照这个格式填写：

```json
{
"email": "管理员邮箱",
"password":"管理员密码"
}
```

![1717328841131](https://cdn.jsdelivr.net/gh/Florae006/dodolaPicBed/1717328841131.png)

## 配置Twikoo

获取到token后，在twikoo管理页，`IMAGE_CDN` 配置图床首页 URL 地址（注意不要加尾随斜杠），`IMAGE_CDN_TOKEN`填入刚刚获取的token。

保存后，即可上传图片。

