<template>
  <div>
    <div>
      <p>实例 1</p>
      <p>
        元素是用于创建任何只有直线的形状：
      </p>
      <p>
        polyline points="20,20 40,25 60,40 80,120 120,140 200,180"
        <br>style="fill:none;stroke:black;stroke-width:3"
      </p>
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="250" height="250">
        <polyline points="20,20 40,25 60,40 80,120 120,140 200,180"
        style="fill:none;stroke:black;stroke-width:3" />
      </svg>
    </div>
    <hr>

    <div>
      <p>实例 2</p>
      <p>只有直线的另一个例子：</p>
      <p>
        polyline points="0,40 40,40 40,80 80,80 80,120 120,120 120,160" 
        <br>style="fill:white;stroke:red;stroke-width:4" 
      </p>
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="250" height="250">
        <polyline points="0,40 40,40 40,80 80,80 80,120 120,120 120,160" 
        style="fill:white;stroke:red;stroke-width:4" />
      </svg>
    </div>
    <hr>
  </div>
</template>

<script>
export default {
  name: 'PolylineDemo'
}
</script>

<style scoped>

</style>