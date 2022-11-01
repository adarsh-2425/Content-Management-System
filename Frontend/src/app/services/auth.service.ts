import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

 server_address= "http://localhost:3000";
//server_address= "api";

  authtoken: any;
  user: any;
  role: any;
  username:any;
 
  constructor(private http:HttpClient) { }

  registerUser(user: any) {
    let headers = new HttpHeaders()
    headers.append('Content-Type', 'application/json')
    return this.http.post<any>(`${this.server_address}/users/register`, user, {
      headers
    })
  }

  authenticateUser(user:any){
    let headers = new HttpHeaders()
    headers.append('Content-Type', 'application/json')
    return this.http.post<any>(`${this.server_address}/users/authenticate`, user, {
      headers
    })
  }

  getProfile() {
    this.loadToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.authtoken
    });
    return this.http.get(`${this.server_address}/users/profile`, {headers: headers});
  }

  storeUserData(token:any, user:any, role:any, username:any){
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('role', user.role);
    localStorage.setItem('username', user.username);
    this.authtoken  = token;
    this.user = user;
    this.role = role;
    this.username = username;
  }

  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authtoken = token;
  }

  loggedIn()
  {
    return !!localStorage.getItem('id_token')
  }

  // checking if user is superAdmin
  superAdmin(){
    const role =  localStorage.getItem('role')
    if('superAdmin' == role){
      return true;
    }
  }

  // checking if user is superAdmin
  Admin(){
    const role =  localStorage.getItem('role')
    if('Admin' == role){
      return true;
    }
  }

  logout(){
    this.authtoken = null;
    this.user = null;
    this.role = null;
    localStorage.clear();
  }

}
