# programmer-search

> 码农搜索-一个程序员的内容索引网站（可抓取cnode和segmentfault社区）

## 启动步骤

``` bash
# 安装依赖
npm install

# 运行node服务
npm run server

# 运行本地的webpack服务，使用默认端口http://localhost:8080进行访问
npm run dev

```

## 运行步骤

运行项目步骤：

- 运行mongodb服务（在mongodb安装目录的bin目录里运行mongod）
- 在server目录下运行命令``npm run server``
- 在项目根目录运行命令``npm run dev``
- 访问``http://localhost:8080/#!/admin``，初次使用会显示服务器数据条数为0条
- 点击``重新开始``按钮,此时会启动node的爬虫服务，并且实时刷新抓取到的数据条数
- 等待数据抓取到默认条数后,访问``http://localhost:8080/#!/``进入搜索页面（也可以自己在server的cmd命令框下使用ctrl+c停止爬虫）
- 这时就可以在输入框进行搜索了

## 技术栈
- Vue.js
- vue-router
- vue-resource
- vuex
- webpack
- express
- mongoose
- echarts

## 项目显示效果

### 爬虫页面
可通过点击重新开始按钮来重新爬取数据
![爬虫页面](https://raw.githubusercontent.com/wendaosanshou/programmer-search/master/source/admin.png)

### 搜索页面
当数据爬取成功是，通过在搜索页面输入关键词，进行搜索
![搜索页面1](https://raw.githubusercontent.com/wendaosanshou/programmer-search/master/source/search.png)

## 声明

该项目为个人学习项目。请勿使用相关代码用于盈利或攻击他人网站。