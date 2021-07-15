import Vue from "vue";
import Vuex from 'vuex'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        allUsers:[
            {id  : 1, email: "aa@gmail.com", password : "1234", nickName : "AAA"}
        ],
        isLogin : false,
        isLoginError: false
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
        }
    },
    actions: {
        login({state, commit}, text){
            let selectedUser = null
            if(text.email && text.password != 0)
            {
                state.allUsers.forEach(user=>{
                    if(user.email === text.email)
                        selectedUser = user
                })
                if(selectedUser === null)
                    commit("loginError")
                else{
                    if(selectedUser.password !== text.password)
                        commit("loginError")
                    else
                    {
                        commit("loginSuccess")
                        router.push({
                            name:'ComposeScreen'
                        })
                    }
                }
            }
            else
                commit("loginError")
        },

        logout({commit}){
            commit('logout')
            router.push({
                name:'Login'
            })
        }
    },
    getters: {

    }
})