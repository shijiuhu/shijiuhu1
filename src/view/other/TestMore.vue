<template>
  <div>
    <ol>
      <li>
        <fieldset>
          <legend>这里是打印获取dom的测试标签</legend>
          <span id="home">江苏</span>
          <span class="anhui">安徽</span>
          <span ref="shanghai">上海</span>
          <form action="" name="testFrom">
            <table>
              <tr>
                <td>a</td>
                <td>b</td>
                <td>c</td>
              </tr>
            </table>
          </form>
          <button @click="clickBtn">按钮</button>
        </fieldset>
      </li>
      
      <li>
        <fieldset>
          <legend>这里是测试router-link占位，但似乎不在App.vue中不行，苹果中可测试i18n切换语言</legend>
          <router-link to="/fruits/apple" class="fruits">苹果</router-link>
          <router-link to="/fruits/orange" class="fruits">橘子</router-link>
          <router-view></router-view>
        </fieldset>
      </li>
    </ol>
  </div>
</template>

<script>
export default {
  name: 'TestMore',
  methods: {
    clickBtn() {
      const btn1 = document.getElementById('home')
      btn1.style.color = 'red'
      console.log(btn1, 'btn1')
      
      const btn2 = document.getElementsByTagName('span')
      console.log(btn2, 'btn2')

      const btn3 = document.getElementsByClassName('anhui')
      btn3[0].style.color = 'blue'
      console.log(btn3, 'btn3')

      const btn4 = document.getElementsByName('testFrom')
      console.log(btn4, 'btn4')

      const btn5 = this.$refs.shanghai
      btn5.style.color = 'yellow'
      console.log(btn5, 'btn5')

      const btnTemp = document.querySelector('span')
      console.log(btnTemp, "document.querySelector('span')")

      const btnTemp2 = document.querySelector('#home')
      console.log(btnTemp2, "document.querySelector('#home')")

      const btnTemp3 = document.querySelector('.anhui')
      console.log(btnTemp3, "document.querySelector('.anhui')")

      const btnTemp4 = document.querySelectorAll('span')
      console.log(btnTemp4, "document.querySelectorAll('span')")
    },
  }
}
</script>

<style scoped>
.fruits {
  padding-right: 20px;
  font-weight: bold;
}

li {
  margin-top: 10px;
}
</style>