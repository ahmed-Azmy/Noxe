import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MoviesComponent } from './movies/movies.component';
import { NetworksComponent } from './networks/networks.component';
import { PeopleComponent } from './people/people.component';
import { TvshowComponent } from './tvshow/tvshow.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { SinglemovieComponent } from './singlemovie/singlemovie.component';
import { AuthenticationGuard } from './authentication.guard';
import { SingletvshowComponent } from './singletvshow/singletvshow.component';
import { SinglepeopleComponent } from './singlepeople/singlepeople.component';
import { NotfoundComponent } from './notfound/notfound.component';

const routes: Routes = [
  {path:'' , redirectTo:'home' , pathMatch:'full'},
  {path:"home", component:HomeComponent , canActivate:[AuthenticationGuard]},
  {path:"movies", component:MoviesComponent , canActivate:[AuthenticationGuard]},
  {path:"singlemovie/:id", component:SinglemovieComponent , canActivate:[AuthenticationGuard]},
  {path:"singletvshow/:id", component:SingletvshowComponent , canActivate:[AuthenticationGuard]},
  {path:"singlepeople/:id", component:SinglepeopleComponent , canActivate:[AuthenticationGuard]},
  {path:"tvshow", component:TvshowComponent , canActivate:[AuthenticationGuard]},
  {path:"people", component:PeopleComponent , canActivate:[AuthenticationGuard]},
  {path:"networks", component:NetworksComponent , canActivate:[AuthenticationGuard]},
  {path:"register", component:RegisterComponent},
  {path:"login", component:LoginComponent},
  {path:"**", component:NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes , {useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
