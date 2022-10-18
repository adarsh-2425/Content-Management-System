import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-postcontent',
  templateUrl: './postcontent.component.html',
  styleUrls: ['./postcontent.component.css']
})
export class PostcontentComponent implements OnInit {

  username: any;
  user={
    username:'',
    email:''
  }

  constructor() { }

  ngOnInit(): void {
    this.username = localStorage.getItem('username');
  }

}
