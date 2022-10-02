<template>
  <div>
    <div>
      <p>实例 1</p>
      <p>
        代码解析:
        <br>rect 元素的 width 和 height 属性可定义矩形的高度和宽度
        <br>style 属性用来定义 CSS 属性
        <br>CSS 的 fill 属性定义矩形的填充颜色（rgb 值、颜色名或者十六进制值）
        <br>CSS 的 stroke-width 属性定义矩形边框的宽度
        <br>CSS 的 stroke 属性定义矩形边框的颜色
      </p>
      <p>
        rect width="300" height="100"
        <br>style="fill:rgb(0,0,255);stroke-width:1;stroke:rgb(0,0,0)"
      </p>
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="350" height="250">
        <rect width="300" height="100"
        style="fill:rgb(0,0,255);stroke-width:1;stroke:rgb(0,0,0)"/>
      </svg>
    </div>
    <hr>

    <div>
      <p>实例 2</p>
      <p>
        代码解析：
        <br>x 属性定义矩形的左侧位置（例如，x="0" 定义矩形到浏览器窗口左侧的距离是 0px）
        <br>y 属性定义矩形的顶端位置（例如，y="0" 定义矩形到浏览器窗口顶端的距离是 0px）
        <br>CSS 的 fill-opacity 属性定义填充颜色透明度（合法的范围是：0 - 1）
        <br>CSS 的 stroke-opacity 属性定义轮廓颜色的透明度（合法的范围是：0 - 1）
      </p>
      <p>
        rect x="50" y="20" width="150" height="150"
        <br>style="fill:blue;stroke:pink;stroke-width:5;fill-opacity:0.1;
        <br>stroke-opacity:0.9"
      </p>
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="250" height="250">
        <rect x="50" y="20" width="150" height="150"
        style="fill:blue;stroke:pink;stroke-width:5;fill-opacity:0.1;
        stroke-opacity:0.9"/>
      </svg>
    </div>
    <hr>
    
    <div>
      <p>实例 3</p>
      <p>
        CSS opacity 属性用于定义了元素的透明值 (范围: 0 到 1)。
      </p>
      <p>
        rect x="50" y="20" width="150" height="150"
        <br>style="fill:blue;stroke:pink;stroke-width:5;opacity:0.5"
      </p>
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="250" height="250">
        <rect x="50" y="20" width="150" height="150"
        style="fill:blue;stroke:pink;stroke-width:5;opacity:0.5"/>
      </svg>
    </div>
    <hr>

    <div>
      <p>实例 4</p>
      <p>
        rx 和 ry 属性可使矩形产生圆角。
      </p>
      <p>
        rect x="50" y="20" rx="20" ry="20" width="150" height="150"
        <br>style="fill:red;stroke:black;stroke-width:5;opacity:0.5"
      </p>
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="250" height="250">
        <rect x="50" y="20" rx="20" ry="20" width="150" height="150"
        style="fill:red;stroke:black;stroke-width:5;opacity:0.5"/>
      </svg>
    </div>
    <hr>
  </div>
</template>

<script>
export default {
  name: 'RectDemo'
}
</script>

<style scoped>

</style>