# 一个Vue项目的基础模板||PC端+移动端适配


## 创建项目

```bash
npm create vite@latest dodola -- --template vue-ts
cd dodola
npm install
npm run dev
```

转到根目录下后

### 规范目录

```bash
├── dist/
└── src/
    ├── api
    │   └── ... // 抽取出API请求
    ├── assets/                    // 静态资源目录
    ├── common/                    // 通用类库目录
    ├── components/                // 公共组件目录
    ├── routers/                   // 路由配置目录
    ├── store/                     // pinia 状态管理目录
        ├── index.ts               // 导出 store 的地方
        ├── home.ts                // 模块
        └── user.ts                // 模块
    ├── style/                     // 通用 CSS 目录
    ├── utils/                     // 工具函数目录
    ├── views/                     // 页面组件目录
    ├── App.vue
    ├── main.ts
    ├── vite-env.d.ts
├── index.html
├── tsconfig.json                  // TypeScript 配置文件
├── vite.config.ts                 // Vite 配置文件
└── package.json
```



## path模板+代理

在`vite.config.ts`中，设置`@`指向`src`、服务器启动端口、打包路径、代理等等设置

先进行path模板的安装：

```bash
npm i @types/node -D
```

如果需要使用代理的话，可以先下载：

```bash
npm i @vitejs/plugin-basic-ssl -D
```

或者这个：

```bash
npm i vite-plugin-mkcert -D
```

这两个二选一即可

## 集成工具

### Vue Router 4.x

```bash
npm i vue-router@4
```

### 集成状态管理工具Pinia

```bash
npm i pinia
```

## Axios

```bash
npm i axios
```

### CSS预编译器 Stylus/Sass/Less

使用CSS预编译器Stylus

安装(按序选择就好)

```bash
npm i stylus -D
# or
npm i sass -D
npm i less -D
```

## 自动引入插件

