<template>
  <div>
    <div>
      <!-- 页面路由 -->
      <div class="position_4_1">
        <router-link to="p1?user=Tom" style="al">页面1</router-link>
      </div>
      <div class="position_4_2">
        <router-link to="p2">页面2</router-link>
      </div>
      <div class="position_4_3">
        <router-link to="p1?user=Jerry">页面3</router-link>
      </div>
    </div>
    <div class="s">
      <router-view name="app1"></router-view>
    </div>
  </div> 
</template>

<script>
export default {
  data () {
    return {
    }
  },
  methods: {
  },
  created () {
    sessionStorage.setItem('numOfVisit', 0);
  }
}
</script>

<style>
body{
  height: 1400px;
}
.s{
  position:absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%);
}
.position_1_1{
  box-sizing: border-box;
  text-align:center;
  float: left;
  border: 2px solid black;
  width: 33.33%;
}
.position_1_2{
  box-sizing: border-box;
  text-align:center;
  float: left;
  border: 2px solid black;
  width: 33.33%;
}
.position_1_3{
  box-sizing: border-box;
  text-align:center;
  float: left;
  border: 2px solid black;
  width: 33.33%;
}
.position_2_1{
  box-sizing: border-box;
  text-align:center;
  float: left;
  border: 2px solid black;
  width: 25%;
}
.position_2_2{
  box-sizing: border-box;
  text-align:center;
  float: left;
  border: 2px solid black;
  width: 50%;
}
.position_2_3{
  box-sizing: border-box;
  text-align:center;
  float: left;
  border: 2px solid black;
  width: 25%;
}
.position_3_1{
  box-sizing: border-box;
  text-align:center;
  float: left;
  width: 15%;
  border: 2px solid black;
}
.position_3_2{
  box-sizing: border-box;
  text-align:center;
  float:left;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 50%;
  border: 2px solid black;
}
.position_3_3{
  box-sizing: border-box;
  text-align:center;
  float:left;
  position: absolute;
  left: 100%;
  transform: translateX(-100%);
  width: 15%;
  border: 2px solid black;
}
.position_4_1{
  box-sizing: border-box;
  text-align:center;
  position: fixed;
  float: left;
  width: 15%;
  border: 2px solid black;
}
.position_4_2{
  box-sizing: border-box;
  text-align:center;
  float:left;
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  width: 50%;
  border: 2px solid black;
}
.position_4_3{
  box-sizing: border-box;
  text-align:center;
  float:left;
  position: fixed;
  left: 100%;
  bottom: 0px;
  transform: translateX(-100%);
  width: 15%;
  border: 2px solid black;
}
</style>

