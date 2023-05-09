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
    isProfileChangeDialog: false,
    isProfileChangeFetching: false,
    isChangePasswordFetching: false,
    isChangePasswordDialog: false,
    profileFetchingErrorActive: false,
    profileFetchingError: '',
    signInErrorText: '',
    signInErrorActive: false,
    signUpErrorText: '',
    signUpErrorActive: false,
    changeProfileDataErrorText: '',
    changeProfileDataErrorActive: false,
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
    toggleChangePasswordDialog(isOpen: boolean){
      this.isChangePasswordDialog = isOpen;
    },
    toggleChangeProfileDialog(isOpen: boolean){
      this.isProfileChangeDialog = isOpen;
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
        this.isSignInFetching = false;
        return signInResp;
      } catch (e: any) {
        this.isSignInFetching = false;
        this.signInErrorActive = true;
        this.signInErrorText = 'няправільнае імя карыстальніка або пароль';
        throw new Error(e);
      }
    },
    async signUp (signUpData: UserType): Promise<any> {
      let signUpResp;
      this.isSignUpFetching = true;
      try {
        signUpResp = await requests.signUp(signUpData);
        await this.signIn(signUpData.username, signUpData.password);
        return signUpResp.data;
      } catch (e: any) {
        this.isSignUpFetching = false;
        this.signUpErrorActive = true;
        this.signUpErrorText = e.response.data.message;
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
    async changePassword(userId: number, newPassword: string): Promise<any> {
      this.isChangePasswordFetching = true;
      try {
        await requests.changePassword(userId, newPassword);
        this.isChangePasswordDialog = false;
        this.isChangePasswordFetching = false;
      } catch (e: any) {
        this.isChangePasswordFetching = false;
        throw new Error(e);
      }
    },
    async changeProfileData(value: string, property: string): Promise<any> {
      this.isProfileChangeFetching = true;
      try {
        const profileInfo = {...this.profileInfo};
        // @ts-ignore
        profileInfo[property] = value;
        // @ts-ignore
        await requests.changeProfileData(profileInfo);
        this.isProfileChangeDialog = false;
        // @ts-ignore
        this.profileInfo[property] = value;
        localStorage.setItem('userInfo', JSON.stringify(this.profileInfo));
        this.isProfileChangeFetching = false;
      } catch (e: any) {
        this.isProfileChangeFetching = false;
        this.changeProfileDataErrorActive = true;
        this.changeProfileDataErrorText = e.response.data.message;
        throw new Error(e);
      }
    },
    hideSignInError(): void {
      this.signInErrorActive = false;
    },
    hideSignUpError(): void {
      this.signUpErrorActive = false;
    },
    hideProfileFetchingError(): void {
      this.profileFetchingErrorActive = false;
    },
    hideChangeProfileFetchingError(): void {
      this.changeProfileDataErrorActive = false;
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
