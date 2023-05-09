<template>
  <v-dialog
    v-model="applyForTestDriveDialog"
    style="max-width: 500px;"
    persistent
    eager
  >
    <v-card>
      <div>
        <v-toolbar
          dark
        >
          <v-btn
            icon
            dark
            @click="applyForTestDriveDialog = false; selectedSlot = undefined; selectedCenter = undefined"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Запісацца на тэст-драйв</v-toolbar-title>
        </v-toolbar>
        <div class="pa-4">
          <form @submit.prevent="onSubmitApplication">
            <v-select
              v-model="selectedSlot"
              :disabled="!carsStore.availableSlots.length"
              label="Абярыце дату і час"
              :items="carsStore.availableSlots"
              item-title="date"
              item-value="id"
              eager
            ></v-select>

            <v-select
              v-model="selectedCenter"
              :disabled="!carsStore.availableCenters.length"
              label="Абярыце цэнтр"
              :items="carsStore.availableCenters"
              item-title="address"
              item-value="id"
              eager
            ></v-select>

            <v-btn
              class="me-4 w-100"
              variant="tonal"
              type="submit"
              :loading="applicationsStore.isApplicationCreating"
              :disabled="!selectedCenter || !selectedSlot || applicationsStore.isApplicationCreating"
            >
              запісацца
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
              :src='car.imagePath'
              height="200px"
              cover
            ></v-img>

            <v-card-title>
              {{ `${car.mark} ${car.model}` }}
            </v-card-title>

            <v-card-subtitle>
              Кошт {{ car.price }} BYN
            </v-card-subtitle>

            <v-card-actions>
              <v-btn
                variant="text"
                color="primary"
                @click="onOpenApplicationDialog(car)"
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
import {defineComponent, onMounted, ref, watch, watchEffect} from 'vue';
import {useCarsStore} from "@/store/cars";
import {useApplicationsStore} from "@/store/applications";
import {useProfileStore} from "@/store/profile";
import {CarType} from "@/types/car";
import router from "@/router";

export default defineComponent({
  setup() {
    const carsStore = useCarsStore();
    const applicationsStore = useApplicationsStore();
    const profileStore = useProfileStore();

    const applyForTestDriveDialog = ref(false);
    const place = ref('');
    const dateTime = ref('');
    const selectedSlot = ref(undefined);
    const selectedCenter = ref(undefined);
    const carIdForApply = ref(0);
    watch(applyForTestDriveDialog, () => {
      if (document.documentElement)
        document.documentElement.style.overflow = applyForTestDriveDialog.value ? 'hidden' : 'visible'
    });

    onMounted(() => {
      if (!carsStore.cars.length) {
        carsStore.getCars();
      }
      carsStore.getCenters();
      carsStore.getSlots();
    });

    async function onOpenApplicationDialog(car: CarType) {
      if (!profileStore.isLoggedIn()) {
        router.replace('/signin');
      } else {
        carsStore.clearApplicationData();
        applyForTestDriveDialog.value = true;
        await carsStore.getSlots();
        await carsStore.getCenters();
        carIdForApply.value = car.id as number;
      }
    }

    function onSubmitApplication() {
      applicationsStore.createApplication({
        userId: profileStore.profileInfo?.id,
        dateId: selectedSlot.value,
        dealerCenterId: selectedCenter.value,
        statusId: 1,
        carId: carIdForApply.value
      }).then(() => {
        applyForTestDriveDialog.value = false;
        selectedSlot.value = undefined;
        selectedCenter.value = undefined;
      });
    }

    return {
      applyForTestDriveDialog,
      place,
      dateTime,
      addresses,
      slots,
      selectedCenter,
      selectedSlot,
      carIdForApply,

      carsStore,
      applicationsStore,
      onOpenApplicationDialog,
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
