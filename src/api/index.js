import Wilddog from 'wilddog'

const ref = new Wilddog('https://express-learn.wilddogio.com/segmentfault/testData')

const queryTest = (childStr) => {
  // const CHILD_NAME = 'testData'
  // const cRef = ref.child(CHILD_NAME)
  var arr = []
  for (var i = 0; i < 100; i++) {
    var data = {
      index: i,
      title: 'title',
      content: 'content',
      keyWords: 'keyWords'
    }
    arr.push(data)
  }
  ref.update({
    'data': arr
  })
  ref.child('test/data').limitToFirst(5).on('value', function (data, error) {
    if (error == null) {
      console.log(data.val())
    }
  })
}

export default {
  queryTest
}
