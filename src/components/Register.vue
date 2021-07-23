<template>
  <v-container class="fill-height" style="max-width: 450px">
    <v-layout class="align-center" row wrap>
      <v-flex xs12>
        <v-alert
            class = "mb-3"
            :value="isRegError"
            type="error"
        >
          입력하신 정보를 확인해주세요.
        </v-alert>

        <v-alert
            class = "mb-3"
            :value="isNotMatchPwd"
            type="error"
        >
          비밀번호와 비밀번호 확인이 다릅니다.
        </v-alert>

        <h1>회원가입</h1>
        <v-text-field
            v-model="email"
            label="이메일"
            placeholder="이메일을 입력해주세요."
        ></v-text-field>

        <v-text-field
            v-model="password"
            type="password"
            label="비밀번호"
            placeholder="영 대소문자, 특수문자가 포함되어야 합니다. (8~32글자 사이)"
        ></v-text-field>

        <v-text-field
            v-model="chkpassword"
            type="password"
            label="비밀번호 확인"
            placeholder="비밀번호와 동일하게 입력해주세요."
        ></v-text-field>

        <v-text-field
            class = "mb-10"
            v-model="nickname"
            label="닉네임"
            placeholder="닉네임은 2~20글자 사이어야 합니다."
        ></v-text-field>
        <v-btn
            block
            class = "white--text"
            depressed
            large
            color = "blue-grey darken-2"
            @click="register({email, password, nickname})"
        >
          등록
        </v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import {mapActions, mapState} from 'vuex'

export default {
  name: "Register",

  data: () => ({
    email: '',
    password: '',
    chkpassword: '',
    nickname:''
  }),

  computed:{
    ...mapState(["isRegError", "isNotMatchPwd"])
  },

  methods:{
    ...mapActions(["register"])
  }
}
</script>

<style scoped>
h1{
  text-align: center;
  font-size: 50px;
  font-weight: 900;
  margin-bottom: 5rem;
}

</style>