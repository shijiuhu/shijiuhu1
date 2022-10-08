<template>
  <div>
    <ol>
      <li>
        <fieldset>

          <legend class="title">为了方便查找经常访问的网页，这里列举出来！</legend>
          <div class="content">
            <span v-for="item in oftenUseWebs" :key="item" class="contentItem">
              <a :href="item.url" :title="item.title" :target="item.name === '回主页' ? '_self' : '_blank'">
                {{ item.name }}
              </a>
            </span>
          </div>
        </fieldset>
      </li>

      <li>
        <fieldset>
          <legend class="title">已开发组件</legend>
          <div class="content">
            <span v-for="item in developedComps" :key="item" class="contentItem devCom" @click="toComponents(item.path)">
              {{ item.name }}
            </span>
          </div>
        </fieldset>
      </li>

      <li>
        <fieldset>
          <legend class="title">好的案例</legend>
          <div class="content">
            <span v-for="item in goodExamples" :key="item" class="contentItem devCom" @click="toComponents(item.path)">
              {{ item.name }}
            </span>
          </div>
        </fieldset>
      </li>

      <li>
        <fieldset>
          <legend class="title">Vue相关网址</legend>
          <div class="content">
            <span v-for="item in vueWebSites" :key="item" class="contentItem devCom" >
              <a :href="item.url" target="_blank">{{ item.name }}</a>
            </span>
          </div>
        </fieldset>
      </li>

      <li>
        <fieldset>
          <legend class="title">前端其他链接</legend>
          <div class="content">
            <span v-for="item in otherFrontEndLinks" :key="item" class="contentItem devCom">
              <a :href="item.url" target="_blank">{{ item.name }}</a>
            </span>
          </div>
        </fieldset>
      </li>

      <li>
        <fieldset>
          <legend class="title">后端常用网址</legend>
          <div class="content">
            <span v-for="item in backEndCommonUrls" :key="item" class="contentItem devCom">
              <a :href="item.url" target="_blank" :title="item.title">{{ item.name }}</a>
            </span>
          </div>
        </fieldset>
      </li>

      <li>
        <fieldset>
          <legend class="title">其他功能测试</legend>
          <div class="content">
            <span class="contentItem devCom" @click="getEnvironment">获取本地开发或生产环境</span>
            <span class="contentItem devCom" @click="getLocalJson">获取本地json文件</span>
            <span class="contentItem devCom" @click="staticSrc">img调用静态src</span>
            <span class="contentItem devCom" @click="showDateComDes">时间插件查看</span>
            <span class="contentItem devCom" @click="toComponents('/svgDemo')">SVG的使用示例</span>
            <span class="contentItem devCom" @click="toComponents('/teleportTest')">Teleport功能测试</span>
          </div>
        </fieldset>
      </li>
    </ol>

    <div class="showOtherResult kinds">
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
import { request } from "network/index.js"
import comments from "common/comments";

