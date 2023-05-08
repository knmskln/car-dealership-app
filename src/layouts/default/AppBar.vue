<template>
  <v-dialog
    v-model="carsStore.addNewCarDialogMode"
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
            @click="onClose"
            :disabled="carsStore.isCarCreateFetching"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Дадаць аўтамабіль</v-toolbar-title>
        </v-toolbar>
        <div class="pa-4">
          <form @submit.prevent="">
            <v-file-input
              :rules="rules"
              v-model="imagePath"
              accept="image/png, image/jpeg, image/bmp"
              placeholder="Изображение"
              label="Изображение"
              append-inner-icon="mdi-camera"
              :disabled="carsStore.isCarCreateFetching"
            ></v-file-input>
            <v-text-field
              v-model="mark"
              label="Марка"
              :disabled="carsStore.isCarCreateFetching"
            ></v-text-field>
            <v-text-field
              v-model="model"
              label="Мадэль"
              :disabled="carsStore.isCarCreateFetching"
            ></v-text-field>
            <v-text-field
              v-model="color"
              label="Колер"
              :disabled="carsStore.isCarCreateFetching"
            ></v-text-field>
            <v-text-field
              v-model="year"
              label="Год"
              :disabled="carsStore.isCarCreateFetching"
            ></v-text-field>
            <v-text-field
              v-model="price"
              label="Кошт"
              :disabled="carsStore.isCarCreateFetching"
            ></v-text-field>
            <v-btn
              class="me-4 w-100"
              variant="tonal"
              type="submit"
              @click="onSubmit"
              :disabled="carsStore.isCarCreateFetching"
            >
              Дадаць аўтамабіль
            </v-btn>
          </form>
        </div>
      </div>
    </v-card>
  </v-dialog>

  <v-app-bar flat class="border-b">
    <v-app-bar-title>
      GEELY
    </v-app-bar-title>
    <v-spacer></v-spacer>
    <!--    <template v-if="true">-->
    <template v-if="profileStore.isLoggedIn()">
      <v-btn
        v-if="profileStore.isAdmin()"
        class="mr-2"
        variant="tonal"
        color="primary"
        @click="carsStore.toggleAddNewCarDialogMode(true)"
      >
        <v-icon start icon="mdi-plus"></v-icon>
        дадаць аўтамабіль
      </v-btn>
      <v-btn
        class="mr-2"
        to="/"
      >
        <v-icon start icon="mdi-home"></v-icon>
        галоўная
      </v-btn>
      <v-btn
        class="mr-2"
        to="/cars"
      >
        <v-icon start icon="mdi-car-multiple"></v-icon>
        аўтамабілі
      </v-btn>
      <v-btn
        v-if="profileStore.isAdmin()"
        class="mr-2"
        to="/admin/applications"
      >
        <v-icon start icon="mdi-account-circle"></v-icon>
        профіль
      </v-btn>
      <v-btn
        v-else
        class="mr-2"
        to="/profile/applications"
      >
        <v-icon start icon="mdi-account-circle"></v-icon>
        профіль
      </v-btn>
    </template>
    <template v-else>
      <v-btn
        class="mr-2"
        to="/"
      >
        <v-icon start icon="mdi-home"></v-icon>
        галоўная
      </v-btn>
      <v-btn
        class="mr-2"
        to="/cars"
      >
        <v-icon start icon="mdi-car-multiple"></v-icon>
        аўтамабілі
      </v-btn>
      <v-btn
        class="mr-2"
        to="/signin"
      >
        <v-icon start icon="mdi-login-variant"></v-icon>
        увайсці
      </v-btn>
      <v-btn
        class="mr-2"
        to="/signup"
      >
        <v-icon start icon="mdi-account-plus"></v-icon>
        зарэгістравацца
      </v-btn>
    </template>
  </v-app-bar>
</template>

<script lang="ts">
import {defineComponent, ref, watch} from "vue";
import {useDialogsStore} from "@/store/dialogs";
import {useProfileStore} from "@/store/profile";
import {useRoute} from "vue-router";
import {useCarsStore} from "@/store/cars";

export default defineComponent({
  setup() {
    const route = useRoute();
    const carsStore = useCarsStore();
    const profileStore = useProfileStore();
    const imagePath = ref(null as any);
    const mark = ref('')
    const model = ref('')
    const year = ref('')
    const color = ref('')
    const price = ref('')

    const toBase64 = (file: any) => new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });
    function clearNewCarData() {
      mark.value = '';
      model.value = '';
      color.value = '';
      imagePath.value = null;
      price.value = '';
      year.value = '';
    }
    async function onSubmit() {
      const imageBase64 = await toBase64(imagePath.value[0]) as string;
      await carsStore.addCar({
        mark: mark.value,
        model: model.value,
        color: color.value,
        imagePath: imageBase64,
        price: +price.value,
        year: +year.value,
      });
      clearNewCarData();
    }
    function onClose() {
      carsStore.toggleAddNewCarDialogMode(false);
      clearNewCarData();
    }

    const rules = [
      (value: any) => {
        return !value || !value.length || value[0].size < 2000000 || 'Avatar size should be less than 2 MB!'
      },
    ];

    return {
      carsStore,
      profileStore,
      route,
      rules,
      imagePath,
      mark,
      model,
      year,
      price,
      color,
      onSubmit,
      onClose
    };
  }
})

</script>
<style>
.v-input__prepend {
  display: none !important;
}
</style>
