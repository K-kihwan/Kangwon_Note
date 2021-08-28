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
        {{ sentence }}
      </v-btn>
    </v-flex>

    <!--에디터 창-->
    <v-flex style="flex: 1 1 auto">
      <tiptap-editor class="fill-height mt-2" @stshow="sentenceShow()" :menubar="true" :button="true"/>
    </v-flex>

    <!--저장버튼 창-->
    <v-flex class="mt-auto mb-2" style="flex: 0 0 auto">
      <v-btn class = "white--text" color = "blue-grey darken-2"
             style="float: right; margin-right:10px;"
             @click="save"
      >외부저장</v-btn>

      <v-btn class = "white--text" color = "blue-grey darken-2"
             style="float: right; margin-right:10px;"
             @click="save"
      >클라우드저장</v-btn>

      <!--버튼 클릭시 dialog(저장) 표시-->
      <v-dialog v-model="dialogSave" max-width="500px">
        <v-card>
          <v-card-title class="text-h5">문서저장</v-card-title>

          <!--저장할 때 필수 입력 사항 / 없으면 error-->
          <v-card-text>
            <v-text-field
                :rules = "[rules.required, rules.title_min, rules.title_max]"
                placeholder="제목을 입력하세요"/>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="closeSave">취소</v-btn>
            <v-btn color="blue darken-1" text>저장</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-flex>
  </v-layout>
</template>

<script>
import TiptapEditor from "@/components/TiptapEditor"
export default {
  name: "DocumentList",
  components: {
    TiptapEditor,
  },
  data() {
    return {
      show: false,
      dialogSave: false,
      rules: {
        required: value => !!value || '입력이 필요합니다.',
        title_min : v => v.length >= 1 || '최소 1자 이상이어야 합니다.',
        title_max : v => v.length <= 35 || '최대 35자 이하이어야 합니다.',
      },
      sentences: [
        "여기에 추천 문장이 표시됩니다.",
        "'단어추천'버튼을 누르거나 특정 키를 누르는 것으로 표시 할 수 있습니다.",
        "역사학자들은 수니파와 시아파가 오늘날 반목하는 이유를 설명하기 위해 노력해왔다. 많은 이들은 갈등의 원인이 오랜 종교적 차이에 있다고 주장한다. 하지만 1300년 동안 두 종족이 갈등한 역사의 모든 사회적, 경제적, 문화적 요인까지 고려해야 한다."
      ],
      menuitems: [
        {
          name: '파일',
          contants: [
            '새 문서', '열기'
          ]
        },
        {
          name: '글꼴',
          contants: [
            '크기', '폰트', '기울기', '굵게'
          ]
        },
        {
          name: '단락',
          contants: [
            '오른쪽', '가운데', '왼쪽'
          ]
        },
        {
          name: '편집',
          contants: [
            '붙여넣기', '복사', '잘라내기'
          ]
        }
      ]
    }
  },
  watch: {
    dialogSave (val) {
      val || this.closeDelete()
    }
  },
  methods: {
    sentenceShow() {
      this.show = !this.show;
    },
    fnAddProc() {
      this.form = {
        board_code: this.board_code,
        subject: this.subject,
        cont: this.cont,
        id: this.id
      }
      this.$axios.post('',this.form).then((res)=>{
        if(res.data.success) {
          alert('클라우드에 저장 했습니다.');
        } else {
          alert('클라우드 저장에 실패했습니다.');
        }
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
  width: none;
}
::-webkit-scrollbar{
  width: 5px;
}
::-webkit-scrollbar-thumb{
  background-color: #9E9E9E;
  border-radius: 10px;
}
</style>