<template>
  <v-container class="fill-height" style="max-width: 360px">
    <v-layout class="align-center" row wrap>
      <v-flex xs12>
        <h1>회원가입</h1>
        <v-text-field
            v-model="email"
            label="이메일"
        ></v-text-field>

        <v-text-field
            v-model="password"
            type="password"
            label="비밀번호"
        ></v-text-field>

        <v-text-field
            v-model="chkpassword"
            type="password"
            label="비밀번호 확인"
        ></v-text-field>

        <v-text-field
            class = "mb-10"
            v-model="nickName"
            label="닉네임"
        ></v-text-field>
        <v-btn
            block
            class = "white--text"
            depressed
            large
            color = "blue-grey darken-2"
            @click="onSubmit"
        >
          등록
        </v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "Register",

  data: () => ({
    email: '',
    password: '',
    chkpassword: '',
    nickName:''
  }),

  methods:{
    onSubmit(){
      if(this.email && this.password && this.nickName && this.chkpassword != 0)
      {
        if(this.password != this.chkpassword)
        {
          alert("비밀 번호가 일치하지 않습니다.")
        }
        else
        {
          console.log(this.email)
          console.log(this.password)
          console.log(this.nickName)
          alert("회원가입이 완료 되었습니다.")
          this.goToLogin()
        }
      }
      else
      {
        alert("창을 모두 채워 주세요.")
      }
    },
    goToLogin(){
      this.$router.push({
        name:'Login'
      })
    }
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