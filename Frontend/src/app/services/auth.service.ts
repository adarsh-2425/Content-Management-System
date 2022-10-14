import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

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

  storeUserData(token:any, user:any){
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authtoken  = token;
    this.user = user;
  }

  logout(){
    this.authtoken = null;
    this.user = null;
    localStorage.clear();
  }

}
