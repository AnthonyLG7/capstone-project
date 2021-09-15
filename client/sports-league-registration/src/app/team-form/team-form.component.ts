import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TeamsService } from '../services/teams.service';
import { Location } from '@angular/common';
import { Sport } from '../models/sport';

@Component({
  selector: 'app-team-form',
  templateUrl: './team-form.component.html',
  styleUrls: ['./team-form.component.css']
})
export class TeamFormComponent implements OnInit {

  teamForm: FormGroup;
  currentSportId: number;
  currentTeam;
  sports: Sport[];
  currentTeamId: string;
  formStatus: string;

  constructor(private teamService: TeamsService, private formBuilder: FormBuilder, private _router: ActivatedRoute, private location: Location) { }

  ngOnInit(): void {
    this._router.url.subscribe((url) => {
      console.log(url);
      if(url.length === 3) {
          this.currentTeamId = url[1]?.path;
          this.formStatus = url[2]?.path;
      } else {
        this.currentSportId = Number(url[1]?.path);
        this.formStatus = url[2]?.path;
        this.currentTeamId = url[3]?.path;
      }
      
      
      
      console.log(this.currentTeamId);
      console.log(this.formStatus);
      console.log(this.currentSportId);
    });
    this.teamService.getTeamById(this.currentTeamId).subscribe((teamObject) => {
      console.log(this.currentTeamId);
      this.currentTeam = teamObject;
      console.log(this.currentTeam);
      this.teamForm.patchValue(this.currentTeam);
    });
    this.teamForm = this.formBuilder.group({
      'OrganizationId': [this.currentTeam?.OrganizationId, [Validators.required]],
      'OrganizationName': [this.currentTeam?.OrganizationName, [Validators.required]],
      'CoachName': [this.currentTeam?.CoachName, [Validators.required]],
      'CoachPhoneNumber': [this.currentTeam?.CoachPhoneNumber, [Validators.required]],
    });
  }

  cancelTeamForm() {
    this.location.back();
  }

  onSubmit(formValues){
    //call service to add/update sport
    console.log(formValues);
    if(this.currentSportId === NaN) {
        this.teamService.updateTeamInTeams(formValues).subscribe((team) => console.log("logging here"))
    } else {
      this.teamService.updateTeamInTeams(formValues).subscribe((team) => console.log("not logging there") )
    }
    console.log(formValues);
    console.log('pressed form');
    this.location.back();
  }
}
