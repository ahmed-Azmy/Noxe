import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GetApiService } from '../get-api.service';
declare var $:any;

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  constructor(private _GetApiService:GetApiService) { }

  
  moviesData:any;
  popularMoviesData:any;
  totalPage:any;
  currentPage:number = 1;
  subMode = new Subscription();
  PMCurrentPage:number = 1;
  PMTotalPage:number = 1;
  searchInput:any;
  searchData:any;
  
  /**=========Search===========*/
  searchValue(){
    if(this.searchInput.length >= 1){
      this.subMode = this._GetApiService.moviesSearch(this.searchInput).subscribe({
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

    /*==============Movie play right now=============*/
    if(localStorage.getItem("currentPage") != null){
      this.currentPage = Number(localStorage.getItem("currentPage")); 
    }
    this.subMode = this._GetApiService.getMoviesPlayingNow(this.currentPage).subscribe({
      next:(resopnse)=>{
          this.moviesData = resopnse.results;
          this.totalPage = resopnse.total_pages;
      },
      error:(error)=>{
          console.log(error);
      }
    })

    /*========call Popular movie========*/
    if(localStorage.getItem("PMCurrentPage")){
      this.PMCurrentPage = Number(localStorage.getItem("PMCurrentPage"));
    }
    this.popularMovies(this.PMCurrentPage);
  }

  popularMovies(page:number){
    this.subMode = this._GetApiService.getMoviesPopular(page).subscribe({
      next:(response)=>{
          this.popularMoviesData = response.results;
          this.PMTotalPage = response.total_pages; 
      },
      error:(error)=>{
          console.log(error);
      }
    })
  }
  
 
  /**==============================Pagination================================= */
  /**=====for playing now=====*/
  getNextPage(){
    if(this.currentPage < this.totalPage){
        this.subMode = this._GetApiService.getMoviesPlayingNow(++this.currentPage).subscribe({
          next:(resopnse)=>{
              this.moviesData = resopnse.results;
              localStorage.setItem("currentPage" , this.currentPage.toString());
          },
          error:(error)=>{
              console.log(error);
          }
        })
    }   
  }
  getPreviousPage(){
    if(this.currentPage > 1){
      this.subMode = this._GetApiService.getMoviesPlayingNow(--this.currentPage).subscribe({
          next:(resopnse)=>{
              this.moviesData = resopnse.results;
              localStorage.setItem("currentPage" , this.currentPage.toString());
          },
          error:(error)=>{
              console.log(error);
          }
        })
    }
  }
  /**=====for Popular movies=====*/
  PMNextPage(){
    if(this.PMCurrentPage < this.PMTotalPage){
      this.popularMovies(++this.PMCurrentPage);
      localStorage.setItem("PMCurrentPage" , this.PMCurrentPage.toString());
    }
    
  }
  PMPreviousPage(){
    if(this.PMCurrentPage > 1){
      this.popularMovies(--this.PMCurrentPage);
      localStorage.setItem("PMCurrentPage" , this.PMCurrentPage.toString());
    }
    
  }

  ngOnDestroy():void{
    this.subMode.unsubscribe();
  }
}
