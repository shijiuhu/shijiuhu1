<template>
  <div class="root">
    <div class="left">
      <ol>
        <li @click="showSvgType('矩形')">矩形 rect</li>
        <li @click="showSvgType('圆形')">圆形 circle</li>
        <li @click="showSvgType('椭圆')">椭圆 ellipse</li>
        <li @click="showSvgType('线')">线 line</li>
        <li @click="showSvgType('折线')">折线 polyline</li>
        <li @click="showSvgType('多边形')">多边形 polygon</li>
        <li @click="showSvgType('路径')">路径 path</li>
        <li @click="showSvgType('文本')">文本 text</li>
      </ol>
    </div>

    <div class="right">
      <rect-demo v-if="svgType === '矩形'"></rect-demo>
      <circle-demo v-if="svgType === '圆形'"></circle-demo>
      <ellipse-demo v-if="svgType === '椭圆'"></ellipse-demo>
      <line-demo v-if="svgType === '线'"></line-demo>
      <polyline-demo v-if="svgType === '折线'"></polyline-demo>
      <polygon-demo v-if="svgType === '多边形'"></polygon-demo>
      <path-demo v-if="svgType === '路径'"></path-demo>
      <text-demo v-if="svgType === '文本'"></text-demo>
    </div>
  </div>
</template>

<script>
import RectDemo from './RectDemo.vue'
import CircleDemo from './CircleDemo.vue'
import EllipseDemo from './EllipseDemo.vue'
import LineDemo from './LineDemo.vue'
import PolylineDemo from './PolylineDemo.vue'
import PolygonDemo from './PolygonDemo.vue'
import PathDemo from './PathDemo.vue'
import TextDemo from './TextDemo.vue'

export default {
  name: 'SvgDemo',
  data() {
    return {
      svgType: '矩形'
    }
  },
  components: {
    RectDemo,
    CircleDemo,
    EllipseDemo,
    LineDemo,
    PolylineDemo,
    PolygonDemo,
    PathDemo,
    TextDemo
  },
  methods: {
    showSvgType(type) {
      this.svgType = type
    }
  }
}
</script>

<style scoped>
.root {
  width: 100vw;
  height: 100vh;
  display: inline-block;
}

.left {
  display: inline-block;
  width: 20%;
  vertical-align: middle;
}

.right {
  display: inline-block;
  width: 78%;
  vertical-align: middle;
  border-left: 1px solid black;
  padding-left: 5px;
}

ol>li {
  cursor: pointer;
}

ol>li:hover {
  color: red;
}
</style>