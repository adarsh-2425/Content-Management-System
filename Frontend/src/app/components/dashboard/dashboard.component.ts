import { Component, OnInit } from '@angular/core';
import { ContentService } from 'src/app/services/content.service';
import { CategoryService } from 'src/app/services/category.service';
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
  


  constructor(
    private ContentService:ContentService,
    private toastr:ToastrService,
    private CategoryService:CategoryService,
    private router:Router
    ) { }

  ngOnInit(): void {
    this.CategoryService.viewCategory()
    .subscribe((data)=>{
      this.Categories = JSON.parse(JSON.stringify(data));   
    })

    // calling viewAllCategories() function
    this.viewAllCategories();

  };

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

}
