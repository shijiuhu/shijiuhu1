<template>
  <!-- <form action="/home" target="_blank" method="get"> -->
  <div class="login">
    <div class="dowebok">
      <div class="logo">欢迎登陆杨涛管理系统！用户名admin，密码1111</div>
      <div class="form-item">
        <input v-model="userName" type="text" autocomplete="off" placeholder="请输入账号"
        @keyup.enter="validUserName">
        <span class="tip" ref="userNameTip">{{userNameTip}}</span>
      </div>
      <div class="form-item">
        <input v-model="passWord" type="password" autocomplete="off" placeholder="请输入密码"
        @keyup.enter="validPassWord" ref="password">
        <span class="tip" ref="passWordTip">{{passWordTip}}</span>
      </div>
      <div class="form-item">
        <button id="submit" @click="validUser">登录</button>
      </div>
      <div class="reg-bar">
        <a class="reg" href="javascript:">立即注册</a>
        <a class="forget" href="javascript:">忘记密码</a>
      </div>
    </div>
  </div>
</template>

<script>
import userInfo from 'assets/json/UserInfo.json'

export default {
  name: 'Login',
  data() {
    return {
      userName: '',
      passWord: '',
      userNameTip: '空',
      passWordTip: '空',
      userInfo: null
    }
  },
  mounted() {
    this.userInfo = userInfo.userInfo
  },
  methods: {
    // 校验用户名是否符合规范
    validUserName() {
      if (this.userName.trim() === '') {
        this.userNameTip = '用户名不能为空！'
        this.$refs.userNameTip.style.opacity = 1
        return false
      } else {
        // 写成/^\w+$/也行，因为\w就等于[0-9a-zA-Z_]
        const flag = /^[0-9a-zA-Z_]+$/.test(this.userName)
        if (!flag) {
          this.userNameTip = '用户名只能为数字、字母、下划线'
          this.$refs.userNameTip.style.opacity = 1
          return false
        }
        
        const lengthFlag = this.userName.length < 4 || this.userName.length > 10
        if (lengthFlag) {
          this.userNameTip = '用户名必须为4-10位！'
          this.$refs.userNameTip.style.opacity = 1
          return false
        }
        this.$refs.userNameTip.style.opacity = 0
        this.$refs.password.focus()
      }
    },

    // 校验密码是否符合规范
    validPassWord() {
      if (this.passWord.trim() === '') {
        this.passWordTip = '密码不能为空！'
        this.$refs.passWordTip.style.opacity = 1
        return false
      } else {
        this.$refs.passWordTip.style.opacity = 0
        this.vertifyUserInfo(this.userName, this.passWord)
      }
    },

    // 验证用户名和密码是否正确
    vertifyUserInfo(userName, passWord) {
      const isValidUser = this.userInfo.find(item => {
        return item.userName === userName && item.passWord === passWord
      })
      if(isValidUser) {
        console.log('用户信息验证通过！')
        // 验证通过就跳转到主页
        this.$router.push({
          path: '/home',
          query: {
            userName: this.userName,
            passWord: this.passWord
          }
        })
      } else {
        console.log('用户名或密码错误！')
        alert('用户名或密码错误！')

        // 用户名密码错误则充值为空
        this.userName = ''
        this.passWord = ''
        return false
      }
    },

    // 单独点击登录，则去校验格式，最后不再调用一次vertifyUserInfo方法，改为校验密码后再调更合理
    validUser() {
      this.validUserName()
      this.validPassWord()
    },
  }
}
</script>

<style scoped>
    /* * {
      margin: 0;
      padding: 0;
    } */
    .login {
      display: inline-block;
      width: 100vw;
      height: 100vh;
      background-color: skyblue;
      overflow: hidden;
    }
    .dowebok {
      position: absolute;
      left: 50%;
      top: 50%;
      width: 430px;
      height: 550px;
      margin: -275px 0 0 -215px;
      border: 1px solid #fff;
      border-radius: 20px;
      overflow: hidden;
    }
    .logo {
      width: 200px;
      height: 104px;
      margin: 50px auto 80px;
      background-color: yellow;
    }
    .form-item {
      width: 360px;
      margin: 0 auto;
      padding-bottom: 20px;
    }
    .form-item input {
      width: 288px;
      height: 48px;
      padding-left: 70px;
      border: 1px solid #fff;
      border-radius: 25px;
      font-size: 18px;
      color: #fff;
      background-color: transparent;
      outline: none;
    }
    .form-item button {
      width: 360px;
      height: 50px;
      border: 0;
      border-radius: 25px;
      font-size: 18px;
      color: #1f6f4a;
      outline: none;
      cursor: pointer;
      background-color: #fff;
    }
    #username {
      background: url("assets/img/email.png") 23px 11px no-repeat;
    }
    #password {
      background: url("assets/img/password.png") 23px 11px no-repeat;
    }
    .reg-bar {
      width: 360px;
      margin: 20px auto 0;
      font-size: 14px;
      overflow: hidden;
    }
    .reg-bar a {
      color: #fff;
      text-decoration: none;
    }
    .reg-bar a:hover {
      text-decoration: underline;
    }
    .reg-bar .reg {
      float: left;
    }
    .reg-bar .forget {
      float: right;
    }
    .tip {
      opacity: 0;
      color: red;
      font-size: 8px;
    }
</style>