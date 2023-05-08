import {UserType} from "@/types/user";
import axios from "axios";

export const findUsers = (search: string): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    const usersResp = await axios.get('http://localhost:8080/api/users');
    const users = usersResp.data;
    let filteredUsers: UserType[] = [];
    let filterByFullName = users.filter((u: any) => u.name.toLowerCase().includes(search.toLowerCase()));
    let filterByUsername = users.filter((u: any) => u.username.toLowerCase().includes(search.toLowerCase()));
    let filterByPhoneNumber = users.filter((u: any) => u.number.toLowerCase().includes(search.toLowerCase()));
    let filterByEmail = users.filter((u: any) => u.email.toLowerCase().includes(search.toLowerCase()));
    console.log('filters', filterByUsername, filterByFullName, filterByEmail, filterByPhoneNumber)
    if(!search){
      filteredUsers = users;
    } else {
      if(filterByFullName.length){
        filteredUsers = filterByFullName;
      } else if (filterByUsername.length){
        filteredUsers = filterByUsername;
      } else if (filterByPhoneNumber.length) {
        filteredUsers = filterByPhoneNumber;
      } else if (filterByEmail.length) {
        filteredUsers = filterByEmail;
      }
    }
    // filteredUsers = users.filter(u => u.username.toLowerCase().includes(search.toLowerCase()));
    console.log(search,filteredUsers);
    if(filteredUsers) resolve(filteredUsers);
    else reject({message: 'no users found'});
  });
}
