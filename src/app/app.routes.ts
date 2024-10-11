import { Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { SearchComponent } from './Components/search/search.component';
import { TrainsComponent } from './Components/trains/trains.component';

export const routes: Routes = [
    {path:'',redirectTo:'home',pathMatch:'full'},
    {path:'home',component:HomeComponent},
    {path:'search/:fromStationId/:toStationId/:dateOfTravel', component:SearchComponent},
    {path:'trains',component:TrainsComponent},

];
