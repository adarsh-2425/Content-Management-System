import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import { CategoryupdateComponent } from 'src/app/dialogs/categoryupdate/categoryupdate.component';
import { slideInOut } from 'src/app/animations/animations';
import { fade } from 'src/app/animations/fade';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  animations: [
    slideInOut,
    fade
  ]
})
export class CategoryComponent implements OnInit {
  visible: any;
  Categories:any[] | undefined;
  category:any = '';

  

  constructor(
    private CategoryService:CategoryService,
    private toastr: ToastrService,
    public authService: AuthService,
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.CategoryService.viewCategory()
    .subscribe((data)=>{
      this.Categories = JSON.parse(JSON.stringify(data));   
    })
  }

  openDialog(category:any): void {
    localStorage.setItem("editCategoryId", category._id.toString());
    let dialogRef = this.dialog.open(CategoryupdateComponent);
    
      height :'40%'
      width : '60%'
      
    // Refresh page after dialog close angular
    dialogRef.afterClosed()
    .subscribe(() => this.ngOnInit());
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
        else if(data.result == 'exists'){
          this.toastr.error('Category Already Exists')
        }
        else{
          this.toastr.error("Something Went Wrong!")
        }
      }
    )
  };

  deleteCategory(category:any){
    // if (confirm('Are you sure you want to delete this?')) {
    this.CategoryService.deleteCategory(category._id).subscribe(
      data=>{
        this.Categories = this.Categories?.filter(c => c!= category);
        this.toastr.error(`${category.category} deleted`);
            })
  };

  check(){
    console.log('Check ok');
    
  }

}

// Refresh a component in angular
//  this.ngOnInit();