<template>
  <ol>
    <li><span @click="uuid()">生成随机数1-自己写的：</span>{{ randomNumber1 }}</li>
    <li><span @click="guid">生成随机数2：</span>{{ randomNumber2 }}</li>
    <li><span @click="uuid2">生成随机数3：</span>{{ randomNumber3 }}</li>
    <li><span @click="nanoid1">生成随机数4：</span>{{ randomNumber4 }}</li>
    <li><span @click="nanoid2">生成随机数5-nanoid：</span>{{ randomNumber5 }}</li>
    <li><span @click="nanoid3">生成随机数6-customAlphabet：</span>{{ randomNumber6 }}</li>
    <li><span @click="uuid3">生成随机数7-v1：</span>{{ randomNumber7 }}</li>
  </ol>
</template>

<script>
import { nanoid, customAlphabet } from 'nanoid'
import { v1 } from 'uuid'

export default {
  name: 'Random',
  data() {
    return {
      randomNumber1: "",
      randomNumber2: "",
      randomNumber3: "",
      randomNumber4: "",
      randomNumber5: "",
      randomNumber6: "",
      randomNumber7: ""
    }
  },
  created() {
    // 为方便页面查看，创建时就调用这几个生成随机数的方法
    this.uuid();
    this.guid();
    this.uuid2();
    this.nanoid1();
    // 后面3个都是通过npm安装的依赖函数生成的
    this.nanoid2();
    this.nanoid3();
    this.uuid3();
  },
  methods: {
    // 生成随机数方法1，这里写参数的话调用的dom要加上()，不加具体参数则使用这里默认的36；
    // 这是我自己写的，两数重复的概率极小，10个数字+26个大写字母+26个小写字母+-_2个字符，共64个字符。
    uuid(count = 36) {
      console.log(count);
      const s = [];
      const digits = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_";
      for (let i = 0; i < count; i++) {
        s[i] = digits.charAt(Math.floor(Math.random() * digits.length));
      }
      this.randomNumber1 = s.join("");
      console.log(this.randomNumber1);
    },

    // 生成随机数方法2
    guid() {
      this.randomNumber2 = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0, v = c == "x" ? r : (r & 3 | 8);
        return v.toString(16);
      });
      console.log(this.randomNumber2);
    },

    // 生成随机数方法3
    uuid2() {
      const s = [];
      const hexDigits = "0123456789abcdef";
      for (let i = 0; i < 36; i++) {
        s[i] = hexDigits.charAt(Math.floor(Math.random() * 16));
      }
      s[14] = "4";
      s[19] = hexDigits.charAt((s[19] & 3) | 8);
      s[8] = s[13] = s[18] = s[23] = "-";
      this.randomNumber3 = s.join("");
      console.log(this.randomNumber3);
    },

    // 生成随机数方法4，import { nanoid } from 'nanoid' 主要可以通过npm包的形式安装，核心代码如下
    nanoid1() {
      const urlAlphabet = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict";
      let nanoId = (size = 21) => {
        let id = "";
        // A compact alternative for `for (var i = 0; i < step; i++)`.
        let i = size;
        while (i--) {
          // `| 0` is more compact and faster than `Math.floor()`.
          id += urlAlphabet[(Math.random() * 64) | 0];
        }
        return id;
      };
      this.randomNumber4 = nanoId();
      console.log(this.randomNumber4);
    },

    // 生成随机数方法5，使用npm安装的依赖nanoid，nanoid方法，不指定默认长度为21，nanoid()
    nanoid2() {
      this.randomNumber5 = nanoid();
      console.log(this.randomNumber5);
    },

    // 生成随机数方法6，使用npm安装的依赖customAlphabet，不指定默认长度为21，customAlphabet()
    nanoid3() {
      // 加第二个参数就是生成的位数，不加默认长度21
      const nanoid = customAlphabet("ABCDEF1234567890", 12);
      this.randomNumber6 = nanoid();
      console.log(this.randomNumber6);
    },

    // 生成随机数方法7，使用npm安装的依赖v1，其实uuid中有多个随机数的方法，还有v3,v4,v5等，可点进去看
    uuid3() {
      this.randomNumber7 = v1();
      console.log(this.randomNumber7);
    }
  }
}
</script>

<style scoped>
ol li span {
  color: blue;
  cursor: pointer;
}
</style>