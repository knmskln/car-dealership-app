import {defineStore} from 'pinia';
import * as usersRequests from "@/requests/users";
import {UserType} from "@/types/user";

export const useUsersStore = defineStore({
  id: 'users',
  state: () => ({
    users: [] as UserType[],
    isUsersFetching: false,
  }),
  actions: {
    setUsers(users: UserType[]) {
      this.users = users;
    },

    async findUsers(search: string): Promise<any> {
      let usersResp;
      this.isUsersFetching = true;
      try {
        usersResp = await usersRequests.findUsers(search);
        this.users = usersResp;
        this.isUsersFetching = false;
        return usersResp;
      } catch (e: any) {
        this.isUsersFetching = false;
        throw new Error(e);
      }
    },
  }
});
