import { Component, OnInit } from '@angular/core';
import { ContentService } from 'src/app/services/content.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  contents = {
    category:'',
    image:'',
    title:'',
    post:'',
    authorName:'',
    createdAt:''
  }

  user = {
    username: '',
    email:''
  }

  constructor(
    private ContentService: ContentService,
    private UsersService:UsersService
  ) { }

  ngOnInit(): void {
    // Retrive Post Details
    const viewContentId = localStorage.getItem('viewContentId');
    this.ContentService.getContent(viewContentId).subscribe((data)=>{
     this.contents = JSON.parse(JSON.stringify(data));
     console.log(this.contents);
    })

    // Retrieve User Details
    const viewAuthorId = localStorage.getItem('viewAuthorId');
    this.UsersService.getUserByPost(viewAuthorId).subscribe((data)=>{
      this.user = JSON.parse(JSON.stringify(data));
      console.log(this.user);
      
    })
  }

}
