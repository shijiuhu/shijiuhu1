<template>
  <div>
    <div>
      <p>实例 1</p>
      <p>
        椭圆与圆很相似。不同之处在于椭圆有不同的x和y半径，而圆的x和y半径是相同的：
        <br>代码解析：
        <br>CX属性定义的椭圆中心的x坐标
        <br>CY属性定义的椭圆中心的y坐标
        <br>RX属性定义的水平半径
        <br>RY属性定义的垂直半径
      </p>
      <p>
        ellipse cx="300" cy="80" rx="100" ry="50"
        <br>style="fill:yellow;stroke:purple;stroke-width:2"
      </p>
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="750" height="250">
        <ellipse cx="300" cy="80" rx="100" ry="50"
        style="fill:yellow;stroke:purple;stroke-width:2"/>
      </svg>
    </div>
    <hr>

    <div>
      <p>实例 2</p>
      <p>
        下面的例子创建了三个累叠而上的椭圆：
      </p>
      <p>
        ellipse cx="240" cy="100" rx="220" ry="30" style="fill:purple"
        <br>ellipse cx="220" cy="70" rx="190" ry="20" style="fill:lime"
        <br>ellipse cx="210" cy="45" rx="170" ry="15" style="fill:yellow"
      </p>
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="750" height="250">
        <ellipse cx="240" cy="100" rx="220" ry="30" style="fill:purple"/>
        <ellipse cx="220" cy="70" rx="190" ry="20" style="fill:lime"/>
        <ellipse cx="210" cy="45" rx="170" ry="15" style="fill:yellow"/>
      </svg>
    </div>
    <hr>

    <div>
      <p>实例 3</p>
      <p>
        下面的例子组合了两个椭圆（一个黄的和一个白的）：
      </p>
      <p>
        ellipse cx="240" cy="50" rx="220" ry="30" style="fill:yellow"
        <br>ellipse cx="220" cy="50" rx="190" ry="20" style="fill:white"
      </p>
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="750" height="250">
        <ellipse cx="240" cy="50" rx="220" ry="30" style="fill:yellow"/>
        <ellipse cx="220" cy="50" rx="190" ry="20" style="fill:white"/>
      </svg>
    </div>
    <hr>

  </div>
</template>

<script>
export default {
  name: 'EllipseDemo'
}
</script>

<style scoped>

</style>