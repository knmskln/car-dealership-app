<template>
  <v-container>
    <v-row justify="start" align="center">
      <v-col cols="4" v-for="statistic in statisticsStore.statistics">
        <v-card class="d-flex flex-column py-8 pb-0">
          <div class="d-flex justify-center mt-auto text-h5 ">
            {{statistic.car.name}}
          </div>

          <div class="d-flex align-center flex-column my-auto">
            <div class="text-h2 mt-5">
              {{statistic.averageRate || 0}}
              <span class="text-h6 ml-n3">/5</span>
            </div>

            <v-rating
              :model-value="statistic.averageRate"
              color="yellow-darken-3"
              half-increments
              disabled
            ></v-rating>
            <div class="px-3">{{statistic.ratesAmount}} адзнак</div>
          </div>

          <v-list
            bg-color="transparent"
            class="d-flex flex-column"
            density="compact"
          >
            <v-list-item :key="1">
              <v-progress-linear
                :model-value="statistic.rating.five / statistic.ratesAmount * 100"
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
                  <span class="d-flex justify-end"> {{ statistic.rating.five }} </span>
                </div>
              </template>
            </v-list-item>

            <v-list-item :key="2">
              <v-progress-linear
                :model-value="statistic.rating.four / statistic.ratesAmount * 100"
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
                  <span class="d-flex justify-end"> {{ statistic.rating.four }} </span>
                </div>
              </template>
            </v-list-item>

            <v-list-item :key="3">
              <v-progress-linear
                :model-value="statistic.rating.three / statistic.ratesAmount * 100"
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
                  <span class="d-flex justify-end"> {{ statistic.rating.three }} </span>
                </div>
              </template>
            </v-list-item>

            <v-list-item :key="4">
              <v-progress-linear
                :model-value="statistic.rating.two / statistic.ratesAmount * 100"
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
                  <span class="d-flex justify-end"> {{ statistic.rating.two }} </span>
                </div>
              </template>
            </v-list-item>

            <v-list-item :key="5">
              <v-progress-linear
                :model-value="statistic.rating.one / statistic.ratesAmount * 100"
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
                  <span class="d-flex justify-end"> {{ statistic.rating.one }} </span>
                </div>
              </template>
            </v-list-item>

          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script lang="ts">
import {defineComponent, onMounted} from 'vue';
import {useStatisticsStore} from "@/store/statistics";

export default defineComponent({
  setup() {
    const statisticsStore = useStatisticsStore();
    onMounted(() => {
      statisticsStore.findStatistics();
    });
    return {statisticsStore}
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
