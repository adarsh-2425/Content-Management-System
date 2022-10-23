import { Component, OnInit } from '@angular/core';
import { ContentService } from 'src/app/services/content.service';
import { CategoryService } from 'src/app/services/category.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  Categories:any[] | undefined;

Contents = {
  authorName:'',
  title:'',
  category:'',
  image:'',
  post:''
}



  constructor(
    private ContentService:ContentService,
    private toastr: ToastrService,
    private CategoryService:CategoryService,
    private router: Router
  ) { }

  ngOnInit(): void {

    // 
    const editContentId = localStorage.getItem('editContentId');
    this.ContentService.getContent(editContentId).subscribe((data)=>{
     this.Contents = JSON.parse(JSON.stringify(data));
    })

    // Category

  };

  editContent(){
    
    this.ContentService.updateContent(this.Contents);
    // localStorage.removeItem("editContentId");
    this.toastr.success('Content Updated');
    this.router.navigate(['/dashboard']);
  }

  resetContent(){
    this.ContentService.resetContent();
    this.router.navigate(['/updatecontent']);

  }

  discard(){
    this.ContentService.discard();
  }

}
