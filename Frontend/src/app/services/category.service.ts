import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  //server_address= "http://localhost:3000";
  server_address= "http://localhost:3000";


  constructor(
    private http:HttpClient
  ) { }

  viewCategory(){
    return this.http.get(`${this.server_address}/categories/viewcategory`)
  }

  getCategory(id:any){
    return this.http.get(`${this.server_address}/categories/`+id)
  }


 

  addCategory(Category:any){
    return this.http.post<any>(`${this.server_address}/categories/addcategory`, Category)
  }

  updateCategory(Category:any){
    return this.http.put(`${this.server_address}/categories/update`, Category)
    .subscribe(data =>{
      console.log(data);
    });
  };

  deleteCategory(id:any){
    return this.http.delete(`${this.server_address}/categories/remove/`+id);
  }

}
