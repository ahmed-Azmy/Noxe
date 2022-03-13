import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { PostApiService } from './post-api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  constructor(private _PostApiService:PostApiService , private _Router:Router){}
  canActivate():boolean{
    if(this._PostApiService.isLogin.getValue()){
       return true;
    }
    else{
       this._Router.navigate(['/login'])
       return false;
    }
  }

}
  

