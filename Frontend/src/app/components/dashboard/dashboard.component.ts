import { Component, OnInit } from '@angular/core';
import { ContentService } from 'src/app/services/content.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  contents:any[] | undefined;
  content_id:string = '';
  


  constructor(
    private ContentService:ContentService,
    private toastr:ToastrService
    ) { }

  ngOnInit(): void {
    const username = localStorage.getItem('username');
    this.ContentService.getUserContent(username).subscribe((data)=>{
      this.contents = JSON.parse(JSON.stringify(data))
    });
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
