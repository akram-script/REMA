/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @typescript-eslint/no-empty-function */
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {  NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserForRegister, UserForLogin } from 'src/app/Model/user';
import { AlertifyService } from 'src/app/services/alertify.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css'],
})
export class UserLoginComponent implements OnInit{
 /**
  *
  */
 constructor(private alertify : AlertifyService,
              private authService : AuthService,
              private router : Router,
              private http : HttpClient){

 }
 ngOnInit(): void {

 }
 onLogin(loginform : NgForm){
  console.log(loginform.value);
  this.authService.authUser(loginform.value).subscribe((Response:UserForLogin)=>{
   console.log(Response);
   const user = Response
   localStorage.setItem('token',user.token)
   localStorage.setItem('userName',user.userName)
   this.alertify.success('login successful') ;
   this.router.navigate(['/']) ;
  },error=> {
    console.log(error),
    this.alertify.error(error.error);
  }
  );
  // if(token){
  //   localStorage.setItem('token',token.userName)
  //  this.alertify.success('login successful') ;
  //  this.router.navigate(['/']) ;
  // }else{
  //   this.alertify.error('user id or password is incorrect');
  // }

 }
}
