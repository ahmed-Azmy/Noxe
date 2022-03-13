import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PostApiService } from '../post-api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _PostApiService:PostApiService , private _Router:Router) { }

  message:string = '';
  subStatus = new Subscription();

  loginData = new FormGroup({
    email:new FormControl(null , [
      Validators.required,
      Validators.email
    ]),
    password:new FormControl(null , [
      Validators.required,
    ])
  })
   
  loginValue(){
    if(this.loginData.valid){
      this.subStatus = this._PostApiService.login(this.loginData.value).subscribe({
        next:(response)=>{
           this.message = response.message;
           if(response.message == 'success'){
             this._Router.navigate(['/home']);
             localStorage.setItem('checkLogin' , 'true');
             localStorage.setItem('Token' , response.token);
             this._PostApiService.isLogin.next(true);
           }
        },
        error:(error)=>{
           console.log(error);
        }
      })
    }
    
  }
  ngOnInit(): void {
  }

  ngOnDestroy(){
    this.subStatus.unsubscribe();
  }
}
