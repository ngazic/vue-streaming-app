<template>
<div class="container">
  <div class="row justify-content-md-center">
    <div class="col col-sm-10 ">
      <h1>{{ getCurrentVideo().title }}</h1>
      <video vjs-big-play-centered :src="getCurrentVideo().url" muted controls class="video-js" data-setup="{}"></video>
    </div>
  </div>
</div>
</template>

<script lang="ts">
import Vue from 'vue'
import {
  mapGetters
} from 'vuex'
export default Vue.extend({
  methods: {
    ...mapGetters(["getCurrentVideo"])
  }
});
</script>

<style lang="scss" scoped>
.video-js {
  width: 100%;
}
</style>
