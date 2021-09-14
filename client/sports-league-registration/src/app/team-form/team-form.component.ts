import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TeamsService } from '../services/teams.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-team-form',
  templateUrl: './team-form.component.html',
  styleUrls: ['./team-form.component.css']
})
export class TeamFormComponent implements OnInit {

  teamForm: FormGroup;
  currentSportId: number;
  currentTeam;
  currentTeamId: string;
  formStatus: string;

  constructor(private teamService: TeamsService, private formBuilder: FormBuilder, private _router: ActivatedRoute, private location: Location) { }

  ngOnInit(): void {
    this._router.params.subscribe((value) => {
      this.currentSportId = value.id;
      this.formStatus = value.teamFormStatus;
      this.currentTeamId = value.teamId;
    });
    this.teamService.getTeamById(this.currentTeamId).subscribe((teamObject) => {
      console.log(this.currentTeamId);
      this.currentTeam = teamObject;
      console.log(this.currentTeam);
    });
    this.teamForm = this.formBuilder.group({
      'OrganizationId': [this.currentTeam?.OrganizationId, [Validators.required]],
      'OrganizationName': [this.currentTeam?.OrganizationName, [Validators.required]],
      'CoachName': [this.currentTeam?.CoachName, [Validators.required]],
      'CoachPhoneNumber': [this.currentTeam?.CoachPhoneNumber, [Validators.required]],
    });
    console.log(this.currentTeam.CoachName);
  }

  cancelTeamForm() {
    this.location.back();
  }

  onSubmit(formValues){
    //call service to add/update sport
    this.teamService.updateTeam(this.currentSportId,formValues).subscribe((team) => this.teamService.getTeams())
    console.log(formValues);
    console.log('pressed form');
    this.location.back();
  }
}
