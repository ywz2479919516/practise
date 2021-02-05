<template>
  <div>
    你好，
    <!-- 路由传参 -->
    <span class="hello">{{user}}</span>
    ！<br>
    第
    <span class="num">{{numOfVisit}}</span>
    次访问<br>
    转换结果:
    {{userTurn}}
  </div>
</template>

<script>
export default {
  data () {
    return {
      numOfVisit: null,
      user: '',
      userTurn: ''
    }
  },
  methods: {
    turn () {
      var userTurn = this.user.split('').reverse();
      var m = true;
      for (var i of userTurn) {
        if (m) {
          i = i.toUpperCase();
        }
        this.userTurn += i;
        m = !m;
      }
    }
  },
  created () {
    sessionStorage.setItem('numOfVisit', eval(sessionStorage.getItem('numOfVisit')) + 1);
    this.numOfVisit = sessionStorage.getItem('numOfVisit');
    this.user = this.$route.query.user;
    this.turn();
  },
  watch: {
    $route: {
      handler: function(val, oldVal){
        sessionStorage.setItem('numOfVisit', eval(sessionStorage.getItem('numOfVisit')) + 1);
        this.numOfVisit = sessionStorage.getItem('numOfVisit');
        this.user = val.query.user;
        this.userTurn = '';
        this.turn();
      },
      deep: true
    }
  },
  destroyed () {
  }
}
</script>

<style scoped>
.hello{
  color:mediumslateblue
}
.num{
  color: red;
}
</style>
