import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ValidateService } from 'src/app/services/validate.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // Images
  loginDivUrl="https://source.unsplash.com/-4qhiC6RmQw";
  welcomebackUrl="https://source.unsplash.com/AdqD4Tca080";
  mainUrl="https://source.unsplash.com/YkA7CLrMg8g";
 

  email:string = '';
  password:string = '';

  constructor(
    private authService:AuthService,
    private validateService: ValidateService,
    private router:Router,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
  }

  onLoginSubmit(){
    
    const user = {
      email: this.email,
      password: this.password
    }

    if(!this.validateService.validateEmail(user.email)){
      this.toastr.error('Please enter valid email');
      return false;
    }

    if(!this.validateService.validateLogin(user)){
      this.toastr.error('Please Fill in all fields');
      return false;
    }

    this.authService.authenticateUser(user)
    .subscribe(
      data => {
        if(data.success){
          this.authService.storeUserData(data.token, data.user, data.role, data.username);
          this.toastr.success('Login Successful');
          this.router.navigate(['dashboard']);
        }
        else{
          this.toastr.error(data.msg);
          this.router.navigate(['login']);
        }
        
      }
    );
    
 }

}
