import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable , BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostApiService { 

  isLogin = new BehaviorSubject(false);

  constructor(private _HttpClient:HttpClient) {
      if(localStorage.getItem('checkLogin')!=null){
        this.isLogin.next(true)
      }
      else{
        this.isLogin.next(false)
      }
  }

  
  
  
  register(data:any):Observable<any>{
    return this._HttpClient.post('https://route-egypt-api.herokuapp.com/signup' , data)
  }

  login(data:any):Observable<any>{
    return this._HttpClient.post('https://route-egypt-api.herokuapp.com/signin' , data)
  }
}
