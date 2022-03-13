import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { Subscription } from 'rxjs';
import { GetApiService } from '../get-api.service';
import { PostApiService } from '../post-api.service';
declare var $:any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private _PostApiService:PostApiService , private _Router:Router , private _GetApiService:GetApiService) { }

  isLogin:boolean = false;
  userName:any;
  subStatus = new Subscription();
  
  

  ngOnInit(): void {
    this.subStatus = this._PostApiService.isLogin.subscribe({
      next:(value)=>{
        this.isLogin = value;
        let decodeToken:any = jwtDecode(localStorage.getItem('Token') || '');
        this.userName = decodeToken.first_name;
      }
    }) 
  }

  logOut(){
    this._PostApiService.isLogin.next(false);
    this._Router.navigate(['/login']);
    localStorage.removeItem('checkLogin');
    localStorage.removeItem('TPCurrentPage');
    localStorage.removeItem('tvPopularCurrentPage');
    localStorage.removeItem('TMCurrentPage');
    localStorage.removeItem('PMCurrentPage');
    localStorage.removeItem('currentPagePeople');
    localStorage.removeItem('TTVCurrentPage');
    localStorage.removeItem('tvOnAirCurrentPage');
    localStorage.removeItem('currentPage');
    localStorage.removeItem('Token');;
  }

  dorpdown(){
    $('.drop-item').slideToggle();
  }

  ngOnDestroy():void{
    this.subStatus.unsubscribe();
  }
  
}
