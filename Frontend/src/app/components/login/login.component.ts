import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email:string = '';
  password:string = '';

  constructor(
    private authService:AuthService,
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

    this.authService.authenticateUser(user)
    .subscribe(
      data => {
        if(data.success){
          this.authService.storeUserData(data.token, data.user, data.role);
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
