<template>
  <div v-for="item in treeList" :key="item">
    <label :for="item.name">
      <input type="checkbox" :id="item.name">
      <span>{{item.name}}</span>
    </label>
    <span v-if="item.children && item.children.length" 
      :class="{ 'triangleUp': item.triangleUp, 'triangleDown': item.triangleDown }" 
      @click="toggleTriangle(item)">
    </span>
    <div v-if="item.children && item.children.length" v-show="item.triangleDown" class="item-child">
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
    }
  },
  created() {
    this.treeList = JSON.parse(JSON.stringify(this.list))

    // 默认初始时展开页面
    this.isListAll(true)
  },
  methods: {
    // 展示节点
    listNode(array, flag) {
      for (let i = 0; i <= array.length - 1; i++) {
        array[i].triangleUp = !flag
        array[i].triangleDown = flag
        if(array[i].children && array[i].children.length) {
          this.listNode(array[i].children)
        }
      }
    },

    // 是否展示所有
    isListAll(flag) {
      this.listNode(this.treeList, flag)
    },

    // 切换向上向下箭头
    toggleTriangle(item) {
      item.triangleUp = !item.triangleUp
      item.triangleDown = !item.triangleDown
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