import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http:HttpClient) { }

  getUsers(){
    return this.http.get(`http://localhost:3000/users/userlist`);
  }

  getUser(id:any){
    return this.http.get(`http://localhost:3000/users/`+id);
  }

  getUserByPost(username:any){
    return this.http.get(`http://localhost:3000/users/userpost/`+username);
  }

  editUser(user:any)
  {
    console.log('User update')
    return this.http.put(`http://localhost:3000/users/updateuser/`,user)
    .subscribe(data =>{console.log(data)})
  }

}
