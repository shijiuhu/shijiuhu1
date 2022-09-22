<template>
  <div class="content">
    <button @click="switchToApple">router中push跳回apple组件</button>
  </div>
</template>

<script>


export default {
  name: 'Orange',
  methods: {
    // 切换到苹果组件
    switchToApple() {
      this.$router.push('/fruits/apple')
    }
  }  
}
</script>

<style scoped>

</style>