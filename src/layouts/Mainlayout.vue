<template>
  <v-app>
    <AppBar />
    <v-main>
      <v-container fluid class="pa-4 full-width" style="max-width: 100%">
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import AppBar from "@/components/Appbar.vue";
</script>
<style scoped>
.fill-width {
  width: 100% !important;
  max-width: 100% !important;
}
</style>
