<template>
  <div class="editor">
    <!-- 에디터 메뉴바 선택적으로 표시 (상위 컴포넌트에서 menubar,button = false||true 명시) -->
    <editor-menubar class="edHeader" v-if="swmenubar" :editor="editor" @stshow="$emit('stshow')" :swbutton="swbutton"/>

    <editor-content class="edContent" :editor="editor"/>
  </div>
</template>

<script>
import { Editor, EditorContent } from '@tiptap/vue-2'
import StarterKit from '@tiptap/starter-kit';
import TaskList from '@tiptap/extension-task-list'
import TaskItem from '@tiptap/extension-task-item'
import Highlight from '@tiptap/extension-highlight'
import EditorMenubar from "@/components/EditorMenubar";
export default {
  name: "TiptapEditor",
  props: ["description", "button", "editable", "menubar"],
  components: {
    EditorContent,
    EditorMenubar
  },
  data() {
    return {
      editor: null,
      swbutton: this.button,
    }
  },
  mounted() {
    this.editor = new Editor({
      editable: this.editable,
      extensions: [
        StarterKit,
        Highlight,
        TaskList,
        TaskItem,
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
  padding: 1.25rem 1rem;
  flex: 1 1 auto;
  overflow-x: hidden;
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