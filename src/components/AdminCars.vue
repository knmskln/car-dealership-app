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
            :disabled="carsStore.isCarEditFetching"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Рэдагаваць аўтамабіль</v-toolbar-title>
        </v-toolbar>
        <div class="pa-4">
          <form @submit.prevent="">
            <v-text-field
              label="Марка"
              v-model="currentEditCar.mark"
              :disabled="carsStore.isCarEditFetching"
            ></v-text-field>
            <v-text-field
              label="Мадэль"
              v-model="currentEditCar.model"
              :disabled="carsStore.isCarEditFetching"
            ></v-text-field>
            <v-text-field
              label="Колер"
              v-model="currentEditCar.color"
              :disabled="carsStore.isCarEditFetching"
            ></v-text-field>
            <v-text-field
              label="Год"
              v-model="currentEditCar.year"
              :disabled="carsStore.isCarEditFetching"
            ></v-text-field>
            <v-text-field
              label="Кошт"
              v-model="currentEditCar.price"
              :disabled="carsStore.isCarEditFetching"
            ></v-text-field>
            <v-btn
              class="mb-4 w-100"
              variant="tonal"
              type="submit"
              :disabled="carsStore.isCarEditFetching"
              :loading="carsStore.isCarEditFetching"
              @click="onEditCar()"
            >
              захаваць
            </v-btn>
            <v-btn
              class="w-100"
              variant="tonal"
              color="error"
              type="submit"
              @click="editCarDialog = false"
              :disabled="carsStore.isCarEditFetching"
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
        <v-btn
          color="error"
          @click="onDeleteCar"
          :disabled="carsStore.isCarDeleteFetching"
          :loading="carsStore.isCarDeleteFetching"
        >
          так, выдаліць
        </v-btn>
        <v-btn
          color="primary"
          @click="deleteCarDialog = false"
          :disabled="carsStore.isCarDeleteFetching"
        >
          не, выпадкова націснуў
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <v-dialog
    v-model="statisticsCarDialog"
    style="max-width: 600px"
  >
    <v-card class="d-flex flex-column py-8 pb-0" :loading="statisticsStore.isSpecificStatisticFetching">
      <template v-if="currentStatistic">
      <div class="d-flex justify-center mt-auto text-h5 ">
        {{currentStatistic.car.name}}
      </div>

      <div class="d-flex align-center flex-column my-auto">
        <div class="text-h2 mt-5">
          {{currentStatistic.averageRate || 0}}
          <span class="text-h6 ml-n3">/5</span>
        </div>

        <v-rating
          :model-value="currentStatistic.averageRate"
          color="yellow-darken-3"
          half-increments
          disabled
        ></v-rating>
        <div class="px-3">{{currentStatistic.ratesAmount}} адзнак</div>
      </div>

      <v-list
        bg-color="transparent"
        class="d-flex flex-column"
        density="compact"
      >
        <v-list-item :key="1">
          <v-progress-linear
            :model-value="currentStatistic.rating.five / currentStatistic.ratesAmount * 100"
            class="mx-n5"
            color="yellow-darken-3"
            height="20"
            rounded
          ></v-progress-linear>

          <template v-slot:prepend>
            <span>5</span>
            <v-icon icon="mdi-star" class="mx-3"></v-icon>
          </template>

          <template v-slot:append>
            <div class="rating-values">
              <span class="d-flex justify-end"> {{ currentStatistic.rating.five }} </span>
            </div>
          </template>
        </v-list-item>

        <v-list-item :key="2">
          <v-progress-linear
            :model-value="currentStatistic.rating.four / currentStatistic.ratesAmount * 100"
            class="mx-n5"
            color="yellow-darken-3"
            height="20"
            rounded
          ></v-progress-linear>

          <template v-slot:prepend>
            <span>4</span>
            <v-icon icon="mdi-star" class="mx-3"></v-icon>
          </template>

          <template v-slot:append>
            <div class="rating-values">
              <span class="d-flex justify-end"> {{ currentStatistic.rating.four }} </span>
            </div>
          </template>
        </v-list-item>

        <v-list-item :key="3">
          <v-progress-linear
            :model-value="currentStatistic.rating.three / currentStatistic.ratesAmount * 100"
            class="mx-n5"
            color="yellow-darken-3"
            height="20"
            rounded
          ></v-progress-linear>

          <template v-slot:prepend>
            <span>3</span>
            <v-icon icon="mdi-star" class="mx-3"></v-icon>
          </template>

          <template v-slot:append>
            <div class="rating-values">
              <span class="d-flex justify-end"> {{ currentStatistic.rating.three }} </span>
            </div>
          </template>
        </v-list-item>

        <v-list-item :key="4">
          <v-progress-linear
            :model-value="currentStatistic.rating.two / currentStatistic.ratesAmount * 100"
            class="mx-n5"
            color="yellow-darken-3"
            height="20"
            rounded
          ></v-progress-linear>

          <template v-slot:prepend>
            <span>2</span>
            <v-icon icon="mdi-star" class="mx-3"></v-icon>
          </template>

          <template v-slot:append>
            <div class="rating-values">
              <span class="d-flex justify-end"> {{ currentStatistic.rating.two }} </span>
            </div>
          </template>
        </v-list-item>

        <v-list-item :key="5">
          <v-progress-linear
            :model-value="currentStatistic.rating.one / currentStatistic.ratesAmount * 100"
            class="mx-n5"
            color="yellow-darken-3"
            height="20"
            rounded
          ></v-progress-linear>

          <template v-slot:prepend>
            <span>1</span>
            <v-icon icon="mdi-star" class="mx-3"></v-icon>
          </template>

          <template v-slot:append>
            <div class="rating-values">
              <span class="d-flex justify-end"> {{ currentStatistic.rating.one }} </span>
            </div>
          </template>
        </v-list-item>
      </v-list>
      </template>
      <v-card-actions>
        <v-btn @click="onCloseStatistic" color="yellow-darken-3">схаваць</v-btn>
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
                @click="onEditCarDialog(car)"
                icon="mdi-pencil"
                size="small"
              ></v-btn>
              <v-btn
                variant="text"
                icon="mdi-chart-box"
                size="small"
                @click="onShowStatistic(`${car.mark} ${car.model}`)"
              ></v-btn>
              <v-btn
                variant="text"
                color="error"
                icon="mdi-delete"
                size="small"
                @click="onDeleteCarDialog(car)"
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
import { useStatisticsStore } from "@/store/statistics";
import { StatisticType } from "@/types/statistic";
import {CarType} from "@/types/car";

