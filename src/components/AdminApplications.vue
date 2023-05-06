<template>
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
            Запіс на тэст-драйв {{ application.date.date }}
          </v-card-subtitle>

          <v-card-actions v-if="application.status.name === 'IN_PROGRESS'">
            <v-btn
              variant="text"
              color="success"
              prepend-icon="mdi-check"
              @click="onChangeApplicationStatus(application.id, 2, false, index)"
            >
              адобрыць
            </v-btn>
            <v-btn
              variant="text"
              color="error"
              prepend-icon="mdi-cancel"
              @click="onChangeApplicationStatus(application.id, 5, false, index)"
            >
              адмовіць
            </v-btn>
          </v-card-actions>
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
              prepend-icon="mdi-cancel"
              :loading="application.isSecondButtonLoading"
              :disabled="application.isSecondButtonLoading"
              @click="onChangeApplicationStatus(application.id, 5, false, index)"
            >
              адмовіць
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
              prepend-icon="mdi-clock-remove"
              disabled
            >
              завершана
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

export default defineComponent({
  setup() {
    const applicationsStore = useApplicationsStore();
    const profileStore = useProfileStore();

    onMounted(() => {
      if (profileStore.profileInfo)
        applicationsStore.findApplications(true, profileStore.profileInfo.id).then((resp) => {
          console.log(resp)
        })
    })
    function onChangeApplicationStatus(orderId: number, statusId: number, isFirstButton: boolean, index: number){
      applicationsStore.changeApplicationStatus(orderId, statusId, isFirstButton, index)
    }
    return {
      applicationsStore,

      onChangeApplicationStatus
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
