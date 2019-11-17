import Vue from 'vue'
import VueRouter from 'vue-router'
import StartPage from '../startpage/StartPage.vue'
import SignIn from '../startpage/SigningControllers/SignIn.vue'
import SignUp from '../startpage/SigningControllers/SignUp.vue'
import MainApp from '../mainapp/MainApp'
import QuizCreator from '../mainapp/quizcreator/QuizCreator'

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'start',
    component: StartPage
  },
  {
    path: '/Register',
    name: "SignUp",
    component: SignUp
  },
  {
    path: "/Login",
    name: "SignIn",
    component: SignIn
  },
  {
    path: "/quizer/user=" + ":email",
    name: "quizer",
    component: MainApp,
    props: true,
    children: [
      {
        path: 'create',
        name: "create",
        component: QuizCreator
      }
    ]
  }
];

const router = new VueRouter({
  routes
})

export default router
