import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetApiService {

  constructor(private _HttpClient:HttpClient) {}

  /*===================movies==================*/
  getMoviesPlayingNow(pageNumber:number):Observable<any>{
    return this._HttpClient.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=afed2bdc759c185496dcd94a60b71d77&language=en-US&page=${pageNumber}`)
  }
  getMoviesPopular(page:number):Observable<any>{
    return this._HttpClient.get(`https://api.themoviedb.org/3/movie/popular?api_key=afed2bdc759c185496dcd94a60b71d77&language=en-US&page=${page}`)
  }

  /*===Single movie===*/
  singleMovie(id:number):Observable<any>{
    return this._HttpClient.get(`https://api.themoviedb.org/3/movie/${id}?api_key=afed2bdc759c185496dcd94a60b71d77&language=en-US`)
  }
  /*===Trending movie===*/
  trendingMovie(page:number):Observable<any>{
    return this._HttpClient.get(`https://api.themoviedb.org/3/trending/movie/day?api_key=afed2bdc759c185496dcd94a60b71d77&page=${page}`)
  }
  /*===movies search===*/
  moviesSearch(query:string):Observable<any>{
    return this._HttpClient.get(`https://api.themoviedb.org/3/search/movie?api_key=afed2bdc759c185496dcd94a60b71d77&language=en-US&page=1&include_adult=false&query=${query}`)
  }

  /*===================Tv Show==================*/
  tvOnTheAir(page:number):Observable<any>{
    return this._HttpClient.get(`https://api.themoviedb.org/3/tv/on_the_air?api_key=afed2bdc759c185496dcd94a60b71d77&language=en-US&page=${page}`)
  }
  tvPopular(page:number):Observable<any>{
    return this._HttpClient.get(`https://api.themoviedb.org/3/tv/popular?api_key=afed2bdc759c185496dcd94a60b71d77&language=en-US&page=${page}`)
  }
  /*==Trending Tv Show==*/
  trendingTV(page:number):Observable<any>{
    return this._HttpClient.get(`https://api.themoviedb.org/3/trending/tv/day?api_key=afed2bdc759c185496dcd94a60b71d77&page=${page}`)
  }
  /*===Single Tv Show===*/
  singleTvShow(id:number):Observable<any>{
    return this._HttpClient.get(`https://api.themoviedb.org/3/tv/${id}?api_key=afed2bdc759c185496dcd94a60b71d77&language=en-US`)
  }
  /*===tv show search===*/
  tvshowSearch(query:string):Observable<any>{
    return this._HttpClient.get(`https://api.themoviedb.org/3/search/tv?api_key=afed2bdc759c185496dcd94a60b71d77&language=en-US&page=1&include_adult=false&query=${query}`)
  }

  /*===================People==================*/
  popularPeople(pageNumber:number):Observable<any>{
    return this._HttpClient.get(`https://api.themoviedb.org/3/person/popular?api_key=afed2bdc759c185496dcd94a60b71d77&language=en-US&page=${pageNumber}`)
  }
  /*==Trending People==*/
  trendingPeople(page:number):Observable<any>{
    return this._HttpClient.get(`https://api.themoviedb.org/3/trending/person/day?api_key=afed2bdc759c185496dcd94a60b71d77&page=${page}`)
  }
  /*===Single People===*/
   singlePeople(id:number):Observable<any>{
    return this._HttpClient.get(`https://api.themoviedb.org/3/person/${id}?api_key=afed2bdc759c185496dcd94a60b71d77&language=en-US`)
  }
  /*===combined Credit===*/
  combinedCredit(id:number):Observable<any>{
    return this._HttpClient.get(`https://api.themoviedb.org/3/person/${id}/combined_credits?api_key=afed2bdc759c185496dcd94a60b71d77&language=en-US`)
  }
  /*===tv show search===*/
  peopleSearch(query:string):Observable<any>{
    return this._HttpClient.get(`https://api.themoviedb.org/3/search/person?api_key=afed2bdc759c185496dcd94a60b71d77&language=en-US&page=1&include_adult=false&query=${query}`)
  }

  /*===================Networks==================*/
  networks(id:number):Observable<any>{
    return this._HttpClient.get(`https://api.themoviedb.org/3/network/${id}?api_key=afed2bdc759c185496dcd94a60b71d77`)
  }



  
}
