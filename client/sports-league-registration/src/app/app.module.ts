import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MainComponent } from './main/main.component';
import { BaseLandingPageComponent } from './base-landing-page/base-landing-page.component';
import { LandPageBtnComponent } from './land-page-btn/land-page-btn.component';
import { AppRoutingModule } from './app-routing.module';
import { SportsComponent } from './sports/sports.component';
import { TeamsComponent } from './teams/teams.component';
import { PlayersComponent } from './players/players.component';
import { SportComponent } from './sport/sport.component';
import { NavComponent } from './nav/nav.component';
import { SportsDetailsComponent } from './sports-details/sports-details.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { EditBtnComponent } from './edit-btn/edit-btn.component';
import { DeleteBtnComponent } from './delete-btn/delete-btn.component';
import { ViewBtnComponent } from './view-btn/view-btn.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MainComponent,
    BaseLandingPageComponent,
    LandPageBtnComponent,
    SportsComponent,
    TeamsComponent,
    PlayersComponent,
    SportComponent,
    NavComponent,
    SportsDetailsComponent,
    EditBtnComponent,
    DeleteBtnComponent,
    ViewBtnComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
