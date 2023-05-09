<template>
  <v-dialog
    v-model="applicationsStore.isRatingDialog"
    style="max-width: 600px"
    persistent
  >
    <v-card class="d-flex flex-column py-8 pb-0">
      <div class="d-flex justify-center mt-auto text-h5 mb-2">
        {{`${currentCarNameForRate.car.mark} ${currentCarNameForRate.car.model}`}}
      </div>

      <div class="text-center">
        <v-rating
          color="yellow-darken-3"
          :disabled="applicationsStore.isRatingFetching"
          v-model="rating"
          :hover="!applicationsStore.isRatingFetching"
        ></v-rating>
        <pre>{{ rating || 'Ацаніце аўтамабіль'}}</pre>
      </div>
      <v-card-actions>
        <v-btn
          @click="onCreateRating"
          color="yellow-darken-3"
          :disabled="applicationsStore.isRatingFetching"
          :loading="applicationsStore.isRatingFetching"
        >
          Ацаніць
        </v-btn>
        <v-btn
          @click="onCloseRateDialog"
          color="yellow-darken-3"
          :disabled="applicationsStore.isRatingFetching"
        >пазней</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <v-container>
    <v-row justify="start" align="center">
      <v-col cols="5" v-for="(application, index) in applicationsStore.applications">
        <v-card
          class="mx-auto"
        >
          <v-img
            :src="application.car.imagePath"
            height="200px"
            cover
          ></v-img>

          <v-card-title>
            {{ application.car.mark }} {{ application.car.model }}
          </v-card-title>

          <v-card-subtitle>
            Запіс на тэст-драйв {{ new Date(application.date.date).toLocaleString('be-BY') }}
          </v-card-subtitle>

          <v-card-actions v-if="application.status.name === 'APPROVED'">
            <v-btn
              variant="text"
              color="success"
              prepend-icon="mdi-clock-check"
              disabled
            >
              ухвалена
            </v-btn>

            <v-btn
              variant="text"
              color="error"
              prepend-icon="mdi-close"
              :loading="application.isSecondButtonLoading"
              :disabled="application.isSecondButtonLoading"
              @click="onChangeApplicationStatus(application.id, 3, 2, index)"
            >
              адхіліць
            </v-btn>
          </v-card-actions>
          <v-card-actions v-if="application.status.name === 'IN_PROGRESS'">
            <v-btn
              variant="text"
              color="warning"
              prepend-icon="mdi-clock-alert"
              disabled
            >
              на разглядзе
            </v-btn>
            <v-btn
              variant="text"
              color="error"
              prepend-icon="mdi-close"
              :loading="application.isSecondButtonLoading"
              :disabled="application.isSecondButtonLoading"
              @click="onChangeApplicationStatus(application.id, 3, 2, index)"
            >
              адхілць
            </v-btn>
          </v-card-actions>
          <v-card-actions v-if="application.status.name === 'CANCELED'">
            <v-btn
              variant="text"
              prepend-icon="mdi-clock-remove"
              disabled
            >
              адхілена
            </v-btn>
          </v-card-actions>
          <v-card-actions v-if="application.status.name === 'REJECTED'">
            <v-btn
              variant="text"
              prepend-icon="mdi-clock-minus"
              disabled
            >
              адмоўлена
            </v-btn>
          </v-card-actions>
          <v-card-actions v-if="application.status.name === 'COMPLETED'">
            <v-btn
              variant="text"
              prepend-icon="mdi-check-all"
              disabled
            >
              завершана
            </v-btn>
            <v-btn
              v-if="!application.value"
              variant="text"
              prepend-icon="mdi-star"
              color="yellow-darken-3"
              @click="onOpenRateDialog(application)"
            >
              ацаніць
            </v-btn>
            <v-btn
              v-else
              variant="text"
              prepend-icon="mdi-star-check"
              color="yellow-darken-3"
              disabled
            >
              {{application.value}}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script lang="ts">
import {computed, defineComponent, onMounted, onUnmounted, ref} from 'vue';
import {useProfileStore} from "@/store/profile";
import router from "@/router";
import {useField, useForm, useIsFormDirty, useIsFormValid} from "vee-validate";
import {useApplicationsStore} from "@/store/applications";
import {ApplicationType} from "@/types/application";

export default defineComponent({
  setup() {
    const applicationsStore = useApplicationsStore();
    const profileStore = useProfileStore();
    const rateDialog = ref(false);
    const rating = ref(0);
    const currentCarNameForRate = ref<ApplicationType | null>(null);
    const isCarRatingFetching = ref(false)

    onMounted(() => {
      if (profileStore.profileInfo)
        applicationsStore.findApplications(false, profileStore.profileInfo.id).then((resp) => {
          console.log(resp)
        })
    });

    function onChangeApplicationStatus(orderId: number, statusId: number, buttonNumber: number, index: number){
      applicationsStore.changeApplicationStatus(orderId, statusId, buttonNumber, index)
    }
    function onOpenRateDialog(application: ApplicationType) {
      currentCarNameForRate.value = application;
      applicationsStore.toggleRateDialog(true);
    }
    function onCloseRateDialog() {
      rating.value = 0;
      applicationsStore.toggleRateDialog(false);
    }
    function onCreateRating(){
      if(currentCarNameForRate.value && rating.value) {
        applicationsStore.createApplicationRate(currentCarNameForRate.value.id, rating.value).then(() => {
          rating.value = 0;
        })
      }
    }
    return {
      applicationsStore,
      rateDialog,
      rating,
      currentCarNameForRate,
      isCarRatingFetching,

      onChangeApplicationStatus,
      onOpenRateDialog,
      onCloseRateDialog,
      onCreateRating
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
