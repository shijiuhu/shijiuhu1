<template>
  <div>
    <label :for="list.name" v-if="list.isShow">
      <input type="checkbox" :id="list.name" :checked="list.isChecked" @click="isSelectedAll(list)">
      <span>{{list.name}}</span>
    </label>
    <span v-if="hasChildren && list.isShow" 
      :class="{ 'triangleUp': !list.isOpen, 'triangleDown': list.isOpen }" 
      @click="toggleTriangle(list)">
    </span>
    <i class="icon icon-trash"></i>
    <div v-if="hasChildren" v-show="list.isOpen" class="item-child">
      <tree v-for="item in list.children" :list="item" :key="item" @showProvinceName="showProvinceName"></tree>
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
    // 将原值按名称重新排列
    this.orderByName(this.list)

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
      list.isShow = true
      list.isMatchSearchContent = true
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
      // 选中同时向父组件传递省市树名称
      this.showProvinceName(list.name)

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
    },

    // 模糊查询符合要求的省市名称
    searchContent(searchContent) {
      this.matchSearchContent(this.list, searchContent)
      this.setShowNode(this.list)
    },

    // 循环遍历，找到符合要求的就设置isMatchSearchContent属性为true
    matchSearchContent(list, searchContent) {
      // 1.先本层设置
      if (list.name.includes(searchContent)) {
        list.isMatchSearchContent = true
      } else {
        list.isMatchSearchContent = false
      }

      // 2.再子节点循环遍历
      if (list.children && list.children.length) {
        for (let i = 0; i <= list.children.length - 1; i++) {
          this.matchSearchContent(list.children[i], searchContent)
        }
      }
    },

    // 如果自身或子节点有符合要求的匹配就返回为true
    isShowNode(list) {
      if (list.isMatchSearchContent) {
        return true
      } else if (list.children && list.children.length) {
        for (let i = 0; i <= list.children.length - 1; i++) {
          if (this.isShowNode(list.children[i])) {
            return true
          }
        }
      }
    },

    // 为每层都设置是否展示节点的属性，并最终用于页面展示
    setShowNode(list) {
      list.isShow = !!this.isShowNode(list) // 这里要双取反，方法返回为undefined实际就应置为false
      if (list.children && list.children.length) {
        for (let i = 0; i <= list.children.length - 1; i++) {
          this.setShowNode(list.children[i])
        }
      }
    },

    // 向父取件传递省市树名称
    showProvinceName(name) {
      this.$emit('showProvinceName', name)
    },

    // 结构树重新排序
    orderByName(list) {
      const array = list.children
      if(array && array.length) {
        // 1.先本层比较排序
        array.sort((a, b) => {
          return a.name.localeCompare(b.name)
        })

        // 2.再循环遍历子节点排序
        for(let i = 0; i <= array.length - 1; i++) {
          this.orderByName(array[i])
        }
      }
    }
  }
}
</script>

<style scoped>
@import "../assets/fontAwesome/css/font-awesome.min.css";

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