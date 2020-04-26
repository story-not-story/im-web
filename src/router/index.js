import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Search from '../views/Search.vue'
import Me from '../views/Me.vue'
import Relation from '../views/Relation.vue'
import Label from 'components/Label.vue'
import Friendv from '../views/Friendv.vue'
import Invitation from 'components/Invitation.vue'
import Group from 'components/Group.vue'
import User from '../views/User.vue'
import Groupv from '../views/Groupv.vue'
import Message from '../views/Message.vue'
import Apply from '../views/Apply.vue'
import CreateGroup from '../views/CreateGroup.vue'
import InnerSearch from '../views/InnerSearch.vue'
import ApplyDetailv from '../views/ApplyDetailv.vue'
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
    path: '/innersearch',
    name: 'InnerSearch',
    component: InnerSearch
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
        name: 'Label',
        component: Label
      },
      {
        path: 'group',
        name: 'Group',
        component: Group
      },
      {
        path: 'invite',
        name: 'Invitation',
        component: Invitation
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
    path: '/groupinfo',
    name: 'Groupv',
    component: Groupv
  },
  {
    path: '/message',
    name: 'Message',
    component: Message
  },
  {
    path: '/apply',
    name: 'Apply',
    component: Apply
  },
  {
    path: '/apply/detail',
    name: 'ApplyDetailv',
    component: ApplyDetailv
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
