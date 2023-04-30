<template>
  <v-app>
    <default-bar />
    <router-view></router-view>
  </v-app>
</template>

<script lang="ts" setup>
  import DefaultBar from './AppBar.vue'
</script>
