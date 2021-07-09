<template>
  <div class="inputBox">
    <h1>문서작성(임시)</h1>
    <form @submit="onSubmit">
      <i class="user fas fa-user"></i> &nbsp;
      <input type="text" placeholder="이메일" v-model="email"><br />
      <i class="pwd fas fa-lock"></i> &nbsp;
      <input type="password" placeholder="●●●●" v-model="password"><br />
      <button type="submit">로그인</button><br />
    </form>
    <button @click="goToRegister">회원가입</button>
  </div>
</template>

<script>
export default {
  name: "Login",

  data: () => ({
    email: '',
    password: ''
  }),

  methods:{
    onSubmit(){
      if(this.email && this.password != 0)
      {
        console.log(this.email)
        console.log(this.password)
      }
      else
        alert("이메일 및 패스워드를 입력 해 주세요")
    },
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

  .inputBox input{
    border-radius: 5px;
    text-align: center;
    height: 50px;
    margin-bottom: 10px;
    border-style: none;
    background-color: white;
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