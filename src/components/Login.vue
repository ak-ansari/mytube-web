<template>
  <AuthLayout>
    <v-card width="400" class="pa-6">
      <v-card-title class="text-h5">Login</v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field label="Email" type="email" required />
          <v-text-field label="Password" type="password" required />
          <v-btn color="primary" class="mt-4" block>Login</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </AuthLayout>
</template>

<script lang="ts">
import AuthLayout from '@/layouts/AuthLayout.vue'
</script>
