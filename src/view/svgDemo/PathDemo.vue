<template>
  <div>
    <p>
      path元素用于定义一个路径。
      <br>下面的命令可用于路径数据：
      <br>M = moveto
      <br>L = lineto
      <br>H = horizontal lineto
      <br>V = vertical lineto
      <br>C = curveto
      <br>S = smooth curveto
      <br>Q = quadratic Bézier curve
      <br>T = smooth quadratic Bézier curveto
      <br>A = elliptical Arc
      <br>Z = closepath
      <br>注意：以上所有命令均允许小写字母。大写表示绝对定位，小写表示相对定位。
    </p>

    <div>
      <p>实例 1</p>
      <p>下面的例子定义了一条路径，它开始于位置150 0，到达位置75 200，然后从那里开始到225 200，最后在150 0关闭路径。</p>
      <p>
        path d="M150 0 L75 200 L225 200 Z"
      </p>
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="250" height="250">
        <path d="M150 0 L75 200 L225 200 Z" />
      </svg>
    </div>
    <hr>

    <div>
      <p>实例 2</p>
      <p>
        下面的例子创建了一个二次方贝塞尔曲线，A 和 C 分别是起点和终点，B 是控制点：
      </p>
      <p>
        复杂吗？是的！！由于在绘制路径时的复杂性，强烈建议使用SVG编辑器来创建复杂的图形。
      </p>
      <p>
        path id="lineAB" d="M 100 350 l 150 -300" stroke="red"
        <br>stroke-width="3" fill="none" /
        <br>path id="lineBC" d="M 250 50 l 150 300" stroke="red"
        <br>stroke-width="3" fill="none" /
        <br>path d="M 175 200 l 150 0" stroke="green" stroke-width="3"
        <br>fill="none" /
        <br>path d="M 100 350 q 150 -300 300 0" stroke="blue"
        <br>stroke-width="5" fill="none" /
        <br>!-- Mark relevant points --
        <br>g stroke="black" stroke-width="3" fill="black"
        <br>  circle id="pointA" cx="100" cy="350" r="3" /
        <br>  circle id="pointB" cx="250" cy="50" r="3" /
        <br>  circle id="pointC" cx="400" cy="350" r="3" /
        <br>/g
        <br>!-- Label the points --
        <br>g font-size="30" font="sans-serif" fill="black" stroke="none"
        <br>text-anchor="middle"
        <br>  text x="100" y="350" dx="-30"A/text
        <br>  text x="250" y="50" dy="-10"B/text
        <br>  text x="400" y="350" dx="30"C/text
        <br>/g
      </p>
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="850" height="450">
        <path id="lineAB" d="M 100 350 l 150 -300" stroke="red"
        stroke-width="3" fill="none" />
        <path id="lineBC" d="M 250 50 l 150 300" stroke="red"
        stroke-width="3" fill="none" />
        <path d="M 175 200 l 150 0" stroke="green" stroke-width="3"
        fill="none" />
        <path d="M 100 350 q 150 -300 300 0" stroke="blue"
        stroke-width="5" fill="none" />
        <!-- Mark relevant points -->
        <g stroke="black" stroke-width="3" fill="black">
          <circle id="pointA" cx="100" cy="350" r="3" />
          <circle id="pointB" cx="250" cy="50" r="3" />
          <circle id="pointC" cx="400" cy="350" r="3" />
        </g>
        <!-- Label the points -->
        <g font-size="30" font="sans-serif" fill="black" stroke="none"
        text-anchor="middle">
          <text x="100" y="350" dx="-30">A</text>
          <text x="250" y="50" dy="-10">B</text>
          <text x="400" y="350" dx="30">C</text>
        </g>
      </svg>
    </div>
    <hr>

  </div>
</template>

<script>
export default {
  name: 'PathDemo'
}
</script>

<style scoped>

</style>