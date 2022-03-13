import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { GetApiService } from '../get-api.service';

@Component({
  selector: 'app-singletvshow',
  templateUrl: './singletvshow.component.html',
  styleUrls: ['./singletvshow.component.css']
})
export class SingletvshowComponent implements OnInit {

  constructor(private _GetApiService:GetApiService , private _ActivatedRoute:ActivatedRoute) { }

  recieved:boolean = false;
  singleTvData:any;
  id:number = this._ActivatedRoute.snapshot.params['id'];
  subStatus = new Subscription();

  ngOnInit(): void {
    this.subStatus = this._GetApiService.singleTvShow(this.id).subscribe({
      next:(response)=>{
          this.singleTvData = response;
          this.recieved = true;
      }
    })
  }
  
  ngOnDestroy():void{
    this.subStatus.unsubscribe();
  }
}
