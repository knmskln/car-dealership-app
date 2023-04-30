<template>
  <v-dialog
    v-model="logoutProcessing"
    persistent
    width="auto"
  >
    <v-card>
      <v-card-text>
        Logging out
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
  <v-navigation-drawer
    permanent
    theme="dark"
  >
    <v-list nav>
      <v-list-item prepend-icon="mdi-update" title="Запісы" value="applications" to="/admin/applications"></v-list-item>
      <v-list-item prepend-icon="mdi-account-multiple" title="Карыстальнікі" value="users" to="/admin/users"></v-list-item>
      <v-list-item prepend-icon="mdi-chart-box" title="Статыстыка" value="statistics" to="/admin/statistics"></v-list-item>
      <v-list-item prepend-icon="mdi-cog" title="Наладкі" value="settings" to="/admin/settings"></v-list-item>
    </v-list>
  </v-navigation-drawer>
  <v-main>
    <router-view></router-view>
  </v-main>
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

    const {
      handleSubmit: onHandleChangePassword,
    } = useForm({
      validationSchema: {
        currentPassword (value: string) {
          if(value?.length) return true;
          return 'current password can not be empty';
        },
        passwordChange (value: string) {
          if (value?.length > 8) return true
          return 'password length needs to be more than 8 symbols'
        },
        passwordChangeRepeat (value: string) {
          if (value === passwordChange.value.value) return true
          return 'passwords are not equal'
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
      if (!profileStore.profileInfo.username) {
        profileStore.getProfile();
      }
    });
    onUnmounted(() => {
      logoutProcessing.value = false;
    });
    const onSubmitChangePassword = onHandleChangePassword(values => {
      alert(JSON.stringify(values, null, 2))
    });
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
      passwordChangeRepeat,
      validateChangePassword,
      onSubmitChangePassword,
      logoutProcessing,
      onLogOut}
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
