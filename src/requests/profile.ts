import {users} from "@/mocks/users";

export const signIn = (username: string, password: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    const user = users.find(u => u.username === username && u.password === password);
    console.log(user);
    if(user) setTimeout(resolve, 1000, user);
    else setTimeout(reject, 1000, {message: 'wrong username or password'});
  });
}

export const signUp = (username: string, password: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    const newUser = {id: users.length, username, password};
    // users.push(newUser);
    setTimeout(resolve, 1000, newUser);
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
