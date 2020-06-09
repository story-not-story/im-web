import Vue from 'vue'
import VueRouter from 'vue-router'
import MsgList from '../views/msglist/MsgList.vue'
import Login from '../views/login/Login.vue'
import Search from '../views/search/Search.vue'
import Me from '../views/user/Me.vue'
import MeInfo from '../views/user/components/MeInfo.vue'
import ModMe from '../views/user/components/ModMe.vue'
import Password from '../views/user/Password.vue'
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
import Setting from '../views/setting/Setting.vue'
import Text from '../views/settingfuc/Text.vue'
import ChatSetting from '../views/setting/ChatSetting.vue'
import UserSetting from '../views/setting/UserSetting.vue'
import GroupSetting from '../views/setting/GroupSetting.vue'
import MsgSearch from '../views/msgsearch/MsgSearch.vue'
import All from '../views/msgsearch/All.vue'
import Emoji from '../views/msgsearch/Emoji.vue'
import File from '../views/msgsearch/File.vue'
import ImgVideo from '../views/msgsearch/ImgVideo.vue'
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
    component: Me,
    children: [
      {
        path: 'mod',
        name: 'ModMe',
        component: ModMe
      },
      {
        path: '',
        name: 'MeInfo',
        component: MeInfo
      }
    ]
  },
  {
    path: '/password',
    name: 'Password',
    component: Password
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
    path: '/text',
    name: 'Text',
    component: Text
  },
  {
    path: '/message/search',
    name: 'MsgSearch',
    component: MsgSearch,
    children: [
      {
        path: 'imgvideo',
        name: 'ImgVideo',
        component: ImgVideo
      },
      {
        path: 'emoji',
        name: 'Emoji',
        component: Emoji
      },
      {
        path: 'file',
        name: 'File',
        component: File
      },
      {
        path: '',
        name: 'All',
        component: All
      }
    ]
  },
  {
    path: '/setting',
    name: 'Setting',
    component: Setting,
    children: [
      {
        path: 'user',
        name: 'UserSetting',
        component: UserSetting
      },
      {
        path: 'group',
        name: 'GroupSetting',
        component: GroupSetting
      },
      {
        path: '',
        name: 'ChatSetting',
        component: ChatSetting
      }
    ]
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
