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
import {
  mapGetters
} from 'vuex'
export default {
  methods: {
    ...mapGetters(["getCurrentVideo"])
  }
};
</script>

<style lang="scss" scoped>
.video-js {
  width: 100%;
}
</style>
