<style src="./admin.css" scoped></style>

<template>
  <div class="admin">
    <div class="admin-sidebar clearfix">
      <div class="list">
        <div class="list-item item-cnode">
          <label for="cnode">cnode</label>
          <input type="radio" id="cnode" value="cnode" v-model="checkType">
        </div>
        <div class="list-item item-sf">
          <label for="segmentfault">segmentfault</label>
          <input type="radio" id="segmentfault" value="segmentfault" v-model="checkType">
        </div>
      </div>
      <h3 class="title">
        {{checkType}}文章采集
      </h3>
      <button type="button" name="button" class="btn-start" @click="showAlert">重新开始</button>
      <div class="sidebar-tips">
        注意：重新开始会清除之前数据库的所有数据
      </div>
    </div>
    <div class="admin-content">
      <div class="data-count">
        当前抓取<span class="data-type">{{checkType}}</span>的数据条数为：
        <span class="count">{{count}}</span>
        条
      </div>
      <div class="chart">
        <chart v-ref:chart></chart>
      </div>
    </div>
    <modal-layer></modal-layer>
  </div>
</template>

<script src="./admin.js"></script>
