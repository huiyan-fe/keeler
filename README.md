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

初始化之后，你需要通过 npm install 安装所需的依赖，然后可以通过以下命令进行开发

```bash
npm run dev
```

或

```bash
npm run build
```

### 2.1.1 npm run dev

该命令用于开发阶段，其会自动启动编译程序，对页面进行编译（在进行编译之前，keeler会通过 keeler -b 去生成入口文件配置, 详见 `keeler -b` 的说明）。

同时该命令会自动创建webserver，并在浏览器中打开。该页面会自动监听文件的修改，并随之自动刷新。

如果需要编辑指定的模块可以通过PAGE参数指定

如：

```
PAGE=demo,pagea npm run dev
```

或

```
PAGE=demo,pagea yarn dev
```

### 2.1.2 npm run build

该命令用于生产环境，会自动完成编译压缩等事物。

### 2.1.3 keeler -b

开发过程中，使用者不需要手动配置webpack的入口，keeler会自动去寻找雷士 `*.entry.jsx`以及 `*.entry.scss` 的文件，并自动生成配置文件。该过程通过 `keeler -b` 执行，默认已经写入到了`npm run build`，`npm run dev`中，默认情况下用户可以不用去关心这个步骤。

keeler -b 命令执行时keeler会扫描目录下的所有 `*.entry.jsx`以及 `*.entry.scss` 文件，自动制作编译配置文件(`keel.entry.webpack.config.json`)，这个文件会被webpack所引用。


### 2.1.4 keeler add NAME

添加一个名为NAME的页面

该命令执行完成之后，会自动的在项目的目录中新建

```
src/app/NAME/NAME.entry.jsx
src/app/page/NAME/NAME.html
src/app/page/static/scss/NAME/NAME.scss
```

并自动处理好依赖关系（HTML文件会自动引入js和css）