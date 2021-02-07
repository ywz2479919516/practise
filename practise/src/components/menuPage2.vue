<template>
    <div class="body2">
        <div class="div_middle">
            <el-button @click="full">全屏</el-button>
            <el-button @click="fullCancel">退出全屏</el-button>
        </div>
    </div> 
</template>

<script>
import Utils from '../router/util.js';
export default {
    methods: {
        full () {
            Utils.$emit('full');
        },
        fullCancel () {
            Utils.$emit('fullCancel');
        }
    }
}
</script>

<style>
.body2{
    background-color: green;
    height: 100%;
    text-align: center;
}
.div_middle{
    background-color: white;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
}
</style>