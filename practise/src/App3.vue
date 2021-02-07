<template>
  <div class="menu_div">
    <el-row class="row">
      <el-col :span="4" class="menu_col">
        <h5 class="title">菜单栏</h5>
        <router-link to="/m1">
          <div class="menu_item">
            页面1
          </div>
        </router-link>
        <router-link to="/m2">
          <div class="menu_item">
            页面2
          </div>
        </router-link>
        <router-link to="/m3">
          <div class="menu_item">
            页面3
          </div>
        </router-link>
      </el-col>
      <el-col :span="20">
        <el-container>
          <el-header>
            <div class="title_top">
              <span class="title_text">{{title}}</span>
              <div class="circle">测</div>
            </div>
          </el-header>
          <el-main class="main">
            <div class="view_1">
              <div class="view_2">
                <router-view name="app3"></router-view>
              </div>
            </div>
          </el-main>
        </el-container>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      title: '测试系统 - 001'
    }
  },
  methods: {
  },
  created () {
    
  }
}
</script>

<style scope>
.title{
  text-align: center;
  font-size:larger;
  font-weight: 800;
}
.menu_col{
  background-image: linear-gradient(to bottom left, rgb(224,229,247), rgb(149,171,234));
  height: 100%;
}
.row{
  height: 100%;
}
.menu_div{
  height: 46vw;
}
.menu_item{
  width: 100%;
  height: 10%;
  text-align: center;
  line-height: 400%;
}
.menu_item:hover{
  background-image: linear-gradient(to bottom left, rgb(149,171,234), rgb(101, 137, 235));
}
.title_top{
  height: 5vw;
  background-color: lightgreen;
  line-height: 5vw;
  width: 100%;
}
.title_text{
  display: inline-block;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  font-size:xx-large;
  font-weight: 800;
}
.el-header{
  padding: 0px;
}
.circle{
  display: inline-block;
  position: absolute;
  right: 2vw;
  top: 0.5vw;
  background-color: blue;
	border-radius: 50%;
	width: 4vw;
	height: 4vw;
  line-height: 4vw;
  text-align: center;
  color: white;
  font-size:x-large;
}
.main{
  position:absolute;
  top: 5vw;
  height: 41vw;
  width: 83.3%;
  padding: 5px;
}
.view_1{
  width: 100%;
  height: 99.7%;
  border: 1px solid black;
  border-radius: 5px;
}
.view_2{
  width: calc(100% - 38px);
  height: calc(100% - 36px);
  padding: 20px;
}
</style>

