import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MoviesComponent } from './movies/movies.component';
import { TvshowComponent } from './tvshow/tvshow.component';
import { PeopleComponent } from './people/people.component';
import { NetworksComponent } from './networks/networks.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SinglemovieComponent } from './singlemovie/singlemovie.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { SingletvshowComponent } from './singletvshow/singletvshow.component';
import { SinglepeopleComponent } from './singlepeople/singlepeople.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { FooterComponent } from './footer/footer.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MoviesComponent,
    TvshowComponent,
    PeopleComponent,
    NetworksComponent,
    NavbarComponent,
    RegisterComponent,
    LoginComponent,
    SinglemovieComponent,
    SingletvshowComponent,
    SinglepeopleComponent,
    NotfoundComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    CarouselModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
