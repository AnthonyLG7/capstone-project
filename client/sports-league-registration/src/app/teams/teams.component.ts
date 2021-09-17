import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Team } from '../models/team';
import { TeamsService } from '../services/teams.service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {

  teams: Team[];
  router: Router;

  constructor(private teamService: TeamsService,private _router: Router, private route: ActivatedRoute) {
    this.router = _router;
   }

  ngOnInit(): void {
    this.teamService.getTeams().subscribe((teamsObject) => this.teams = teamsObject, (err) => alert(err))
  }

}
