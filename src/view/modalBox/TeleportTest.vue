<!-- 
参考网址：
https://blog.csdn.net/u011181989/article/details/124651249
https://blog.csdn.net/gao_xu_520/article/details/125736984（即Modal.vue和ModalBox.vue案例）
-->
<template>
  <div class="area">
    <button @click="handleClick">按钮</button>

    <!-- 这里写成to="body"也行，就是要挂载到某个dom元素下，也可以在public下另写其他dom元素，
      这里相应改成对应的to内容 -->
    <teleport to="#app" >
      <div class="mask" v-show="show"></div>
    </teleport>
  </div>
</template>

<script>
export default {
  name: 'TeleportTest',
  data() {
    return {
      show : false
    }
  },
  methods: {
    handleClick(){
      this.show = !this.show
    }
  },
}

</script>

<style scoped>
.area {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 200px;
  height: 300px;
  background: rgb(16, 209, 48);
}

.mask {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: #000;
  opacity: 50%;
}
</style>