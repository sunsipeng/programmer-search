'use strict'
const CnodeSchema = require('../Models/cnodeSchema.js')
const SegmentfaultSchema = require('../Models/segmentSchema.js')

class Model {
  constructor (type) {
    if (type === 'segmentfault') {
      this.Model = SegmentfaultSchema
    } else {
      this.Model = CnodeSchema
    }
  }

  save (data) {
    const entity = new this.Model(data)
    entity.save(function (err, model) {
      if (err) return console.error(err)
      console.log('save status:' + err)
    })
  }

  query (data, fn) {
    const condition = data || {}
    this.Model.find(condition)
      .sort({ date: -1 })
      .exec(function (err, doc) {
        if (err) { return err }
        fn(doc)
      })
  }

  queryCount (fn) {
    this.Model.count(function (err, doc) {
      if (err) { return err }
      console.log(doc)
      fn(doc)
    })
  }

  remove (data) {
    const condition = data || {}
    this.Model.findOne(condition, function (err, doc) {
      if (err) { return err }
      if (doc) {
        doc.remove()
        console.log('remove success!', condition)
      }
    })
  }

  removeAll (fn) {
    this.Model.find({}, function (err, doc) {
      if (err) { return err }
      if (doc) {
        doc.forEach((item) => {
          item.remove()
        })
        fn('remove all success')
        console.log('remove all success!')
      }
    })
  }
}

module.exports = Model
