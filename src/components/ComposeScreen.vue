<template>
  <v-container class="fill-height">
    <v-layout class="inputBox">
      <v-flex id="left" class="itemBox">
        <document-list></document-list>
      </v-flex>
      <v-flex id="right" class="itemBox">
        <create-screen></create-screen>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import DocumentList from "@/components/DocumentList"
import CreateScreen from "@/components/CreateScreen"

export default {
  name: "ComposeScreen",
  components: {
    DocumentList,
    CreateScreen
  }
}
</script>

<style scoped>

.inputBox{
   position: relative;
   margin: 0 auto;
   height: 1000px;
   overflow: hidden;
   background: white;
 }

.itemBox{
  position: absolute;
  top:10px; bottom:10px;
}

#left {
  left: 10px; right: 52%;
  border: 2px solid black;
  border-radius: 20px;
}

#right {
  right: 10px; left: 52%;
}
</style>