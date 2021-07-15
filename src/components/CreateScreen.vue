<template>
  <div class="createBox">
    <div class="sentenceBox">
      <botton class="sentencebotton" v-for="sentence in sentences" :key="sentence" v-show="show">
        <a >{{ sentence }}</a>
      </botton>
    </div>
    <div class="manubar">
      <ul class="manubaritem" v-for="manuitem in manuitems" :key="manuitem.name">
        <li><a>{{ manuitem.name }}</a>
          <ul>
            <li v-for="contant in manuitem.contants" :key="contant">
              <a>{{ contant }}</a>
            </li>
          </ul>
        </li>
      </ul>

      <button id="push" class="toolbaritem" @click="sentenceShow">단어추천</button>
    </div>
    <textarea class="textBox" placeholder="여기에 작성하시면 됩니다."></textarea>
    <button id="outside" class="savebutton">외부 저장</button>
    <button id="cloud" class="savebutton">클라우드 저장</button>
  </div>
</template>

<script>
export default {
  name: "CreateScreen",
  data() {
    return {
      show: false,
      sentences: [
        "여기에 추천 문장이 표시됩니다.",
        "'단어추천'버튼을 누르거나 특정 키를 누르는 것으로 표시 할 수 있습니다.",
        "역사학자들은 수니파와 시아파가 오늘날 반목하는 이유를 설명하기 위해 노력해왔다. 많은 이들은 갈등의 원인이 오랜 종교적 차이에 있다고 주장한다. 하지만 1300년 동안 두 종족이 갈등한 역사의 모든 사회적, 경제적, 문화적 요인까지 고려해야 한다."
      ],
      manuitems: [
        {
          "name": "파일",
          "contants": [
            "새 문서", "열기"
          ]
        },
        {
          "name": "글꼴",
          "contants": [
            "크기", "폰트", "기울기", "굵게"
          ]
        },
        {
          "name": "단락",
          "contants": [
            "오른쪽", "가운데", "왼쪽"
          ]
        },
        {
          "name": "편집",
          "contants": [
            "붙여넣기", "복사", "잘라내기"
          ]
        }
      ]
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
    }
  }
}
</script>

<style scoped>
.createBox{
  overflow: hidden;
  margin: 0 auto;
  height: 100%;
}

.sentenceBox{
  height: 20%;
  border: 1px solid black;
  border-radius: 20px;
  overflow-y: auto;
}

.sentencebotton{
  display: block;
  clear: both;
  float: left;
  margin: 5px;
  padding: 10px;
  border: 1px solid #7ACC7A;
  border-radius: 20px;
  font-size: 25px;
  text-align: left;
  background: #DDFFDD;
}

.sentencebotton a{
}

.manubar{
  display: flex;
  align-items: center;
  margin-top: 10px;
  height: 4%;
  border: 1px solid black;
  background: gainsboro;
  border-radius: 10px;
}

.manubaritem{
  margin: 0;
  list-style: none;
  padding: 5px 1px;
}

.manubaritem li{
  float: left;
  position: relative;
  margin: 5px 30px;
  padding: 0;
}

.manubaritem li a{
  display: block;
  padding: 7px 8px;
  margin: 0;
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.3);
}

.manubaritem li:hover > a{
  font-weight: bold;
}


.manubaritem ul{
  list-style: none;
  margin: 0;
  padding: 5px;
  position: absolute;
  left: 0;
  width: 100px;
  text-align: left;
  border: 1px solid;
  border-radius: 4px;
  box-shadow: 2px 6px 2px rgba(60, 64, 67 , 0.2);
  background: white;
  opacity: 0;
}

.manubaritem li:hover ul{
  opacity: 1;
}

.manubaritem li:hover ul li{
  overflow: visible;
}


.manubaritem ul li{
  float: none;
  margin: 0;
  padding: 0;
}

.manubaritem ul li:hover a{
  background: gainsboro;
  font-weight: bold;
}

#push{
  margin-left: auto;
  margin-right: 10px;
  padding: 5px;
  font-weight: bold;
}

.textBox{
  margin-top: 10px;
  width: 99%; height: 67%;
  border: 1px solid black;
}

.savebutton{
  float: right;
  width: 120px; height: 40px;
  border-radius: 10px;
  margin:10px;
  background: #455A64;
  color: white;
}

#outside{

}

#cloud{
  margin-right: -5px;
}
</style>