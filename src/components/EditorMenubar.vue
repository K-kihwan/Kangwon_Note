<template>
  <div>
    <template v-for="(item, index) in items">
      <div class="divider" v-if="item.type === 'divider'" :key="`divider${index}`" />

      <!-- 해당하는 메뉴버튼 아이콘으로 -->
      <button v-else :key="index"
              class="menuItem"
              :class="{ 'is-active': isActive ? item.isActive(): '' }"
              @click="item.action()"
              :title="item.title"
      >
        <svg class="remix">
          <use :xlink:href="`${remixiconUrl}#ri-${item.icon}`" />
        </svg>
      </button>
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
export default {
  name: "EditorMenubar",
  props: ["editor", "swbutton"],
  data() {
    return {
      remixiconUrl,
      isActive: null,
      items: [
        {
          icon: 'bold',
          title: '굵게',
          action: () => this.editor.chain().focus().toggleBold().run(),
          isActive: () => this.editor.isActive('bold'),
        },
        {
          icon: 'italic',
          title: '기울기',
          action: () => this.editor.chain().focus().toggleItalic().run(),
          isActive: () => this.editor.isActive('italic'),
        },
        {
          icon: 'strikethrough',
          title: '취소선',
          action: () => this.editor.chain().focus().toggleStrike().run(),
          isActive: () => this.editor.isActive('strike'),
        },
        {
          icon: 'mark-pen-line',
          title: '하이라이트',
          action: () => this.editor.chain().focus().toggleHighlight().run(),
          isActive: () => this.editor.isActive('highlight'),
        },
        {
          type: 'divider',
        },
        {
          icon: 'h-1',
          title: 'Heading 1',
          action: () => this.editor.chain().focus().toggleHeading({level: 1}).run(),
          isActive: () => this.editor.isActive('heading', {level: 1}),
        },
        {
          icon: 'h-2',
          title: 'Heading 2',
          action: () => this.editor.chain().focus().toggleHeading({level: 2}).run(),
          isActive: () => this.editor.isActive('heading', {level: 2}),
        },
        {
          icon: 'align-left',
          title: '좌정렬',
          action: () => this.editor.chain().focus().setTextAlign('left').run(),
          isActive: () => this.editor.isActive({ textAlign: 'left' }),
        },
        {
          icon: 'align-center',
          title: '가운데정렬',
          action: () => this.editor.chain().focus().setTextAlign('center').run(),
          isActive: () => this.editor.isActive({ textAlign: 'center' }),
        },
        {
          icon: 'align-right',
          title: '우정렬',
          action: () => this.editor.chain().focus().setTextAlign('right').run(),
          isActive: () => this.editor.isActive({ textAlign: 'right' }),
        },
        {
          icon: 'list-unordered',
          title: 'Bullet List',
          action: () => this.editor.chain().focus().toggleBulletList().run(),
          isActive: () => this.editor.isActive('bulletList'),
        },
        {
          icon: 'list-ordered',
          title: 'Ordered List',
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
          icon: 'double-quotes-l',
          title: 'Blockquote',
          action: () => this.editor.chain().focus().toggleBlockquote().run(),
          isActive: () => this.editor.isActive('blockquote'),
        },
        {
          icon: 'separator',
          title: 'Horizontal Rule',
          action: () => this.editor.chain().focus().setHorizontalRule().run(),
        },
        {
          type: 'divider',
        },
        {
          icon: 'text-wrap',
          title: 'Hard Break',
          action: () => this.editor.chain().focus().setHardBreak().run(),
        },
        {
          icon: 'format-clear',
          title: '스타일 없애기',
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
      ],
    }
  }
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
  width: 1.75rem;
  height: 1.75rem;
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
  width: 100%;
  height: 100%;
  fill: currentColor;
}
</style>