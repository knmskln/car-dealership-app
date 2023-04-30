<template>
  <v-dialog
    v-model="promptSecretWord"
    persistent
    style="max-width: 500px"
  >
    <v-card class="pa-1">
      <v-card-title>
        Введите секретное слово
      </v-card-title>
      <v-card-text class="pa-0">
        <v-container fluid>
          <v-row no-gutters>
            <v-col cols="12">
              <v-text-field
                label="Secret word"
                type="password"
                v-model="promptSecretWordValue"
                required
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-btn color="error" @click="onPromptSecretWord">применить</v-btn>
        <v-btn
          color="primary"
          @click="promptSecretWord = false; promptSecretWordValue = ''; dialogIdInUnlockingMode = 0"
        >
          отменить
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <v-dialog
    v-model="dialogDelete"
    persistent
    style="max-width: 500px"
  >
    <v-card class="pa-1">
      <v-card-text class="pa-4 pb-4" style="text-overflow: unset; display: block">
        Ты реально хош удалить этот диалог?
      </v-card-text>
      <v-card-actions>
        <v-btn color="error" @click="dialogDelete = false">Реально</v-btn>
        <v-btn color="primary" @click="dialogDelete = false">Передумал</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <v-dialog
    v-model="changeSecretWord"
    persistent
    style="max-width: 500px"
  >
    <v-card class="pa-1">
      <v-card-title>
        Изменение секретного слова
      </v-card-title>
      <v-card-text class="pa-0">
        <v-container fluid>
          <v-row no-gutters>
            <v-col cols="12">
              <v-text-field
                label="New secret word"
                type="password"
                required
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-btn color="error" @click="changeSecretWord = false">изменить</v-btn>
        <v-btn color="primary" @click="changeSecretWord = false">отменить</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <v-dialog
    v-model="dialogsStore.createNewDialogMode"
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
            @click="dialogsStore.toggleCreateNewDialogMode(!dialogsStore.createNewDialogMode)"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>New dialog</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <div class="pa-4">
          <form @submit.prevent="onSubmitDialogCreate">
            <v-autocomplete
              v-model="username.value.value"
              v-model:search="searchUser"
              :error-messages="username.errorMessage.value"
              label="Имя пользователя собеседника"
              :loading="searchUserLoading"
              :items="users"
              clearable
              :no-data-text="searchUser ? searchUserLoading ? 'Загрузка' :'Пользователей не найдено' : 'Начните вводить имя пользователя'"
            ></v-autocomplete>

            <v-text-field
              v-model="secretKey.value.value"
              :counter="16"
              :error-messages="secretKey.errorMessage.value"
              label="Придумайте секретное слово"
            ></v-text-field>

            <v-text-field
              v-model="secretKeyRepeat.value.value"
              :counter="16"
              :error-messages="secretKeyRepeat.errorMessage.value"
              label="Повторите секретное слово"
            ></v-text-field>

            <v-btn
              class="me-4 w-100"
              variant="tonal"
              type="submit"
              :disabled="validateDialogCreate"
            >
              create dialog
            </v-btn>
          </form>
        </div>
      </div>
    </v-card>
  </v-dialog>

  <v-main>
    <v-container v-if="dialogsStore.dialogs.length">
      <v-row justify="center" v-for="dialog in dialogsStore.dialogs" v-bind:key="dialog.id">
        <v-col cols="12">
          <v-dialog

            v-model="dialog.isOpen"
            fullscreen
            :scrim="false"
            transition="dialog-bottom-transition"
          >
            <template v-slot:activator="{ props }">
              <v-card
                :title="dialog.companionUsername"
                variant="tonal"
              >
                <v-card-subtitle>
                  <template v-if="dialog.secretKey">
                    {{ decryptText(dialog.secretKey, dialog.messages.at(0).text) }}
                  </template>
                  <template v-else>
                    Locked. Click
                    <v-icon icon="mdi-lock" size="x-small" color="red-lighten-2"></v-icon>
                    to unlock.
                  </template>
                </v-card-subtitle>
                <v-card-actions>
                  <v-btn
                    v-bind="props"
                    :disabled="!dialog.secretKey"
                    @click="onOpenDialog(dialog)"
                  >
                    Open dialog
                  </v-btn>
                  <v-spacer></v-spacer>
                  <v-tooltip
                    v-if="dialog.secretKey"
                    text="Unlocked now, click to lock" location="bottom"
                  >
                    <template v-slot:activator="{ props }">
                      <v-btn
                        v-bind="props"
                        icon="mdi-lock-open-variant"
                        @click="dialogsStore.lockDialog(dialog)"
                      ></v-btn>
                    </template>
                  </v-tooltip>
                  <v-tooltip
                    v-else
                    text="Locked now, click to unlock" location="bottom"
                  >
                    <template v-slot:activator="{ props }">
                      <v-btn
                        v-bind="props"
                        icon="mdi-lock"
                        @click="promptSecretWord = true; dialogIdInUnlockingMode = dialog.id"
                        color="red-lighten-2"
                      ></v-btn>
                    </template>
                  </v-tooltip>
                  <v-btn icon="mdi-delete" @click="dialogDelete = true"></v-btn>

                  <v-menu>
                    <template v-slot:activator="{ props }">
                      <v-btn icon="mdi-dots-vertical" v-bind="props" :disabled="!dialog.secretKey"></v-btn>
                    </template>
                    <v-list>
                      <v-list-item key="0" value="0">
                        <v-list-item-title @click="changeSecretWord = true">Change secret word</v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </v-card-actions>
              </v-card>
            </template>
            <v-card>
              <div
                class="fill-height"
                style="display: flex; flex-direction: column; padding-top:64px; padding-bottom: 72px;"
              >
                <v-toolbar
                  dark
                  class="position-fixed w-100"
                  style="top: 0"
                >
                  <v-btn
                    icon
                    dark
                    @click="dialog.isOpen = false"
                  >
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                  <v-toolbar-title>{{ dialog.companionUsername }}</v-toolbar-title>
                  <v-spacer></v-spacer>
                </v-toolbar>
                <div
                  style="display: flex; flex: 3; overflow-y: scroll; flex-direction: column-reverse;padding: 14px 14px 0"
                >
                  <div
                    v-for="message in dialog.messages"
                    :key="message.id"
                  >
                    <div style="display: flex; justify-content: end; padding-bottom: 14px;"
                         v-if="message.sendUserId === 1">
                      <div style="max-width: 80%">
                        <v-alert color="info" :text="decryptText(dialog.secretKey, message.text)"></v-alert>
                      </div>
                    </div>
                    <div style="display: flex; justify-content: start; padding-bottom: 14px;" v-else>
                      <div style="max-width: 80%">
                        <v-alert variant="tonal" :text="decryptText(dialog.secretKey, message.text)"></v-alert>
                      </div>
                    </div>
                  </div>
                </div>
                <div id="dialog" class="position-fixed w-100"
                     style="bottom: 0;">
                  <v-form @submit.prevent>
                    <v-container fluid class="pa-2">
                    <v-row no-gutters justify="space-between" align="center">
                      <v-col class="pe-2">
                        <v-text-field
                          label="Сообщение"
                          hide-details="auto"
                          id="newMessageInput"
                          v-model="newMessageInput"
                          @focus="onInputFocus"
                        ></v-text-field>
                      </v-col>
                        <v-btn
                          variant="text"
                          type="submit"
                          icon="mdi-send-lock"
                          :disabled="!newMessageInput"
                        ></v-btn>
                    </v-row>
                    </v-container>
                  </v-form>
                </div>
              </div>
            </v-card>
          </v-dialog>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>
