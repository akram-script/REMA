import { Component, OnInit } from '@angular/core';
import {  NgForm } from '@angular/forms';
import { Router } from '@angular/router';
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
              private router : Router) {

 }
 ngOnInit(): void {

 }
 onLogin(loginform : NgForm){
  console.log(loginform.value);
  const token = this.authService.authUser(loginform.value);
  if(token){
    localStorage.setItem('token',token.userName)
   this.alertify.success('login successful') ;
   this.router.navigate(['/']) ;
  }else{
    this.alertify.error('user id or password is incorrect');
  }

 }
}
