<template>
  <div class="d-flex align-center justify-center flex-1-1">
    <!-- Search Input -->
    <v-text-field
      v-model="query"
      placeholder="Search"
      hide-details
      density="comfortable"
      variant="outlined"
      rounded="pill"
      class="w-100"
      max-width="600"
      @keyup.enter="onSearch"
    >
      <!-- Search Icon -->
      <template #prepend-inner>
        <v-icon size="20"></v-icon>
      </template>

      <!-- Mic Icon -->
      <template #append-inner>
        <v-btn icon variant="text" size="small" class="bg-second">
          <v-icon size="20">mdi-magnify</v-icon>
        </v-btn>
      </template>
    </v-text-field>
  </div>
</template>

<script setup lang="ts">
import { watch, unref } from "vue";
import { useVideoStore } from "@/stores/video.store";
import { useSearchVideo } from "@/hooks/video/video.query";
import { storeToRefs } from "pinia";
import { useDebouncedRef } from "@/hooks/useDebouce";

// Get reactive store refs
const videoStore = useVideoStore();
const { search, page, limit } = storeToRefs(videoStore);

// Local debounced input
const { state: query, debounced } = useDebouncedRef<string>(search.value, 300);

// Sync local input to store
watch(query, (val) => {
  videoStore.setSearch(val);
});

// Use debounced value for API
const { data, isLoading, isError, error } = useSearchVideo(
  debounced,
  page,
  limit
);

// Optional: watch for debug
watch(data, (val) => {
  console.log("fetched", JSON.stringify(unref(data)));
});

// Enter key handler (manual search)
const onSearch = () => {
  videoStore.setSearch(query.value);
};
</script>