export default defineComponent({
  setup() {
    const carsStore = useCarsStore();
    const statisticsStore = useStatisticsStore();
    const editCarDialog = ref(false);
    const deleteCarDialog = ref(false);
    const statisticsCarDialog = ref(false);
    const currentEditCar = ref<CarType | null>(null);
    const currentDeleteCar = ref<CarType | null>(null);
    const currentStatistic = ref<StatisticType | null>(null);
    const place = ref('');
    const dateTime = ref('');

    onMounted(() => {
      if (!carsStore.cars.length) {
        carsStore.getCars();
      }
    });

    async function onShowStatistic(carName: string){
      statisticsCarDialog.value = true;
      currentStatistic.value = await statisticsStore.findStatistic(carName);
    }
    function onCloseStatistic(){
      statisticsCarDialog.value = false;
      currentStatistic.value = null;
    }

    function onEditCarDialog(car: CarType){
      currentEditCar.value = {...car};
      editCarDialog.value = true;
    }
    function onEditCar(){
      if(currentEditCar.value)
        carsStore.editCar(currentEditCar.value).then(() => {
          editCarDialog.value = false;
        })
    }
    function onDeleteCarDialog(car: CarType){
      currentDeleteCar.value = {...car};
      deleteCarDialog.value = true;
    }
    function onDeleteCar(){
      if(currentDeleteCar.value){
        carsStore.deleteCar(currentDeleteCar.value).then(() => {
          deleteCarDialog.value = false;
        })
      }
    }

    return {
      editCarDialog,
      currentEditCar,
      statisticsCarDialog,
      deleteCarDialog,
      currentStatistic,
      place,
      dateTime,
      addresses,
      slots,

      carsStore,
      statisticsStore,
      onShowStatistic,
      onCloseStatistic,
      onEditCarDialog,
      onDeleteCarDialog,
      onEditCar,
      onDeleteCar
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
