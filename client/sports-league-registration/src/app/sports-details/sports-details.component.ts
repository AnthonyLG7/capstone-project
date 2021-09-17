import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { until } from 'protractor';
import { Sport } from '../models/sport';
import { Team } from '../models/team';
import { SportsService } from '../services/sports.service';
import { TeamsService } from '../services/teams.service';
import { UrlService } from '../services/url.service';

@Component({
  selector: 'app-sports-details',
  templateUrl: './sports-details.component.html',
  styleUrls: ['./sports-details.component.css']
})
export class SportsDetailsComponent implements OnInit {
  currentSport;
  sportId: number;
  searchedValue = '';
  filteredSports: Sport[];
  filteredTeams;
  teamList;

  constructor(private sportsService: SportsService, private router: Router, private activatedRoute: ActivatedRoute, private teamService: TeamsService, private urlService: UrlService) { 
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((value) => this.sportId = value.id , (err) => alert(err));
    this.sportsService.getSportById(this.sportId).subscribe((sport) => this.currentSport = sport , (err) => alert(err));
    console.log(this.currentSport);
  }

  ngAfterContentChecked(): void {
    //Called after every check of the component's or directive's content.
    //Add 'implements AfterContentChecked' to the class.
    this.teamList = this.currentSport?.Organizations;
    this.searchedValue = this.urlService.getSearchedValue();
    console.log(`Inside sports component searchedValue: ${this.searchedValue}`)
    if(this.searchedValue === '' || this.searchedValue === undefined) {
      this.filteredSports = this.currentSport;
      this.filteredTeams = this.teamList;
    } else {
      console.log(`Inside sports component else block searchedValue: ${this.searchedValue}`)
      this.filteredTeams =this.urlService.filter(this.teamList,this.searchedValue ,'sportDetails')
    }
    
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
  deleteSport(sport: Sport) {
    this.sportsService.deleteSport(sport).subscribe((sport) => this.sportsService.getSports(), (err) => alert(err));
  }
  deleteTeamInSport(team: Team, sport: Sport) {
    this.teamService.deleteTeamInSport(sport.GroupId,team).subscribe((team) => this.sportsService.getSports(), (err) => alert(err));
  }

}
