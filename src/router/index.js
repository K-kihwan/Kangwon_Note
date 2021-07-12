import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Register from "@/components/Register";
import mainPage from "@/components/mainPage";
import store from "../store"
Vue.use(Router)

const alreadyLogin = (to, from, next) => {
    if(store.state.isLogin === true)
    {
        alert("로그인이 된 상태입니다.")
        next("/mainPage")
    }
    else
        next()
}

const notLogin= (to, from, next) => {
    if(store.state.isLogin === false)
    {
        alert("로그인을 하셔야 합니다.")
        next("/")
    }
    else
        next()
}

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Login',
            beforeEnter: alreadyLogin,
            component: Login
        },
        {
            path: '/Register',
            name: 'Register',
            component: Register
        },
        {
            path: '/mainPage',
            name: 'mainPage',
            beforeEnter: notLogin,
            component: mainPage
        }
    ]
})