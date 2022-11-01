import { Component, OnInit } from '@angular/core';
import { ContentService } from 'src/app/services/content.service';
import { CategoryService } from 'src/app/services/category.service';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  contents:any[] | undefined;
  content_id:string = '';
  Categories:any[] | undefined;
  like:boolean = false;
  likedPost:string = '';
  liked:string = 'liked';
  disliked:string = 'disliked';
   username = localStorage.getItem('username');;

  
   

  constructor(
    private ContentService:ContentService,
    private toastr:ToastrService,
    private CategoryService:CategoryService,
    private router:Router,
    public authService : AuthService
    ) { }

  ngOnInit(): void {
    this.CategoryService.viewCategory()
    .subscribe((data)=>{
      this.Categories = JSON.parse(JSON.stringify(data));   
    })

    // calling viewAllCategories() function
    this.viewAllCategories();
    localStorage.removeItem('editContentId');
    localStorage.removeItem('viewAuthorId');
    
    
  };

  // Like feature
 likeToggle(content:any){
  
    this.like = !this.like;
  }
  // View posts from all categories
  viewAllCategories(){
    this.ContentService.getContents().subscribe((data)=>{
    this.contents = JSON.parse(JSON.stringify(data))
    });
  }

  // View posts by categories
  contentByCategory(Category:any){
    this.ContentService.getContentByCategory(Category.category).subscribe((data)=>{
      this.contents = JSON.parse(JSON.stringify(data));
    })
  }

  user(){
   this.username = localStorage.getItem('username');  
    
  }

  updateContent(content:any){
    localStorage.setItem("editContentId", content._id.toString());
    this.router.navigate(['/updatecontent'])
  };

  ViewContent(content:any){
    localStorage.setItem("viewContentId", content._id.toString());
    localStorage.setItem("viewAuthorId", content.authorName.toString());
    this.router.navigate(['/viewcontent'])
  }

    likePost(content:any){
      
    }
 

  delete(content:any){
    if (confirm('Are you sure you want to delete this?')) {
      this.ContentService.deleteContent(content._id)
       .subscribe((data)=>{
        this.contents = this.contents?.filter(c => c !=content)
        this.toastr.info('Post Deleted');
    });
  };
}


}