export default {
  name: "Home",
  data() {
    return {
      localTestJson: [],
      localEnvironment: "",
      comments,
      oftenUseWebs: [
        { name: '回主页', url: 'http://localhost:8080/home'},
        { name: '中软OA', url: 'http://ics.chinasoftosg.com'},
        { name: '中软邮箱', url: 'https://chinasoftinc.com/owa/', title: '用户名yangtao090，密码和OA相同' },
        { name: '牛客js', url: 'https://www.nowcoder.com/practice/a82e035501504cedbe881d08c824a381?tpId=271'},
        { name: '牛客面试每日一练', url: 'https://www.nowcoder.com/exam/interview/detail?questionClassifyId=0&questionId=2412474&questionJobId=156&type=1'},
        { name: 'LeetCode每日一练', url: 'https://leetcode.cn/problems/palindrome-number/'},
      ],
      developedComps: [
        { name: '测试i18n等', path: '/testMore' },
        { name: '调查问卷', path: '/questionNaire' },
        { name: '省市树', path: '/provinceTree' },
        { name: '随机数', path: '/random' },
        { name: '日历时间', path: '/calendar' },
        { name: '电子钟', path: '/electronicClock' },
        { name: '电子钟2', path: '/electronicClock2' },
        { name: '轮盘时钟', path: '/rouletteClock' },
        { name: '混合时钟', path: '/mixedClock' },
        { name: '铭牌', path: '/nameplate' },
      ],
      goodExamples: [
        { name: 'Markdown编辑器', path: '/markdownEditor' },
        { name: '获取数据', path: '/getData' },
        { name: '带有排序和过滤器的网格', path: '/sortGrid' },
        { name: '树状视图', path: '/treeView' },
        { name: 'SVG图像', path: '/svgImage' },
        { name: '带过渡动效的模态框', path: '/modalBox' },
        { name: '带过渡动效的列表', path: '/transitionGroup' },
        { name: 'todoMVC', path: '/todoMVC' },
        { name: '温度转换器', path: '/tempConverter' },
        { name: '计时器', path: '/timer' },
        { name: 'CURD', path: '/CURD' },
        { name: '画圆', path: '/drawCircle' },
        { name: '单元格', path: '/cellTable' },
      ],
      vueWebSites: [
        { name: 'Vue.js中文官网', url: 'https://cn.vuejs.org/', title: '' },
        { name: 'Vue.js英文官网', url: 'https://vuejs.org/', title: '' },
        { name: 'Vue2.js中文官网', url: 'https://v2.cn.vuejs.org/index.html', title: '' },
        { name: 'Vue2.js英文官网', url: 'https://v2.vuejs.org/', title: '' },
        { name: 'Vue Router中文官网', url: 'https://router.vuejs.org/zh/', title: '' },
        { name: 'Vue Router英文官网', url: 'https://router.vuejs.org/', title: '' },
        { name: 'Vuex中文官网', url: 'https://vuex.vuejs.org/zh/', title: '' },
        { name: 'Vuex英文官网', url: 'https://vuex.vuejs.org/', title: '' },
        { name: 'Vue3为默认文章', url: 'https://blog.vuejs.org/posts/vue-3-as-the-new-default.html', title: '' },
        { name: 'Vue Loader中文官网', url: 'https://vue-loader.vuejs.org/zh/', title: '' },
        { name: 'Vue Loader英文官网', url: 'https://vue-loader.vuejs.org/', title: '' },
        { name: 'Vue Cli中文官网', url: 'https://cli.vuejs.org/zh/guide/index.html', title: '' },
        { name: 'Vue Cli英文官网', url: 'https://cli.vuejs.org/guide/index.html', title: '' },
        { name: 'webpackjs中文官网1', url: 'https://www.webpackjs.com/', title: '' },
        { name: 'webpackjs中文官网2', url: 'https://webpack.docschina.org/', title: '' },
        { name: 'Vue Test Utils官网', url: 'https://test-utils.vuejs.org/', title: '' },
        { name: 'Vue3 Template Explorer', url: 'https://template-explorer.vuejs.org/', title: '' },
      ],
      otherFrontEndLinks: [
        { name: 'github官网', url: 'https://github.com/shijiuhu/shijiuhu1' },
        { name: 'gitee官网', url: 'https://gitee.com/' },
        { name: '3wschool', url: 'http://www.3wschool.com.cn/css/css_reference.htm' },
        { name: 'w3school', url: 'https://www.w3school.com.cn/h.asp' },
        { name: '菜鸟教程', url: 'https://www.runoob.com/' },
        { name: 'CssMDN', url: 'https://developer.mozilla.org/zh-CN/docs/Web/CSS' },
        { name: 'BootCDN', url: 'https://www.bootcdn.cn/' },
        { name: 'Font Awesome某中文网址1', url: 'https://www.bootcss.com/p/font-awesome/' },
        { name: 'Font Awesome某中文网址2', url: 'https://fontawesome.dashgame.com/' },
        { name: 'Font Awesome某中文网址3', url: 'https://fa5.dashgame.com/' },
        { name: 'Font Awesome英文官网', url: 'https://fontawesome.com/icons' },
        { name: '帅地玩编程', url: 'https://www.iamshuaidi.com' },
        { name: 'echarts', url: 'https://echarts.apache.org/zh/index.html' },
      ],
      backEndCommonUrls: [
        { name: 'Spring Boot 2.x基础教程', url: 'https://blog.didispace.com/spring-boot-learning-2x/' },
        { name: 'Tomcat官网', url: 'https://tomcat.apache.org/' },
        { name: 'Maven官网', url: 'https://maven.apache.org/' },
        { name: 'Maven下载', url: 'https://mvnrepository.com/', title: '可能访问不了了' },
        { name: 'MySQL下载', url: 'https://www.mysql.com/downloads/' },
        { name: 'Oracle下载', url: 'https://www.oracle.com/cn/technical-resources/' },
      ]
    };
  },
  methods: {
    toComponents(path) {
      this.$router.push(path)
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
fieldset {
  margin: 10px 0;
}

.title {
  text-align: center;
  height: 40px;
  line-height: 40px;
  font-size: 24px;
}

.content {
  margin: 0 auto;
  text-align: left;
  width: 100%;
}

.contentItem {
  display: inline-block;
  color: blue;
  width: 210px;
  text-align: center;
  padding: 5px 0;
}

.devCom:hover {
  color: red;
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

a:visited {
  color: blue;
}

a:hover {
  color: red;
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
  margin-bottom: 240px;
}

.center {
  margin: 0 auto;
}
</style>
