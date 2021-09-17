import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Sport } from '../models/sport';
import { Team } from '../models/team';
import { SportsService } from '../services/sports.service';
import { TeamsService } from '../services/teams.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  teams: Team[];
  @Input() currentTeam: Team;
  sports: Sport[];
  teamSize: number;
  constructor(private teamService: TeamsService, private sportsService: SportsService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.teamService.getTeams().subscribe((currentTeam) => this.teams = currentTeam, (err) => alert(err));
    this.sportsService.getSports().subscribe((sportsObject) => this.sports = sportsObject, (err) => alert(err));
  }

  showTeamEditForm(team: Team) {
    this.router.navigateByUrl(`${this.router.url}/${team.OrganizationId}/editTeam`)

  }
  deleteTeam(team: Team) {
    let result = confirm('You are about to delete a Team! Are you sure?');
    if(result) {
      this.teamService.deleteTeamInTeams(team);
      window.location.reload();
    }
  }


}
