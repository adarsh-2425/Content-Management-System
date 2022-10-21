import { Component, OnInit } from '@angular/core';
import { ContentService } from 'src/app/services/content.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  contents:any[] | undefined

  constructor(private ContentService:ContentService) { }

  ngOnInit(): void {
    this.ContentService.getContents().subscribe((data)=>{
      this.contents = JSON.parse(JSON.stringify(data))
    });
  }

}
