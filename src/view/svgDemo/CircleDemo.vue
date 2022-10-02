<template>
  <div>
    <div>
      <p>
        代码解析：
        <br>cx和cy属性定义圆点的x和y坐标。如果省略cx和cy，圆的中心会被设置为(0, 0)
        <br>r属性定义圆的半径
      </p>
      <p>
        circle cx="100" cy="50" r="40" stroke="black"
        <br>stroke-width="2" fill="red"
      </p>
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="250" height="250">
        <circle cx="100" cy="50" r="40" stroke="black"
        stroke-width="2" fill="red"/>
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CircleDemo'
}
</script>

<style scoped>

</style>