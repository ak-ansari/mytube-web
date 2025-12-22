<template>
  <v-app-bar app class="bg-background" :dark="theme.global.current.value.dark">
    <v-btn icon class="" @click="$emit('toggle-drawer')">
      <v-icon>mdi-menu</v-icon>
    </v-btn>

    <div class="d-flex flex-row align-center ml-2 flex-1 w-100 ga-14">
      <Logo/>
      <Searchbar/>
    </div>
    <!-- Right section -->
    <v-btn icon :to="'/upload'"><v-icon>mdi-video-plus-outline</v-icon></v-btn>
    <v-btn icon><v-icon>mdi-bell-outline</v-icon></v-btn>
    <v-avatar size="32" class="mr-3"><img src="https://i.pravatar.cc/32" /></v-avatar>
  </v-app-bar>
</template>

<script setup lang="ts">
import { useTheme } from 'vuetify';
import Logo from './common/Logo.vue'
import Searchbar from './searchbar/Searchbar.vue'
const theme = useTheme()
</script>
