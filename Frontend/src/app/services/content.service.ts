import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  server_address= "http://localhost:3000";

  constructor(
    private http:HttpClient,
    private toastr: ToastrService,
    private router: Router
    ) { }

  postContent(story:any){
    let headers = new HttpHeaders()
    headers.append('Content-Type', 'application/json')
    return this.http.post<any>(`${this.server_address}/contents/postcontent`, story,{
      headers
    })
  }

  getContent(id:any){
    return this.http.get(`${this.server_address}/contents/`+id)
  }

  getContents(){
    return this.http.get(`${this.server_address}/contents/viewcontent`)
  }

  getUserContent(username:any){
    return this.http.get(`${this.server_address}/contents/usercontent/`+username)
  }

  getContentByCategory(category:any){
    return this.http.get(`${this.server_address}/contents/viewbycategory/`+category)
  }

  updateContent(content:any){
    return this.http.put(`${this.server_address}/contents/updatecontent`,content)
    .subscribe(data => {
      console.log(data);  
    })
  }

  deleteContent(id:any){
    return this.http.delete(`${this.server_address}/contents/delete/`+id)
  }

 

  resetContent(){
    this.toastr.info('Reset Done')
  }

  discard(){
    this.toastr.info("Changes Discarded");
    this.router.navigate(['/dashboard'])
  }

}