通过插件 [unplugin-vue-components](https://github.com/antfu/unplugin-vue-components) 和 [unplugin-auto-import](https://github.com/antfu/unplugin-auto-import) 实现组件自动按需导入（推荐！）

```bash
npm i @varlet/import-resolver unplugin-vue-components unplugin-auto-import -D
```

## 移动端适配

### postcss 插件

```bash
npm i postcss-px-to-viewport -D
```

`postcss.config.ts`

```ts
module.exports = {
  plugins: {
    'postcss-px-to-viewport': {
      viewportWidth: 375,
      unitPrecision: 6,
      unitToConvert: 'px',
      viewportUnit: 'vmin',
      fontViewportUnit: 'vmin',
      propList: ['*'],
    }
  }
}
```

组件库设计基于 `375px` 宽度设计稿，推荐使用 postcss 插件将 `px` 单位转换成 `vmin` 单位从而实现移动端适配。 在 `webpack/vite` 项目根路径下创建 `postcss.config.js` 并做如下配置之后 `375px -> 100vmin`。

## 桌面端适配

```bash
npm i @varlet/touch-emulator
```

## 组件库

### Element Plus

```bash
npm install element-plus --save
```

### varlet

```bash
npm i @varlet/ui -S
```

VsCode 插件市场搜索： [varlet-vscode-extension](https://marketplace.visualstudio.com/items?itemName=haoziqaq.varlet-vscode-extension)。

### Arco.design

```bash
npm install --save-dev @arco-design/web-vue
```

### Naive UI

```bash
npm i -D naive-ui
```



## 配置文件示例

#### tsconfig.json

```json
{
  "compilerOptions": {
    
    "paths":{
      "@/*": ["./src/*"]
    },

    "target": "ES2020",
    "useDefineForClassFields": true,
    "module": "ESNext",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "preserve",

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": [
    "src/**/*.ts", 
    "src/**/*.tsx", 
    "src/**/*.vue",
    
    "auto-imports.d.ts",
    "components.d.ts"
],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```



#### tsconfig.node.json

```json
{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true,
    "strict": true
  },
  "include": ["vite.config.ts"]
}

```



#### vite.config.ts

```ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from "path"

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite';

import { ArcoResolver, NaiveUiResolver } from 'unplugin-vue-components/resolvers';
import { VarletImportResolver } from '@varlet/import-resolver'

import basicSSL from '@vitejs/plugin-basic-ssl'

// https://vitejs.dev/config/
export default defineConfig({
  define: { // 定义全局变量替换方式
    'process.env': process.env,
    'process.env.NODE_ENV': '"development"',
    __APP_VERSION__: JSON.stringify(require('./package.json').version),
    __API_URL__: 'window.__backend_api_url',
  },
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ArcoResolver()],
    }),
    Components({
      resolvers: [
        ArcoResolver({
          importStyle: 'less',
          sideEffect: true,
        }),
        NaiveUiResolver(),
        VarletImportResolver(),
      ],
    }),
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),	// 设置'@'指向'src'
    },
  },
  root: './',	// index.html所在的位置，即根目录
  base: './',	// 设置打包路径，用于嵌入式开发
  mode: process.env.NODE_ENV,	// 设置模式，'development' 用于开发，'production' 用于构建(见define中的process.env.NODE_ENV)

  publicDir: 'public',	// 设置静态资源目录
  cacheDir: 'node_modules/.vite',	// 设置缓存目录
  envDir: './',	// 设置环境变量目录

  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          // 'primary-color': '#1890ff',
          // 'link-color': '#1890ff',
          // 'border-radius-base': '2px',
        },
        javascriptEnabled: true,
        math: 'parens-division',
      },
    },
  },

  server: {
    host: 'localhost',	// 设置服务器启动地址，默认为'localhost
    
    port: 5173,	// 设置服务器启动端号,如果端口已经被使用，Vite 会自动尝试下一个可用的端口，所以这可能不是开发服务器最终监听的实际端口。
    strictPort: false,	// 设置是否严格检查端口号
    
    open: false,	// 设置服务启动时是否自动打开浏览器
    cors: true,	// 允许跨域
    // proxy: {
    //   // 带选项写法：http://localhost:5173/api/bar -> http://jsonplaceholder.typicode.com/bar
    //   '/api': {
    //     target: 'http://jsonplaceholder.typicode.com',
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/api/, ''),
    //   },
    //   // 代理 websockets 或 socket.io 写法：ws://localhost:5173/socket.io -> ws://localhost:5174/socket.io
    //   '/socket.io': {
    //     target: 'ws://localhost:5174',
    //     ws: true,
    //   },
    // },
  },
})
```



#### postcss.config.ts

```ts
module.exports = {
  plugins: {
    'postcss-px-to-viewport': {
      viewportWidth: 375,
      unitPrecision: 6,
      unitToConvert: 'px',
      viewportUnit: 'vmin',
      fontViewportUnit: 'vmin',
      propList: ['*'],
    }
  }
}
```

#### package.json

```json
{
  "name": "aixinmarket-frontend-2024",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vue-tsc && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "@varlet/import-resolver": "^3.0.7",
    "@varlet/touch-emulator": "^3.0.7",
    "@varlet/ui": "^3.0.7",
    "axios": "^1.6.7",
    "element-plus": "^2.6.1",
    "pinia": "^2.1.7",
    "vue": "^3.4.19",
    "vue-router": "^4.3.0"
  },
  "devDependencies": {
    "@arco-design/web-vue": "^2.54.6",
    "@types/node": "^20.11.25",
    "@vitejs/plugin-basic-ssl": "^1.1.0",
    "@vitejs/plugin-vue": "^5.0.4",
    "less": "^4.2.0",
    "naive-ui": "^2.38.1",
    "postcss-px-to-viewport": "^1.1.1",
    "stylus": "^0.63.0",
    "typescript": "^5.2.2",
    "unplugin-auto-import": "^0.17.5",
    "unplugin-vue-components": "^0.26.0",
    "vite": "^5.1.4",
    "vite-plugin-mkcert": "^1.17.4",
    "vue-tsc": "^1.8.27"
  }
}
```

#### vite-env.d.ts

```ts
/// <reference types="vite/client" />
// 类型声明
declare const __APP_VERSION__: string
```



#### main.ts

```ts
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';

import './style.css';
import router from './routers';

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const pinia = createPinia()

createApp(App)
  .use(pinia)
  .use(router)
  .use(pinia)
  .use(ElementPlus)
  .mount('#app');

```

