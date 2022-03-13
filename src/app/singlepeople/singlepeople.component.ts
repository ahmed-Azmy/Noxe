import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { GetApiService } from '../get-api.service';

@Component({
  selector: 'app-singlepeople',
  templateUrl: './singlepeople.component.html',
  styleUrls: ['./singlepeople.component.css']
})
export class SinglepeopleComponent implements OnInit {

  constructor(private _GetApiService:GetApiService , private _ActivatedRoute:ActivatedRoute) { }

  recieved:boolean = false;
  recieved2:boolean = false;
  singlePeopleData:any;
  id:number = this._ActivatedRoute.snapshot.params['id']
  combinedCredit:any[]=[];
  subStatus = new Subscription();

  ngOnInit(): void {
    this.subStatus = this._GetApiService.singlePeople(this.id).subscribe({
      next:(response)=>{
         this.singlePeopleData = response;
         this.recieved = true;
      }
    })

    this.subStatus = this._GetApiService.combinedCredit(this.id).subscribe({
      next:(response)=>{
        for (const iterator of response.cast) {
           if(iterator.poster_path){
              this.combinedCredit.push(iterator) ;
           }
        }
         this.recieved2 = true;
      }
    })
  }

  ngOnDestroy(){
    this.subStatus.unsubscribe();
  }
}
