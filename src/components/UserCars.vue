<template>
  <v-dialog
    v-model="applyForTestDriveDialog"
    style="max-width: 500px"
    persistent
  >
    <v-card>
      <div>
        <v-toolbar
          dark
        >
          <v-btn
            icon
            dark
            @click="applyForTestDriveDialog = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Записаться на тест-драйв</v-toolbar-title>
        </v-toolbar>
        <div class="pa-4">
          <form @submit.prevent="onSubmitApplication">
            <v-select
              label="Выберите дату и время"
              :items="slots.map(el => el.slot)"
            ></v-select>

            <v-select
              label="Выберите центр"
              :items="addresses.map(el => el.address)"
            ></v-select>

            <v-btn
              class="me-4 w-100"
              variant="tonal"
              type="submit"
            >
              записаться
            </v-btn>
          </form>
        </div>
      </div>
    </v-card>
  </v-dialog>

  <v-main>
    <v-container fluid class="fill-height" v-if="!carsStore.cars.length">
      <v-row justify="center" align-content="center" class="fill-height">
        <v-col cols="12" class="text-center">
          <v-progress-circular indeterminate></v-progress-circular>
        </v-col>
      </v-row>
    </v-container>
    <v-container v-else>
      <v-row justify="start">
        <v-col cols="4" v-for="car in carsStore.cars">
          <v-card
            class="mx-auto"
          >
            <v-img
              :src='car.image'
              height="200px"
              cover
            ></v-img>

            <v-card-title>
              {{`${car.mark} ${car.model}`}}
            </v-card-title>

            <v-card-subtitle>
              Кошт {{car.price}} BYN
            </v-card-subtitle>

            <v-card-actions>
              <v-btn
                variant="text"
                color="primary"
                @click="applyForTestDriveDialog = true"
              >
                запісацца на тэст-драйв
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>
<script lang="ts">
import {addresses} from "@/mocks/addresses";
import {slots} from "@/mocks/slots";
import {defineComponent, onMounted, ref} from 'vue';
import {useCarsStore} from "@/store/cars";

export default defineComponent({
  setup() {
    const carsStore = useCarsStore();
    const applyForTestDriveDialog = ref(false);
    const place = ref('');
    const dateTime = ref('');

    onMounted(() => {
      if (!carsStore.cars.length) {
        carsStore.getCars();
      }
    });

    function onSubmitApplication(){}

    return {
      applyForTestDriveDialog,
      place,
      dateTime,
      addresses,
      slots,

      carsStore,
      onSubmitApplication
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
