<template>
  <li>
    <div
      :class="{ bold: isFolder }"
      @click="toggle"
      @dblclick="changeType">
      {{ model.name }}
      <span v-if="isFolder">[{{ isOpen ? '-' : '+' }}]</span>
    </div>
    <ul v-show="isOpen" v-if="isFolder">
      <!--
        一个可以通过其“name”选项递归渲染自己的组件，
        (如果使用单文件组件，则从文件名推断)
      -->
      <TreeItem
        class="item"
        v-for="model in model.children"
        :model="model">
      </TreeItem>
      <li class="add" @click="addChild">+</li>
    </ul>
  </li>
</template>

<script>
export default {
  name: 'TreeItem', // 在引用自身的时候是必须的
  props: {
    model: Object
  },
  data() {
    return {
      isOpen: false
    }
  },
  computed: {
    isFolder() {
      return this.model.children && this.model.children.length
    }
  },
  methods: {
    toggle() {
      if (this.isFolder) {
        this.isOpen = !this.isOpen
      }
    },
    changeType() {
      if (!this.isFolder) {
        this.model.children = []
        this.addChild()
        this.isOpen = true
      }
    },
    addChild() {
      this.model.children.push({
        name: 'new stuff'
      })
    }
  }
}
</script>

<style scoped>
.bold {
  font-weight: bold;
}
</style>