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
      <li><a href="#" @click="getEnvironment">获取本地开发或生产环境：</a>{{ localEnvironment }}</li>
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
          <td>{{item.id}}</td>
          <td>{{item.name}}</td>
          <td>{{item.ctime}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
// import { env } from "process";
import { request } from "../network/index.js";

export default {
  name: "Home",
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
      localEnvironment: ''
    };
  },
  methods: {
    questionNaire() {
      this.$router.push('/questionNaire')
      console.log('跳转到调查问卷页面')
    },
    getEnvironment() {
      this.localEnvironment = process.env.NODE_ENV
      console.log(process.env, '--------this.localEnvironment')
    },
    getLocalJson() {
      const localRequest = request({
        url: "/LocalTest.json",
      }).then((res) => {
        this.localTestJson = res.data.message
        console.log(res.data.message, "-----------res");
      }).catch((err) => {
        console.log(err, "-----------err");
      });
    },
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
}

table {
  border: 1px solid black;
}

th, td {
  border: 1px solid blue;
}
</style>
