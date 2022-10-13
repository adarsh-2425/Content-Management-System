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
  firstName:string = '';
  lastName:string = '';
  gender:string = "";
  email:string = '';
  phone:string = "";
  username:string = '';
  password:string = '';
  
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
      password: this.password
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


  }



}
