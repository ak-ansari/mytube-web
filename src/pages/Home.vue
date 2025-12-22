<template>
  <div class="w-100 d-flex flex-wrap ga-2 flex-row" >
    <VideoCard :video="video" v-for="video in videos"/>
  </div>
</template>
<script lang="ts" setup>
import VideoCard from "@/components/VideoCard.vue";
import { useVideoStore } from "@/stores/video.store";
import { storeToRefs } from "pinia";

const { videos } = storeToRefs(useVideoStore());
</script>
