<template>
  <div class="editor text-left">
    <!-- 에디터 메뉴바 선택적으로 표시 (상위 컴포넌트에서 menubar,button = false||true 명시) -->
    <editor-menubar class="edHeader" v-if="swmenubar" :editor="editor" @stshow="$emit('stshow')" :swbutton="swbutton"/>

    <editor-content class="edContent" :editor="editor"/>
  </div>
</template>

<script>
import { Editor, EditorContent } from '@tiptap/vue-2'
import EditorMenubar from "@/components/EditorMenubar";
import StarterKit from '@tiptap/starter-kit';
import TaskList from '@tiptap/extension-task-list'
import TaskItem from '@tiptap/extension-task-item'
import Highlight from '@tiptap/extension-highlight'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import Text from '@tiptap/extension-text'
import TextStyle from '@tiptap/extension-text-style'
import { Color } from '@tiptap/extension-color'
import FontFamily from '@tiptap/extension-font-family'
import Typography from '@tiptap/extension-typography'

export default {
  name: "TiptapEditor",
  props: ["description", "swbutton", "editable", "menubar"],
  components: {
    EditorContent,
    EditorMenubar
  },
  data() {
    return {
      editor: null,
    }
  },
  mounted() {
    this.editor = new Editor({
      editable: this.editable,
      extensions: [
        StarterKit,
        Underline,
        Highlight.configure({ multicolor: true }),
        TaskList,
        TaskItem,
        Text,
        TextStyle,
        Color,
        FontFamily,
        TextAlign.configure({
          types: ['heading', 'paragraph'],
        }),
        Typography
      ],
      content: this.description,
    });
  },
  beforeDestroy() {
    this.editor.destroy();
  },
  watch: {
    editable() {
      this.editor.setEditable(this.editable)
    },
  },
  computed: {
    swmenubar: function () {
      return this.menubar
    }
  }
}
</script>

<style scoped>
.editor {
  display: flex;
  flex-direction: column;
  max-height: 66vh;
  color: #0D0D0D;
  background-color: #FFF;
  border: 3px solid #E0E0E0;
  border-radius: 0.75rem;
}
.edHeader {
  display: flex;
  align-items: center;
  flex: 0 0 auto;
  flex-wrap: wrap;
  padding: 0.25rem;
  border-bottom: 3px solid #E0E0E0;
}
.edContent {
  padding: 1rem;
  flex: 1 1 auto;
  word-break: break-all;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}
::-webkit-scrollbar{
  width: 5px;
  margin-left: -5px;
}
::-webkit-scrollbar-thumb{
  background-color: #9E9E9E;
  border-radius: 10px;
}
</style>

<!--윤곽선 제거-->
<style>
.ProseMirror:focus {
  outline: none;
}
</style>