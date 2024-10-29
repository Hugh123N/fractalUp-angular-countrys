import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { Vista1Component } from './vista1/vista1.component';
import { Vista2Component } from './vista2/vista2.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
    {path:'home', component:HomeComponent},
    {path:'vista1',component:Vista1Component},
    {path:'vista2',component:Vista2Component},
    { path: '', redirectTo: '/home', pathMatch: 'full' },
];

/*@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }*/

