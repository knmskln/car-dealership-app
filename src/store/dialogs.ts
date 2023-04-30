import { defineStore } from 'pinia';
import {DialogType} from "@/types/dialog";
import {MessageType} from "@/types/message";

export const useDialogsStore = defineStore({
  id: 'dialogs',
  state: () => ({
    dialogs: [] as DialogType[],
    createNewDialogMode: false,
  }),
  actions: {
    setDialogs(dialogs: DialogType[]) {
      this.dialogs = dialogs;
    },
    addDialog(dialog: DialogType) {
      this.dialogs.push(dialog);
    },
    removeDialog(dialog: DialogType) {
      const position = this.dialogs.findIndex(dialogForRemove => dialogForRemove.id === dialog.id);
      if (position) this.dialogs.splice(position, 1);
    },
    setDialogMessages(dialog: DialogType, messages: MessageType[]){
      const dialogPosition = this.dialogs.findIndex(dialogForRemove => dialogForRemove.id === dialog.id);
      this.dialogs[dialogPosition].messages = messages;
    },
    addDialogMessage(dialog: DialogType, message: MessageType){
      const dialogPosition = this.dialogs.findIndex(dialogForRemove => dialogForRemove.id === dialog.id);
      this.dialogs[dialogPosition].messages.push(message);
    },
    unlockDialog(dialogId: number, secretKey: string){
      const dialogPosition = this.dialogs.findIndex(dialogForRemove => dialogForRemove.id === dialogId);
      this.dialogs[dialogPosition].secretKey = secretKey;
      localStorage.setItem(`dialog-${this.dialogs[dialogPosition].id}-secret-key`, secretKey);
    },
    lockDialog(dialog: DialogType){
      const dialogPosition = this.dialogs.findIndex(dialogForRemove => dialogForRemove.id === dialog.id);
      this.dialogs[dialogPosition].secretKey = null;
      localStorage.removeItem(`dialog-${this.dialogs[dialogPosition].id}-secret-key`);
    },
    openDialog(dialog: DialogType) {
      const dialogPosition = this.dialogs.findIndex(dialogForRemove => dialogForRemove.id === dialog.id);
      this.dialogs[dialogPosition].isOpen = true;
    },
    closeDialog(dialog: DialogType) {
      const dialogPosition = this.dialogs.findIndex(dialogForRemove => dialogForRemove.id === dialog.id);
      this.dialogs[dialogPosition].isOpen = false;
    },
    toggleCreateNewDialogMode(mode: boolean){
      this.createNewDialogMode = mode;
    },
    lockAllDialogs() {
      this.dialogs = this.dialogs.map(dialogForLock => ({...dialogForLock, secretKey: null}));
    }
  }
});
