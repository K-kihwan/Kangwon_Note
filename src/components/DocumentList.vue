<template>
  <v-sheet rounded="xl" color="white" min-height="90vh">
    <v-data-table
        :headers="headers"
        :items="items"
        :search="search"
        sort-by="number"
        class="elevation-6 rounded-xl"
        hide-default-footer
        style="height: 90vh"
    >
      <template v-slot:top>
        <v-toolbar flat color="#9E9E9E" class="white--text">
          <v-toolbar-title>문서목록</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-text-field
              color="white"
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
              dark
          ></v-text-field>
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
      <template v-slot:item="{ item }">
        <tr>
          <td align="start">{{item.number}}</td>
          <td class="nameTable" @click="openDm(item)">{{item.name}}</td>
          <td>{{item.date}}</td>
          <td>
            <v-icon
                small
                @click="deleteItem(item)"
            >
              mdi-delete
            </v-icon>
          </td>
        </tr>
      </template>
    </v-data-table>

    <v-expand-transition>
      <v-card
          shaped
          elevation="5"
          outlined
          v-if="showDm"
          class="transition-fast-in-fast-out pa-3 cardDm"
      >
        <v-card-title>
          <span class="dmName text-h5">{{dmItem.name}}</span>
          <v-spacer></v-spacer>
          <v-btn icon @click="closeDm">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="black--text py-5 px-10 text-body-1">
          <span>{{dmItem.contents}}</span>
        </v-card-text>
      </v-card>
    </v-expand-transition>

    <v-btn id="add" class = "white--text" color = "blue-grey darken-2" @click="upload()">문서추가</v-btn>
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
export default {
  name: "DocumentList",
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
          value: 'number'
        },
        {
          text: '이름',
          align: 'center',
          width: 'fill-width',
          value: 'name'
        },
        {
          text: '수정일',
          align: 'center',
          width: 110,
          value: 'date'
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
        number: 0,
        name: '',
        date: '',
        contents: ''
      },
      defaultItem: {
        number: 0,
        name: '',
        date: '',
        contents: ''
      },
      dmItem: {
        name: '문서이름',
        contents: '내용없음'
      },
    }
  },
  watch: {
    dialogDelete (val) {
      val || this.closeDelete()
    },
    dialogUpload (val) {
      val || this.closeDelete()
    }
  },

  created () {
    this.initialize()
  },

  methods: {
    initialize () {
      this.items = [
        {
          number: 2,
          name: '문서문서문서문서문서문서문서문서문서문서문서문서문서문서문서문서문서문서문서문서문서문서문서문서문서문서문서문서문서문서1문서문서문서문서문서문서문서문서문서문서문서문서',
          date: '2021-07-12',
          contents: '1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다1번문서입니다'
        },
        {
          number: 1,
          name: '문서2',
          date: '2021-07-06',
          contents: '2번문서입니다2번문서입니다2번문서입니다2번문서입니다2번문서입니다2번문서입니다2번문서입니다2번문서입니다2번문서입니다2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222'
        },
        {
          number: 3,
          name: '문서3',
          date: '2021-06-30',
          contents: '3번문서입니다3번문서입니다3번문서입니다3번문서입니다3번문서입니다3번문서입니다3번문서입니다3번문서입니다3번문서입니다3번문서입니다3번문서입니다3번문서입니다3번문서입니다3번문서입니다'
        },
        {
          number: 4,
          name: '문서4',
          date: '2021-06-21',
          contents: '4번문서입니다4번문서입니다4번문서입니다4번문서입니다4번문서입니다4번문서입니다4번문서입니다4번문서입니다4번문서입니다4번문서입니다4444444444444444444444444444444444444444444444444444444444444444444444444444444'
        },
        {
          number: 5,
          name: '문서5',
          date: '2021-07-01',
          contents: '5번문서입니다5번문서입니다5번문서입니다5번문서입니다5번문서입니다5번문서입니다5번문서입니다5번문서입니다5번문서입니다5번문서입니다5번문서입니다5번문서입니다5번문서입니다5번문서입니다5번문서입니다5번문서입니다5번문서입니다5번문서입니다5번문서입니다'
        }
      ]
    },
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
    }
  }
}
</script>

<style scoped>
.nameTable{
  max-width: 1px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.td{
  align: center;
}
.v-sheet{
  position: relative;
}
.cardDm{
  position: absolute;
  width: 90%; height: 74vh;
  left: 50%; top: 50%;
  margin-left: -45%; margin-top: -37vh;
}
.dmName{
  max-width: 70%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
#add{
  position: absolute;
  bottom: 20px;
  margin-left: -47px;
}
</style>