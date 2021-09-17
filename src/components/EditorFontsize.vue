<template>
  <v-menu
      bottom
      offset-y
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
          class="menuItem"
          fab
          text
          elevation="0"
          v-bind="attrs"
          v-on="on"
      >
        <svg class="remix">
          <use :xlink:href="`${remixiconUrl}#ri-${'font-size-2'}`"/>
        </svg>
      </v-btn>
    </template>

    <v-list>
      <v-list-item :class="{ 'is-active': isActive ? editor.isActive('heading', { : index+1 }): '' }"
                   v-for="(size, index) in sizeOption" :key="index"
                   @click="editor.chain().focus().toggleHeading({ level: index+1 }).run()"
      >
        <v-list-item-title>{{ size }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>

export default {
  name: "EditorFontsize",
  props: ["editor", "remixiconUrl",],
  data() {
    return {
      isActive: null,
      fontSize: '',
      sizeOption: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']
    }
  },
  watch: {
    fontSize() {
    }
  },
  methods: {

  },
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