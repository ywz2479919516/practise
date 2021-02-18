<template>
  <div class="body3">
      <div class="div1"></div>
      <div class="div2"></div>
      <div class="div3"></div>
  </div> 
</template>

<script>
export default {
    
}
</script>

<style>
.body3{
    height: 100%;
}
.div1{
    background-color: white;
    position: relative;
    top: 150px;
    left: 150px;
    width: 100px;
    height: 100px;
    border:rgb(0, 0, 0) 1px;
    border-radius: 10px;
    box-shadow: 0 0 8px rgb(0, 0, 255);
    animation: changDeg 2s linear 0.2s infinite;
}
@keyframes changDeg{
    0%{
        transform: rotate(0deg);
    }
    100%{
        transform: rotate(360deg);
    }
}
.div2{
    background-color: orange;
    position: relative;
    top: 60px;
    left: 560px;
    width: 120px;
    height: 120px;
    border-radius: 60px;
    z-index: 1;
    -webkit-clip-path:polygon(0% 0%,33.33% 0%,33.33% 100%,0% 100%);
}
.div3{
    background-color: blue;
    position: relative;
    top: -60px;
    left: 560px;
    width: 120px;
    height: 120px;
    border-radius: 60px;
    z-index: 0;
}
</style>