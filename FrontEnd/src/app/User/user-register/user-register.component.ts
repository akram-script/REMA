import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/Model/user';
import { AlertifyService } from 'src/app/services/alertify.service';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {

  registrationForm : FormGroup ;
  user : User ;
  userSubmitted : boolean  ;
  /**
   *
   */
  constructor(private alertify : AlertifyService ,
              private fb : FormBuilder ,
              private userService : UserService) {}

  ngOnInit(): void {
    // this.registrationForm = new FormGroup(
    //   {
    //       userName: new FormControl('akram',Validators.required),
    //       email : new FormControl(null,[Validators.required , Validators.email]),
    //       password : new FormControl(null,[Validators.required,Validators.minLength(8)]),
    //       confirmPassword : new FormControl(null,[Validators.required]),
    //       mobile : new FormControl(null,[Validators.required,Validators.maxLength(10)])
    //   } , {validators: this.passwordMatchingValidatior}
    // );
      this.createRegistrationForm() ;
      this.registrationForm.controls['userName'].setValue('default');
      this.registrationForm.controls['email'].setValue('azaekaz@email');
      this.registrationForm.controls['password'].setValue('akram123456');
      this.registrationForm.controls['confirmPassword'].setValue('akram123456');
      this.registrationForm.controls['mobile'].setValue('0678421257');

  }
  createRegistrationForm(){
    this.registrationForm = this.fb.group({
      userName: [null,[Validators.required]],
      email : [null,[Validators.required , Validators.email]],
      password : [null,[Validators.required,Validators.minLength(8)]],
      confirmPassword : [null,[Validators.required]],
      mobile : [null,[Validators.required,Validators.maxLength(10)]]
  } , {validators: this.passwordMatchingValidatior})
  }

  passwordMatchingValidatior(fg: FormGroup): Validators  {
    return fg.get('password').value === fg.get('confirmPassword').value ? null :
        {notmatched: true};
}


  onSubmit(){
    this.userSubmitted = true ;
    if(this.registrationForm.valid){
    //this.user = Object.assign(this.user,this.registrationForm.value);
    this.userService.adduser(this.userData());
    this.registrationForm.reset();
    this.userSubmitted = false ;
    this.alertify.success("Successfully registered");
    }else{
      this.alertify.error("kindly , provide the required fields");
    }

  }
  userData () : User {
    return this.user = {
      userName : this.userName.value ,
      password : this.password.value ,
      email : this.email.value ,
      mobile : this.mobile.value

    }
  }



  get userName() {
    return this.registrationForm.get('userName') as FormControl;
}

get email() {
    return this.registrationForm.get('email') as FormControl;
}
get password() {
    return this.registrationForm.get('password') as FormControl;
}
get confirmPassword() {
    return this.registrationForm.get('confirmPassword') as FormControl;
}
get mobile() {
    return this.registrationForm.get('mobile') as FormControl;
}

}
