import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContentService } from 'src/app/services/content.service';
import { ValidateService } from 'src/app/services/validate.service';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/services/category.service';



@Component({
  selector: 'app-postcontent',
  templateUrl: './postcontent.component.html',
  styleUrls: ['./postcontent.component.css']
})
export class PostcontentComponent implements OnInit {

  Categories:any[] | undefined;

  username: any;

  title:string = '';
  image:string ='';
  post:string = '';
  categories:string = '';
  

  constructor(
    private ContentService:ContentService,
    private CategoryService:CategoryService,
    private validateService:ValidateService,
    private toastr: ToastrService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.username = localStorage.getItem('username');
    // show category in select tag
    this.CategoryService.viewCategory()
    .subscribe((data)=>{
      this.Categories = JSON.parse(JSON.stringify(data));   
    })
  }

 

  onContentSubmit(){
    const content = {
      title: this.title,
      category: this.categories,
      image: this.image,
      post: this.post,
      authorName: this.username
    }
    console.log(content);
    
    if(!this.validateService.validateContent(content)){
      this.toastr.error('You did not write any stories!!');
      return false;
    }

    this.ContentService.postContent(content).subscribe(
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

  resetContent(){
    this.ContentService.resetContent();
    this.router.navigate(['/postcontent']);
  }

  discard(){
    this.ContentService.discard();
  }

}
