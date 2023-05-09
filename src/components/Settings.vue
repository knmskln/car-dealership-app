<template>
  <v-dialog
    v-model="profileStore.isChangePasswordDialog"
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
            @click="profileStore.toggleChangePasswordDialog(false)"
            :disabled="profileStore.isChangePasswordFetching"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Змена пароля</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <div class="pa-4">
          <form @submit.prevent="onSubmitChangePassword">
            <v-text-field
              v-model="currentPassword.value.value"
              :error-messages="currentPassword.errorMessage.value"
              :disabled="profileStore.isChangePasswordFetching"
              type="password"
              label="Сучасны пароль"
            ></v-text-field>

            <v-text-field
              v-model="passwordChange.value.value"
              :error-messages="passwordChange.errorMessage.value"
              :disabled="profileStore.isChangePasswordFetching"
              type="password"
              label="Новы пароль"
            ></v-text-field>

            <v-text-field
              v-model="passwordChangeRepeat.value.value"
              :error-messages="passwordChangeRepeat.errorMessage.value"
              :disabled="profileStore.isChangePasswordFetching"
              type="password"
              label="Паўтарыце новы пароль"
            ></v-text-field>

            <v-btn
              class="me-4 w-100"
              variant="tonal"
              type="submit"
              :disabled="validateChangePassword || profileStore.isChangePasswordFetching"
              :loading="profileStore.isChangePasswordFetching"
            >
              змяніць пароль
            </v-btn>
          </form>
        </div>
      </div>
    </v-card>
  </v-dialog>
  <v-dialog
    v-model="profileStore.isProfileChangeDialog"
    style="max-width: 700px"
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
            @click="profileStore.toggleChangeProfileDialog(false); newProfileData = ''"
            :disabled="profileStore.isProfileChangeFetching"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Змяніць {{currentEditFieldName}}</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <div class="pa-4">
          <form @submit.prevent="onSubmitChangeProfileData">
            <v-text-field
              v-model="newProfileData"
              :disabled="profileStore.isProfileChangeFetching"
              :label="currentEditFieldName"
            ></v-text-field>

            <v-btn
              class="me-4 w-100"
              variant="tonal"
              type="submit"
              :disabled="!newProfileData || profileStore.isProfileChangeFetching"
              :loading="profileStore.isProfileChangeFetching"
            >
              змяніць
            </v-btn>
          </form>
        </div>
      </div>
    </v-card>
  </v-dialog>
  <v-snackbar
    v-model="profileStore.changeProfileDataErrorActive"
    timeout="5000"
    color="error"
  >
    {{ profileStore.changeProfileDataErrorText }}
    <template v-slot:actions>
      <v-btn
        variant="plain"
        icon="mdi-close"
        @click="profileStore.hideChangeProfileFetchingError()"
      ></v-btn>
    </template>
  </v-snackbar>

  <v-dialog
    v-model="logoutProcessing"
    persistent
    width="auto"
  >
    <v-card>
      <v-card-text>
        Выхад з сістэмы
        <v-progress-linear
          indeterminate
          color="white"
          class="mb-0"
        ></v-progress-linear>
      </v-card-text>
    </v-card>
  </v-dialog>

  <v-snackbar
    v-model="profileStore.profileFetchingErrorActive"
    timeout="5000"
    color="error"
  >
    {{ profileStore.signInErrorText }}
    <template v-slot:actions>
      <v-btn
        variant="plain"
        icon="mdi-close"
        @click="profileStore.hideProfileFetchingError()"
      ></v-btn>
    </template>
  </v-snackbar>
    <v-container fluid v-if="logoutProcessing === false">
      <v-row no-gutters>
        <v-col cols="12">
          <v-card v-if="profileStore.profileInfo">
            <v-list lines="two">
              <v-list-subheader>Асноўныя</v-list-subheader>
              <template v-if="profileStore.profileInfo.username">
                <v-list-item>
                  <v-list-item-title>Імя карыстальніка</v-list-item-title>

                  <v-list-item-subtitle>
                    {{ profileStore.profileInfo.username }}
                  </v-list-item-subtitle>
                  <template v-slot:append>
                    <v-btn
                      color="grey-lighten-1"
                      icon="mdi-pencil"
                      variant="text"
                      @click="currentEditFieldProperty = 'username'; currentEditFieldName = 'імя карыстальніка'; profileStore.toggleChangeProfileDialog(true); newProfileData = profileStore.profileInfo.username.slice()"

                    ></v-btn>
                  </template>
                </v-list-item>
                <v-divider></v-divider>

                <v-list-item>
                  <v-list-item-title>Прозвішча, імя, імя па бацьку</v-list-item-title>

                  <v-list-item-subtitle>
                    {{ profileStore.profileInfo.name }}
                  </v-list-item-subtitle>
                  <template v-slot:append>
                    <v-btn
                      color="grey-lighten-1"
                      icon="mdi-pencil"
                      variant="text"
                      @click="currentEditFieldProperty = 'name'; currentEditFieldName = 'прозвішча, імя, імя па бацьку'; profileStore.toggleChangeProfileDialog(true); newProfileData = profileStore.profileInfo.name.slice()"
                    ></v-btn>
                  </template>
                </v-list-item>
                <v-divider></v-divider>
                <v-list-item>
                  <v-list-item-title>Нумар тэлефона</v-list-item-title>

                  <v-list-item-subtitle>
                    {{ profileStore.profileInfo.number }}
                  </v-list-item-subtitle>
                  <template v-slot:append>
                    <v-btn
                      color="grey-lighten-1"
                      icon="mdi-pencil"
                      variant="text"
                      @click="currentEditFieldProperty = 'number'; currentEditFieldName = 'нумар тэлефона'; profileStore.toggleChangeProfileDialog(true); newProfileData = profileStore.profileInfo.number.slice()"
                    ></v-btn>
                  </template>
                </v-list-item>
                <v-divider></v-divider>
                <v-list-item>
                  <v-list-item-title>E-mail адрас</v-list-item-title>

                  <v-list-item-subtitle>
                    {{ profileStore.profileInfo.email }}
                  </v-list-item-subtitle>
                  <template v-slot:append>
                    <v-btn
                      color="grey-lighten-1"
                      icon="mdi-pencil"
                      variant="text"
                      @click="currentEditFieldProperty = 'email'; currentEditFieldName = 'E-mail адрас'; profileStore.toggleChangeProfileDialog(true); newProfileData = profileStore.profileInfo.email.slice()"
                    ></v-btn>
                  </template>
                </v-list-item>
              </template>
            </v-list>

            <v-card-actions>
              <v-btn
                color="primary"
                @click="profileStore.toggleChangePasswordDialog(true)"
              >
                змяніць пароль
              </v-btn>
              <v-btn color="error" @click="onLogOut">выйсці</v-btn>
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
    const profileStore = useProfileStore();
    const logoutProcessing = ref(false);
    const currentEditFieldName = ref('');
    const currentEditFieldProperty = ref('');
    const newProfileData = ref('');

    const {
      handleSubmit: onHandleChangePassword,
    } = useForm({
      validationSchema: {
        currentPassword (value: string) {
          if(value?.length) return true;
          return 'сучасны пароль не можа быць пустым';
        },
        passwordChange (value: string) {
          if (value?.length > 8) return true
          return 'даўжыня пароля павінна быць больш за 8 сімвалаў'
        },
        passwordChangeRepeat (value: string) {
          if (value === passwordChange.value.value) return true
          return 'паролі не супадаюць'
        }
      },
    });

    const changePasswordMode = ref(false);
    const currentPassword = useField('currentPassword');
    const passwordChange = useField('passwordChange');
    const passwordChangeRepeat = useField('passwordChangeRepeat');
    const isDirty = useIsFormDirty();
    const isValid = useIsFormValid();

    const validateChangePassword = computed(() => {
      return !isDirty.value || !isValid.value;
    });

    onMounted(() => {
    });
    onUnmounted(() => {
      logoutProcessing.value = false;
    });
    const onSubmitChangePassword = onHandleChangePassword(values => {
      if(profileStore.profileInfo?.id)
        profileStore.changePassword(
          profileStore.profileInfo.id,
          values.passwordChange
        )
    });
    function onSubmitChangeProfileData() {
      console.log(currentEditFieldName.value, currentEditFieldProperty.value, newProfileData.value);
      profileStore.changeProfileData(newProfileData.value, currentEditFieldProperty.value);
    }
    function onLogOut(){
      logoutProcessing.value = true;
      setTimeout(() => {
        profileStore.clear();
        router.replace('/signin');
      }, 500);
    }
    return {
      profileStore,
      changePasswordMode,
      currentPassword,
      passwordChange,
      newProfileData,
      passwordChangeRepeat,
      validateChangePassword,
      onSubmitChangePassword,
      logoutProcessing,
      currentEditFieldName,
      currentEditFieldProperty,
      onSubmitChangeProfileData,
      onLogOut
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
