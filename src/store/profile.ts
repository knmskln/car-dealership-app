import { defineStore } from 'pinia';
import * as requests from "@/requests/profile";
import {UserType} from "@/types/user";

export const useProfileStore = defineStore({
  id: 'profile',
  state: () => ({
    role: localStorage.getItem('role'),
    isSignInFetching: false,
    isSignUpFetching: false,
    isProfileFetching: false,
    profileFetchingErrorActive: false,
    profileFetchingError: '',
    signInErrorText: '',
    signInErrorActive: false,
    signUpErrorText: '',
    signUpErrorActive: false,
    profileInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo') as string) as UserType : undefined,
  }),
  actions: {
    setRole(role: string) {
      localStorage.setItem('role', role);
      this.role = role;
    },
    isLoggedIn(): boolean {
      return !!this.profileInfo;
    },
    isAdmin(): boolean {
      return this.role === 'admin';
    },
    async signIn (username: string, password: string): Promise<any> {
      let signInResp;
      this.isSignInFetching = true;
      try {
        signInResp = await requests.signIn(username, password);
        console.log(signInResp.data);
        this.profileInfo = signInResp.data;
        localStorage.setItem('userInfo', JSON.stringify(signInResp.data));
        this.setRole(signInResp.data.roles[0].split('_')[1].toLowerCase());
        return signInResp;
      } catch (e: any) {
        this.isSignInFetching = false;
        this.signInErrorActive = true;
        this.signInErrorText = e.message;
        throw new Error(e);
      }
    },
    async getProfile(): Promise<any> {
      let profileResp;
      this.isProfileFetching = true;
      try {
        profileResp = await requests.getProfile();
        this.profileInfo = profileResp.data;
        this.isProfileFetching = false;
        return profileResp;
      } catch (e: any) {
        throw new Error(e);
      }
    },
    hideSignInError(): void {
      this.signInErrorActive = false;
    },
    hideProfileFetchingError(): void {
      this.profileFetchingErrorActive = false;
    },
    changeIsSignInFetching(value: boolean): void {
      this.isSignInFetching = value;
    },
    clear() {
      localStorage.removeItem('userInfo');
      localStorage.getItem('role');
      this.$patch({
        profileInfo: undefined,
        role: '',
      })
    }
  }
});
