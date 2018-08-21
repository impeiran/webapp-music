# chaser-music

> 一款基于Vue的Web音乐播放器

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## 效果预览

![](./demo.gif)

## 技术栈

* vue、vue - router、vuex、 vue - awesome - swiper、 vue - lazyload
* sass
* axios、jsonp

由于本项目是基于Vue实现的，所以当中运用了不少Vue的库和插件。

CSS层面完全由sass编写。

数据均采取qq音乐的真实数据接口，但是由于接口做了些referer和跨域的限制，所以在项目的后端做了代理的设置。获取方式采用axios提供的api进行获取，部分数据则采用jsonp的形式。

**更多运用到的模块可以自行查看[package.json](./package.json)**

## 收获与感受

* 深刻体会到模块化开发带来的好处与便利，这方面的思想还有需加强。
* 与真实数据打交道，提升了个人对后端数据处理能力。
* 尝试到很多提升用户体验的技巧与操作。例如：利用better-scroll模拟原生app滚动回弹效果。
* 了解对音乐类信息的处理，以及页面的设计与构建。
* 仍然存在许多bug，异步获取数据导致呈现的问题、手机浏览器上的适配性不够强、部分用户操作引起的非预想后果等等，后续将会进行修改。
* **感谢黄轶老师的项目教程**



