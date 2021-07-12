<template>
  <v-container class="fill-height" style="max-width: 360px">
    <v-layout class="align-center" row wrap>
      <v-flex xs12>
        <v-alert
            class = "mb-3"
            :value="isLoginError"
            type="error"
        >
          아이디와 비밀번호를 확인 해주세요.
        </v-alert>
<!--        <v-alert
            class = "mb-3"
            :value="isLogin"
            type="success"
        >
          로그인이 완료되었습니다.
        </v-alert>-->
        <h1>문서작성 (임시)</h1>
        <v-text-field
            v-model="email"
            label="이메일"
        ></v-text-field>

        <v-text-field
            class = "mb-10"
            v-model="password"
            type="password"
            label="비밀번호"
        ></v-text-field>

        <v-btn
            block
            class = "white--text mb-3"
            depressed
            large
            color = "blue-grey darken-2"
            @click="login({email, password})"
        >
          로그인
        </v-btn>

        <v-btn
            block
            class = "white--text"
            depressed
            large
            color = "blue-grey darken-2"
            @click="goToRegister"
        >
          회원가입
        </v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import{ mapActions,mapState } from 'vuex'

export default {

  name: "Login",

  data: () => ({
    email: '',
    password: ''
  }),

  computed:{
    ...mapState(["isLogin", "isLoginError"])
  },

  methods:{
    ...mapActions(["login"]),

    goToRegister(){
      this.$router.push({
        name:'Register'
      })
    }
  }
}
</script>

<style scoped>
  h1{
    font-size: 50px;
    font-weight: 900;
    margin-bottom: 5rem;
  }

</style>