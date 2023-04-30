<template>
  <v-main>
    <v-container fluid style="max-width: 500px">
      <v-row no-gutters justify="center" align="center">
        <v-col cols="12">
          <v-card class="pa-6 pt-0">
            <v-card-title class="text-h4 pa-0 pt-8 pb-8">Sign Up</v-card-title>
            <form @submit.prevent="onSubmitSignUp">
              <v-text-field
                v-model="username.value.value"
                :error-messages="username.errorMessage.value"
                label="Username"
              ></v-text-field>

              <v-text-field
                v-model="username.value.value"
                :error-messages="username.errorMessage.value"
                label="Full name"
              ></v-text-field>

              <v-text-field
                v-model="username.value.value"
                :error-messages="username.errorMessage.value"
                label="Phone number"
              ></v-text-field>

              <v-text-field
                v-model="username.value.value"
                :error-messages="username.errorMessage.value"
                label="Email"
              ></v-text-field>

              <v-text-field
                v-model="password.value.value"
                :error-messages="password.errorMessage.value"
                label="Password"
              ></v-text-field>

              <v-text-field
                v-model="passwordRepeat.value.value"
                :error-messages="passwordRepeat.errorMessage.value"
                label="Repeat password"
              ></v-text-field>
              <v-checkbox
                v-model="keepMeSigned.value.value"
                :error-messages="keepMeSigned.errorMessage.value"
                label="Keep me signed in"
                value="1"
                type="checkbox"
              ></v-checkbox>
              <v-btn
                class="me-4 w-100 mb-4"
                variant="tonal"
                type="submit"
                :disabled="isFormValid"
              >
                sign up
              </v-btn>
              Already have an account? <router-link to="/signin" style="text-decoration: none;">Sign In</router-link>
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

export default defineComponent({
  setup() {
    const {
      handleSubmit: onHandleSignUp,
    } = useForm({
      validationSchema: {
        username (value: string) {
          if (value?.length) return true
          return 'username can not be empty.'
        },
        password (value: string) {
          if (value?.length > 8) return true
          return 'password length needs to be more than 8 symbols'
        },
        passwordRepeat (value: string) {
          if (value === password.value.value) return true
          return 'passwords are not equal'
        }
      },
    });
    const username = useField('username');
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
      alert(JSON.stringify(values, null, 2))
    });

    return {
      username,
      password,
      passwordRepeat,
      keepMeSigned,

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
