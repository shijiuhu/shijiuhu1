<template>
  <div>
    <div>
      <p>实例 1</p>
      <p>
        text x="0" y="15" fill="red">I love SVG
      </p>
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
        <text x="0" y="15" fill="red">I love SVG</text>
      </svg>
    </div>
    <hr>

    <div>
      <p>实例 2</p>
      <p>旋转的文字：</p>
      <p>
        text x="0" y="15" fill="red" transform="rotate(30 20,40)">I love SVG
      </p>
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
        <text x="0" y="15" fill="red" transform="rotate(30 20,40)">I love SVG</text>
      </svg>
    </div>
    <hr>

    <div>
      <p>实例 3</p>
      <p>
        路径上的文字：
      </p>
      <p>
        defs
        <br>  path id="path1" d="M75,20 a1,1 0 0,0 100,0" /
        <br>/defs
        <br>text x="10" y="100" style="fill:red;"
        <br>  textPath xlink:href="#path1"I love SVG I love SVG/textPath
        <br>/text
      </p>
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1"
        xmlns:xlink="http://www.w3.org/1999/xlink">
          <defs>
            <path id="path1" d="M75,20 a1,1 0 0,0 100,0" />
          </defs>
          <text x="10" y="100" style="fill:red;">
            <textPath xlink:href="#path1">I love SVG I love SVG</textPath>
          </text>
        </svg>
    </div>
    <hr>

    <div>
      <p>实例 4</p>
      <p>
        元素可以安排任何分小组与 tspan 元素的数量。每个 tspan 元素可以包含不同的格式和位置。几行文本(与 tspan 元素):
      </p>
      <p>
        text x="10" y="20" style="fill:red;"Several lines:
        <br>  tspan x="10" y="45"First line/tspan
        <br>  tspan x="10" y="70"Second line/tspan
        <br>/text
      </p>
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
        <text x="10" y="20" style="fill:red;">Several lines:
          <tspan x="10" y="45">First line</tspan>
          <tspan x="10" y="70">Second line</tspan>
        </text>
      </svg>
    </div>
    <hr>

    <div>
      <p>实例 5</p>
      <p>
        作为链接文本（ a 元素）：
      </p>
      <p>
        a xlink:href="http://www.w3schools.com/svg/" target="_blank"
        <br>  text x="0" y="15" fill="red"I love SVG/text
        <br>/a
      </p>
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1"
        xmlns:xlink="http://www.w3.org/1999/xlink">
          <a xlink:href="http://www.w3schools.com/svg/" target="_blank">
            <text x="0" y="15" fill="red">I love SVG</text>
          </a>
        </svg>
    </div>
    <hr>

  </div>
</template>

<script>
export default {
  name: 'TextDemo'
}
</script>

<style scoped>

</style>