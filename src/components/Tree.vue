<template>
  <div v-for="item in treeList" :key="item">
    <label :for="item.name">
      <input type="checkbox" :id="item.name">
      <span @click="isOpen(item)">{{item.name}}</span>
    </label>
    <span v-if="item.children && item.children.length" 
      :class="{ 'triangleUp': itriangleUp, 'triangleDown': itriangleDown }" 
      @click="toggleTriangle">
    </span>
    <div v-if="item.children && item.children.length" v-show="item.isOpened && itriangleUp" class="item-child">
      <tree :list="item.children"></tree>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Tree',
  props: {
    list: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      treeList: [],
      itriangleUp: true,
      itriangleDown: false
    }
  },
  created() {
    this.treeList = JSON.parse(JSON.stringify(this.list))

    // 默认初始时展开页面
    this.isListAll(true)
  },
  methods: {
    // 是否展开该层节点
    isOpen(item) {
      item.isOpened = !item.isOpened
    },

    // 展示节点
    listNode(array, flag) {
      for (let i = 0; i <= array.length - 1; i++) {
        array[i].isOpened = flag
        if(array[i].children && array[i].children.length) {
          this.listNode(array[i].children)
        }
      }
    },

    // 是否展示所有
    isListAll(flag) {
      this.listNode(this.treeList, flag)
    },

    toggleTriangle() {
      this.itriangleUp = !this.itriangleUp
      this.itriangleDown = !this.itriangleDown
    }
  }
}
</script>

<style scoped>
.triangleUp::before {
  content: '';
  border: 8px solid transparent;
  border-bottom-color: black;
  width: 0;
  height: 0;
  position: relative;
  bottom: 14px;
  left: 2px
}

.triangleDown::after {
  content: '';
  border: 8px solid transparent;
  border-top-color: black;
  width: 0;
  height: 0;
  position: relative;
  top: 15px;
  left: 2px
}

.item-child {
  padding-left: 20px;
}

ul, li {
  list-style: none;
  margin: 0;
}
</style>