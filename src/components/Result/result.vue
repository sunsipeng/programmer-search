<style src="./result.css" scoped></style>

<template>
  <div class="search-result">
    <div class="search-title">
      找到约<strong>{{resultsLength}}</strong>个结果
    </div>
    <div class="search-item" v-for="item in results">
      <a class="result-title" :href="item.sourcePath" target=_blank>
        {{item.sourceTitle}}
      </a>
      <p class="result-content">
        {{item.sourceContent}}
      </p>
      <p class="result-link">
        {{item.sourcePath}}
      </p>
    </div>
  </div>
</template>

<script src="./result.js"></script>
