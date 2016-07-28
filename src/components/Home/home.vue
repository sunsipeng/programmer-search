<style src="./home.css" scoped></style>

<template>
  <div class="home">
    <div class="content">
      <h3 class="search-title">码农搜索</h3>
      <div class="search">
        <i class="search-type"></i>
        <ul class="search-type-list">
          <li class="type-item">
            <i class="icon-cnode"></i>
            cnode
          </li>
          <li class="type-item">
            <i class="icon-sf"></i>
            segmentfault
          </li>
        </ul>
        <input type="text" class="ipt-search" placeholder="关键字" v-model="searchVal" @keyup.enter="search"/>
        <button type="button" class="btn-search" @click="search">搜索一下</button>
      </div>
      <result
        :results="results"
        :key-words="keyWords"
        ></result>
      <pagination></pagination>
    </div>
  </div>
</template>

<script src="./home.js"></script>
