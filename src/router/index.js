import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Register from "@/components/Register";
import store from "../store"
import ComposeScreen from "@/components/ComposeScreen";

Vue.use(Router)

const alreadyLogin = (to, from, next) => {
    if(store.state.isLogin === true)
    {
        alert("로그인이 된 상태입니다.")
        next("/ComposeScreen")
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
            path: '/ComposeScreen',
            name: 'ComposeScreen',
            beforeEnter: notLogin,
            component: ComposeScreen
        }
    ]
})