import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { slideInOut } from 'src/app/animations/animations';
import { fade } from 'src/app/animations/fade';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    slideInOut,
    fade
  ]
})
export class HomeComponent implements OnInit {

  contents:any[] | undefined;
  Categories:any[] | undefined;

  constructor(
    public AuthService:AuthService
    ) { }

  ngOnInit(): void {

  }

}

