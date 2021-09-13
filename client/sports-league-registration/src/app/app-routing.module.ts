import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LandPageBtnComponent } from './land-page-btn/land-page-btn.component';
import { SportsComponent } from './sports/sports.component';
import { BaseLandingPageComponent } from './base-landing-page/base-landing-page.component';
import { SportsDetailsComponent } from './sports-details/sports-details.component';


const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: BaseLandingPageComponent },
      { path: 'sports', component: SportsComponent,
        children: [
          {path: 'sports', component: SportsComponent},
          {path: 'sports/:id', component: SportsDetailsComponent}
        ]
      },
      {
        path: 'sports/:id', component: SportsDetailsComponent
      }
    ]
  }
]
@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
