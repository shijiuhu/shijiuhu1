<template>
  <div>
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
  </div>
</template>

<script>
export default {
  name: 'Test',
  methods: {
    questionNaire() {
      this.$router.push('/questionNaire')
      console.log('切换到了questionNaire组件')
    },
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
a {
  color: skyblue;
  font-weight: 700;
  text-decoration: none;
}
</style>