import Vue from 'vue'
import App from './App'
import Wilddog from 'wilddog'

const ref = new Wilddog('https://express-learn.wilddogio.com/segmentfault')
const CHILD_NAME = 'childArr'
// const result = 'results'

const cRef = ref.child(CHILD_NAME)

cRef.on('value', function (data, error) {
  if (error == null) {
    console.log(data.val())   // 结果会在 console 中打印出 "beijing"
  }
})

// var arr = []
// for (var i = 0; i < 2000; i++) {
//   arr.push(i)
// }
//
// ref.set({
//   childArr: arr
// })
// cRef.set({
//   child: [1, 2, 3]
// })

/* eslint-disable no-new */
new Vue({
  el: 'body',
  components: { App }
})
