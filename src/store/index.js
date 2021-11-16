import Vue from "vue";
import Vuex from 'vuex'
import router from '../router'
import axios from "axios";
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        isLogin : false,
        isLoginError: false,
        isRegister: false,
        isRegError : false,
        isSaveNote : false
    },

    mutations: {
        loginSuccess(state){
            state.isLogin = true
            state.isLoginError = false
        },
        loginError(state){
            state.isLogin = false
            state.isLoginError = true

        },
        logout(state){
            state.isLogin = false
            state.isLoginError = false
        },

        registerError(state){
            state.isRegError = true
            state.isRegister = false
        },

        registerSuccess(state){
            state.isRegister = true
            state.isRegError = false
        }
    },

    actions: {
        login({commit}, text){
            axios
                .post("http://localhost:3000/auth/signin", text)
                .then(res=>{
                    let token = res.data.accessToken
                    localStorage.setItem("access_token", token)

                    let userId = res.data.user.id
                    localStorage.setItem("uid", userId)

                    console.log(res)
                    commit("loginSuccess")
                    router.push({
                        name:'ComposeScreen'
                    })
                })
                .catch(err=>{
                    console.log(err)
                    commit("loginError")
                })
        },

        /*memberCheck({commit}){
            let token = localStorage.getItem("access_token")
            let uid = localStorage.getItem("uid")
            let config = {
                headers:{
                    "access-token" : token
                }
            }
            axios
                .get(`http://localhost:3000/auth/${uid}`, config)
                .then(response =>{
                    let userInfo = {
                        id: response.data.data.id,
                        email : response.data.data.email,
                        nickname: response.data.data.nickname
                    }
                    commit("loginSuccess", userInfo)
                })
                .catch(err=>{
                    console.log(err)
                    commit("loginError")
                })
        },*/

        /*logout({commit}){
            let token = localStorage.getItem("access_token")
            let config = {
                headers:{
                    "Authorization" : token
                }
            }
            axios
                .post("http://localhost:3000/auth/users/logout", config)
                .then(res =>{
                    console.log(res)
                    commit('logout')
                    router.push({
                        name:'Login'
                    })
                })
                .catch(err=>{
                    console.log(err)
                    alert("로그아웃 실패!")
                })
        },*/

        logout({commit}){
            commit('logout')
            window.localStorage.clear()
            alert("로그아웃 되었습니다.")
            router.push({
                name:'Login'
            })
        },

        register({commit}, text){
            axios
                .post("http://localhost:3000/auth/signup", text)
                .then(res=>{
                    console.log(res)
                    commit('registerSuccess')
                    alert("회원가입을 성공했습니다.")
                    router.push({
                        name:'Login'
                    })

                })
                .catch(err=>{
                    console.log(err)
                    commit("registerError")
                })
        }
    },
    getters: {

    },

    plugins: [createPersistedState()],
})