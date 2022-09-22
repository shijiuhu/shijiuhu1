<template>
  <div>
    <button @click="switchLang">切换系统语言</button><br>
    {{ $t('AppleId') }} - {{ $t('AppleName') }} <br>
    {{ $t('OrangeId') }} - {{ $t('OrangeName') }} <br>
    {{ $t('baseInfo.name')}} - {{ $t('baseInfo.gender') }} <br>
    <br>
  </div>
</template>

<script>
import $ from 'jquery'

export default {
  name: "Apple",
  methods: {
    // 切换系统语言
    switchLang() {
      const langArray = this.$i18n.availableLocales || []

      // 如果只配置了一种语言，则无需切换
      if (langArray.length <= 1 ) {
        return 
      } 

      const lang = this.$i18n.locale === 'zh-CN' ? 'zh' : this.$i18n.locale
      // 查找配置数组中当前配置下标
      let currentIndex = this.$i18n.availableLocales.findIndex(item => item === lang)
      if (currentIndex === -1) { // 这里应该是不存在找不到的情况，也就是理论上都应该是不等于-1的，但为了严谨仍加此判断
        return
      } 

      // 找到则依次向后取值，如果已到末尾则从头开始
      if (currentIndex === langArray.length - 1) {
        currentIndex = 0
      } else {
        currentIndex++
      }

      // 如果是zh则置换为zh-CN，其实可以不转换，这里为了严谨，还是转换吧
      if(langArray[currentIndex] === 'zh') {
        this.$i18n.locale = 'zh-CN'
      } else {
        this.$i18n.locale = langArray[currentIndex]
      }
    },

    // 新打开网页
    openNewPage() {
      console.log('打开百度网页')
      window.open('https://www.baidu.com/')
    },

    // 跳转到中软OA网页
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
  }
}
</script>

<style scoped>

</style>
