<template>
  <v-list nav dense>
    <v-list-item
      v-for="(item, i) in items"
      :key="i"
      :to="item.to"
      link
      color="primary"
    >
      <template #prepend>
        <v-icon>{{ item.icon }}</v-icon>
      </template>
      <v-list-item-title>{{ item.title }}</v-list-item-title>
    </v-list-item>

    <v-divider class="my-2"></v-divider>

    <v-list-item to="/subscriptions" link>
      <template #prepend><v-icon>mdi-youtube-subscription</v-icon></template>
      <v-list-item-title>Subscriptions</v-list-item-title>
    </v-list-item>
  </v-list>
</template>

<script setup lang="ts">
const items = [
  { title: 'Home', icon: 'mdi-home', to: '/' },
  { title: 'Shorts', icon: 'mdi-play-box-outline', to: '/shorts' },
  { title: 'Library', icon: 'mdi-library-music', to: '/library' },
]
</script>

<style scoped>
.v-list-item-title {
  font-size: 14px;
}
</style>
