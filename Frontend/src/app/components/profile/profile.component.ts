import { Component, OnInit } from '@angular/core';
import { ContentService } from 'src/app/services/content.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  contents:any[] | undefined;
  content_id:string = '';
  


  constructor(
    private ContentService:ContentService,
    private toastr:ToastrService,
    private router:Router
    ) { }

  ngOnInit(): void {
    const username = localStorage.getItem('username');
    this.ContentService.getUserContent(username).subscribe((data)=>{
    this.contents = JSON.parse(JSON.stringify(data))
    });
  };

  updateContent(content:any){
    localStorage.setItem("editContentId", content._id.toString());
    this.router.navigate(['/updatecontent'])
  };

 

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
