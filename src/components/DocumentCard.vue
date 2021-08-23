<template>
  <v-card
      shaped
      elevation="5"
      outlined
      class="pa-3"
  >
    <v-card-title class="me-n3">
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <span class="dmName text-h5" v-bind="attrs" v-on="on">{{name}}</span>
        </template>
        <span v-if="name.length>10">{{name}}</span>
      </v-tooltip>
      <v-spacer></v-spacer>
      <v-btn icon @click="$emit('close')">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-card-title>
    <v-card-text class="dmText black--text px-8 mt-5 text-body-1 text-left">
      <span v-if="contentTrans">{{contents}}</span>
      <v-textarea v-else
                  row="1"
                  auto-grow
                  color="grey lighten-2"
                  v-model="contents"
                  no-resize
                  class="contentTarea"
      />
    </v-card-text>
    <v-spacer></v-spacer>
    <v-card-actions class="justify-center mt-5">
      <v-btn class="transbtn white--text" color="blue-grey darken-2" v-if="contentTrans" @click="transItem()">
        수정
      </v-btn>
      <v-btn class="transbtn white--text" color="blue-grey darken-2" v-else @click="transItemCommit()">
        수정완료
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "DocumentCard",
  props: {
    name: {
      type: String,
      default: '문서이름',
    },
    contents: {
      type: String,
      default: '내용없음',
    },
  },
  data() {
    return {
      contentTrans: true,
    }
  },
  methods: {
    transItem() {
      this.contentTrans = false
    },
    transItemCommit() {
      this.contentTrans = true
    }
  }
}
</script>

<style scoped>
.v-card{
  position: relative;
}
.dmName{
  max-width: 70%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.dmText{
  max-height: 80%;
  padding-right: -20px;
  overflow-y: auto;
}
::-webkit-scrollbar{
  width: 5px;
  margin-left: -5px;
}
::-webkit-scrollbar-thumb{
  background-color: #9E9E9E;
  border-radius: 10px;
}
.transbtn{
  position: absolute;
  bottom: 20px;
}
</style>