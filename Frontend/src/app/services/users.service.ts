import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  server_address= "http://localhost:3000";
  //server_address= "api";

  constructor(private http:HttpClient) { }

  getUsers(){
    return this.http.get(`${this.server_address}/users/userlist`);
  }

  getUser(id:any){
    return this.http.get(`${this.server_address}/users/`+id);
  }

  getUserByPost(username:any){
    return this.http.get(`${this.server_address}/users/userpost/`+username);
  }

  editUser(user:any)
  {
    console.log('User update')
    return this.http.put(`${this.server_address}/users/updateuser/`,user)
    .subscribe(data =>{console.log(data)})
  }

  // Delete User
  deleteUser(id:any){
    return this.http.delete(`${this.server_address}/users/delete/`+id)
  }

}
