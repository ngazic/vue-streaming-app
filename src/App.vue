<template>
<div id="app">
  <app-header />
  <router-view />
</div>
</template>

<script>
import Header from "@/components/Header/Header.vue";
export default {
  name: "app",
  components: {
    "app-header": Header
  },
  created() {
    if (this.$store.dispatch('autoLogin')) {
      this.$router.push('/')
    }
  }
};
</script>

<style lang="scss">
body,
html {
  margin: 0;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
}
</style>
