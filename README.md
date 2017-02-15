# keel
[构建中,请勿使用]  keel 是基于react.js的脚手架，可以一键生成react项目的环境。

# 安装

你可以通过以下命令安装keel

```javascript
npm install do-keel -g
```

# 初始化项目

执行如下命令：

```javascript
keel init 
```

系统会在当前目录下新建如下结构的文件目录：

```
.
├── dist
│   ├── app
│   └── static
└── src
    ├── app // 项目程序入口
    ├── page  // 项目页面入口
    └── static  // 项目静态资源入口
        ├── js // 项目的js目录
        ├── css // 项目的js目录
        └── img // 项目的图片目录
```

## [TODO] 计划的接口如下：

```javascript
keel addpage [pagename]
```

```javascript
keel build
```

```javascript
keel build:online
```
