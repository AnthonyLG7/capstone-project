import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LandPageBtnComponent } from './land-page-btn/land-page-btn.component';
import { SportsComponent } from './sports/sports.component';
import { BaseLandingPageComponent } from './base-landing-page/base-landing-page.component';
import { SportsDetailsComponent } from './sports-details/sports-details.component';
import { TeamsComponent } from './teams/teams.component';
import { TeamDetailsComponent } from './team-details/team-details.component';


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
      },
      {
        path: 'teams', component: TeamsComponent,
        children: [
          {path: 'teams', component: SportsComponent},
          {path: 'teams/:id', component: SportsDetailsComponent}
        ]
      },
      {
        path: 'teams/:id', component: TeamDetailsComponent
      },
      
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
