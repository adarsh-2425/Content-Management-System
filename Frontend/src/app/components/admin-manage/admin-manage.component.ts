import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { ToastrService } from 'ngx-toastr';
import {MatDialog} from '@angular/material/dialog';
import { PromoteDialogComponent } from 'src/app/dialogs/promote-dialog/promote-dialog.component';
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
    private router:Router,
    private userService: UsersService,
    public dialog: MatDialog,
    private PromoteDialogComponent:PromoteDialogComponent
    ) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe((data)=>{
      this.users = JSON.parse(JSON.stringify(data));
    }); 
  }
  openDialog(user:any): void {
    localStorage.setItem("editUserId", user._id.toString());
    let dialogRef = this.dialog.open(PromoteDialogComponent);
    
      height :'40%'
      width : '60%'
      
    // Refresh page after dialog close angular
    dialogRef.afterClosed()
    .subscribe(() => this.ngOnInit());
  }

  

  

}


