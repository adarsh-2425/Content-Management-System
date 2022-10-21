import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  Categories:any[] | undefined;
  category:any = '';

  constructor(
    private CategoryService:CategoryService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.CategoryService.viewCategory()
    .subscribe((data)=>{
      this.Categories = JSON.parse(JSON.stringify(data));   
    })
  }

  addCategory(){
    const Category = {
      category: this.category
    }
    this.CategoryService.addCategory(Category).subscribe(
      data => {
        if(data.success){
          this.toastr.success('Category added')
          // Refresh a component in angular
          //  this.ngOnInit();
          this.ngOnInit();
        }
        else{
          this.toastr.error("Something Went Wrong!")
        }
      }
    )
  }

  deleteCategory(category:any){
    if (confirm('Are you sure you want to delete this?')) {
    this.CategoryService.deleteCategory(category._id).subscribe(
      data=>{
        this.Categories = this.Categories?.filter(c => c!= category);
        this.toastr.error(`${category.category} deleted`);
            })
  }};

  check(){
    console.log('Check ok');
    
  }

}

// Refresh a component in angular
//  this.ngOnInit();