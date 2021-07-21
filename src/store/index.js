import Vue from "vue";
import Vuex from 'vuex'
import router from '../router'
import axios from "axios";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        isLogin : false,
        isLoginError: false,
        isRegister: false,
        isRegError : false,
        isNotMatchPwd: false
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

        registerNotMatch(state){
            state.isNotMatchPwd = true
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

        logout({commit}){
            commit('logout')
            router.push({
                name:'Login'
            })
        },

        register({commit}, text){
            /*if(text.password != text.chkpassword)
            {
                commit("registerNotMatch")
                return false
            }*/

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
        },

        test(){
            axios.get("http://localhost:3000/hello")
                .then(res=>{
                    console.log(res)
                })
                .catch(err=>{
                    console.log(err)
                })
        }
    },
    getters: {

    }
})