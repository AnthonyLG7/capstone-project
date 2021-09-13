import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  constructor(private teamService: TeamsService, private route: ActivatedRoute) { 
    route.params.subscribe((value) => this.teamId = value.id);
    console.log(this.teamId);
  }

  ngOnInit(): void {
    this.teamService.getSportsById(this.teamId).subscribe((sports) => this.sportList = sports);
    this.teamService.getTeamById(this.teamId).subscribe((team) => this.teamName = team.OrganizationName)
    console.log(this.sportList.Organizations)
  }

}
