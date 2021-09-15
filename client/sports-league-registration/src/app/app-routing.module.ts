import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LandPageBtnComponent } from './land-page-btn/land-page-btn.component';
import { SportsComponent } from './sports/sports.component';
import { BaseLandingPageComponent } from './base-landing-page/base-landing-page.component';
import { SportsDetailsComponent } from './sports-details/sports-details.component';
import { TeamsComponent } from './teams/teams.component';
import { TeamDetailsComponent } from './team-details/team-details.component';
import { CoachesComponent } from './coaches/coaches.component';
import { PlayersComponent } from './players/players.component';
import { SportFormComponent } from './sport-form/sport-form.component';
import { TeamFormComponent } from './team-form/team-form.component';
import { PlayerFormComponent } from './player-form/player-form.component';
import { CoachFormComponent } from './coach-form/coach-form.component';


const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: BaseLandingPageComponent },
      { path: 'sports/:id/:sportFormStatus', component: SportFormComponent },
      { path: 'sports/:id/viewPlayers/:teamId', component: PlayersComponent },
      { path: 'sports/:id/viewPlayers/:teamId/:playerFormStatus/:playerId', component: PlayerFormComponent },
      { path: 'sports/:id/:teamFormStatus/:teamId', component: TeamFormComponent },
      { path: 'sports', component: SportsComponent },
      { path: 'sports/:id', component: SportsDetailsComponent },
      { path: 'teams', component: TeamsComponent },
      { path: 'teams/:id', component: TeamDetailsComponent },
      { path: 'teams/:teamId/:teamFormStatus', component: TeamFormComponent},
      { path: 'coaches', component: CoachesComponent },
      { path: 'coaches/editCoaches/:orgName', component: CoachFormComponent },
      { path: 'players', component: PlayersComponent },
      { path: 'players/:sportFormStatus/:playerId', component: PlayerFormComponent }
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
