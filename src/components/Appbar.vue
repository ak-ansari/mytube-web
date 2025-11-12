<template>
  <v-app-bar app class="bg-background" :dark="theme.global.current.value.dark">
    <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->
    <Logo />
    <v-spacer />
    <v-btn icon="mdi-theme-light-dark" @click="toggleTheme" />
  </v-app-bar>
</template>

<script setup lang="ts">
import { useTheme } from 'vuetify'
import Logo from '@/components/common/Logo.vue'
const theme = useTheme()

const toggleTheme = () => {
  theme.global.name.value =
    theme.global.current.value.dark ? 'myTubeLight' : 'myTubeDark'
}
</script>
