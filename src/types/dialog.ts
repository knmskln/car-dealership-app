import {UserType} from "@/types/user";
import {MessageType} from "@/types/message";

export interface DialogType {
  id: number,
  companionUsername: string,
  participants: Array<UserType>,
  messages: Array<MessageType>,
  secretKey: string | null,
  isOpen: boolean,
}
