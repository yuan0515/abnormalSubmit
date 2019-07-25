<template>
  <div id="app">
    <Home/>
  </div>
</template>

<script>
import Home from './pages/home/home'

export default {
  name: 'app',
  components: {
    Home
  }
}
</script>

<style lang='scss'>
  @import './style/common';
</style>
