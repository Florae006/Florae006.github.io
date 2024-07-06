# Github Action实践


## 前言

本篇记录利用github action实现自动化构建和部署的过程。

本站除了部署在github page上，还部署在本人的服务器上，懒惰的ddl直到现在才去上手实验，因此利用在github action中实现两种部署方式。

## Github Action

Github Action是Github提供的持续集成服务，可以在代码仓库中配置workflow，实现自动化构建、测试、部署等功能。

有一些术语需要了解：
* `Workflow`：一个workflow由一个或多个job组成，可以在不同的操作系统环境中运行。
* `Job`：一个job由一系列step组成，可以在同一个runner上运行。
* `Step`：一个step由一个或多个action组成，可以在同一个runner上运行。
* `Action`：一个action是一个独立的任务，可以在不同的runner上运行。

## 配置

这里我使用的是github action自带的`SSH Deploy` action，使用ssh链接远程服务器，将代码部署到服务器上。使用方法可以参考[这里](https://github.com/marketplace/actions/ssh-deploy)。

### 1. 创建SSH Key并添加到github secrets

首先需要在服务器上生成一个SSH Key，用于github action登录服务器。

```bash
ssh-keygen -m PEM -t rsa -b 4096
```

key的生成过程中会提示输入密码，可以不输入，直接回车，默认保存在`/root/.ssh`目录下（这个可能不同的服务器环境会有区别，具体的默认位置在生成`ssh-key`的时候命令行有提示。

生成的key包含一个私钥`id_rsa`和一个公钥`id_rsa.pub`，私钥保存在本地，我们需要将公钥添加到服务器的`/root/.ssh/authorized_keys`文件中。

```bash
cat ./id_rsa.pub >> /root/.ssh/authorized_keys 
```

考虑到我们并不想把私钥暴露在github公开仓库上，我们需要将私钥`id_rsa`添加到github的secrets中。

在仓库的`Settings`->`Security`->`Secrets and variables`->`Actions`中，选择`New repository secret`，添加一个`SSH_PRIVATE_KEY`，将私钥内容粘贴进去。

再新建三个secrets，分别是`REMOTE_HOST`、`REMOTE_USER`、`REMOTE_TARGET`，分别对应服务器的地址、用户名、目标路径。

### 2. 创建workflow

在代码仓库的`.github/workflows`目录下创建一个`.yml`文件，文件名可以自定义，如`deploy.yml`。

一个库可以有多个workflow，github只要发现`.github/workflows`目录下有`.yml`文件，就会自动运行workflow。

内容可以参考如下：

```yaml
name: Deploy

# 触发条件
on:
  push:
    branches: [ main ]
  workflow_dispatch: # 手动触发

jobs:
  deploy:

    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v3
    - name: Install Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '16.x'
    - name: ssh deploy
      uses: easingthemes/ssh-deploy@v5.0.3
      with:
        SSH_PRIVATE_KEY: ${{ secrets.SSH_PRIVATE_KEY }}
        ARGS: "-rlgoDzvc -i"
        SOURCE: ""
        REMOTE_HOST: ${{ secrets.REMOTE_HOST }}
        REMOTE_USER: ${{ secrets.REMOTE_USER }}
        TARGET: ${{ secrets.REMOTE_TARGET }}

```

向github仓库push代码之后，我们在`Actions`选项卡中可以看到workflow的运行情况。假如运行失败，可以点进去查看具体的错误信息，进行调试。

之后每次push到main分支或者手动触发workflow，github action就会自动运行workflow，将代码部署到服务器上。

