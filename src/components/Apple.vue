<template>
  <div>
    <button>{{$t('AppleId')}} - {{$t('AppleName')}}</button>
    <button @click="switchLang">切换系统语言</button>
      {{ $t('baseInfo.name')}} - {{ $t('baseInfo.gender') }}
    <br>
  </div>
</template>

<script>
export default {
  name: "Apple",
  methods: {
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
    }
  }
}
</script>

<style scoped>

</style>
