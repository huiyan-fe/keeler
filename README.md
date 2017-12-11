# keeler

keeler 是一款脚手架程序，可以一键生成react项目的环境。

# 安装

你可以通过以下命令安装keeler

```javascript
npm install keeler -g
```

# 初始化项目

执行如下命令：

## 1. 进入项目目录，执行

```javascript
keeler -i
```

系统会在当前目录创建如下结构文件：

```
├── gulpfile.js                     // gulp的配置文件
├── webpack.config.js               // webpack的配置文件
├── src                             // 项目文件
│   ├── app                         // 项目程序目录(JSX)
│   │   └── demo
│   │       └── demo.entry.jsx
│   ├── page                        // 项目html入口文件
│   │   └── demo
│   │       └── demo.html
│   └── static                      // 项目静态资源
│       └── scss
│           └── demo
│               └── demo.entry.scss
└── package.json

```

## 2.开发

可以通过以下命令经常开发

```bash
npm run dev
```

该命令会自动启动编译程序，对页面进行编辑，在进行编译之钱，keeler会通过 keeler -b 去生成入口文件配置。详见 `keeler -b` 的说明。

### 2.1 keeler -b

开发过程中，使用者不需要手动配置webpack的入口，keeler会自动去寻找雷士 `*.entry.jsx`以及 `*.entry.scss` 的文件，并自动生成配置文件。该过程通过 `keeler -b` 执行，默认已经写入到了`npm run build`，`npm run dev`中，默认情况下用户可以不用去关心这个步骤。

keeler -b 命令执行时keeler会扫描目录下的所有 `*.entry.jsx`以及 `*.entry.scss` 文件，自动制作编译配置文件(`keel.entry.webpack.config.json`)，这个文件会被webpack所引用。



## [TODO] 计划的接口如下：

```
keeler -add Name // 创建一个新的页面
```

