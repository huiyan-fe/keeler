这是一个react+sass+gulp的简单demo

### 安装

```
npm install 
```

or

```
yarn
```

### 快速启动开发模式

```
npm run dev
```

or

```
yarn dev
```

### 快速启动产品模式（压缩，production模式打包）

```
npm run build
```

or 

```
yarn build
```


### 独立的任务

#### 1.开启开发模式下的webpack

```
npm run dev:webpack
```

or

```
yarn dev:webpack
```

#### 2.开启开发模式下的自动刷新的Webpack

```
npm run dev:webpackServer
```

or

```
yarn dev:webpackServer
```


#### 3.开启开发模式下的gulp

```
npm run dev:gulp
```

or

```
yarn dev:gulp
```






"dev:webpack": "webpack -w --config webpack.config.js",
        "dev:webpackServer": "webpack-dev-server --config webpack.config.js --open",
        "dev:gulp": "NODE_ENV=development gulp",
        "dev": "npm run dev:gulp & npm run dev:webpackServer",
        "build:gulp": "gulp",
        "build:webpack": "webpack -p",
        "build": "npm run build:webpack && npm run build:gulp"