import Vue from 'vue'
import VueRouter from 'vue-router'
import StartPage from '../startpage/StartPage.vue'
import SignIn from '../startpage/SigningControllers/SignIn.vue'
import SignUp from '../startpage/SigningControllers/SignUp.vue'
import MainApp from '../mainapp/MainApp'
import QuizCreator from '../mainapp/quizcreator/QuizCreator'
import UserProfile from '../mainapp/userprofile/UserProfile'
import QuizesList from '../mainapp/quizeslist/QuizesList'
import Quiz from '../mainapp/quiz/Quiz'

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
    redirect: { name: 'list' },
    children: [
      {
        path: '',
        name: 'list',
        component: QuizesList
      },
      {
        path: 'create',
        name: "create",
        component: QuizCreator
      },
      {
        path: 'profile',
        name: "profile",
        props: true,
        component: UserProfile
      },
      {
        path: 'quiz=' + ':quizname',
        name: 'quiz',
        props: true,
        component: Quiz
      }
    ]
  }
];

const router = new VueRouter({
  routes
})

export default router
