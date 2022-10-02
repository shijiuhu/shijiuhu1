<template>
  <div>
    <div>
      <p>
        x1 属性在 x 轴定义线条的开始
        <br>y1 属性在 y 轴定义线条的开始
        <br>x2 属性在 x 轴定义线条的结束
        <br>y2 属性在 y 轴定义线条的结束
      </p>
      <p>
        line x1="0" y1="0" x2="200" y2="200"
        <br>style="stroke:rgb(255,0,0);stroke-width:2"
      </p>
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="350" height="250">
        <line x1="0" y1="0" x2="200" y2="200"
        style="stroke:rgb(255,0,0);stroke-width:2"/>
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LineDemo'
}
</script>

<style scoped>

</style>