# Vue3封装一个SVG组件


# `Vue3+Vite+Svg`

以前使用`Svg`的时候会图简单直接将内容巨长的`Svg`代码粘贴在项目中，结果导致需要用`Svg`图标的部分代码巨长，今天写项目又需要使用`Svg`了，于是想着对其进行封装。

## 插件安装

使用`vite-plugin-svg-icons`插件。

安装：

```bash
npm i vite-plugin-svg-icons -D
```

在`src/assets/`下新建`icon`文件夹，这个文件夹下存放我们以后要用的`.svg`文件。

### 配置`vite.config.ts`

```ts
import {createSvgIconsPlugin} from 'vite-plugin-svg-icons';

export default defineConfig({
    //...
    plugins:[
        //...
        createSvgIconsPlugin({
            iconDirs:[
                  // 自己的svg存放目录
                path.resolve(process.cwd(),'src/assets/icon'),
            ],
            symbolId:'icon-[name]',  // 设置symbol的id
        })
    ]
})
```

### 在`main.ts`中加入：

```bash
import 'virtual:svg-icons-register';
```

### 封装`SvgIcon`组件

在`src/components/`新建`SvgIcon`文件夹，在其中新建`index.vue`，内容：

```vue
<script lang="ts" setup>
const props = defineProps({
  name: {
    type: String,
    required: true
  },
  color: {
    type: String,
    default: '#ccc'
  },
  width: {
    type: String,
    default: '1em'
  },
  height: {
    type: String,
    default: '1em'
  },
});

const symbleId = `#icon-${props.name}`;
</script>

<template>
  <svg aria-hidden="true" class="svg-icon" :width="width" :height="height">
    <use :xlink:href="symbleId" :fill="color" />
  </svg>
</template>

<style scoped>
</style>
```

之后就能在页面使用`svg`啦。

```vue
<template>
  <SvgIcon name="dashboard" color="red" width="50px" height="50px"/>
</template>
```
















