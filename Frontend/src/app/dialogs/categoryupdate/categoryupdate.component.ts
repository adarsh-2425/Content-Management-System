import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/services/category.service';


@Component({
  selector: 'app-categoryupdate',
  templateUrl: './categoryupdate.component.html',
  styleUrls: ['./categoryupdate.component.css']
})
export class CategoryupdateComponent implements OnInit {

  Categories = {
    category:''
  }

  constructor(
    private CategoryService:CategoryService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    const id = localStorage.getItem("editCategoryId");
    this.CategoryService.getCategory(id).subscribe((data)=>{
      this.Categories = JSON.parse(JSON.stringify(data));
    })
  }

  editCategory(){
     this.CategoryService.updateCategory(this.Categories)
     localStorage.removeItem('editCategoryId');
     this.toastr.success(`Updated as ${this.Categories.category} `)
  }

}
