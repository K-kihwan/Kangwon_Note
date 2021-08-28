<template>
  <v-app id="inspire">
    <v-app-bar
        app
        color="white"
    >
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>문서작성(임시)</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn class = "white--text" color = "blue-grey darken-2" @click="logout">
        로그아웃
      </v-btn>
    </v-app-bar>

    <v-main class="grey lighten-3 ma-0">
      <v-container>
        <v-row>

          <v-col>
            <document-list/>
          </v-col>

          <v-col>
            <create-screen/>
          </v-col>

        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import DocumentList from "@/components/DocumentList"
import CreateScreen from "@/components/CreateScreen"
import {mapActions} from 'vuex'
export default {
  name: "ComposeScreen",
  components: {
    DocumentList,
    CreateScreen,
  },
  methods: {
    ...mapActions(["logout"])
  }
}
</script>

<style scoped>
.fill-height{
  max-width: none;
  display: block;
}
.inputBox{
  position: relative;
  margin: 0 auto;
  overflow: hidden;
}
.itemBox{
  position: absolute;
  top:10px; bottom:10px;
}
#left {
  left: 10px; right: 52%;
  border: 3px solid black;
  border-radius: 20px;
}
#right {
  right: 10px; left: 52%;
}
</style>