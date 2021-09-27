
<template>
  <v-sheet class="fill-height elevation-6 rounded-xl d-flex flex-column" color="white">
    <!--문서 목록 테이블-->
    <v-data-table
        :headers="headers"
        :items="items"
        :search="search"
        :page.sync="page"
        :items-per-page="itemsPerPage"
        sort-by="number"
        hide-default-footer
        @page-count="pageCount = $event"
        style="flex: 1 1 auto"
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
                <v-btn color="blue darken-1" text @click="deleteNote">예</v-btn>
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

    <div class="text-center ma-2">
      <v-pagination
          v-model="page"
          :length="pageCount"
      ></v-pagination>

      <!--문서 추가 버튼-->
      <v-btn class = "white--text" color = "blue-grey darken-2" @click="upload()">문서추가</v-btn>
    </div>

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
      page: 1,
      pageCount: 0,
      itemsPerPage: 0,
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
        content: '',
        id: 0
      },
      defaultItem: {
        order: 0,
        noteName: '',
        modifiedAt: '',
        content: '',
        id: 0
      },
      dmItem: {
        noteName: '문서이름',
        content: '내용없음',
        id: 0
      },
    }
  },
  watch: {
    dialogDelete (val) {
      val || this.closeDelete()
    },
    dialogUpload (val) {
      val || this.closeUplode()
    },
  },

  created() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
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
            if(note_order == null)
            {
              note_order = "0"
            }
            localStorage.setItem("noteOrder", note_order)
          })
          .catch(err=>{
            console.log(err)
          })
    },

    //노트 삭제
    deleteNote(){
      let deleteId = localStorage.getItem("deleteNoteId")
      axios
          .delete(`http://localhost:3000/note/${deleteId}`)
          .then(res=>{
            console.log(res)
            this.items.splice(this.editedIndex, 1)
            this.closeDelete()
          })
          .catch(err=>{
            console.log(err)
            alert("err!")
          })
    },

    deleteItem (item) {
      this.editedIndex = this.items.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
      let deleteNoteId = this.editedItem.id
      localStorage.setItem("deleteNoteId", deleteNoteId)
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
      let dmNoteId = this.dmItem.id
      localStorage.setItem("dmNoteId", dmNoteId)
    },
    closeDm() {
      this.showDm = false
    },
    handleResize() {
      this.itemsPerPage = (window.innerHeight*0.9-200)/48;
    }
  }
}
</script>

<style scoped>
.v-sheet{
  position: relative;
}
.cardDm{
  position: absolute;
  left: 0; top: 0;
  width: 100%;
  z-index: 100;
}
</style>