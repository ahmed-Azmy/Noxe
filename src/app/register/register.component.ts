import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PostApiService } from '../post-api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private _PostApiService:PostApiService , private _Router:Router) { }

  message:string = '';
  subStatus = new Subscription();


  registerData = new FormGroup({
    first_name:new FormControl( null , [
      Validators.minLength(3),
      Validators.maxLength(30),
      Validators.required,
      Validators.pattern(/^[A-Z]/)
    ]),
    last_name:new FormControl(null , [
      Validators.minLength(3),
      Validators.maxLength(30),
      Validators.required,
      Validators.pattern(/^[A-Z]/)
    ]),
    age:new FormControl(null , [
      Validators.required,
      Validators.min(15)
    ]),
    email:new FormControl(null , [
      Validators.required,
      Validators.email
    ]),
    password:new FormControl(null , [
      Validators.required,
      Validators.minLength(5),
      Validators.pattern(/[a-zA-z]/)
    ])
  })

  registerValue(){
    if(this.registerData.valid){
       this.subStatus = this._PostApiService.register(this.registerData.value).subscribe({
         next:(response)=>{
           this.message = response.message;
           if(response.message == 'success'){
             this._Router.navigate(['/login']);
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

  ngOnDestroy():void{
    this.subStatus.unsubscribe();
  }
}
