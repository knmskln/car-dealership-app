import {users} from "@/mocks/users";
import {UserType} from "@/types/user";

export const findUsers = (search: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    let filteredUsers: UserType[] = [];
    let filterByFullName = users.filter(u => u.fullName.toLowerCase().includes(search.toLowerCase()));
    let filterByUsername = users.filter(u => u.username.toLowerCase().includes(search.toLowerCase()));
    let filterByPhoneNumber = users.filter(u => u.phoneNumber.toLowerCase().includes(search.toLowerCase()));
    let filterByEmail = users.filter(u => u.email.toLowerCase().includes(search.toLowerCase()));
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
    if(filteredUsers) setTimeout(resolve, 1000, filteredUsers);
    else setTimeout(reject, 1000, {message: 'no users found'});
  });
}
