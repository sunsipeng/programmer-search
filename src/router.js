
export default function (router) {
  router.map({
    '/': {
      name: 'home',
      component: function (resolve) {
        require(['./components/Home/index.vue'], resolve)
      }
    },
    '/admin': {
      name: 'admin',
      component: function (resolve) {
        require(['./components/Admin/index.vue'], resolve)
      }
    }
  })
}
