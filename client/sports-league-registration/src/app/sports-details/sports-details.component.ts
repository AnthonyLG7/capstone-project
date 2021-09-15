import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { until } from 'protractor';
import { Sport } from '../models/sport';
import { Team } from '../models/team';
import { SportsService } from '../services/sports.service';

@Component({
  selector: 'app-sports-details',
  templateUrl: './sports-details.component.html',
  styleUrls: ['./sports-details.component.css']
})
export class SportsDetailsComponent implements OnInit {
  currentSport;
  sportId: number;

  constructor(private sportsService: SportsService, private router: Router, private activatedRoute: ActivatedRoute) { 
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((value) => this.sportId = value.id);
    this.sportsService.getSportById(this.sportId).subscribe((sport) => this.currentSport = sport);
    console.log(this.currentSport);
  }

  showSportEditForm(currentSport: Sport){
    this.router.navigateByUrl(`${this.router.url}/editSport`);
  }

  showTeamSportEditForm(currentTeam: Team) {

    this.router.navigateByUrl(`${this.router.url}/editTeam/${currentTeam.OrganizationId}`);
    console.log("I am accidentally pressed")
  }
  showPlayers(currentTeam: Team) {
    console.log('I am pressed');
    this.router.navigateByUrl(`${this.router.url}/viewPlayers/${currentTeam.OrganizationId}`)
  }

}
