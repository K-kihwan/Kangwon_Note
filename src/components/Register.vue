<template>
  <v-container class="fill-height" style="max-width: 400px">
    <v-layout class="align-center" row wrap>
      <v-flex xs12>
        <v-alert
            class = "mb-5"
            :value="isRegError"
            type="error"
        >
          입력하신 정보를 확인해주세요.
        </v-alert>

        <h1>회원가입</h1>
        <v-text-field
            class = "mb-3"
            v-model="email"
            label="이메일"
            :rules="[rules.required, rules.email_check]"
            hint="이메일을 입력해주세요."
        ></v-text-field>

        <v-text-field
            class = "mb-3"
            v-model="password"
            label="비밀번호"
            :rules = "[rules.required, rules.pwd_min, rules.pwd_max]"
            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show ? 'text' : 'password'"
            @click:append="show = !show"
            hint="영 대소문자, 특수문자가 포함되어야 합니다. (8~32글자 사이)"
        ></v-text-field>

        <v-text-field
            class = "mb-3"
            v-model="chkpassword"
            label="비밀번호 확인"
            placeholder="비밀번호와 동일하게 입력해주세요."
            :rules = "[rules.required, rules.pwd_min, rules.pwd_max, password_check]"
            :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show2 ? 'text' : 'password'"
            @click:append="show2 = !show2"
            hint="비밀번호와 동일하게 입력해주세요."
        ></v-text-field>

        <v-text-field
            class = "mb-10"
            v-model="nickname"
            label="닉네임"
            :rules = "[rules.required, rules.nick_min, rules.nick_max]"
            hint="닉네임은 2~20글자 사이로 입력해주세요."
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
    nickname:'',
    show: false,
    show2: false,
    rules: {
      email_check: value => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return pattern.test(value) || '이메일 형태가 아닙니다.'
      },
      required: value => !!value || '입력이 필요합니다.',
      nick_min : v => v.length >= 2 || '최소 2자 이상이어야 합니다.',
      nick_max : v => v.length <= 20 || '최대 20자 이하이어야 합니다.',
      pwd_min : v=> v.length >= 8 || '최소 8자 이상이어야 합니다.',
      pwd_max : v=> v.length <=32 || '최대 32자 이하이어야 합니다.'
    }
  }),

  computed:{
    ...mapState(["isRegError", "isNotMatchPwd"]),
    password_check(){
      return () => (this.password === this.chkpassword) || '패스워드가 일치하지 않습니다.'
    }
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