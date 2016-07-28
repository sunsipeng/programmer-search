<style src='./modalLayer.css' scoped></style>

<template>
  <div class='modal-mask' v-if="alertStatus">
    <div class="modal-content">
      <h3 class="modal-title">提示</h3>
      <p class="modal-txt">
        将会清除当前所有爬虫数据，并重新开始爬取！
      </p>
      <div class="footer">
         <button type="button" class="btn-cancel" @click="hideAlert">取消</button>
         <button type="button" class="btn-ok" @click="confirm">确认</button>
      </div>
    </div>
  </div>
</template>

<script src="./modallayer.js"></script>
