<template>
  <div id="app">
    <sidenav/>
    <router-view></router-view>
  </div>
</template>

<script>
import SideNav from '@/components/SideNav'
export default {
  components: {
    'sidenav': SideNav
  },
  name: 'App',
}
</script>

<style>
@import './assets/styles/global.css';
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;700&display=swap');
</style>
