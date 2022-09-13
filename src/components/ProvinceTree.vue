<template>
  <div>
    <div class="title">省市树</div>
    <div class="content">
      <div class="left">
        <span @click="expandAll">
          <button v-if="isExpandAll">收起所有</button>
          <button v-else>展开所有</button>
        </span>
        <tree :list="list" ref="tree" @showProvinceName="showProvinceName"></tree>
      </div>
      <div class="right">
        省市名称：<input type="text" class="provinceName" v-model="provinceName">
        <input type="button" class="provinceNameBaidu" value="百度一下" @click="provinceNameBaidu">
        <!-- {{ data }} -->
        <br>
        <iframe name="provinceTree" :src="baiduUrl" height="100%" width="100%" noResize="yes"></iframe>
      </div>
    </div>
  </div>
</template>

<script>
import Tree from './Tree.vue'
import { request } from '../network/index.js';

export default {
  name: 'ProvinceTree',
  components: {
    Tree
  },
  data() {
    return {
      provinceName: '',
      list: {
        name: "中国",
        children: [
          {
            name: "安徽",
            children: [
              { name: "合肥" },
              {
                name: "马鞍山",
                children: [
                  { name: "雨山区" },
                  { name: "花山区" },
                  {
                    name: "博望区",
                    children: [
                      { name: "博望镇" },
                      { name: "丹阳镇" },
                      { name: "新市镇" },
                    ],
                  },
                  {
                    name: "当涂县",
                    children: [
                      { name: "湖阳镇" },
                      { name: "姑孰镇" },
                      { name: "太白镇" },
                    ],
                  },
                  { name: "含山县" },
                  { name: "和县" },
                ],
              },
              { name: "滁州" },
            ],
          },
          {
            name: "江苏",
            children: [
              {
                name: "南京",
                children: [
                  { name: "江宁区" },
                  { name: "玄武区" },
                  { name: "雨花台区" },
                  { name: "浦口区" },
                  { name: "高淳区" },
                ],
              },
              { name: "常州" },
              { name: "苏州" },
              { name: "南通" },
            ],
          },
          {
            name: "浙江",
            children: [{ name: "杭州" }, { name: "宁波" }],
          },
        ],
      },
      isExpandAll: true,
      data: '',
      baiduUrl: 'http://localhost:8080/provinceTree'
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
  width: 15%;
  background-color: rgb(238, 220, 56);
}

.right {
  width: 85%;
  background-color: rgb(122, 168, 228);
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