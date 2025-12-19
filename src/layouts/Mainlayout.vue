<template>
  <v-app>
    <AppBar @toggle-drawer="drawer = !drawer" />
    
    <v-navigation-drawer
      v-model="drawer"
      app
      :permanent="!isMobile"
      class="pa-0"
      width="240"
    >
      <SideBar />
    </v-navigation-drawer>

    <v-main class="bg-background" :dark="theme.global.current.value.dark">
      <v-container fluid class="pa-1" style="max-width: 100%;">
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import AppBar from '@/components/Appbar.vue'
import SideBar from '@/components/Sidemenu.vue'
import { useTheme } from 'vuetify'

const drawer = ref(true)
const isMobile = ref(false)
const theme = useTheme()
const checkScreen = () => {
  isMobile.value = window.innerWidth < 960
  if (isMobile.value) drawer.value = false
  else drawer.value = true
}

onMounted(() => {
  checkScreen()
  window.addEventListener('resize', checkScreen)
})
</script>

<style scoped>
.v-main {
  width: 100%;
}
</style>
