# programmer-search

> 码农搜索-一个程序员的内容索引网站

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

- 运行mongodb服务（可先安装mongodb后将其bin目录设置为系统环境变量，然后在cmd命令下通过mongod启动）
- 访问``http://localhost:8080/#!/admin``，初次使用会显示服务器数据条数为0条
- 点击``重新开始``按钮,此时会启动node的爬虫服务，并且实时刷新抓取到的数据条数
- 等待数据抓取到遇到条数后（默认6000条）,访问``http://localhost:8080/#!/``进入搜索页面
- 这时就可以在输入框进行搜索了

## 项目显示效果

![爬虫页面](https://raw.githubusercontent.com/wendaosanshou/programmer-search/master/static/admin.png)
![搜索页面1](https://raw.githubusercontent.com/wendaosanshou/programmer-search/master/static/search.png)
![搜索页面2](https://raw.githubusercontent.com/wendaosanshou/programmer-search/master/static/search2.png)

## 技术栈
- Vue.js
- vue-router
- vue-resource
- vuex
- webpack
- express
- mongoose
- echarts
