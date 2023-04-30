<template>
  <v-dialog
    v-model="editCarDialog"
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
            @click="editCarDialog = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Рэдагаваць аўтамабіль</v-toolbar-title>
        </v-toolbar>
        <div class="pa-4">
          <form @submit.prevent="">
            <v-text-field
              label="Марка"
              v-model="editCarDialogContent.mark"
            ></v-text-field>
            <v-text-field
              label="Мадэль"
              v-model="editCarDialogContent.model"
            ></v-text-field>
            <v-text-field
              label="Колер"
              v-model="editCarDialogContent.color"
            ></v-text-field>
            <v-text-field
              label="Год"
              v-model="editCarDialogContent.year"
            ></v-text-field>
            <v-text-field
              label="Кошт"
              v-model="editCarDialogContent.price"
            ></v-text-field>
            <v-btn
              class="mb-4 w-100"
              variant="tonal"
              type="submit"
            >
              захаваць
            </v-btn>
            <v-btn
              class="w-100"
              variant="tonal"
              color="error"
              type="submit"
              @click="editCarDialog = false"
            >
              адмяніць
            </v-btn>
          </form>
        </div>
      </div>
    </v-card>
  </v-dialog>
  <v-dialog
    v-model="deleteCarDialog"
    persistent
    style="max-width: 500px"
  >
    <v-card class="pa-1">
      <v-card-text class="pa-4 pb-4" style="text-overflow: unset; display: block">
        Выдаліць аўтамабіль?
      </v-card-text>
      <v-card-actions>
        <v-btn color="error" @click="deleteCarDialog = false">так, выдаліць</v-btn>
        <v-btn color="primary" @click="deleteCarDialog = false">не, выпадкова націснуў</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <v-dialog
    v-model="statisticsCarDialog"
    style="max-width: 600px"
  >
    <v-card class="d-flex flex-column py-8 pb-0">
      <div class="d-flex justify-center mt-auto text-h5 ">
        Rating overview
      </div>

      <div class="d-flex align-center flex-column my-auto">
        <div class="text-h2 mt-5">
          3.5
          <span class="text-h6 ml-n3">/5</span>
        </div>

        <v-rating
          :model-value="3.5"
          color="yellow-darken-3"
          half-increments
        ></v-rating>
        <div class="px-3">3,360 ratings</div>
      </div>

      <v-list
        bg-color="transparent"
        class="d-flex flex-column-reverse"
        density="compact"
      >
        <v-list-item v-for="(rating,i) in 5" :key="i">
          <v-progress-linear
            :model-value="rating * 15"
            class="mx-n5"
            color="yellow-darken-3"
            height="20"
            rounded
          ></v-progress-linear>

          <template v-slot:prepend>
            <span>{{ rating }}</span>
            <v-icon icon="mdi-star" class="mx-3"></v-icon>
          </template>

          <template v-slot:append>
            <div class="rating-values">
              <span class="d-flex justify-end"> {{ rating * 224 }} </span>
            </div>
          </template>
        </v-list-item>
      </v-list>
      <v-card-actions>
        <v-btn color="yellow-darken-3" @click="statisticsCarDialog = false">схаваць</v-btn>
      </v-card-actions>
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
              :src='car.imagePath'
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
                @click="editCarDialog = true"
                icon="mdi-pencil"
                size="small"
              ></v-btn>
              <v-btn
                variant="text"
                icon="mdi-chart-box"
                size="small"
                @click="statisticsCarDialog = true"
              ></v-btn>
              <v-btn
                variant="text"
                color="error"
                icon="mdi-delete"
                size="small"
                @click="deleteCarDialog = true"
              ></v-btn>
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
    const editCarDialog = ref(false);
    const deleteCarDialog = ref(false);
    const statisticsCarDialog = ref(false);
    const editCarDialogContent = ref({
      mark: 'Geely',
      model: 'Atlas Pro',
      year: '2023',
      color: 'Белы',
      price: 'ад 73 950 BYN',
    });
    const place = ref('');
    const dateTime = ref('');

    onMounted(() => {
      if (!carsStore.cars.length) {
        carsStore.getCars();
      }
    });

    function onSubmitApplication(){}

    return {
      editCarDialog,
      editCarDialogContent,
      statisticsCarDialog,
      deleteCarDialog,
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
