import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  constructor(private http:HttpClient) { }

  postContent(story:any){
    let headers = new HttpHeaders()
    headers.append('Content-Type', 'application/json')
    return this.http.post<any>('http://localhost:3000/contents/postcontent', story,{
      headers
    })
  }

  getContent(){
    return this.http.get('http://localhost:3000/contents/viewcontent')
  }
}
