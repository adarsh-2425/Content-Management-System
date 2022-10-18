import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidateService {

  constructor() { }

  validateRegister(user:any){
    if(user.firstName == "" || user.phone == "" ||user.email == "" || user.password == "")
      return false;
      else{
        return true;
      }
  } 

  validateContent(content:any){
    if(content.title == "" || content.post == "")
      return false;
      else{
        return true;
      }
  } 

  validateEmail(email:any){
    const regex = /^([A-Za-z0-9\-._=&<>,+]+)@([A-Za-z0-9\-]+).([a-z]{2,3})(.[a-z]{2,3})?$/;
    return regex.test(email);
  }
  

}