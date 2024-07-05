# 【网站美化】点击特效2


增加了一个鼠标追尾的效果 QwQ

添加文件的方式参考上一篇~指路[这篇](/posts/startsite/beautify_site_click/)

# `js`文件：

[pointerfollow.js](/js/_extended/pointerfollow.js)

js 原文件来源：[Canva's Magic Mouse Effect (codepen.io)](https://codepen.io/Hyperplexed/pen/OJdpEME)

（我有稍微改了一些样式 qwq，写在代码里了。

# `css`文件：

```css
.star {
  position: fixed;
  z-index: 2;
  color: white;
  font-size: 1rem;
  animation-duration: 1500ms;
  animation-fill-mode: forwards;
  pointer-events: none;
}

@keyframes fall-1 {
  0% {
    transform: translate(0px, 0px) rotateX(45deg) rotateY(30deg) rotateZ(0deg)
      scale(0.25);
    opacity: 0;
  }

  5% {
    transform: translate(10px, -10px) rotateX(45deg) rotateY(30deg) rotateZ(
        0deg
      )
      scale(1);
    opacity: 1;
  }

  100% {
    transform: translate(25px, 200px) rotateX(180deg) rotateY(270deg) rotateZ(
        90deg
      )
      scale(1);
    opacity: 0;
  }
}

@keyframes fall-2 {
  0% {
    transform: translate(0px, 0px) rotateX(-20deg) rotateY(10deg) scale(0.25);
    opacity: 0;
  }

  10% {
    transform: translate(-10px, -5px) rotateX(-20deg) rotateY(10deg) scale(1);
    opacity: 1;
  }

  100% {
    transform: translate(-10px, 160px) rotateX(-90deg) rotateY(45deg) scale(
        0.25
      );
    opacity: 0;
  }
}

@keyframes fall-3 {
  0% {
    transform: translate(0px, 0px) rotateX(0deg) rotateY(45deg) scale(0.5);
    opacity: 0;
  }

  15% {
    transform: translate(7px, 5px) rotateX(0deg) rotateY(45deg) scale(1);
    opacity: 1;
  }

  100% {
    transform: translate(20px, 120px) rotateX(-180deg) rotateY(-90deg) scale(
        0.5
      );
    opacity: 0;
  }
}
```

