import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Sport } from '../models/sport';
import { Team } from '../models/team';
import { TeamsService } from '../services/teams.service';

@Component({
  selector: 'app-team-details',
  templateUrl: './team-details.component.html',
  styleUrls: ['./team-details.component.css']
})
export class TeamDetailsComponent implements OnInit {

  teamId: string;
  sportList;
  teamName: string
  constructor(private teamService: TeamsService, private route: ActivatedRoute, private router: Router) { 
    route.params.subscribe((value) => this.teamId = value.id, (err) => alert(err));
    console.log(this.teamId);
  }

  ngOnInit(): void {
    this.teamService.getSportsById(this.teamId).subscribe((sports) => this.sportList = sports, (err) => alert(err));
    this.teamService.getTeamById(this.teamId).subscribe((team) => this.teamName = team.OrganizationName, (err) => alert(err))
    console.log(this.sportList?.Organizations)
  }

  viewPlayers(sport: Sport) {
    this.router.navigateByUrl(`${this.router.url}/viewPlayers/${sport.GroupId}`);
  }

  showTeamSportEditForm(sport: Sport) {
    console.log('I am pressed');
    this.router.navigateByUrl(`${this.router.url}/editSport/${sport.GroupId}`)
  }
  deleteSportFromTeam() {
    let result = confirm(`You are about to remove this sport from Team: ${this.teamName}! Are you sure?`)
    // TODO 

  }

}
