<style src="./index.css" scoped></style>

<template>
  <div class="search-result">
    <div class="search-item" v-for="item in result" track-by="$index">
      <a class="result-title" :href="item.sourceLink" target=_blank>
        {{item.sourceTitle}}
      </a>
      <p class="result-content">
        {{item.sourceContent}}
      </p>
      <p class="result-link">
        {{item.sourceLink}}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  props: {
    result: {
      type: Array
    }
  },
  methods: {
  },
  ready () {
  }
}
</script>
