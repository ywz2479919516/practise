<template>
  <div>
    <el-button v-on:click="jump(1)" type="primary">练习一</el-button>
    <el-button v-on:click="jump(2)" type="primary">练习二</el-button>
    <el-button v-on:click="jump(3)" type="primary">练习三</el-button>
  </div> 
</template>

<script>
export default {
    methods: {
        jump (param) {
            this.$router.replace('/app' + param);
        }
    }
}
</script>

<style>
</style>