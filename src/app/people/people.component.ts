import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GetApiService } from '../get-api.service';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {

  constructor(private _GetApiService:GetApiService) { }

  popularPeople:any;
  pageNumber:number = 1;
  totalPage:any;
  subMode = new Subscription();
  searchInput:any;
  searchData:any;
  
  /**=========Search===========*/
  searchValue(){
    if(this.searchInput.length >= 1){
      this.subMode = this._GetApiService.peopleSearch(this.searchInput).subscribe({
         next:(resopnse)=>{ 
            this.searchData = resopnse.results;
         },
         error:(error)=>{
            console.log(error);
         }
      })
    } 
  }

  ngOnInit(): void {
    if(localStorage.getItem("currentPagePeople") != null){
      this.pageNumber = Number(localStorage.getItem("currentPagePeople"));
    }
    this.subMode = this._GetApiService.popularPeople(this.pageNumber).subscribe({
      next:(response)=>{
          this.popularPeople = response.results;
          this.totalPage = response.total_pages;
      }
    })
  }

  /**==============Get Next Page===============*/
  getNextPage(){
    if(this.pageNumber < this.totalPage){
      this.subMode = this._GetApiService.popularPeople(++this.pageNumber).subscribe({
      next:(response)=>{
          this.popularPeople = response.results;
          localStorage.setItem("currentPagePeople" , this.pageNumber.toString());
      }
      })
    }
  }
  /**==============Get Previous Page===============*/
  getPreviousPage(){
    if(this.pageNumber > 1){
      this.subMode = this._GetApiService.popularPeople(--this.pageNumber).subscribe({
      next:(response)=>{
          this.popularPeople = response.results;
          localStorage.setItem("currentPagePeople" , this.pageNumber.toString());
      }
      })
    }  
  }

  ngOnDestroy():void{
    this.subMode.unsubscribe();
  }

}
