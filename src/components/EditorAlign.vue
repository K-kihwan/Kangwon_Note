<template>
  <v-menu
      bottom
      offset-y
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
          class="menuItem"
          :title=title
          fab
          text
          elevation="0"
          v-bind="attrs"
          v-on="on"
      >
        <svg class="remix">
          <use :xlink:href="`${remixiconUrl}#ri-${'align-left'}`"/>
        </svg>
      </v-btn>
    </template>

    <!--정렬버튼-->
    <template v-for="(item, index) in alignItems">
      <v-btn :key="index"
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
  </v-menu>
</template>

<script>
export default {
  name: "EditorAlign",
  props: ["editor", "remixiconUrl","title"],
  data() {
    return {
      isActive: null,
      alignItems: [
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
      ]
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