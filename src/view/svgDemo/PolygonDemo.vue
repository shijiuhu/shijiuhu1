<template>
  <div>
    <div>
      <p>实例 1</p>
      <p>
        标签用来创建含有不少于三个边的图形。
        <br>多边形是由直线组成，其形状是"封闭"的（所有的线条 连接起来）。
        <br>Remarkpolygon来自希腊。 "Poly" 意味 "many" ， "gon" 意味 "angle".
      </p>
      <p>
        代码解析：
        <br>points 属性定义多边形每个角的 x 和 y 坐标
      </p>
      <p>
        polygon points="200,10 250,190 160,210"
        <br>style="fill:lime;stroke:purple;stroke-width:1"
      </p>
      <svg height="210" width="500">
        <polygon points="200,10 250,190 160,210"
        style="fill:lime;stroke:purple;stroke-width:1"/>
      </svg>
    </div>
    <hr>

    <div>
      <p>实例 2</p>
      <p>
        下面的示例创建一个四边的多边形：
      </p>
      <p>
        polygon points="220,10 300,210 170,250 123,234" style="fill:lime;stroke:purple;stroke-width:1"
      </p>
      <svg height="250" width="500">
        <polygon points="220,10 300,210 170,250 123,234" style="fill:lime;stroke:purple;stroke-width:1" />
      </svg>
    </div>
    <hr>

    <div>
      <p>实例 3</p>
      <p>
        使用polygon元素创建一个星型:
      </p>
      <p>
        polygon points="100,10 40,198 190,78 10,78 160,198"
        <br>style="fill:lime;stroke:purple;stroke-width:5;fill-rule:nonzero;"
      </p>
      <svg height="210" width="500">
        <polygon points="100,10 40,198 190,78 10,78 160,198"
        style="fill:lime;stroke:purple;stroke-width:5;fill-rule:nonzero;" />
      </svg>
    </div>
    <hr>

    <div>
      <p>实例 4</p>
      <p>
        改变 fill-rule 属性为 "evenodd":
      </p>
      <p>
        polygon points="100,10 40,198 190,78 10,78 160,198"
        <br>style="fill:lime;stroke:purple;stroke-width:5;fill-rule:evenodd;"
      </p>
      <svg height="210" width="500">
        <polygon points="100,10 40,198 190,78 10,78 160,198"
        style="fill:lime;stroke:purple;stroke-width:5;fill-rule:evenodd;" />
      </svg>
    </div>
    <hr>

  </div>
</template>

<script>
export default {
  name: 'PolygonDemo'
}
</script>

<style scoped>

</style>