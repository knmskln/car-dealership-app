import {users} from "@/mocks/users";
import axios from "axios";
import {UserType} from "@/types/user";

export const signIn = (username: string, password: string): Promise<any> => {
  return axios.post('http://localhost:8080/api/auth/signin', {username, password});
}

export const signUp = (signUpData: UserType): Promise<any> => {
  return axios.post('http://localhost:8080/api/auth/signup', signUpData);
}

export const changePassword = (userId: number, newPassword: string): Promise<any> => {
  return axios.patch(`http://localhost:8080/api/users/${userId}`, {userId, newPassword});
}

export const changeProfileData = (profileData: UserType): Promise<any> => {
  return axios.put(`http://localhost:8080/api/users/${profileData.id}`, {
    userId: profileData.id,
    name: profileData.name,
    username: profileData.username,
    number: profileData.number,
    email: profileData.email
  });
}

export const getProfile = (): Promise<any> => {
  return new Promise((resolve, reject) => {
    const user = users.find(u => u.password === localStorage.getItem('accessToken'));
    console.log(user);
    if(user) setTimeout(resolve, 1000, user);
    else setTimeout(reject, 1000, {message: 'could not receive profile info'});
  });
}
