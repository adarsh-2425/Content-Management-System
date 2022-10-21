import { Component, OnInit } from '@angular/core';
import { ContentService } from 'src/app/services/content.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

Contents = {
  authorName:'',
  title:'',
  image:'',
  post:''
}



  constructor(
    private ContentService:ContentService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const editContentId = localStorage.getItem('editContentId');
    this.ContentService.getContent(editContentId).subscribe((data)=>{
     this.Contents = JSON.parse(JSON.stringify(data));
    })
  };

  editContent(){
    this.ContentService.updateContent(this.Contents);
    this.toastr.success('Content Updated');
    this.router.navigate(['/dashboard']);
  }

  resetContent(){
    this.toastr.info('Reset Done')
    this.router.navigate(['/updatecontent']);
  }

  discard(){
    this.toastr.info("Changes Discarded");
    this.router.navigate(['/dashboard'])
  }

}
