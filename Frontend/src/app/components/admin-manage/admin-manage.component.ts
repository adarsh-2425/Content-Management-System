import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import {MatDialog} from '@angular/material/dialog';
import { PromoteDialogComponent } from 'src/app/dialogs/promote-dialog/promote-dialog.component';
import { DeleteuserDialogComponent } from 'src/app/dialogs/deleteuser-dialog/deleteuser-dialog.component';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-admin-manage',
  templateUrl: './admin-manage.component.html',
  styleUrls: ['./admin-manage.component.css']
})
export class AdminManageComponent implements OnInit {
  visible: any;
  users:any[] | undefined


  constructor(
    private userService: UsersService,
    public dialog: MatDialog,
    public authService:AuthService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe((data)=>{
      this.users = JSON.parse(JSON.stringify(data));
    }); 
  }

  // Edit User
  editUser(user:any){
    localStorage.setItem("editUserId", user._id.toString());
    this.router.navigate(['/edituser'])
  }

  // Promote User Dialog
  openDialog(user:any): void {
    localStorage.setItem("editUserId", user._id.toString());
    let dialogRef = this.dialog.open(PromoteDialogComponent);
    
      height :'40%'
      width : '60%'
      
    // Refresh page after dialog close angular
    dialogRef.afterClosed()
    .subscribe(() => this.ngOnInit());
  }

  // Delete User
 deleteDialog(user:any):void {
  localStorage.setItem("deleteUserId", user._id.toString());
  localStorage.setItem("deleteUserName", user.firstName.toString());
  let dialogRef = this.dialog.open(DeleteuserDialogComponent);

 
  // Refresh page after dialog close angular
  dialogRef.afterClosed()
  .subscribe(() => this.ngOnInit());
 }
  

  

}


