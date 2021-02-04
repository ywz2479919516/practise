<template>
  <div>
    你好，
    <!-- 路由传参 -->
    <span class="hello">{{$route.query.user}}</span>
    ！
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  created () {
    console.log(this.$route.query);
  }
}
</script>

<style scoped>
.hello{
  color:mediumslateblue
}
</style>
