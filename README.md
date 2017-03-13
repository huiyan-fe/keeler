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
│   ├── static
│   ├── DEMO            // DEMO 
│   └── [PageName]      // PageName(用户自定义)
└── src
    ├── app                 // 项目程序入口(jsx)
    │   ├── DEMO
    │   └── [PageName]
    ├── page                // 项目页面入口
    │   ├── DEMO            
    │   └── [PageName]      
    └── static              // 项目静态资源入口
        ├── js              // 项目的js目录
        │   ├── DEMO
        │   └── [PageName]  
        ├── sass            // 项目的sass目录
        │   ├── DEMO
        │   └── [PageName]  
        └── img             // 项目的图片目录
            ├── DEMO
            └── [PageName]  
```

## [TODO] 计划的接口如下：

```javascript
keel addpage [pagename]
```

```javascript
keel -b
```

```javascript
keel -b online
```

```javascript
keel -b -p page
```

```javascript
keel -ls
```


