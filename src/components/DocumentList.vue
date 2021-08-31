
<template>
  <v-sheet class="fill-height" rounded="xl" color="white">
    <!--문서 목록 테이블-->
    <v-data-table
        :headers="headers"
        :items="items"
        :search="search"
        sort-by="number"
        class="elevation-6 rounded-xl"
        hide-default-footer
        style="height: 90vh; "
    >
      <template v-slot:top>
        <v-toolbar flat color="#9E9E9E" class="white--text">
          <v-toolbar-title>문서목록</v-toolbar-title>
          <v-spacer></v-spacer>
          <!--검색 기능-->
          <v-text-field
              color="white"
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
              dark
          ></v-text-field>

          <!--문서 삭제 dialog-->
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5">목록에서 지우시겠습니까?</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete">아니오</v-btn>
                <v-btn color="blue darken-1" text @click="deleteItemConfirm">예</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>

      <!--문서 이름 항목 / 누르면 문서 표시(DocumentCard) / 툴팁 적용-->
      <template v-slot:item.noteName="{ item }">
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <span class="d-inline-block text-truncate" v-on="on" @click="openDm(item)" :title="item.noteName"
                  style="cursor: pointer; max-width: 20vw">
              {{ item.noteName }}
            </span>
          </template>
          <!--툴팁으로 표시될 내용-->
          <span>{{ item.noteName }}</span>
        </v-tooltip>
      </template>

      <!--문서 삭제 아이콘 / 누르면 deleteDialog 표시-->
      <template v-slot:item.actions="{ item }">
        <v-icon
            small
            @click="deleteItem(item)"
        >
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>

    <!--문서 표시(애니메이션)-->
    <v-expand-transition v-if="showDm">
      <document-card
          class="cardDm transition-fast-in-fast-out fill-height"
          :name="dmItem.noteName"
          :contents="dmItem.content"
          @close="closeDm()"
      />
    </v-expand-transition>

    <!--문서 추가 버튼-->
    <v-btn id="add" class = "white--text" color = "blue-grey darken-2" @click="upload()">문서추가</v-btn>

    <!--문서 추가 dialog-->
    <v-dialog v-model="dialogUpload" max-width="500px">
      <v-card>
        <v-card-title class="text-h5">문서업로드</v-card-title>

        <v-card-text>
          <v-file-input multiple label="File input" accept="text/*"/>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeUplode">취소</v-btn>
          <v-btn color="blue darken-1" text>업로드</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-sheet>
</template>

<script>
import DocumentCard from "@/components/DocumentCard"
import axios from "axios";

export default {
  name: "DocumentList",
  components: {
    DocumentCard,
  },
  data() {
    return {
      search: '',
      dialogDelete: false,
      dialogUpload: false,
      showDm: false,
      headers: [
        {
          text: '추가순서',
          align: 'start',
          width: 100,
          value: 'order'
        },
        {
          text: '이름',
          align: 'center',
          width: '20vw',
          value: 'noteName'
        },
        {
          text: '수정일',
          align: 'center',
          width: 110,
          value: 'modifiedAt'
        },
        {
          text: '',
          value: 'actions',
          align: 'start',
          width: 50,
          sortable: false
        }
      ],
      items: [],
      editedIndex: -1,
      editedItem: {
        order: 0,
        noteName: '',
        modifiedAt: '',
        content: ''
      },
      defaultItem: {
        order: 0,
        noteName: '',
        modifiedAt: '',
        content: ''
      },
      dmItem: {
        noteName: '문서이름',
        content: '내용없음'
      },
      getId:{
        id : 0
      }
    }
  },
  watch: {
    dialogDelete (val) {
      val || this.closeDelete()
    },
    dialogUpload (val) {
      val || this.closeUplode()
    }
  },

  mounted() {
    this.getNote()
  },

  methods: {
    //노트 불러오기 axios
    getNote(){
      let uid = localStorage.getItem("uid")
      axios
          .get(`http://localhost:3000/note/${uid}`)
          .then(res=>{
            console.log(res)
            this.items=res.data.notes
            let note_order = res.data.notes[this.items.length-1].order
            localStorage.setItem("noteOrder", note_order)
          })
          .catch(err=>{
            console.log(err)
          })
    },

    //문서 삭제 axios
    /*deleteNote(id){
      axios
      .delete(`http://localhost:3000/note/`, id)
      .then(res=>{
        console.log(res)
      })
      .catch(err=>{
        console.log(err)
      })
    },*/

    deleteItem (item) {
      this.editedIndex = this.items.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm () {
      this.items.splice(this.editedIndex, 1)
      this.closeDelete()
    },
    closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    upload() {
      this.dialogUpload = true
    },
    closeUplode() {
      this.dialogUpload = false
    },
    openDm(item) {
      this.dmItem = Object.assign({}, item)
      this.showDm = true
    },
    closeDm() {
      this.showDm = false
    },
  }
}
</script>

<style scoped>
.tableName{
  max-width: 20vw;
}
.v-sheet{
  position: relative;
}
.cardDm{
  position: absolute;
  left: 0; top: 0;
  width: 100%;
  z-index: 100;
}
#add{
  position: absolute;
  bottom: 20px;
  margin-left: -47px;
}
</style>