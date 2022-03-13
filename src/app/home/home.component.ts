import { Component, OnInit } from '@angular/core';
import { GetApiService } from '../get-api.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Subscription } from 'rxjs';
declare var $:any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private _GetApiService:GetApiService) { }

  popularMoviesData:any;
  latestMovies:any;
  tvPopular:any;
  trendingPeople:any;
  TMCurrentPage:number = 1;
  TMTotalPage:number = 1;
  TTVCurrentPage:number = 1;
  TTVTotalPage:number = 1;
  TPCurrentPage:number = 1;
  TPTotalPage:number = 1;
  subStatus = new Subscription();

  /**===========Trending movie===========*/
  TrendigMovies(page:number){
    this.subStatus = this._GetApiService.trendingMovie(page).subscribe({
      next:(resopnse)=>{
        this.popularMoviesData = resopnse.results.slice(4);
        this.TMTotalPage = resopnse.total_pages;
      }
    })
  }
  /**===========Trending tv show===========*/
  TrendingTvShow(page:number){
    this.subStatus = this._GetApiService.trendingTV(page).subscribe({
      next:(resopnse)=>{
        this.tvPopular = resopnse.results.slice(4);
        this.TTVTotalPage = resopnse.total_pages;
      }
    })
  }
  /**============Trending People============*/
  TrendingPeople(page:number){
    this.subStatus = this._GetApiService.trendingPeople(page).subscribe({
      next:(resopnse)=>{
        this.trendingPeople = resopnse.results.slice(0,16);
        this.TPTotalPage = resopnse.total_pages;
      }
    })
  }


  ngOnInit(): void {

    /**====Latest movie===== */
    this.subStatus = this._GetApiService.getMoviesPlayingNow(1).subscribe({
      next:(resopnse)=>{
        this.latestMovies = resopnse.results;
      }
    })

    /*===Call TM Function====*/
    if(localStorage.getItem('TMCurrentPage')){
      this.TMCurrentPage = Number(localStorage.getItem('TMCurrentPage'));
    }
    this.TrendigMovies(this.TMCurrentPage);
 
    /**===Call TTV show=== */
    if(localStorage.getItem('TTVCurrentPage')){
      this.TTVCurrentPage = Number(localStorage.getItem('TTVCurrentPage'));
    }
    this.TrendingTvShow(this.TTVCurrentPage);

    /**===Call TP Function=== */
    if(localStorage.getItem('TPCurrentPage')){
      this.TPCurrentPage = Number(localStorage.getItem('TPCurrentPage'));
    }
    this.TrendingPeople(this.TPCurrentPage);

  }


  /**=========================Owl Carousel===================== */
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    autoplay:true,
    autoplayTimeout:1500,
    navSpeed: 600,
    navText: ['&#8249', '&#8250;'],
    center:true,
    responsive: {
      0: {
        items: 2
      },
      400: {
        items: 3
      },
      740: {
        items: 4
      },
      940: {
        items: 8
      }
    },
    nav: false
  }


  /**===========================Pagination======================== */
  /**===Trending movie===*/
  TMNextPage(){
    if(this.TMCurrentPage < this.TMTotalPage){
     this.TrendigMovies(++this.TMCurrentPage);
     localStorage.setItem('TMCurrentPage' , this.TMCurrentPage.toString());
    }
  }
  TMPreviousPage(){
    if(this.TMCurrentPage > 1){
       this.TrendigMovies(--this.TMCurrentPage);
       localStorage.setItem('TMCurrentPage' , this.TMCurrentPage.toString());
    }
  }
  /**===Trending Tv Show===*/
  TTVNextPage(){
    if(this.TTVCurrentPage < this.TTVTotalPage){
      this.TrendingTvShow(++this.TTVCurrentPage);
      localStorage.setItem('TTVCurrentPage' , this.TTVCurrentPage.toString());
    }
    
  }
  TTVPreviousPage(){
    if(this.TTVCurrentPage > 1){
      this.TrendingTvShow(--this.TTVCurrentPage);
      localStorage.setItem('TTVCurrentPage' , this.TTVCurrentPage.toString());
    }
  }
  /**===Trending People===*/
  TPNextPage(){
    if(this.TPCurrentPage < this.TPTotalPage){
      this.TrendingPeople(++this.TPCurrentPage);
      localStorage.setItem('TPCurrentPage' , this.TPCurrentPage.toString());

    }
  }
  TPPreviousPage(){
    if(this.TPCurrentPage > 1){
      this.TrendingPeople(--this.TPCurrentPage);
      localStorage.setItem('TPCurrentPage' , this.TPCurrentPage.toString());
    }
  }
  

  ngOnDestroy():void{
     this.subStatus.unsubscribe();
  }

}
