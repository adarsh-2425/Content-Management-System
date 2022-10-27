import { Component, OnInit } from '@angular/core';
import { AfterViewInit, ElementRef} from '@angular/core';
import { ValidateService } from 'src/app/services/validate.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  description = document.getElementsByClassName('description');
  testhtml:string = '';
  alertStyle:string = '';
  pwdType:boolean = true;
  backgroundUrl=" https://source.unsplash.com/YkA7CLrMg8g"
  
  firstName:string = '';
  lastName:string = '';
  gender:string = "";
  email:string = '';
  phone:string = "";
  username:string = '';
  password:string = '';
  repeatPassword:string = '';
  
  pwdToggle():void{
    this.pwdType = !this.pwdType;
  }

  constructor(
    private toastr: ToastrService,
    private validateService: ValidateService,
    private authService: AuthService,
    private router: Router,
    private elementRef:ElementRef
    ) { }

  ngOnInit(): void {
  }
  


// Checking Password Strength
checkstrength(){
  const user = {
    password: this.password.trim()
  }

// Checking Password Minimum Character Criteria
  if(!this.validateService.isPwdMatchCriteria(user.password)){
    this.testhtml = "<p>Password Did Not satisfy Minimum Character Criteria</p>";
    this.alertStyle = 'weakPwd';
  }


if(this.validateService.ispstrong(user.password)){
  // https://stackoverflow.com/questions/41979458/how-to-get-angular2-innerhtml-to-work
  this.testhtml = "<p>Strong Password</p>";
  this.alertStyle = 'strongPwd';
  return true;
  // 123456789Aa@

}
if(this.validateService.ispmedium(user.password)){
  this.testhtml = "<p>Medium Password</p>";
  this.alertStyle = 'mediumPwd';
  return true;
  // 123456Aa@

}
if(this.validateService.isPassword(user.password)){
  this.testhtml = "<p>Weak Password</p>";
  this.alertStyle = 'weakPwd';
  // 123456Aa
  return true;
}
};

  onRegisterSubmit(){
    const user = {
      firstName: this.firstName.trim(),
      lastName: this.lastName.trim(),
      gender: this.gender.trim(),
      phone: this.phone.trim(),
      email: this.email.trim(),
      username: this.email.trim(),
      password: this.password.trim(),
      repeatPassword: this.repeatPassword.trim()
    }

     // required fields
 if(!this.validateService.validateRegister(user)){
  this.toastr.error('Please Fill in all fields');
  return false;
}

// validate email
if(!this.validateService.validateEmail(user.email)){
  this.toastr.error('Please use Valid Email');
    return false;
}



// retype password
if(!this.validateService.repeatPassword(user)){
  this.toastr.error('Passwords Did Not Match');
  return false;
}

   // Register User

   this.authService.registerUser(user).subscribe(
    data => {
      if(data.success){
          this.toastr.success('Account is Created. Please Login');
          this.router.navigate(['/login']);
        } 
      else{
        this.toastr.warning('Something Went Wrong!!!');
        this.router.navigate(['/register']);

      }
    }
  );


  }



}
