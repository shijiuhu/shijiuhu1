<!--
可定制插槽和 CSS 过渡效果的模态框组件。
-->
<template>
  <button id="show-modal" @click="showModal = true">Show Modal</button>

  <Teleport to="body">
    <!-- 使用这个 modal 组件，传入 prop -->
    <modal :show="showModal" @close="showModal = false">
      <template #header>
        <h3>custom header</h3>
      </template>
    </modal>
  </Teleport>
</template>

<script>
import Modal from './Modal.vue'

export default {
  name: 'ModalBox',
  components: {
    Modal
  },
  data() {
    return {
      showModal: false
    }
  }
}
</script>