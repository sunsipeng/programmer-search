<style src='./loading.css' scoped></style>

<template>
  <div class="mask" v-if="loadingState">
    <div class="loadEffect">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>
</template>

<script src="./loading.js"></script>