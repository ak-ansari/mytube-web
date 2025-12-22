<template>
    <Notification />
  <RouterView></RouterView>
</template>

<script lang="ts" setup>
    import Notification from "@/components/Notification.vue";
import { push } from "notivue";
    push.success("dummy notification")
</script>
