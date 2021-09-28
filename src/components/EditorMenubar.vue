<template>
  <div>
    <template v-for="(item, index) in items">
      <div class="divider" v-if="item.type === 'divider'" :key="`divider${index}`" />

      <!--폰트 크기 변경 버튼-->
      <editor-fontsize v-else-if="item.type === 'fontSize'" :key="index"
                       :editor="editor" :remixiconUrl="remixiconUrl"
                       :title="item.title"
      />

      <!--폰트&배경 색상 변경 버튼-->
      <editor-fontcolor v-else-if="item.type === 'Color'" :key="index"
                        :editor="editor" :remixiconUrl="remixiconUrl"
                        :title="item.title"
                        :iconName="item.icon"
                        :btnName="item.btnName"
      />

      <!--정렬 변경 버튼-->
      <editor-align v-else-if="item.type === 'Align'" :key="index"
                    :editor="editor" :remixiconUrl="remixiconUrl"
                    :title="item.title"
      />

      <!-- 해당하는 메뉴버튼 아이콘으로 -->
      <v-btn v-else :key="index"
              class="menuItem"
              fab
              text
              elevation="0"
              :class="{ 'is-active': isActive ? item.isActive(): '' }"
              @click="item.action()"
              :title="item.title"
      >
        <svg class="remix">
          <use :xlink:href="`${remixiconUrl}#ri-${item.icon}`" />
        </svg>
      </v-btn>
    </template>

    <v-spacer/>

    <!-- 문장추천 버튼 -->
    <v-btn class="white--text" color="blue-grey darken-2"
           v-if="swbutton" @click="$emit('stshow')"
    >
      문장추천
    </v-btn>
  </div>
</template>

<script>
import remixiconUrl from 'remixicon/fonts/remixicon.symbol.svg'
import EditorFontcolor from "@/components/EditorFontcolor";
import EditorFontsize from "@/components/EditorFontsize";
import EditorAlign from "@/components/EditorAlign";

export default {
  name: "EditorMenubar",
  props: ["editor", "swbutton"],
  components: {
    EditorFontcolor,
    EditorFontsize,
    EditorAlign,
  },
  data() {
    return {
      remixiconUrl,
      isActive: null,
      color: '',
      items: [
        {
          type: 'fontSize',
          title: '글자크기',
        },
        {
          icon: 'bold',
          title: '굵게',
          action: () => this.editor.chain().focus().toggleBold().run(),
          isActive: () => this.editor.isActive('bold'),
        },
        {
          icon: 'italic',
          title: '기울임',
          action: () => this.editor.chain().focus().toggleItalic().run(),
          isActive: () => this.editor.isActive('italic'),
        },
        {
          icon: 'underline',
          title: '밑줄',
          action: () => this.editor.chain().focus().toggleUnderline().run(),
          isActive: () => this.editor.isActive('underline'),
        },
        {
          icon: 'strikethrough',
          title: '취소선',
          action: () => this.editor.chain().focus().toggleStrike().run(),
          isActive: () => this.editor.isActive('strike'),
        },
        {
          type: 'Color',
          icon: 'font-color',
          title: '글자색상',
          btnName: 'fontcolor',
        },
        {
          type: 'Color',
          icon: 'mark-pen-line',
          title: '하이라이트',
          btnName: 'highlight',
        },
        {
          type: 'divider',
        },
        {
          icon: 'link',
          title: '링크',
          action: () => this.setLink,
          isActive: () => this.editor.isActive('link'),
        },
        {
          icon: 'image-add-line',
          title: '이미지삽입',
          action: () => this.addImage
        },
        {
          type: 'divider',
        },
        {
          type: 'Align',
          title: '정렬',
        },
        {
          icon: 'list-unordered',
          title: '글머리 기호',
          action: () => this.editor.chain().focus().toggleBulletList().run(),
          isActive: () => this.editor.isActive('bulletList'),
        },
        {
          icon: 'list-ordered',
          title: '번호 매기기',
          action: () => this.editor.chain().focus().toggleOrderedList().run(),
          isActive: () => this.editor.isActive('orderedList'),
        },
        {
          icon: 'list-check-2',
          title: 'Task List',
          action: () => this.editor.chain().focus().toggleTaskList().run(),
          isActive: () => this.editor.isActive('taskList'),
        },
        {
          type: 'divider',
        },
        {
          icon: 'separator',
          title: 'Horizontal Rule',
          action: () => this.editor.chain().focus().setHorizontalRule().run(),
        },
        {
          icon: 'format-clear',
          title: '서식 지우기',
          action: () => this.editor.chain()
              .focus()
              .clearNodes()
              .unsetAllMarks()
              .run(),
        },
        {
          type: 'divider',
        },
        {
          icon: 'arrow-go-back-line',
          title: '실행취소',
          action: () => this.editor.chain().focus().undo().run(),
        },
        {
          icon: 'arrow-go-forward-line',
          title: '재실행',
          action: () => this.editor.chain().focus().redo().run(),
        },
        {
          type: 'divider',
        },
        {
          icon: 'delete-bin-6-line',
          title: '전체삭제',
          action: () => this.editor.commands.clearContent(),
        },
      ],
    }
  },
  methods: {
    setLink() {
      const previousUrl = this.editor.getAttributes('link').href
      const url = window.prompt('URL', previousUrl)

      // cancelled
      if (url === null) {
        return
      }

      // empty
      if (url === '') {
        this.editor
            .chain()
            .focus()
            .extendMarkRange('link')
            .unsetLink()
            .run()

        return
      }

      // update link
      this.editor
          .chain()
          .focus()
          .extendMarkRange('link')
          .setLink({ href: url })
          .run()
    },
    addImage() {
      const url = window.prompt('URL')

      if (url) {
        this.editor.chain().focus().setImage({ src: url }).run()
      }
    },
  },
}
</script>

<style scoped>
.divider {
  width: 2px;
  height: 1.25rem;
  background-color: rgba(0,0,0, 0.1);
  margin-left: 0.5rem;
  margin-right: 0.75rem;
}
.menuItem {
  width: 1.5rem;
  height: 1.5rem;
  color: #0D0D0D;
  border: none;
  background-color: transparent;
  border-radius: 0.4rem;
  padding: 0.25rem;
  margin-right: 0.25rem;
}
.menuItem:hover {
  color: #FFF;
  background-color: #0D0D0D;
}
.remix {
  width: 1.5em;
  height: 1.5em;
  fill: currentColor;
}
</style>