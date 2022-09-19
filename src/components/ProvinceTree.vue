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
          <tree :list="list" ref="tree" @showProvinceName="showProvinceName"></tree>
        </div>
      </div>
      <div class="right">
        省市名称：<input type="text" class="provinceName" v-model="provinceName">
        <input type="button" class="provinceNameBaidu" value="百度一下" @click="provinceNameBaidu">
        <!-- {{ data }} -->
        <br>
        <iframe name="provinceTree" :src="baiduUrl" height="97%" width="100%" noResize="yes"></iframe>
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
                      { name: "塘南镇" },
                      { name: "石桥镇" },
                      { name: "年陡镇" },
                      { name: "乌溪镇" },
                      { name: "江心乡" },
                    ],
                  },
                  { name: "含山县" },
                  { name: "和县" },
                ],
              },
              { name: "滁州" },
              { name: "芜湖" },
              { name: "黄山" },
              { name: "蚌埠" },
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
                  { name: "溧水区" },
                  { name: "建邺区" },
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
          {
            name: "GET 英雄",
            children: [
              { 
                name: "GET 秦始皇",
                children: [
                  {
                    name: 'DELETE 汉武帝'
                  },
                  {
                    name: 'POST 光武帝'
                  },
                ]
              },
              {
                name: 'PUT 唐太宗',
                children: [
                  {
                    name: 'POST 武则天'
                  },
                  {
                    name: 'HEAD 唐高宗'
                  }
                ]
              },
              { 
                name: "HEAD 名将",
                children: [
                  {
                    name: 'PUT 廉颇'
                  },
                  {
                    name: 'DELETE 李广'
                  },
                  {
                    name: 'DELETE 白起'
                  },
                  {
                    name: 'POST 王翦'
                  },
                ]
              }
            ],
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
    },

    // 查找符合要求的省市名称
    searchContent() {
      this.$refs.tree.searchContent(this.$refs.searchContent.value.trim())
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