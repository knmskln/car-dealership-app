import { defineStore } from 'pinia';
import * as requests from "@/requests/profile";
import {UserType} from "@/types/user";

export const useProfileStore = defineStore({
  id: 'profile',
  state: () => ({
    accessToken: localStorage.getItem('accessToken'),
    refreshToken: localStorage.getItem('refreshToken'),
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
    profileInfo: {} as UserType,
  }),
  actions: {
    setAccessToken(token: string) {
      localStorage.setItem('accessToken', token);
      this.accessToken = token;
    },
    setRefreshToken(token: string) {
      localStorage.setItem('refreshToken', token);
      this.refreshToken = token;
    },
    setRole(role: string) {
      localStorage.setItem('role', role);
      this.role = role;
    },
    isLoggedIn(): boolean {
      return !!this.accessToken && !!this.refreshToken;
    },
    isAdmin(): boolean {
      return this.role === 'admin';
    },
    async signIn (username: string, password: string): Promise<any> {
      let signInResp;
      this.isSignInFetching = true;
      try {
        signInResp = await requests.signIn(username, password);
        this.setAccessToken(signInResp.password);
        this.setRefreshToken(signInResp.password);
        this.setRole(signInResp.role[0]);
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
        this.profileInfo = profileResp;
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
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.getItem('role');
      this.$patch({
        accessToken: null,
        refreshToken: null,
        profileInfo: {},
        role: '',
      })
    }
  }
});
