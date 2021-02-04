<template>
  <div>
    <!-- 页面路由 -->
    <router-link to="p1?user=Tom">页面1</router-link>
    <router-link to="p2">页面2</router-link>
    <router-link to="p1?user=Jerry">页面3</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>

<style>

</style>
