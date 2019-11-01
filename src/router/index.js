import Vue from 'vue'
import VueRouter from 'vue-router'
import StartPage from '../startpage/StartPage.vue'
import SignIn from '../startpage/SigningControllers/SignIn.vue'

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'start',
    component: StartPage
  },
  {
    path: '/Register',
    name: "SignIn",
    component: SignIn
  }
]

const router = new VueRouter({
  routes
})

export default router
