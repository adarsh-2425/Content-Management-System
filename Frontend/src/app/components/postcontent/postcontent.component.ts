import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContentService } from 'src/app/services/content.service';
import { ValidateService } from 'src/app/services/validate.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-postcontent',
  templateUrl: './postcontent.component.html',
  styleUrls: ['./postcontent.component.css']
})
export class PostcontentComponent implements OnInit {

  username: any;

  title:string = '';
  image:string ='';
  post:string = '';
  

  constructor(
    private contentService:ContentService,
    private validateService:ValidateService,
    private toastr: ToastrService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.username = localStorage.getItem('username');
  }

  onContentSubmit(){
    const content = {
      title: this.title,
      image: this.image,
      post: this.post,
      authorName: this.username
    }
    if(!this.validateService.validateContent(content)){
      this.toastr.error('You did not write any stories!!');
      return false;
    }

    this.contentService.postContent(content).subscribe(
      data =>{
        if(data.success){
          this.toastr.success('Post is Successfully Published!');
          this.router.navigate(['/dashboard']);
        }
        else{
          this.toastr.error("Post Cannot be Published At The Moment. Try Again later!")
        }
      }
    )
    
  }

}
