<template>
  <div class="inputBox">
    <h1>회원가입</h1>
    <form @submit="onSubmit">
      <i class="fas fa-envelope"></i> &nbsp;
      <input type="text" v-model="email"><br />

      <i class="pwd fas fa-lock"></i> &nbsp;
      <input type="password" v-model="password"><br />

      <i class="pwd fas fa-lock"></i> &nbsp;
      <input type="password" placeholder="비밀 번호와 동일하게 입력 해주세요." v-model="chkpassword"><br />

      <i class="user fas fa-user"></i> &nbsp;
      <input type="text" v-model="nickName"><br />

      <button type="submit">등록</button><br />
    </form>
  </div>
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
      if(this.email || this.password || this.nickName || this.chkpassword != 0)
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
  font-size: 50px;
  font-weight: 900;
  margin-bottom: 5rem;
}

.inputBox input{
  text-align: center;
  height: 50px;
  width: 230px;
  margin-bottom: 10px;
  border-radius: 5px;
  border-style: none;
}

.inputBox chk{

}

button{
  box-shadow: none;
  font-size: 12pt;
  height: 50px;
  width : 100px;
  background-color: gray;
  color : white;
  margin-top: 15px;
  border-radius: 5px;
}

</style>