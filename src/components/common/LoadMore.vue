<template>
  <div ref="sentinel" class="d-flex justify-center py-6">
    <v-progress-circular v-if="loading" indeterminate size="28" width="3" color="accent" />
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";

/** Emits `load` whenever the sentinel scrolls into view and there is more to load. */
const props = defineProps<{ hasMore: boolean; loading: boolean }>();
const emit = defineEmits<{ load: [] }>();

const sentinel = ref<HTMLElement>();
let observer: IntersectionObserver | null = null;

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      if (entries[0]?.isIntersecting && props.hasMore && !props.loading) emit("load");
    },
    { rootMargin: "400px" }
  );
  if (sentinel.value) observer.observe(sentinel.value);
});
onBeforeUnmount(() => observer?.disconnect());
</script>
