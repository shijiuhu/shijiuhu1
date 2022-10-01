<!--
一个可以递归渲染自己的嵌套树组件。
你可以双击一个项目将其转变为一个文件夹。
-->
<template>
  <ul>
    <TreeItem class="item" :model="treeData"></TreeItem>
  </ul>
</template>

<script>
import TreeItem from './TreeItem.vue'

const treeData = {
  name: 'My Tree',
  children: [
    { name: 'hello' },
    { name: 'wat' },
    {
      name: 'child folder',
      children: [
        {
          name: 'child folder',
          children: [{ name: 'hello' }, { name: 'wat' }]
        },
        { name: 'hello' },
        { name: 'wat' },
        {
          name: 'child folder',
          children: [{ name: 'hello' }, { name: 'wat' }]
        }
      ]
    }
  ]
}

export default {
  name: 'TreeView',
  components: {
    TreeItem
  },
  data() {
    return {
      treeData
    }
  }
}
</script>

<style scoped>
.item {
  cursor: pointer;
  line-height: 1.5;
}
</style>