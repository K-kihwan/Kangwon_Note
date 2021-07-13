<template>
  <v-container class="fill-height" style="max-width: 360px">
    <v-layout class="align-center" row wrap>
      <v-flex xs12>
        <h1>임시페이지</h1>
        <v-btn
            block
            class = "white--text mb-3"
            depressed
            large
            color = "blue-grey darken-2"
            @click="goToLogin"
        >
          뒤로가기
        </v-btn>
        <v-btn
            block
            class = "white--text"
            depressed
            large
            color = "blue-grey darken-2"
            @click="logout"
        >
          로그아웃
        </v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>

import {mapActions} from 'vuex'

export default {
  name: "mainPage",

  methods:{
    ...mapActions(["logout"]),

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
    margin-bottom: 5rem;
  }
</style>