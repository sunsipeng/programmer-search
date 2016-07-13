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
  computed: {
    items: function () {
      let items = this.initData()
      return items
    }
  },
  props: {
    result: {
      type: Array
    }
  },
  methods: {
    initData () {
      let item = {
        title: '测试一下',
        link: 'https://www.baidu.com/',
        content: '心理心理测试频道,这里有爱情测试、性格测试、能力测试、会员测试、精选测试、专业测评,包含了心理测试题及答案。'
      }
      let items = []
      for (var i = 0; i < 10; i++) {
        items.push(item)
      }
      return items
    }
  },
  ready () {
    // this.initData()
  }
}
</script>
