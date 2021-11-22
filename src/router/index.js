import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import TodoList from '../components/TodoList'
import Login from '../components/Login.vue'
import firebase from "firebase/app";
import "firebase/auth";
import Signup from '../components/Signup.vue'
import Blogs from '../components/blog/Blogs.vue'
import Profile from '../components/Profile.vue'
import CreatePost from '../views/CreatePost.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/todoList',
        name: 'todoList',
        component: TodoList,
        meta: { requiresAuth: true }
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/signup',
        name: 'signup',
        component: Signup
    },
    {
        path: '/blogs',
        name: 'blogs',
        component: Blogs
    },
    {
        path: '/profile',
        name: 'profile',
        component: Profile
    },
    {
        path: '/createPost',
        name: 'createPost',
        component: CreatePost
    },

]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})
router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
    const isAuthenticated = firebase.auth().currentUser
    if (requiresAuth && !isAuthenticated) {
        next("/login")
    } else {
        next()
    }
})

export default router