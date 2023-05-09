<template>
  <v-snackbar
    v-model="profileStore.signUpErrorActive"
    timeout="5000"
    color="error"
  >
    {{ profileStore.signUpErrorText }}
    <template v-slot:actions>
      <v-btn
        variant="plain"
        icon="mdi-close"
        @click="profileStore.hideSignUpError()"
      ></v-btn>
    </template>
  </v-snackbar>

  <v-main>
    <v-container fluid style="max-width: 500px">
      <v-row no-gutters justify="center" align="center">
        <v-col cols="12">
          <v-card class="pa-6 pt-0">
            <v-card-title class="text-h4 pa-0 pt-8 pb-8">Рэгістрацыя</v-card-title>
            <form @submit.prevent="onSubmitSignUp">
              <v-text-field
                v-model="username.value.value"
                :error-messages="username.errorMessage.value"
                label="Імя карыстальніка"
              ></v-text-field>

              <v-text-field
                v-model="name.value.value"
                :error-messages="name.errorMessage.value"
                label="Прозвішча, імя, імя па бацьку"
              ></v-text-field>

              <v-text-field
                v-model="number.value.value"
                :error-messages="number.errorMessage.value"
                label="Нумар тэлефона"
              ></v-text-field>

              <v-text-field
                v-model="email.value.value"
                :error-messages="email.errorMessage.value"
                label="E-Mail адрас"
              ></v-text-field>

              <v-text-field
                v-model="password.value.value"
                :error-messages="password.errorMessage.value"
                type="password"
                label="Пароль"
              ></v-text-field>

              <v-text-field
                v-model="passwordRepeat.value.value"
                :error-messages="passwordRepeat.errorMessage.value"
                type="password"
                label="Паўтарыце пароль"
              ></v-text-field>
              <v-checkbox
                v-model="keepMeSigned.value.value"
                :error-messages="keepMeSigned.errorMessage.value"
                label="Захаваць мяне ў сістэме"
                value="1"
                type="checkbox"
              ></v-checkbox>
              <v-btn
                class="me-4 w-100 mb-4"
                variant="tonal"
                type="submit"
                :disabled="isFormValid || profileStore.isSignUpFetching"
                :loading="profileStore.isSignUpFetching"
              >
                зарэгістравацца
              </v-btn>
              У вас ужо ёсць акаўнт? <router-link to="/signin" style="text-decoration: none;">Увайсці</router-link>
            </form>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>
<script lang="ts">
import {computed, defineComponent} from 'vue';
import {useField, useForm, useIsFormDirty, useIsFormValid} from "vee-validate";
import {useProfileStore} from "@/store/profile";
import router from "@/router";
import {UserType} from "@/types/user";

export default defineComponent({
  setup() {
    const profileStore = useProfileStore();
    const {
      handleSubmit: onHandleSignUp,
    } = useForm({
      validationSchema: {
        username (value: string) {
          if (value?.length) return true
          return 'імя карыстальніка не можа быць пустым'
        },
        name (value: string) {
          if (value?.length) return true
          return 'імя, прозвішча і імя па бацьку не можа быць пустым'
        },
        number (value: string) {
          if (value?.length) return true
          return 'нумар тэлефона не можа быць пустым'
        },
        email (value: string) {
          if (value?.length) return true
          return 'E-Mail не можа быць пустым'
        },
        password (value: string) {
          if (value?.length > 8) return true
          return 'даўжыня пароля павінна быць больш за 8 сімвалаў'
        },
        passwordRepeat (value: string) {
          if (value === password.value.value) return true
          return 'паролі не супадаюць'
        }
      },
    });
    const username = useField('username');
    const name = useField('name');
    const number = useField('number');
    const email = useField('email');
    const password = useField('password');
    const passwordRepeat = useField('passwordRepeat');
    const keepMeSigned = useField('keepMeSigned');
    keepMeSigned.value.value = '1';

    const isDirty = useIsFormDirty();
    const isValid = useIsFormValid();

    const isFormValid = computed(() => {
      return !isDirty.value || !isValid.value;
    });

    const onSubmitSignUp = onHandleSignUp(values => {
      profileStore.signUp(values as UserType).then(() => {
        router.replace('/cars');
      });
    });

    return {
      username,
      password,
      name,
      number,
      email,
      passwordRepeat,
      keepMeSigned,
      profileStore,

      isFormValid,
      onSubmitSignUp,
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
