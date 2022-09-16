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
      <li><span @click="questionNaire">调查问卷</span></li>
      <li><span @click="provinceTree">省市树</span></li>
      <li><span @click="getEnvironment">获取本地开发或生产环境：</span>{{ localEnvironment }}</li>
      <li><span @click="uuid()">生成随机数1：</span>{{ randomNumber1 }}</li>
      <li><span @click="guid">生成随机数2：</span>{{ randomNumber2 }}</li>
      <li><span @click="uuid2">生成随机数3：</span>{{ randomNumber3 }}</li>
      <li><span @click="nanoid1">生成随机数4：</span>{{ randomNumber4 }}</li>
      <li><span @click="nanoid2">生成随机数5：</span>{{ randomNumber5 }}</li>
      <li><span @click="nanoid3">生成随机数6：</span>{{ randomNumber6 }}</li>
      <li><span @click="getLocalJson">获取本地json文件</span></li>
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
  </div>
</template>

<script>
import { request } from "../network/index.js";
import { nanoid, customAlphabet } from 'nanoid'

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
      randomNumber1: '',
      randomNumber2: '',
      randomNumber3: '',
      randomNumber4: '',
      randomNumber5: '',
      randomNumber6: ''
    };
  },
  methods: {
    questionNaire() {
      this.$router.push("/questionNaire");
      console.log("跳转到调查问卷页面");
    },
    getEnvironment() {
      this.localEnvironment = process.env.NODE_ENV;
      console.log(process.env, "--------this.localEnvironment");
    },

    // 生成随机数方法1，这里写参数的话调用的dom要加上()，不加具体参数则使用这里默认的36；
    // 这是我自己写的，两数重复的概率极小，10个数字+26个大写字母+26个小写字母，共62个字符。
    uuid(count=36) {
      console.log(count)
      const s = []
      const digits = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
      for (let i = 0; i < count; i++) {
        s[i] = digits.charAt(Math.floor(Math.random() * digits.length))
      }
      this.randomNumber1 = s.join('')
      console.log(this.randomNumber1)
    },

    // 生成随机数方法2
    guid() {
      this.randomNumber2 = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0,
              v = c == 'x' ? r : (r & 0x3 | 0x8)
         return v.toString(16)
      })
      console.log(this.randomNumber2)
    },

    // 生成随机数方法3
    uuid2() {
      const s = []
      const hexDigits = '0123456789abcdef'
      for (let i = 0; i < 36; i++) {
        s[i] = hexDigits.charAt(Math.floor(Math.random() * 0x10))
      }
      s[14] = '4'
      s[19] = hexDigits.charAt((s[19] & 0x3) | 0x8)
      s[8] = s[13] = s[18] = s[23] = '-'
      this.randomNumber3 = s.join('')
      console.log(this.randomNumber3)
    },

    // 生成随机数方法4，import { nanoid } from 'nanoid' 主要可以通过npm包的形式安装，核心代码如下
    nanoid1() {
      const urlAlphabet = 'useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict'
      let nanoId = (size = 21) => {
        let id = ''
        // A compact alternative for `for (var i = 0; i < step; i++)`.
        let i = size
        while (i--) {
          // `| 0` is more compact and faster than `Math.floor()`.
          id += urlAlphabet[(Math.random() * 64) | 0]
        }
        return id
      }
      this.randomNumber4 = nanoId()
      console.log(this.randomNumber4)
    },
    
    // 生成随机数方法5，使用npm安装的依赖，nanoid方法，不指定默认长度为21，nanoid()
    nanoid2() {
      this.randomNumber5 = nanoid()
      console.log(this.randomNumber5)
    },

    // 生成随机数方法6，使用npm安装的依赖，不指定默认长度为21，customAlphabet()
    nanoid3() {
      // 加第二个参数就是生成的位数，不加默认长度21
      const nanoid = customAlphabet('ABCDEF1234567890', 12)
      this.randomNumber6 = nanoid()
      console.log(this.randomNumber6)
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
    provinceTree() {
      this.$router.push("/provinceTree");
    }
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

ol li span {
  color: blue;
  cursor: pointer;
}
</style>
