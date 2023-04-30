<template>
  <v-container>
    <v-row justify="start" align="center">
      <v-col>

            <v-text-field
              :loading="usersStore.isUsersFetching"
              density="compact"
              variant="solo"
              label="Пошук карыстальнікаў"
              append-inner-icon="mdi-magnify"
              single-line
              hide-details
              v-model="search"
              @input="onSearch"
              @click:append-inner="onSearch"
            ></v-text-field>

      </v-col>
    </v-row>
    <v-row v-if="usersStore.users.length">
      <v-col cols="12" v-for="user in usersStore.users">
        <v-card
          class="mx-auto"
        >
          <v-card-title>
            {{user.fullName}}
          </v-card-title>

          <v-card-subtitle class="card-subtitle">
            {{user.phoneNumber}}
          </v-card-subtitle>
          <v-card-subtitle class="card-subtitle">
            {{user.username}}
          </v-card-subtitle>
          <v-card-subtitle class="card-subtitle">
            {{user.email}}
          </v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script lang="ts">
import {defineComponent, onMounted, ref} from 'vue';
import {useUsersStore} from '@/store/users';

export default defineComponent({
  setup() {
    const usersStore = useUsersStore();
    const loaded = ref(false);
    const loading = ref(false);
    const search = ref('');

    onMounted(() => {
      if(!usersStore.users.length){
        usersStore.findUsers(search.value);
      }
    });

    function onSearch(){
      usersStore.findUsers(search.value);
    }
    return {
      loaded,
      loading,
      search,
      usersStore,

      onSearch,
    }
  }
})
</script>
<style>
.card-subtitle {
  margin-bottom: 16px;
}

.container
.dialog-bottom-transition-enter-active,
.dialog-bottom-transition-leave-active {
  transition: transform .2s ease-in-out;
}

</style>
