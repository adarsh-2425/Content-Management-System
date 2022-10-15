import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authtoken: any;
  user: any;

  

  constructor(private http:HttpClient) { }

  registerUser(user: any) {
    let headers = new HttpHeaders()
    headers.append('Content-Type', 'application/json')
    return this.http.post<any>('http://localhost:3000/users/register', user, {
      headers
    })
  }

  authenticateUser(user:any){
    let headers = new HttpHeaders()
    headers.append('Content-Type', 'application/json')
    return this.http.post<any>('http://localhost:3000/users/authenticate', user, {
      headers
    })
  }

  getProfile() {
    this.loadToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.authtoken
    });
  
    return this.http.get('http://localhost:3000/users/profile', {headers: headers});
  }

  storeUserData(token:any, user:any ){
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authtoken  = token;
    this.user = user;
  }

  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authtoken = token;
  }

  loggedIn()
  {
    return !!localStorage.getItem('id_token')
  }

  logout(){
    this.authtoken = null;
    this.user = null;
    localStorage.clear();
  }

}
