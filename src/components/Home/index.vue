<style src="./index.css" scoped></style>

<template>
  <div class="home">
    <div class="content">
      <div class="search">
        <input type="text" class="ipt-search" placeholder="关键字"/>
        <button type="button" class="btn-search">搜索一下</button>
      </div>
      <result></result>
      <pagination></pagination>
    </div>
  </div>
</template>

<script>
import Result from '../Result/index'
import Pagination from '../Pagination/index'
export default {
  data () {
    return {
    }
  },
  components: {
    result: Result,
    pagination: Pagination
  }
}
</script>
