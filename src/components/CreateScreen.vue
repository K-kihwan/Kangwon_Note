<template>
  <v-layout class="fill-height d-flex flex-column ma-0" column>
    <!--문장추천 창-->
    <v-flex id="sentenceBox" class="white" style="flex: 0 0 auto; height: 20%">
      <v-btn id="sentencebotton"
             class="cyan darken-2 grey--text text--lighten-4 text-wrap text-h6 rounded-xl py-2"
             outlined
             elevation="5"
             v-for="sentence in sentences"
             :key="sentence"
             v-show="show"
      >
        {{ sentence}}
      </v-btn>
    </v-flex>

    <!--에디터 창-->
    <v-flex style="flex: 1 1 auto">
      <tiptap-editor class="fill-height mt-2" @stshow="sentenceRecommend" :menubar="true" :swbutton="true"
                     :description.sync="contents"
      />
    </v-flex>

    <!--저장버튼 창-->
    <v-flex class="mt-4 mb-2" style="flex: 0 0 auto">
      <v-btn class = "white--text" color = "blue-grey darken-2"
             style="float: right; margin-right:10px;"
             @click="save"
      >외부저장</v-btn>

      <v-btn class = "white--text" color = "blue-grey darken-2"
             style="float: right; margin-right:10px;"
             @click="save"
      >클라우드저장</v-btn>

      <!--버튼 클릭시 dialog(저장) 표시-->
      <v-dialog v-model="dialogSave" max-width="500px" @keydown.enter.prevent="documentSave({noteName, contents})">
        <v-card>
          <v-card-title class="text-h5">문서저장</v-card-title>

          <!--저장할 때 필수 입력 사항 / 없으면 error-->
          <v-card-text>
            <v-text-field
                v-model= "noteName"
                :rules = "[rules.required, rules.title_min, rules.title_max]"
                placeholder="제목을 입력하세요"/>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="closeSave">취소</v-btn>
            <v-btn color="blue darken-1" text @click="documentSave({noteName, contents})">저장</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-flex>
  </v-layout>
</template>

<script>
import TiptapEditor from "@/components/TiptapEditor"
import axios from "axios";

export default {
  name: "DocumentList",
  components: {
    TiptapEditor,
  },
  data() {
    return {
      contents:"",
      noteName: '',
      word:'test',
      show: false,
      dialogSave: false,
      rules: {
        required: value => !!value || '입력이 필요합니다.',
        title_min : v => v.length >= 1 || '최소 1자 이상이어야 합니다.',
        title_max : v => v.length <= 35 || '최대 35자 이하이어야 합니다.',
      },

      sentences: [],
    }
  },
  watch: {
    dialogSave (val) {
      val || this.closeSave()
    }
  },

  methods: {
    //문서저장
    documentSave(text){
      let uid = localStorage.getItem("uid")
      let order = localStorage.getItem("noteOrder")
      let newOrder = parseInt(order) + 1
      let config = {
        "userId" : uid,
        "noteName" : text.noteName,
        "content" : text.contents,
        "order" : newOrder
      }
      axios
          .post("http://localhost:3000/note", config)
          .then(res=>{
            console.log(res)
            alert("저장 완료 되었습니다.")
            this.closeSave()
            window.location.reload()
          })
          .catch(err=>{
            console.log(err)
            alert("저장 실패했습니다.")
          })
    },

    //문장 추천
    sentenceRecommend(word){
      let uid = localStorage.getItem("uid")
      let config = {
        "userId" : uid,
        "word" : word
      }
      axios
          .post("http://localhost:3000/note/get-sentences", config)
          .then(res=>{
            console.log(res)
            this.sentences=res.data.sentences
            this.show = !this.show
          })
          .catch(err=>{
            console.log(err)
            alert("오류 발생!")
          })
    },

    save() {
      this.dialogSave = true
    },
    closeSave() {
      this.dialogSave = false
    }
  }
}
</script>

<style scoped>
#sentenceBox{
  border-width: 1px solid black;
  border-radius: 20px;
  overflow-y: auto;
}
#sentencebotton{
  display: block;
  float: left;
  margin: 6px;
  height: auto;
  font-size: 25px;
  text-align: left;
}
::-webkit-scrollbar{
  width: 5px;
}
::-webkit-scrollbar-thumb{
  background-color: #9E9E9E;
  border-radius: 10px;
}
</style>