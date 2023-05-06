<template>
  <v-snackbar
    v-model="profileStore.signInErrorActive"
    timeout="5000"
    color="error"
  >
    {{ profileStore.signInErrorText }}
    <template v-slot:actions>
      <v-btn
        variant="plain"
        icon="mdi-close"
        @click="profileStore.hideSignInError()"
      ></v-btn>
    </template>
  </v-snackbar>
  <v-main>
    <v-container fluid style="max-width: 500px">
      <v-row no-gutters justify="center" align="center">
        <v-col cols="12">
          <v-card class="pa-6 pt-0">
            <v-card-title class="text-h4 pa-0 pt-8 pb-8">Уваход</v-card-title>
            <form @submit.prevent="onSubmitSignIn">
              <v-text-field
                v-model="username.value.value"
                :error-messages="username.errorMessage.value"
                label="Імя карыстальніка"
              ></v-text-field>

              <v-text-field
                v-model="password.value.value"
                :error-messages="password.errorMessage.value"
                label="Пароль"
                type="password"
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
                :disabled="isFormValid || profileStore.isSignInFetching"
                :loading="profileStore.isSignInFetching"
              >
                увайсці
              </v-btn>
              У вас няма акаўнта? <router-link to="/signup" style="text-decoration: none;">Зарэгістравацца</router-link>
            </form>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>
<script lang="ts">
import {computed, defineComponent, onUnmounted} from 'vue';
import {useField, useForm, useIsFormDirty, useIsFormValid} from "vee-validate";
import {useProfileStore} from "@/store/profile";
import router from "@/router";

export default defineComponent({
  setup() {
    const profileStore = useProfileStore();
    const {
      handleSubmit: onHandleSignIn,
    } = useForm({
      validationSchema: {
        username (value: string) {
          if (value?.length) return true
          return 'імя карыстальніка не можа быць пустым.'
        },
        password (value: string) {
          if (value?.length) return true
          return 'пароль не можа быць пустым.'
        },
      },
    });
    const username = useField('username');
    const password = useField('password');
    const keepMeSigned = useField('keepMeSigned');
    keepMeSigned.value.value = '1';

    const isDirty = useIsFormDirty();
    const isValid = useIsFormValid();

    onUnmounted(() => {
      profileStore.changeIsSignInFetching(false);
    })

    const isFormValid = computed(() => {
      return !isDirty.value || !isValid.value;
    });

    const onSubmitSignIn = onHandleSignIn(values => {
      // alert(JSON.stringify(values, null, 2))
      profileStore.signIn(values.username, values.password).then(response => {
        router.replace('/cars');
      });
    });

    return {
      username,
      password,
      keepMeSigned,

      profileStore,
      isFormValid,
      onSubmitSignIn,
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
