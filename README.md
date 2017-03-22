# keel
[构建中,谨慎使用]  keel 是基于react.js的脚手架，可以一键生成react项目的环境。

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

# 构建

可以通过keel -b 进行构建项目，keel会扫描目录下的所有 `*.entry.jsx` 文件，自动制作编译配置文件(`.keel/entry.js`)，

```bash
keel -b
```

如果想编译指定的项目 可以使用 `keel -b Name` 这样keel只会编译 Name文件夹下的 `*.entry.jsx` 以及 `Name.entry.jsx`

如下配置会编译 test和abc
```bash
keel -b test,abc
```

执行 `keel -b online` 会进行上线的前的编译（压缩、合并、hash）等，并将产出的文件放置到`online`目录中

```bash
keel -b online
```

## [TODO] 计划的接口如下：

新增一个项目页面，同时会建立项目的index.html , pagename.jsx , pagename.scss 文件

```javascript
keel addpage [pagename]
```

支持其他类库的编译（vue等）

```javascript
keel -ls
```


