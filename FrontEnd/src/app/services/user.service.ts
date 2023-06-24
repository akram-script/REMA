import { Injectable } from '@angular/core';
import { User } from '../Model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

adduser(user : User){
  let users = [];
  if(localStorage.getItem('Users')){
    users = JSON.parse(localStorage.getItem('Users'));
    if (!Array.isArray(users)) {
      users = [];
    }
    users.unshift(user);
  }else{
    users = [user];
  }
  localStorage.setItem('Users',JSON.stringify(users)) ;
}
}
