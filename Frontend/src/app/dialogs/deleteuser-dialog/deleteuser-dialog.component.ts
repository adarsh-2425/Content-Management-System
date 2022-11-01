import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-deleteuser-dialog',
  templateUrl: './deleteuser-dialog.component.html',
  styleUrls: ['./deleteuser-dialog.component.css']
})
export class DeleteuserDialogComponent implements OnInit {

name = localStorage.getItem("deleteUserName");

  constructor(
    private UsersService: UsersService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }

  delete(){
    let deleteUserId = localStorage.getItem("deleteUserId");
    this.UsersService.deleteUser(deleteUserId)
    .subscribe((data)=>{
      this.toastr.success(`${this.name} Deleted`)
    })
  localStorage.removeItem("deleteUserId");
  localStorage.removeItem("deleteUserName");
    }

}


