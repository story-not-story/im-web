import Vue from 'vue'
import VueRouter from 'vue-router'
import MsgList from '../views/msglist/MsgList.vue'
import Login from '../views/login/Login.vue'
import Search from '../views/search/Search.vue'
import Me from '../views/user/Me.vue'
import Relation from '../views/relation/Relation.vue'
import LabelList from '../views/label/LabelList.vue'
import NamedGroup from '../views/group/NamedGroup.vue'
import FriendList from '../views/friend/FriendList.vue'
import Invitation from '../views/invitation/Invitation.vue'
import LabelManage from '../views/label/LabelManage.vue'
import GroupList from '../views/group/GroupList.vue'
import User from '../views/user/User.vue'
import GroupInfo from '../views/group/GroupInfo.vue'
import Message from '../views/msgdetail/Message.vue'
import Apply from '../views/apply/Apply.vue'
import CreateGroup from '../views/group/CreateGroup.vue'
import InnerSearch from '../views/search/InnerSearch.vue'
import ApplyDetail from '../views/applydetail/ApplyDetail.vue'
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
    name: 'MsgList',
    component: MsgList
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
    path: '/namedgroup',
    name: 'NamedGroup',
    component: NamedGroup
  },
  {
    path: '/labelmanage',
    name: 'LabelManage',
    component: LabelManage
  },
  {
    path: '/relation',
    name: 'Relation',
    component: Relation,
    children: [
      {
        path: 'label',
        name: 'LabelList',
        component: LabelList
      },
      {
        path: 'group',
        name: 'GroupList',
        component: GroupList
      },
      {
        path: 'invite',
        name: 'Invitation',
        component: Invitation
      },
      {
        path: '',
        name: 'FriendList',
        component: FriendList
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
    name: 'GroupInfo',
    component: GroupInfo
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
    name: 'ApplyDetail',
    component: ApplyDetail
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
