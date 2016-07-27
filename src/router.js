
export default function (router) {
  router.map({
    '/': {
      name: 'home',
      component: function (resolve) {
        require(['./components/Home/home.vue'], resolve)
      }
    },
    '/admin': {
      name: 'admin',
      component: function (resolve) {
        require(['./components/Admin/admin.vue'], resolve)
      }
    }
  })
}
