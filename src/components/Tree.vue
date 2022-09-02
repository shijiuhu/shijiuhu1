<template>
  <div>
    <label :for="list.name">
      <input type="checkbox" :id="list.name" :checked="list.isChecked" @click="isSelectedAll(list)">
      <span>{{list.name}}</span>
    </label>
    <span v-if="hasChildren" 
      :class="{ 'triangleUp': !list.isOpen, 'triangleDown': list.isOpen }" 
      @click="toggleTriangle(list)">
    </span>
    <div v-if="hasChildren" v-show="list.isOpen" class="item-child">
      <tree v-for="item in list.children" :list="item" :key="item"></tree>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Tree',
  props: {
    list: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  created() {
    // 默认初始时展开页面
    this.isListAll(true)
  },
  computed: {
    hasChildren() {
      return this.list.children && this.list.children.length
    }
  },
  methods: {
    // 是否展示所有
    isListAll(flag) {
      this.listNode(this.list, flag)
    },

    // 展示节点
    listNode(list, flag) {
      if(list.children && list.children.length) {
        list.isOpen = flag
        for(let i = 0; i <= list.children.length - 1; i++) {
          this.listNode(list.children[i], flag)
        }
      }
    },

    // 切换向上向下箭头
    toggleTriangle(item) {
      item.isOpen = !item.isOpen
    },

    // 全选或全取消当前节点及子节点，调用子节点
    isSelectedAll(list) {
      list.isChecked = !list.isChecked
      this.isSelectedAllChildren(list, list.isChecked)
    },

    // 子节点全选或全取消处理
    isSelectedAllChildren(list, flag) {
      if(list.children && list.children.length) {
        for(let i = 0; i <= list.children.length - 1; i++) {
          list.children[i].isChecked = flag
          this.isSelectedAllChildren(list.children[i], flag)
        }
      }
    }
  }
}
</script>

<style scoped>
.triangleUp::before {
  content: '';
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-bottom: 8px solid black;
  width: 0;
  height: 0;
  font-size: 0;
  position: relative;
  bottom: 10px;
  left: 2px
}

.triangleDown::after {
  content: '';
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-top: 8px solid black;
  width: 0;
  height: 0;
  font-size: 0;
  position: relative;
  bottom: 1px;
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