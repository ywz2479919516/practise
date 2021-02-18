<template>
  <div class="body1">
      <div>
          页面1
      </div>
      <div class="d">
        <div class="div_left">
            <span class="text">左侧<br/>文本区</span>
        </div>
        <div class="div_middle">
            <el-button class="button bottom_space">全屏</el-button><br/>
            <el-button class="button top_space">退出全屏</el-button>
        </div>
        <div class="div_right">
            <span class="text">右侧<br/>文本区</span>
        </div>
      </div>
  </div> 
</template>

<script>
export default {
}
</script>

<style>
.body1{
    background-color: red;
    height: 1200px;
    width: 1600px;
}
.d{
    text-align: center;
    width: 100%;
    height: 100%;
}
.div_left{
    display: inline-block;
    background-color: white;
    position: relative;
    top: 50%;
    height: 600px;
    width: 300px;
    transform: translateY(-50%);
}
.div_middle{
    display: inline-block;
    background-color: white;
    position: relative;
    top: 50%;
    width: 120px;
    margin: 0px 40px 0px 40px;
    transform: translateY(-50%);
}
.div_right{
    display: inline-block;
    background-color: white;
    position: relative;
    top: 50%;
    height: 400px;
    width: 300px;
    transform: translateY(-50%);
}
.text{
    position: relative;
    top: 50%;
    font-size:xx-large;
}
.button{
    width: 100%;
}
.top_space{
    margin: 3px 0px 0px 0px;
}
.bottom_space{
    margin: 0px 0px 3px 0px;
}
</style>