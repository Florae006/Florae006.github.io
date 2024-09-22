+++
title = '另一种为hugo渲染Mermaid绘图的方式'
date = 2024-03-10T21:29:25+08:00
draft = false
tags = [
    'Hugo','Mermaid'
]
categories = [
    '关于Hugo的一些设置'
]
+++

最近研究英文的官方文档发现了HUGO官方给渲染`Mermaid`提供了思路（!原来Hugo可以支持这种渲染），此处做笔记记录，算作是另一种方式。

上一篇指路：

官方文档指路[Diagrams | Hugo (gohugo.io)](https://gohugo.io/content-management/diagrams/)

## 新建html

我们在路径`layouts/_default/_markup/`下新建`render-codeblock-mermaid.html`，并在其中填入

```html
<pre class="mermaid">
    {{- .Inner | safeHTML }}
  </pre>
{{ .Page.Store.Set "hasMermaid" true }}
```

## 引入

在路径`layouts/_default/`下的`single.html`中加入下面部分的代码：

```html
{{ if .Store.Get "hasMermaid" }}
  <script type="module">
    import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid/dist/mermaid.esm.min.mjs';
    mermaid.initialize({ startOnLoad: true });
  </script>
{{ end }}
```

设置之后应该就可以直接使用渲染啦~（ps:之前的方法依然是有效的
