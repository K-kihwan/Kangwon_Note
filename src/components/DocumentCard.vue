<template>
  <v-card
      elevation="5"
      outlined
      class="pa-3"
  >
    <!--문서 제목-->
    <v-card-title class="me-n3">
      <!--문서 제목이 길 경우 툴팁 활성화(교정중)-->
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <span class="dmName text-h5 text-truncate" v-bind="attrs" v-on="on">{{name}}</span>
        </template>
        <span v-if="name.length>10">{{name}}</span>
      </v-tooltip>

      <v-spacer></v-spacer>

      <!--닫기버튼 / 닫을때 서버랑 연동, 변경사항 저장-->
      <v-btn icon @click="$emit('close')">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-card-title>

    <!--문서 내용 / 수정 버튼으로 수정 가능하게 변경-->
    <v-card-text class="dmText black--text px-8 mt-5 text-body-1">
      <tiptap-editor :description="contents" v-bind="editorItems"/>
    </v-card-text>

    <v-spacer></v-spacer>

    <!--수정 버튼-->
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
import TiptapEditor from "@/components/TiptapEditor"
export default {
  name: "DocumentCard",
  props: ["name", "contents"],
  components: {
    TiptapEditor
  },
  data() {
    return {
      contentTrans: true,
      editorItems: {
        menubar: false,
        swbutton: false,
        editable: false
      },
    }
  },
  methods: {
    transItem() {
      this.contentTrans = false
      this.editorItems.editable = true
      this.editorItems.menubar = true
    },
    transItemCommit() {
      this.contentTrans = true
      this.editorItems.editable = false
      this.editorItems.menubar = false
    }
  }
}
</script>

<style scoped>
.v-card{
  display: block;
  position: relative;
  overflow: hidden;
  height: 100%;
}
.dmName{
  max-width: 70%;
}
.dmText{
  height: 80%;
  padding-right: -20px;
  overflow-y: scroll;
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