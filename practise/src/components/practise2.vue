<template>
  <div>
    当前时间<br>
    <!-- 路由传参 -->
    {{nowTime}}
  </div>
</template>

<script>
export default {
  data () {
    return {
      nowTime: ''
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
      var date = new Date();
      var nowTime = {
          year: date.getFullYear().toString(),
          month: (date.getMonth() + 1).toString(),
          day: date.getDate().toString(),
          hour: date.getHours().toString(),
          minute: date.getMinutes().toString(),
          second: date.getSeconds().toString()
      };
      this.nowTime = this.addZero(nowTime.year, 4)+ '/'
        + this.addZero(nowTime.month,2) + '/'
        + this.addZero(nowTime.day,2) + ' '
        + this.addZero(nowTime.hour,2) + ':'
        + this.addZero(nowTime.minute,2) + ':'
        + this.addZero(nowTime.second,2);
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
