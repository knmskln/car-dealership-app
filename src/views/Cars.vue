<template>
  <admin-cars v-if="profileStore.isLoggedIn() && profileStore.isAdmin()"></admin-cars>
  <user-cars v-else></user-cars>
</template>
<script lang="ts">
import {defineComponent} from 'vue';
import {useProfileStore} from "@/store/profile";
import AdminCars from "@/components/AdminCars.vue";
import UserCars from "@/components/UserCars.vue";

export default defineComponent({
  components: {UserCars, AdminCars},
  setup() {
    const profileStore = useProfileStore();

    return {
      profileStore,
    }
  }
})
</script>
<style>
.container
.dialog-bottom-transition-enter-active,
.dialog-bottom-transition-leave-active {
  transition: transform .2s ease-in-out;
}

</style>
