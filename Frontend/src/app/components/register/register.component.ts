import { Component, OnInit } from '@angular/core';
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
  
  backgroundUrl=" https://source.unsplash.com/YkA7CLrMg8g"
  
  firstName:string = '';
  lastName:string = '';
  gender:string = "";
  email:string = '';
  phone:string = "";
  username:string = '';
  password:string = '';
  repeatPassword:string = '';
  
  constructor(
    private toastr: ToastrService,
    private validateService: ValidateService,
    private authService: AuthService,
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  onRegisterSubmit(){
    const user = {
      firstName: this.firstName,
      lastName: this.lastName,
      gender: this.gender,
      phone: this.phone,
      email: this.email,
      username: this.email,
      password: this.password,
      repeatPassword: this.repeatPassword
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
