import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GetApiService } from '../get-api.service';

@Component({
  selector: 'app-networks',
  templateUrl: './networks.component.html',
  styleUrls: ['./networks.component.css']
})
export class NetworksComponent implements OnInit {

  constructor(private _GetApiService:GetApiService) { }

  networks:any[] = [];
  subStatus = new Subscription();

  ngOnInit(): void {
    for (let i = 1; i < 230; i++) {
      if(i != 7 && i != 27 && i != 32 && i != 52 && i != 58 && i != 73 && i != 79 && i != 86 && i != 89 && i != 104 && i != 108 && i != 111 && i != 121 && i != 130 && i != 137 && i != 140 && i != 144 && i != 145 && i != 146 && i != 147 && i != 152 && i != 153 && i != 154 && i != 161 && i != 167 && i != 176 && i != 190 && i != 194 && i != 200 && i != 205 && i != 208 && i != 212 && i != 220){
          this.subStatus = this._GetApiService.networks(i).subscribe({
             next:(response)=>{
               if(response.logo_path){
                 this.networks.push(response);
               }   
             },
             error:(error)=>{
               console.log(error);
             }
          })
      }
    }
    
  }

  ngOnDestroy():void{
    this.subStatus.unsubscribe();
  }
}
