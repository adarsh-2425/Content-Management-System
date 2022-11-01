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
  Namehtml:string = '';
  Phonehtml:string = '';
  Emailhtml:string = '';
  alertStyle:string = '';
  alertName:string = '';
  alertPhone:string = '';
  alertEmail:string = '';
  borderLastName:string = '';
  borderok:string = '';
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
  
// First Name Check
checkName(){
  const user = {
    firstName: this.firstName.trim()
  }
  if(!this.validateService.validateName(user.firstName)){
    this.Namehtml = "<p>Enter Name</p>";
    this.alertStyle = 'weakPwd';
  }
  else{
    this.Namehtml = "";
  }
}

checkPhone(){
  const user = {
    phone: this.phone.trim()
  }
  if(!this.validateService.validatePhone(user.phone)){
    this.Phonehtml = "Enter Valid Phone Number";
  }
  else{
    this.Phonehtml = "";
  }
}

checkEmail(){
  const user = {
    email: this.email.trim()
  }
  if(!this.validateService.validateEmail(user.email)){
    this.Emailhtml = "<p>Enter Valid Email</p>";
    this.alertStyle = 'weakPwd';
  }
  else{
    this.Emailhtml = "";
  }
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
  this.toastr.error('Please Fill Required Fields');
  return false;
}
// Validate Number
if(!this.validateService.validatePhone(user)){
  this.toastr.error('Please Enter Correct Number');
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
