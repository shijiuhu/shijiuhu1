<template>
  <div class="nameplate">
    <div class="inputInfo">
      <input type="text" placeholder="请输入姓名" class="inputName" ref="inputName">
      <input type="text" placeholder="输入中软工号6-10位" class="inputNumber" ref="chinasoftNumber">
      <input type="text" placeholder="输入华为工号6-10位" class="inputNumber" ref="huaweiNumber">
      <button class="complete" @click="complete">生成铭牌</button>
    </div>

    <div class="logo">
      <img :src="logoUrl" alt="">
    </div>

    <div class="employeeInfo">
      <div class="employeeName">{{ employeeName }}</div>
      <div class="employeeNumber">{{ employeeNumber }}</div>
    </div>

    <div class="purpose">
      <img :src="purposeUrl" alt="">
    </div>
  </div>
</template>

<script>
export default {
  name: 'Nameplate',
  data() {
    return {
      employeeName: '张三',
      employeeNumber: '0000666666/zwx1122345',
      logoUrl: require('../assets/img/chinasoftLogo.png'),
      purposeUrl: require('../assets/img/chinasoftPurpose.png')
    }
  },
  methods: {
    // 生成铭牌
    complete() {
      const inputName = this.$refs.inputName.value.trim()
      const chinasoftNumber = this.$refs.chinasoftNumber.value.trim()
      const huaweiNumber = this.$refs.huaweiNumber.value.trim()
      if (!inputName) {
        window.alert('请不要输入空值！')
        return
      }

      if (!chinasoftNumber && !huaweiNumber) {
        window.alert('请输入中软工号或华为工号！')
      } else {
        if (chinasoftNumber && huaweiNumber) {
          if(this.validateNumber(chinasoftNumber, huaweiNumber)) {
            this.employeeName = inputName
            this.$refs.inputName.value = ''
            this.employeeNumber = chinasoftNumber + '/' + huaweiNumber
            this.$refs.chinasoftNumber.value = ''
            this.$refs.huaweiNumber.value = ''
          }
        } else if (chinasoftNumber) {
          if(this.validateNumber(chinasoftNumber, '')) {
            this.employeeName = inputName
            this.$refs.inputName.value = ''
            this.$refs.chinasoftNumber.value = ''
          }
        } else if (huaweiNumber) {
          if(this.validateNumber('', huaweiNumber)) {
            this.employeeName = inputName
            this.$refs.inputName.value = ''
            this.$refs.huaweiNumber.value = ''
          }
        }
      }
    },

    // 校验工号输入是否符合要求
    validateNumber(chinasoftNumber, huaweiNumber) {
      if (chinasoftNumber) {
        if (chinasoftNumber.length < 6 || chinasoftNumber.length > 10) {
          window.alert('中软工号应在6-10位！')
          return false
        } else {
          this.employeeNumber = chinasoftNumber
          return true
        }
      }

      if (huaweiNumber) {
        if (huaweiNumber.length < 6 || huaweiNumber.length > 10) {
          window.alert('华为工号应在6-10位！')
          return false
        } else {
          this.employeeNumber = huaweiNumber
          return true
        }
      }
    }
  }
}
</script>

<style>
.nameplate {
  width: 500px;
  margin: 20px auto;
  border: 1px solid;
}

.inputInfo {
  padding: 10px 0;
  text-align: center;
}

.inputName {
  width: 100px;
}

.inputNumber {
  width: 120px;
  margin: 0 10px;
}

.complete {
  border: 1px solid black;
  border-radius: 8px;
  padding: 3px 4px;
}

.complete:hover {
  cursor: pointer;
}

.logo {
  background-color: aliceblue;
  padding: 3px 0 0 9px;
  border-top: 1px solid;
}

.employeeInfo {
  background-color: rgb(8, 121, 8);
  text-align: center;
  color: white;
}

.employeeName {
  font-size: 50px;
  padding-top: 10px;
}

.employeeNumber {
  font-size: 20px;
  padding-bottom: 10px;
}

.purpose {
  background-color: #8890f3;
  padding: 3px 2px 0 2px;
}
</style>