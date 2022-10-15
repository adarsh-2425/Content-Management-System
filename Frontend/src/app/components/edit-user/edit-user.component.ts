import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  user = {
    role:'',
    _id:''
  }

  constructor(private router:Router,private userService: UsersService) { }

  ngOnInit(): void {
    let userId = localStorage.getItem("editUserId");
    this.userService.getUser(userId).subscribe((data)=>{
      this.user=JSON.parse(JSON.stringify(data));
  })

}
editUser()
{    
  this.userService.editUser(this.user);   
  alert("Success");
  localStorage.removeItem("editUserId");
  this.router.navigate(['dashboard']);
}
}
