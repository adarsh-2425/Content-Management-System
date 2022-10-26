import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-promote-dialog',
  templateUrl: './promote-dialog.component.html',
  styleUrls: ['./promote-dialog.component.css']
})
export class PromoteDialogComponent implements OnInit {
  user = {
    role:'',
    _id:''
  }

  constructor(
    private userService: UsersService,
    private toastr:ToastrService
  ) { }

  ngOnInit(): void {
    let userId = localStorage.getItem("editUserId");
    this.userService.getUser(userId).subscribe((data)=>{
      this.user=JSON.parse(JSON.stringify(data));
  })
  }

  editUser(user:any)
{    
  this.userService.editUser(this.user);   
  this.toastr.success(`${user.firstName + " " + user.lastName} Promoted to ${user.role}`)
  localStorage.removeItem("editUserId");

}

}

// Every dialog component must be given in providers list in app.module.ts
