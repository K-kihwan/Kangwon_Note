<template>
  <v-menu
      style="width:20px"
      bottom
      offset-y
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn v-if="btnName == 'fontcolor'"
             class="menuItem"
             :title=title
             fab
             text
             elevation="0"
             v-bind="attrs"
             v-on="on"
      >
        <svg class="remix">
          <use :xlink:href="`${remixiconUrl}#ri-${iconName}`" :fill="editor.getAttributes('textStyle').color"/>
        </svg>
      </v-btn>

      <v-btn v-else-if="btnName === 'highlight'"
             class="menuItem"
             :title=title
             fab
             text
             elevation="0"
             v-bind="attrs"
             v-on="on"
      >
        <svg class="remix">
          <use :xlink:href="`${remixiconUrl}#ri-${iconName}`" :fill="editor.getAttributes('highlight').color"/>
        </svg>
      </v-btn>
    </template>

    <v-color-picker
        hide-inputs
        show-swatches
        hide-canvas
        hide-sliders
        swatches-max-height="12rem"
        elevation="15"
        v-model="color"
        @input="divideType(btnName)"
    ></v-color-picker>
  </v-menu>
</template>

<script>
export default {
  name: "EditorFontcolor",
  props: ["editor", "remixiconUrl", "iconName", "title", "btnName"],
  data() {
    return {
      isActive: null,
      color: '',
    }
  },
  watch: {
    color() {
      return this.editor.getAttributes('textStyle').color
    }
  },
  methods: {
    divideType: function (btnName) {
      if (btnName == 'fontcolor') {
        return this.editor.chain().focus().setColor(this.color).run()
      }
      else if (btnName == 'highlight') {
        return this.editor.chain().focus().toggleHighlight({color: this.color}).run()
      }
    }
  }
}
</script>

<style scoped>
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
