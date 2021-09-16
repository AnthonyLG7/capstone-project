import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PlayersService } from '../services/players.service';

@Component({
  selector: 'app-player-form',
  templateUrl: './player-form.component.html',
  styleUrls: ['./player-form.component.css']
})
export class PlayerFormComponent implements OnInit {

  playerForm: FormGroup;
  currentSportId: number;
  currentPlayerId: number;
  currentTeamId: string;
  currentPlayer;
  workflow: string;
  formStatus: string;


  constructor(private playerService: PlayersService, private formBuilder: FormBuilder, private _router: ActivatedRoute, private location: Location) { }

  ngOnInit(): void {
    this._router.url.subscribe((url) => {
      console.log(url);
      if(url.length === 2) {
        this.workflow = url[0].path;
        this.formStatus = url[1].path;
        console.log(url[1].path);
      }
      else if(url.length === 3) {
        this.workflow = url[0]?.path;
        this.formStatus = url[1]?.path;
        this.currentPlayerId = Number(url[2]?.path);
      } else {
        this.workflow = url[0]?.path;
        if(url[0]?.path === 'teams') {
          this.currentSportId = Number(url[3]?.path);
          this.currentTeamId = url[1]?.path;
          this.formStatus = url[4]?.path;
        } else {
          this.currentSportId = Number(url[1]?.path);
          this.currentTeamId = url[3]?.path;
          this.currentPlayerId = Number(url[5]?.path);
          this.formStatus = url[4]?.path;
        }
      }
    })
    if(this.workflow === 'sports') {
      if(!Number.isNaN(this.currentPlayerId) && this.currentPlayerId !== undefined) {
        this.playerService.getPlayerById(this.currentSportId,this.currentTeamId, this.currentPlayerId).subscribe((playerObject) => {
          this.currentPlayer = playerObject;
          this.playerForm.patchValue(this.currentPlayer);
      })
      }
    } else {
      if(!Number.isNaN(this.currentPlayerId) && this.currentPlayerId !== undefined){
        this.playerService.getPlayerInPlayer(this.currentPlayerId).subscribe((playerObject) => {
          this.currentPlayer = playerObject;
          this.playerForm.patchValue(this.currentPlayer);
        })
      }
    }
    this.playerForm = this.formBuilder.group({
      'MemberId': [this.currentPlayer?.MemberId, [Validators.required]],
      'MemberEmail': [this.currentPlayer?.MemberEmail, Validators.compose([Validators.required, Validators.email])],
      'MemberName': [this.currentPlayer?.MemberName, [Validators.required]],
      'MemberPhone': [this.currentPlayer?.MemberPhone, [Validators.required]]
    })
    
    
    
  }

  cancelTeamForm() {
    this.location.back();
  }

  onSubmit(formValues){
    console.log('formStatus' + this.formStatus)
    console.log(this.workflow);
    if (this.formStatus === 'editPlayer') {
      this.playerService.updatePlayerInTeam(this.currentSportId, this.currentTeamId,formValues).subscribe((player) => this.playerService.getPlayers())
    } else if (this.formStatus === 'addPlayer') {
      if(this.workflow === 'players') {
        this.playerService.addPlayer(formValues).subscribe((player) => this.playerService.getPlayers());
      } else {
        console.log('going in here');
        console.log(`currentSportId: ${this.currentSportId} and currentTeamID: ${this.currentTeamId}`);
        this.playerService.addPlayerToTeam(this.currentSportId, this.currentTeamId, formValues).subscribe((player) => this.playerService.getPlayers());
      }
    }
    //console.log(formValues);
    this.location.back();
  }
}
