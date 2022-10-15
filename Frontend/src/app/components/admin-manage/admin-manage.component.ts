import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-manage',
  templateUrl: './admin-manage.component.html',
  styleUrls: ['./admin-manage.component.css']
})
export class AdminManageComponent implements OnInit {

  users:any[] | undefined


  constructor(private router:Router,private userService: UsersService) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe((data)=>{
      this.users = JSON.parse(JSON.stringify(data));
    }); 
  }

  promote(user:any){
    localStorage.setItem("editUserId", user._id.toString());
    this.router.navigate(['/edituser']);
    
  }

  

}


