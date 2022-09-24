<template>
  <div>
    <div>
      <div class="title">为了方便查找经常访问的网页，这里列举出来！</div>
      <div class="content">
        <span class="contentItem"><a :href="backToHome">回主页</a></span>
        <span class="contentItem"><a :href="chinaSoftOA" target="_blank">中软OA</a></span>
        <span class="contentItem"><a :href="niukeJS" target="_blank">牛客js</a></span>
        <span class="contentItem"><a :href="niukeInterview" target="_blank">牛客面试每日一练</a></span>
        <span class="contentItem"><a :href="leetCodePractice" target="_blank">LeetCode每日一练</a></span>
      </div>
    </div>

    <div>
      <div class="title">已开发组件</div>
      <div class="content">
        <span class="contentItem devCom" @click="testMore">测试i18n等</span>
        <span class="contentItem devCom" @click="toQuestionNaire">调查问卷</span>
        <span class="contentItem devCom" @click="toProvinceTree">省市树</span>
        <span class="contentItem devCom" @click="toRandom">随机数</span>
        <span class="contentItem devCom" @click="toCalendar">日历时间</span>
        <span class="contentItem devCom" @click="toNameplate">铭牌</span>
      </div>
    </div>

    <div>
      <div class="title">其他功能测试</div>
      <div class="content">
        <span class="contentItem devCom" @click="getEnvironment">获取本地开发或生产环境</span>
        <span class="contentItem devCom" @click="getLocalJson">获取本地json文件</span>
        <span class="contentItem devCom" @click="staticSrc">img调用静态src</span>
        <span class="contentItem devCom" @click="showDateComDes">时间插件查看</span>
      </div>
    </div>

    <div class="showOtherResult">
      <span>环境为：{{ localEnvironment }}</span>

      <table class="center">
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

      <ul class="comments center">
        <li v-for="item in comments" :key="item">
          <img :src="item.imgUrl" :alt="item.content" />
          <span>{{ item.content }}</span>
        </li>
      </ul>
    </div>

  </div>
</template>

<script>
import { request } from "../network/index.js"

export default {
  name: "Home",
  data() {
    return {
      backToHome: "http://localhost:8080/home",
      chinaSoftOA: "http://ics.chinasoftosg.com",
      niukeJS: "https://www.nowcoder.com/practice/a82e035501504cedbe881d08c824a381?tpId=271",
      niukeInterview: "https://www.nowcoder.com/exam/interview/detail?questionClassifyId=0&questionId=2412474&questionJobId=156&type=1",
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

    };
  },
  methods: {
    testMore() {
      this.$router.push('/testMore')
    },

    toQuestionNaire() {
      this.$router.push('/questionNaire');
    },

    toProvinceTree() {
      this.$router.push('/provinceTree');
    },

    toRandom() {
      this.$router.push('/random')
    },

    toCalendar() {
      this.$router.push('/calendar')
    },

    toNameplate() {
      this.$router.push('/nameplate')
    },

    getEnvironment() {
      this.localEnvironment = process.env.NODE_ENV;
      console.log(process.env, "--------this.localEnvironment");
    },

    getLocalJson() {
      const localRequest = request({
          url: "/LocalTest.json",
      }).then((res) => {
          this.localTestJson = res.data.message;
          console.log(res.data.message, "-----------res");
      }).catch((err) => {
          console.log(err, "-----------err");
      });
      console.log(localRequest, '-----------localRequest')
    },

    staticSrc() {
      const dom = document.querySelector('.comments')
      dom.style.display = 'flex'
    },

    showDateComDes() {
      this.$router.push('/dateComDes')
    },
  }
};
</script>

<style scoped>
.title {
  text-align: center;
  height: 40px;
  line-height: 40px;
  font-size: 24px;
}

.content {
  display: flex;
  text-align: center;
  width: 60%;
  margin: 0 auto;
  height: 50px;
  line-height: 50px;
}

.contentItem {
  flex: 1;
  border: 1px solid black;
  color: blue;
}

.devCom:hover {
  cursor: pointer;
}

.comments {
  list-style: none;
  display: none;
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

.showOtherResult {
  text-align: center;
}

.center {
  margin: 0 auto;
}
</style>
