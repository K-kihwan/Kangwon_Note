<template>
  <div class="containBox">
    <table class="tableSet">
      <tr>
        <th class="numberSet" @click="sortby">추가순서</th>
        <th class="nameSet" @click="test('hi')">이름</th>
        <th class="dateSet">수정일</th>
      </tr>
      <tr v-for="item in items" :key="item.number">
        <td>{{item.number}}</td>
        <td>{{item.name}}</td>
        <td>{{item.date}}</td>
      </tr>
    </table>

    <input class="add" ref="file" type="file" name="file" id="file" accept="text/*" multiple style="display: none"/>
    <button class="add" @click="clickFile">문서추가</button>
  </div>
</template>

<script>
export default {
  name: "DocumentList",
  data() {
    return {
      items: [
        {
          "number": "2",
          "name": "문서1",
          "date": "2021-07-12"
        },
        {
          "number": "1",
          "name": "문서2",
          "date": "2021-07-06"
        },
        {
          "number": "3",
          "name": "문서3",
          "date": "2021-06-30"
        },
        {
          "number": "4",
          "name": "문서4",
          "date": "2021-06-21"
        },
        {
          "number": "5",
          "name": "문서5",
          "date": "2021-07-01"
        }
      ]
    }
  },
  methods: {
    collator() {
      Intl.Collator('en', {numeric: true, sensitivity: 'base'});
    },
    sortby() {
      return this.items.number.sort();
    },
    test: function(message) {
      alert(message);
    },
    clickFile() {
      this.$refs['file'].click();
    }
  }
}
</script>

<style scoped>

.containBox{
  position: relative;
  display: block;
  overflow: hidden;
  margin: 0 auto;
  height: 100%;
}

.tableSet{
  position: absolute;
  left: 10%; right: 10%;
  width: 80%;
}

th{
  padding: 10px;
  text-align: center;
  font-weight: bold;
  border: 1px solid #ccc;
}

td{
  padding:5px;
}

.numberSet{
  width:10%;
}

.nameSet{
  width:70%;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.dateSet{
  width:20%;
}

.add{
  position: absolute;
  bottom: 20px;
  width: 160px; height: 60px;
  border-radius: 10px;
  margin-left: -80px;
  background: #455A64;
  color: white;
}
</style>