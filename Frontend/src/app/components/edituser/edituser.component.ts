import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.css']
})
export class EdituserComponent implements OnInit {
  user={
    firstName:'',
    lastName:'',
    about:'',
    gender:'',
    email:'',
    phone:'',
    username:''
  }

  constructor(
    private UsersService:UsersService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    let id = localStorage.getItem('editUserId');
    this.UsersService.getUser(id).subscribe((data)=>{
      this.user=JSON.parse(JSON.stringify(data));
    })

  }

  editUser(){
    this.UsersService.editUserByUser(this.user);
    this.toastr.success('Profile Updated!')
    this.router.navigate(['dashboard'])
  }

}
