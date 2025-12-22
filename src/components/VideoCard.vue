<template>
  <v-card flat class="d-flex pa-3 youtube-card flex-column">
    <!-- Thumbnail -->
    <div class="thumbnail-wrapper">
      <!-- Loading -->
      <v-skeleton-loader v-if="isLoading" type="image" class="rounded-lg" />

      <!-- Error / Fallback -->
      <v-img
        v-else-if="isError"
        :src="noImagePlaceholder"
        aspect-ratio="16/9"
        cover
        class="rounded-lg"
      />

      <!-- Success -->
      <v-img
        v-else
        :src="currentThumbnail"
        aspect-ratio="16/9"
        max-height="202px"
        cover
        class="rounded-lg"
        @error="onImageError"
      />

      <span class="duration">
        {{ "3m" }}
      </span>
    </div>

    <!-- Content -->
    <div class="content ml-4 py-2">
      <h3 class="title">{{ video.title }}</h3>

      <div class="channel d-flex align-center mt-2">
        <v-avatar size="28">
          <v-img src="https://i.pravatar.cc/150?u=fake@pravatar.com" />
        </v-avatar>
        <span class="channel-name ml-2">
          {{ "Dummy channel" }}
        </span>
      </div>
      <div class="meta">
        {{ formattedViews }} • {{ getVideoAge(video.updated_at) }} ago
      </div>
    </div>
  </v-card>
</template>

<script setup lang="ts">
import { getFileDownloadUrl } from "@/composables/file/file.qyery";
import type { Video } from "@/types";
import { getFallbackThumbnailKey, getVideoAge } from "@/utils";
import { computed, ref, watch } from "vue";
const noImagePlaceholder = new URL(
  "@/assets/images/no-image-placeholder.jpg",
  import.meta.url
).href;
const currentThumbnail = ref(noImagePlaceholder);

const props = defineProps<{
  video: Video;
}>();

/**
 * 🔗 Fetch thumbnail URL using key
 */
const { data, isLoading, isError } = getFileDownloadUrl(
  props.video.thumbnail || getFallbackThumbnailKey(props.video.id)
);

watch(
  data,
  (val) => {
    if (val) currentThumbnail.value = val;
  },
  { immediate: true }
);
const onImageError = () => {
    console.log("eror")
  currentThumbnail.value = noImagePlaceholder;
};

/**
 * 👀 Format views
 */
const formattedViews = computed(() => {
  const views = Math.floor(Math.random() * 1_000_000);
  if (views >= 1_000_000) return `${(views / 1_000_000).toFixed(1)}M views`;
  if (views >= 1_000) return `${(views / 1_000).toFixed(1)}K views`;
  return `${views} views`;
});
</script>

<style scoped>
.youtube-card {
  cursor: pointer;
}

.thumbnail-wrapper {
  position: relative;
  width: 360px;
  min-width: 360px;
}

.duration {
  position: absolute;
  bottom: 8px;
  right: 8px;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  font-size: 12px;
  padding: 2px 6px;
  border-radius: 4px;
}

.content {
  max-width: 600px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.title {
  font-size: 16px;
  font-weight: 500;
  line-height: 1.4;
}

.meta {
  font-size: 13px;
  color: #ddd2d2e3;
}

.channel-name {
  font-size: 13px;
  color: #ddd2d2e3;
}

.description {
  font-size: 14px;
  color: #606060;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
