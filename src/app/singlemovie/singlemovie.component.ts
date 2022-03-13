import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { GetApiService } from '../get-api.service';

@Component({
  selector: 'app-singlemovie',
  templateUrl: './singlemovie.component.html',
  styleUrls: ['./singlemovie.component.css']
})
export class SinglemovieComponent implements OnInit {

  

  constructor(private _GetApiService:GetApiService , private _ActivatedRoute:ActivatedRoute) { }

  recieved:boolean = false;
  singleMovieData:any;
  id:number = this._ActivatedRoute.snapshot.params['id'];
  subStatus = new Subscription();
  

  ngOnInit(): void {
    this.subStatus = this._GetApiService.singleMovie(this.id).subscribe({
      next:(response)=>{
        this.singleMovieData = response;
        this.recieved = true;

      },
      error:(error)=>{
        console.log(error);
      }
    })
  }

  ngOnDestroy():void{
    this.subStatus.unsubscribe();
  }

}
