<template>
  <div>
    <div class="title">省市树</div>
    <div class="content">
      <div class="left">
        <span class="expandAll" @click="expandAll">
          <button v-if="isExpandAll">收起所有</button>
          <button v-else>展开所有</button>
        </span>
        <div>
          <input type="text" class="searchContent" placeholder="请输入关键字" ref="searchContent" @keyup.enter="searchContent">
          <input type="button" value="查询" @click="searchContent">
        </div>
        <div class="provinceTree">
          <tree :list="list" ref="tree" @showProvinceName="showProvinceName" @dragProvinceName="dragProvinceName"></tree>
        </div>
      </div>
      <div class="right">
        省市名称：<input type="text" class="provinceName" v-model="provinceName">
        <input type="button" class="provinceNameBaidu" value="百度一下" @click="provinceNameBaidu">
        <input type="text" class="dragProvinceName" placeholder="可拖拽名称到此处" :value="dragName" @dragover="dragover">
        <!-- {{ data }} -->
        <br>
        <iframe name="provinceTree" :src="baiduUrl" height="97%" width="100%" noResize="yes"></iframe>
      </div>
    </div>
  </div>
</template>

<script>
import Tree from '../../components/Tree.vue'
import { request } from '../../network/index.js';

import treeList from './provinceTree.js'

export default {
  name: 'ProvinceTree',
  components: {
    Tree
  },
  data() {
    return {
      provinceName: '',
      list: treeList,
      isExpandAll: true,
      data: '',
      baiduUrl: 'http://localhost:8080/provinceTree',
      dragName: ''
    }
  },
  methods: {
    // 展示或收起目录结构树
    expandAll() {
      this.isExpandAll = !this.isExpandAll;
      this.$refs.tree.isListAll(this.isExpandAll);
    },

    // 嵌套子组件给父组件传递省市树名称
    showProvinceName(name) {
      this.provinceName = name
    },

    // 百度一下省市树名称
    provinceNameBaidu() {
      this.baiduUrl = `http://localhost:8080/provinceTree/s?wd=${this.provinceName}`
      request.get('/provinceTree/s?wd='+this.provinceName).then(res=>{
        this.data = res.data
        console.log(res, '---------res')
      }).catch(err=> {
        this.data = err
        console.log(err, '---------err')
      })
      // window.open(`https://www.baidu.com/s?wd=${this.provinceName}`)  
    },

    // 查找符合要求的省市名称
    searchContent() {
      this.$refs.tree.searchContent(this.$refs.searchContent.value.trim())
    },

    // 将子组件传过来的值赋值给父组件中的值
    dragProvinceName(name) {
      this.dragName = name
    },

    // 拖拽结束后阻止默认事件，否则将被拖回
    dragover(event) {
      event.preventDefault()
    }
  }
}
</script>

<style scoped>
.title {
  background-color: rgb(118, 235, 108);
  text-align: center;
  height: 60px;
  line-height: 60px;
  letter-spacing: 50px;
  font-size: 26px;
}

.content {
  display: flex;
}

.left {
  width: 25%;
  background-color: rgb(238, 220, 56);
}

.right {
  width: 75%;
  background-color: rgb(122, 168, 228);
}

.expandAll {
  display: inline-block;
  margin: 2px 0 0 5px;
}

.searchContent {
  display: inline-block;
  width: 120px;
  margin: 0 5px;
}

.dragProvinceName {
  display: inline-block;
  width: 120px;
  margin-left: 5px;
}

.provinceTree {
  overflow: auto;
}

.provinceName {
  display: inline-block;
  width: 140px;
}

.provinceNameBaidu {
  display: inline-block;
  margin-left: 4px;
  padding: 0 4px;
  text-align: center;
  width: 70px;
  font-size: 14px;
}
</style>