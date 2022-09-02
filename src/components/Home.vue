<template>
  <div>
    <span>为了方便查找经常访问的网页，这里列举出来！</span>
    <ol>
      <li><a :href="backToHome">回主页</a></li>
      <li><a :href="chinaSoftOA" target="_blank">中软OA</a></li>
      <li><a :href="niukeJS" target="_blank">牛客js</a></li>
      <li><a :href="niukeInterview" target="_blank">牛客面试每日一练</a></li>
      <li><a :href="leetCodePractice" target="_blank">LeetCode每日一练</a></li>
    </ol>
    <ol>
      <li><a href="#" @click="questionNaire">调查问卷</a></li>
      <li>
        <a href="#" @click="getEnvironment">获取本地开发或生产环境：</a
        >{{ localEnvironment }}
      </li>
      <li><a href="#" @click="getLocalJson">获取本地json文件</a></li>
    </ol>
    <table>
      <thead>
        <tr>
          <th>id</th>
          <th>name</th>
          <th>ctime</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in localTestJson" :key="item">
          <td>{{ item.id }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.ctime }}</td>
        </tr>
      </tbody>
    </table>

    <ul class="comments">
      <li v-for="item in comments" :key="item">
        <img :src="item.imgUrl" :alt="item.content" />
        <span>{{ item.content }}</span>
      </li>
    </ul>
    <span @click="expandAll">
      <button v-if="isExpandAll">收起所有</button>
      <button v-else>展开所有</button>
    </span>
    <tree :list="list" ref="tree"></tree>
  </div>
</template>

<script>
import { request } from "../network/index.js";
import Tree from "./Tree.vue";

export default {
  name: "Home",
  components: {
    Tree,
  },
  data() {
    return {
      backToHome: "http://localhost:8080/home",
      chinaSoftOA: "http://ics.chinasoftosg.com",
      niukeJS:
        "https://www.nowcoder.com/practice/a82e035501504cedbe881d08c824a381?tpId=271",
      niukeInterview:
        "https://www.nowcoder.com/exam/interview/detail?questionClassifyId=0&questionId=2412474&questionJobId=156&type=1",
      leetCodePractice: "https://leetcode.cn/problems/palindrome-number/",
      localTestJson: [],
      localEnvironment: "",
      comments: [
        {
          imgUrl: require("@/assets/img/comments/npsFeel1.png"),
          content: "强烈不推荐",
        },
        {
          imgUrl: require("@/assets/img/comments/npsFeel2.png"),
          content: "不推荐",
        },
        {
          imgUrl: require("@/assets/img/comments/npsFeel3.png"),
          content: "一般般",
        },
        {
          imgUrl: require("@/assets/img/comments/npsFeel4.png"),
          content: "推荐",
        },
        {
          imgUrl: require("@/assets/img/comments/npsFeel5.png"),
          content: "强烈推荐",
        },
      ],
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
    };
  },
  methods: {
    expandAll() {
      this.isExpandAll = !this.isExpandAll;
      this.$refs.tree.isListAll(this.isExpandAll);
    },
    questionNaire() {
      this.$router.push("/questionNaire");
      console.log("跳转到调查问卷页面");
    },
    getEnvironment() {
      this.localEnvironment = process.env.NODE_ENV;
      console.log(process.env, "--------this.localEnvironment");
    },
    getLocalJson() {
      const localRequest = request({
        url: "/LocalTest.json",
      })
        .then((res) => {
          this.localTestJson = res.data.message;
          console.log(res.data.message, "-----------res");
        })
        .catch((err) => {
          console.log(err, "-----------err");
        });
    },
  },
};
</script>

<style scoped>
.comments {
  list-style: none;
  display: flex;
  margin: 0;
  padding: 5px;
  width: 400px;
  background-color: skyblue;
}

.comments li {
  flex: 1;
  text-align: center;
}

.comments li span {
  display: block;
}

a {
  text-decoration: none;
}

table {
  border: 1px solid black;
}

th,
td {
  border: 1px solid blue;
}
</style>