<script lang="ts">
import {computed, defineComponent, onMounted, ref, watch} from 'vue';
import {AES_CTR, convertHex, convertUtf8, Counter} from "@/helpers/aes";
import {useDialogsStore} from "@/store/dialogs";
import {DialogType} from "@/types/dialog";
import {decryptText} from "@/helpers/crypto";
import {dialogs} from "@/mocks/dialogs";
import {messages} from "@/mocks/messages";
import {useField, useForm, useIsFormDirty, useIsFormValid} from "vee-validate";

messages.reverse();

export default defineComponent({
  setup() {
    const promptSecretWord = ref(false);
    const promptSecretWordValue = ref('');
    const dialogCreate = ref(false);
    const dialogOpen = ref(false);
    const dialogDelete = ref(false);
    const changeSecretWord = ref(false);
    const dialogIdInUnlockingMode = ref(0);
    const dialogIdOpenMode = ref(0);
    const newMessageInput = ref('');
    const searchUser = ref('');
    const searchUserLoading = ref(false);
    const users = ref([] as string[]);
    const usersList = ['aaa','aaabbb','fgfre','hfjkhf','fnkrnfjr'];
    watch(searchUser, (searchUser) => querySelections(searchUser))
    const {
      handleSubmit: onHandleDialogCreate,
      handleReset: onHandleResetDialogCreate,
    } = useForm({
      validationSchema: {
        username (value: string) {
          if (value?.length) return true
          return 'Name can not be empty.'
        },
        secretKey (value: string) {
          if (value?.length === 16) return true
          return 'Secret word needs to be equal to 16 symbols.'
        },
        secretKeyRepeat (value: string) {
          if (value === secretKey.value.value) return true
          return 'Secret words are not equal.'
        },
      },
    });
    const username = useField('username');
    const secretKey = useField('secretKey');
    const secretKeyRepeat = useField('secretKeyRepeat');
    const isDirty = useIsFormDirty();
    const isValid = useIsFormValid();

    const validateDialogCreate = computed(() => {
      return !isDirty.value || !isValid.value;
    });

    const dialogsStore = useDialogsStore();
    onMounted(() => {
      dialogsStore.setDialogs(dialogs.map(dialog => (
        {
          ...dialog,
          secretKey: localStorage.getItem(`dialog-${dialog.id}-secret-key`),
          isOpen: false
        }
      )));

      window.addEventListener('keydown', () => {
        const newMessageInputDOMElement = document.getElementById('newMessageInput');
        if(newMessageInputDOMElement && newMessageInputDOMElement !== document.activeElement){
          newMessageInputDOMElement.focus();
        }
      });
      console.log(dialogsStore.dialogs);
    });
    function onInputFocus(){
    }
    function onPromptSecretWord() {
      dialogsStore.unlockDialog(dialogIdInUnlockingMode.value, promptSecretWordValue.value);
      promptSecretWord.value = false;
      dialogIdInUnlockingMode.value = 0;
      promptSecretWordValue.value = '';
    }

    function onOpenDialog(dialog: DialogType) {
      const dialogMessages = messages.filter(message => message.dialogId === dialog.id);
      dialogsStore.setDialogMessages(dialog, dialogMessages);
      console.log(dialogsStore.dialogs);
      dialogsStore.openDialog(dialog);
    }
    function querySelections(value: string) {
      value = value.trim();
      if (!value) {
        users.value = [];
        return;
      }
      searchUserLoading.value = true

      // Simulated ajax query
      setTimeout(() => {
        users.value = usersList.filter(e => {
          return (e || '').toLowerCase().indexOf((value || '').toLowerCase()) > -1
        });
        searchUserLoading.value = false;
      }, 500);
    }
    const onSubmitDialogCreate = onHandleDialogCreate(values => {
      alert(JSON.stringify(values, null, 2))
    });
    // function stringToCodesArray(data: string) {
    //   return data.split('').map((_, index) => data.charCodeAt(index));
    // }
    // function encryptText(){
    //   console.log(stringToCodesArray('qwertyuiopasdf11'));
    //   let key = stringToCodesArray('qwertyuiopasdf11');
    //
    //   const text = 'Ну привет, ну да а что)))';
    //   console.log('original text: ', text);
    //   const textBytes = convertUtf8.toBytes(text);
    //
    //   const aesCtr = new AES_CTR(key, new Counter(5));
    //   const encryptedBytes = aesCtr.encrypt(textBytes);
    //   const encryptedHex = convertHex.fromBytes(encryptedBytes);
    //   console.log('encryptedHex: ', encryptedHex);
    //   decryptText(encryptedHex);
    // }
    //
    // function decryptText(encryptedHex: string){
    //   let key = stringToCodesArray('c');
    //
    //   const aesCtr = new AES_CTR(key, new Counter(5));
    //   let encryptedBytes = convertHex.toBytes(encryptedHex);
    //   let decryptedBytes = aesCtr.decrypt(encryptedBytes);
    //   let decryptedText = convertUtf8.fromBytes(decryptedBytes);
    //   console.log('decryptedText: ', decryptedText);
    // }

    return {
      promptSecretWord,
      promptSecretWordValue,
      dialogCreate,
      dialogOpen,
      dialogDelete,
      changeSecretWord,
      dialogIdInUnlockingMode,
      dialogIdOpenMode,
      newMessageInput,
      searchUser,
      searchUserLoading,
      users,

      dialogsStore,

      decryptText,

      onOpenDialog,
      onPromptSecretWord,
      onInputFocus,

      username,
      secretKey,
      secretKeyRepeat,
      onHandleDialogCreate,
      onSubmitDialogCreate,
      validateDialogCreate,
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
