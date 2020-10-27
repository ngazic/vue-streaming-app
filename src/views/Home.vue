<template>
<div class="home">
  <div class="container-fluid">
    <div v-if="!showModal" class="row">
      <div class="col-12 col-sm-6 col-md-4 col-lg-2" v-for="video in videos" :key="video.id">
        <div class="card" @click="click(video)">
          <div class="card-body">
            <img :src="video.poster" class="card-img-top" />
            <h5 class="card-title">{{ video.title }}</h5>
            <p>Price {{ video.price }}$</p>
          </div>
        </div>
      </div>
    </div>
    <modal v-if="showModal" @handlePayment="payment" />
  </div>
</div>
</template>

<script lang="ts">
import Vue from "vue";
import Modal from "@/components/UI/Modal.vue";
import {
  Video,
} from "../mocks/video-data.types";
import {
  getVideos
} from "../mocks/video-data";
import {
  mapActions
} from 'vuex'
const initialVideoList: Video[] = [];
let initialVideo: Video;
export default Vue.extend({
  name: "Home",
  components: {
    Modal
  },
  async created() {
    this.videos = await getVideos();
  },
  data() {
    return {
      videos: initialVideoList,
      showModal: false,
      paymentVerified: false,
      currentVideo: initialVideo
    };
  },
  methods: {
    ...mapActions(['paymentAction']),
    payment(data: boolean): void {
      // console.log(data);
      if (data) {
        this.paymentVerified = true;
        this.paymentAction(this.currentVideo)
        this.$store;
        this.$router.push("/watch");
      }
      this.showModal = false;
    },
    click(video: Video): void {
      this.showModal = true;
      this.currentVideo = video;
      // console.log(video);
    }
  }
});
</script>
