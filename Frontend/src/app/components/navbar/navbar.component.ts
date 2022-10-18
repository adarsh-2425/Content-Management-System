import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ContentService } from 'src/app/services/content.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    public authService:AuthService,
    public contentService:ContentService,
    private router:Router,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
  }
  

  onLogoutClick(){
    this.authService.logout();
    this.toastr.success('You are Logged out')
    this.router.navigate(['/login'])
     return false;
  };

}
