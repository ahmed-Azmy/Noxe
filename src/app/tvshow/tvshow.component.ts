import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GetApiService } from '../get-api.service';
declare var $:any;
@Component({
  selector: 'app-tvshow',
  templateUrl: './tvshow.component.html',
  styleUrls: ['./tvshow.component.css']
})
export class TvshowComponent implements OnInit {

  constructor(private _GetApiService:GetApiService) { }

  onAirData:any;
  tvPopular:any;
  tvOnAirCurrentPage:number = 1;
  tvOnAirTotalPage:number = 1;
  tvPopularCurrentPage:number = 1;
  tvPopularTotalPage:number = 1;
  searchInput:any;
  searchData:any;
  subStatus= new Subscription();
  
  /**========Search========*/
  searchValue(){
    if(this.searchInput.length >= 1){
      this.subStatus = this._GetApiService.tvshowSearch(this.searchInput).subscribe({
         next:(resopnse)=>{ 
            this.searchData = resopnse.results;
         },
         error:(error)=>{
            console.log(error);
         }
      })
    } 
  }

  /**========getTvOnTheAir function========*/
  getTvOnTheAir(page:number){
    this.subStatus = this._GetApiService.tvOnTheAir(page).subscribe({
      next:(response)=>{
        this.onAirData = response.results;
        this.tvOnAirTotalPage = response.total_pages;
      },
      error:(error)=>{
        console.log(error);
      }
    })
  }
  
  /**========getTvPopular function========*/
  getTvPopular(page:number){
    this.subStatus = this._GetApiService.tvPopular(page).subscribe({
      next:(response)=>{
        this.tvPopular = response.results;
        this.tvPopularTotalPage = response.total_pages;
      },
      error:(error)=>{
        console.log(error);
      }
    })
  }


  ngOnInit(): void {
    
    /*===Call getTvOnTheAir===*/
    if(localStorage.getItem('tvOnAirCurrentPage')){
      this.tvOnAirCurrentPage = Number(localStorage.getItem('tvOnAirCurrentPage'));
    }
    this.getTvOnTheAir(this.tvOnAirCurrentPage);

    /*===Call getTvPopular===*/
    if(localStorage.getItem('tvPopularCurrentPage')){
      this.tvPopularCurrentPage = Number(localStorage.getItem('tvPopularCurrentPage'));
    }
    this.getTvPopular(this.tvPopularCurrentPage);


  }

  /*===========================Pagination==========================*/
  /*======OnTheAir======*/
  tvOnAirNextPage(){
    if(this.tvOnAirCurrentPage < this.tvOnAirTotalPage){
      this.getTvOnTheAir(++this.tvOnAirCurrentPage);
      localStorage.setItem('tvOnAirCurrentPage' , this.tvOnAirCurrentPage.toString());
    }
    
  }
  tvOnAirPreviousPage(){
    if(this.tvOnAirCurrentPage > 1){
      this.getTvOnTheAir(--this.tvOnAirCurrentPage);
      localStorage.setItem('tvOnAirCurrentPage' , this.tvOnAirCurrentPage.toString());
    }
  }

  /*======Tv Popular======*/
  tvPopularNextPage(){
    if(this.tvPopularCurrentPage < this.tvPopularTotalPage){
       this.getTvPopular(++this.tvPopularCurrentPage);
       localStorage.setItem('tvPopularCurrentPage' , this.tvPopularCurrentPage.toString());
    }
  }
  tvPopularPreviousPage(){
    if(this.tvPopularCurrentPage > 1){
      this.getTvPopular(--this.tvPopularCurrentPage);
      localStorage.setItem('tvPopularCurrentPage' , this.tvPopularCurrentPage.toString());
    }
  }
  
  ngOnDestroy():void{
    this.subStatus.unsubscribe();
  }

}
