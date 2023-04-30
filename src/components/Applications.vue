<template>
  <v-container>
    <v-row justify="start" align="center">
      <v-col cols="4">
        <v-card
          class="mx-auto"
        >
          <v-img
            src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
            height="200px"
            cover
          ></v-img>

          <v-card-title>
            Geely Atlas Pro
          </v-card-title>

          <v-card-subtitle>
            Запись на тест-драйв 12.04.2023 12:00
          </v-card-subtitle>

          <v-card-actions>
            <v-btn
              variant="text"
              color="success"
              prepend-icon="mdi-clock-check"
              disabled
            >
              одобрено
            </v-btn>

            <v-btn
              variant="text"
              color="error"
              prepend-icon="mdi-cancel"
            >
              отменить
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <v-col cols="4">
        <v-card
          class="mx-auto"
        >
          <v-img
            src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
            height="200px"
            cover
          ></v-img>

          <v-card-title>
            Geely Atlas Pro
          </v-card-title>

          <v-card-subtitle>
            Запись на тест-драйв 12.04.2023 12:00
          </v-card-subtitle>

          <v-card-actions>
            <v-btn
              variant="text"
              color="warning"
              prepend-icon="mdi-clock-alert"
              disabled
            >
              на рассмотрении
            </v-btn>
            <v-btn
              variant="text"
              color="error"
              prepend-icon="mdi-cancel"
            >
              отменить
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <v-col cols="4">
        <v-card
          class="mx-auto"
        >
          <v-img
            src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
            height="200px"
            cover
          ></v-img>

          <v-card-title>
            Geely Atlas Pro
          </v-card-title>

          <v-card-subtitle>
            Запись на тест-драйв 12.04.2023 12:00
          </v-card-subtitle>

          <v-card-actions>
            <v-btn
              variant="text"
              prepend-icon="mdi-clock-remove"
              disabled
            >
              завершено
            </v-btn>
            <v-btn
              variant="text"
              color="warning"
              prepend-icon="mdi-star"
            >
              оценить
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <v-col cols="4">
        <v-card
          class="mx-auto"
        >
          <v-img
            src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
            height="200px"
            cover
          ></v-img>

          <v-card-title>
            Geely Atlas Pro
          </v-card-title>

          <v-card-subtitle>
            Запись на тест-драйв 12.04.2023 12:00
          </v-card-subtitle>

          <v-card-actions>
            <v-btn
              variant="text"
              prepend-icon="mdi-clock-remove"
              disabled
            >
              завершено
            </v-btn>
            <v-btn
              variant="text"
              color="warning"
              prepend-icon="mdi-star-check"
              disabled
            >
              5
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

export default defineComponent({
  setup() {

    return {

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
