<style src="./pagination.css" scoped></style>

<template>
  <div class="pagination" v-if="resultsLength !== 0">
    <ul class="clearfix">
      <li @click="evtFirstTab"><<</li>
      <li v-if="leftEllipse">...</li>
      <li v-for="item of items"
        track-by="$index"
        class="pagination-item"
        :class="{active: this.currentPage === item}"
        @click="evtPaginationTab(item)">
        {{item}}
      </li>
      <li v-if="rightEllipse">...</li>
      <li @click="evtLastTab">>></li>
    </ul>
  </div>
</template>

<script src="./pagination.js"></script>
