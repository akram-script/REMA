import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/enviroments/enviroment';
import { UserForLogin, UserForRegister } from '../Model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

constructor(private http:HttpClient) { }

baseurl = environment.apiUrl;
authUser(user : UserForLogin ){

  return this.http.post(this.baseurl+'/Account/login',user)
//   let userArray = [];
// if(localStorage.getItem('Users')){
//    userArray = JSON.parse(localStorage.getItem('Users'));
//    return userArray.find(p=>p.userName === user.userName &&  p.password === user.userPass);
}
registerUser(user : UserForRegister){
  console.log(user);
  return this.http.post(this.baseurl+'/Account/register',user);

}

}


