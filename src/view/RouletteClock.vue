<template>
  <div id="root">
    <div v-for="s in 60" class="s" 
      :style="{transform:'translate('+300*Math.cos((second+s)*Math.PI/30)+'px,'+300*Math.sin((second+s)*Math.PI/30)+'px)'}">
      {{60-s}}
    </div>
    <div v-for="i in 60" class="i" 
      :style="{transform:'translate('+250*Math.cos((minute+i)*Math.PI/30)+'px,'+250*Math.sin((minute+i)*Math.PI/30)+'px)'}">
      {{60-i}}
    </div>
    <div v-for="h in 24" class="h" 
      :style="{transform:'translate('+200*Math.cos((hour+h)*Math.PI/12)+'px,'+200*Math.sin((hour+h)*Math.PI/12)+'px)'}">
      {{24-h}}
    </div>
    <div v-for="w in 7" class="w" 
      :style="{transform:'translate('+170*Math.cos(2*(w+week)*Math.PI/7)+'px,'+170*Math.sin(2*(w+week)*Math.PI/7)+'px)'}">
      {{zw[7-w]}}
    </div>
    <div v-for="d in 31" class="d" 
      :style="{transform:'translate('+140*Math.cos(2*(d+day-1)*Math.PI/31)+'px,'+140*Math.sin(2*(d+day-1)*Math.PI/31)+'px)'}">
      {{32-d}}
    </div>
    <div v-for="m in 12" class="m" 
      :style="{transform:'translate('+70*Math.cos((month+m)*Math.PI/6)+'px,'+70*Math.sin((month+m)*Math.PI/6)+'px)'}">
      {{13-m}}
    </div>
    <div class="y">
      {{year}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'RouletteClock',
  data() {
    return {
      year: 0,
      month: 0,
      day: 0,
      week: 0,
      hour: 0,
      minute: 0,
      second: 0,
      zw: ['日','一','二','三','四','五','六']
    }
  },
  created() {
    setInterval(() => {
      var date = new Date()
      this.year = date.getFullYear()
      this.month = date.getMonth()
      this.day = date.getDate()
      this.week = date.getDay()
      this.hour = date.getHours()
      this.minute = date.getMinutes()
      this.second = date.getSeconds()
      console.log(this.second)
    }, 1000)
  }
}
</script>

<style scoped>
*{margin: 0;padding: 0;}

#root {
  position: relative;
  font-family: 微软雅黑;
}

.s,.i,.h,.d,.w,.m,.y{
  position: absolute;
  top: 360px;
  left: 360px;
  transition: transform 1s;
  text-shadow: 1px 1px 2px #000;
}

.y{
  top: 357px;
  left: 345px;
  font-weight: bold;
  font-size: 20px;
}

.m{
  color: blueviolet;
}

.d{
  color: darkorange;
}

.w{
  color: cornflowerblue;
}

.h{
  color: #F34416;
}

.i{
  color: crimson;
}

.s{
  color: darkseagreen;
}
</style>