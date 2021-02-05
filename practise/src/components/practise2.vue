<template>
  <div>
    当前时间:<br>
    <!-- 路由传参 -->
    {{nowTime}}<br>
    三天后:
    {{threeDaysAfterDate}}<br>
    本周一:
    {{thisMondayDate}}
  </div>
</template>

<script>
import moment from 'moment';
export default {
  data () {
    return {
      nowTime: '',
      threeDaysAfterDate: '',
      thisMondayDate: '',
    }
  },
  methods: {
    /**
     * 补0函数
     * @param num 待补0变量
     * @param length 所需长度
     */
    addZero (num, length) {
      for (var i = num.length;i < length;i++) {
        num = '0' + num;
      }
      return num;
    },
    /**
     * 获取当前时间后进行格式化
     */
    getTime () {
      this.nowTime = moment().format('YYYY/MM/DD hh:mm:ss');
      this.threeDaysAfterDate = moment().add(3, 'days').format('YYYY/MM/DD');
      this.thisMondayDate = moment().weekday(1).format('YYYY/MM/DD');
      console.log(this.nowTime);
    }
  },
  created () {
    this.getTime();
    // 创建时开启1s定时执行
    this.interval = window.setInterval(this.getTime,"1000");
  },
  destroyed () {
    // 销毁时取消定时执行
    clearInterval(this.interval);
  }
}
</script>

<style scoped>
</style>
