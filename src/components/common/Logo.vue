<template>
  <v-sheet class="d-flex align-center justify-space-between pa-10 bg-background ga-2 border-0 shadow" rounded>
    <!-- Image with fixed size -->
    <v-img
      :src="imagePath"
      width="28.57"
      height="20"
      class="me-2"
      alt="image"
    ></v-img>

    <!-- Text content -->
    <v-row >
      <div class="text-h6">my</div>
      <div class="text-h6 text-red-darken-4">Tube</div>
    </v-row>
  </v-sheet>
</template>

<script setup lang="ts">
const imagePath = new URL("@/assets/icons/logo.svg", import.meta.url).href;
</script>
