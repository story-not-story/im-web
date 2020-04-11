import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Search from '../views/Search.vue'
import Me from '../views/Me.vue'
import Relation from '../views/Relation.vue'
import Labelv from '../views/Labelv.vue'
import Friendv from '../views/Friendv.vue'
import NewFriend from '../views/NewFriend.vue'
import Groupv from '../views/Groupv.vue'
import User from '../views/User.vue'
import Message from '../views/Message.vue'
import CreateGroup from '../views/CreateGroup.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/search',
    name: 'Search',
    component: Search
  },
  {
    path: '/creategroup',
    name: 'CreateGroup',
    component: CreateGroup
  },
  {
    path: '/relation',
    name: 'Relation',
    component: Relation,
    children: [
      {
        path: 'label',
        name: 'Labelv',
        component: Labelv
      },
      {
        path: 'group',
        name: 'Groupv',
        component: Groupv
      },
      {
        path: 'newfriend',
        name: 'NewFriend',
        component: NewFriend
      },
      {
        path: '',
        name: 'Friendv',
        component: Friendv
      }
    ]
  },
  {
    path: '/me',
    name: 'Me',
    component: Me
  },
  {
    path: '/user',
    name: 'User',
    component: User
  },
  {
    path: '/message',
    name: 'Message',
    component: Message
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  if (to.name !== 'Login') {
    if (!document.cookie) {
      router.push({ name: 'Login' })
    }
  }
  next()
})
export default router
