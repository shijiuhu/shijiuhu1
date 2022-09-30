<template>
  <div class="app">
    <!-- <img alt="Vue logo" src="assets/img/logo.png"> -->
    <router-link to="/login"></router-link>
    <!-- <router-link to="/fruits/apple">苹果</router-link>&nbsp; -->
    <!-- <router-link to="/fruits/orange">橘子</router-link>&nbsp; -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
  }
}
</script>

<style scoped>
.app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale; */
  /* text-align: center; */
  /* background-color: red; */
  /* margin-top: 60px; */
  /* width: 1000px;
  height: 660px; */
}
body {
  margin: 0;
  padding: 0;
}
</style>
