<template>
  <div class="content">
    <button>{{$t('OrangeId')}} - {{$t('OrangeName')}}</button>
    <button @click="openNewPage">1.新打开网页</button>&nbsp;
    <button @click="gotoChinasoftOA">2.跳转至中软OA</button>&nbsp;
    <button @click="switchToApple">3.router中push</button>
  </div>
</template>

<script>
import $ from 'jquery'

export default {
  name: 'Orange',
  methods: {
    // 1.新打开网页
    openNewPage() {
      console.log('打开百度网页')
      window.open('https://www.baidu.com/')
    },

    // 2.跳转网页
    gotoChinasoftOA() {
      const httpsUrl = "https://ics.chinasoftinc.com"
      $.ajax({
        url: httpsUrl,
        // success是连接成功后进行处理的函数，这里3个都打印一下：
        // data是返回的html，textStatus是状态信息如success，xhr是一个对象，里面包含各种信息，名词任意取，但都表示这几个含义
        success: function(data, textStatus, xhr) {
          console.log('----data:', data)
          console.log('----textStatus:', textStatus)
          console.log('----xhr:', xhr)
          if (xhr.status == 200) {
            console.log('支持https, url = ' + httpsUrl)
            window.location.href = httpsUrl
          } else {
            console.log('不支持https, url = http://ics.chinasoftinc.com')
            window.location.href = 'http://ics.chinasoftinc.com'
          }
        },
        complete: function(xhr, textStatus) {
          console.log('complete函数：', xhr, '----', textStatus)
        }
      })
    },

    // 3.切换到苹果组件
    switchToApple() {
      this.$router.push('/apple')
      console.log('切换到了apple组件')
    }

  }  
}
</script>

<style scoped>
.content {
  display: block;
}
</style>