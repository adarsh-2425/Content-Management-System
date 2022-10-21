import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  server_address = "http://localhost:3000";

  constructor(
    private http:HttpClient
  ) { }

  viewCategory(){
    return this.http.get(`${this.server_address}/categories/viewcategory`)
  }

}
