import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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


  constructor(private playerService: PlayersService, private formBuilder: FormBuilder, private _router: ActivatedRoute, private location: Location, private router: Router) { }

  ngOnInit(): void {
    this._router.url.subscribe((url) => {
      console.log(url);
      if(url.length === 2) {
        console.log("url length 2")
        this.workflow = url[0].path;
        this.formStatus = url[1].path;
        console.log(url[1].path);
      }
      else if(url.length === 3) {
        console.log("url len 3")
        this.workflow = url[0]?.path;
        this.formStatus = url[1]?.path;
        this.currentPlayerId = Number(url[2]?.path);
      } else {
        this.workflow = url[0]?.path;
        if(url[0]?.path === 'teams') {
          this.currentSportId = Number(url[3]?.path);
          this.currentTeamId = url[1]?.path;
          this.formStatus = url[4]?.path;
          this.currentPlayerId = Number(url[5]?.path);
        } else {
          this.currentSportId = Number(url[1]?.path);
          this.currentTeamId = url[3]?.path;
          this.currentPlayerId = Number(url[5]?.path);
          this.formStatus = url[4]?.path;
        }
      }
    }, (err) => alert(err))
    if(this.workflow === 'sports') {
      if(!Number.isNaN(this.currentPlayerId) && this.currentPlayerId !== undefined) {
        this.playerService.getPlayerById(this.currentSportId,this.currentTeamId, this.currentPlayerId).subscribe((playerObject) => {
          this.currentPlayer = playerObject;
          this.playerForm.patchValue(this.currentPlayer);
      }, (err) => alert(err))
      }
    } else if (this.workflow === 'players'){
      console.log("I am in players main")
      console.log(this.currentPlayerId);
      this.playerService.getPlayerInPlayer(this.currentPlayerId).subscribe((playerObject) => {this.currentPlayer = playerObject; this.playerForm.patchValue(this.currentPlayer);}, (err) => alert(err));
    } else {
      if(!Number.isNaN(this.currentPlayerId) && this.currentPlayerId !== undefined){
        this.playerService.getPlayerById(this.currentSportId,this.currentTeamId, this.currentPlayerId).subscribe((playerObject) => {
          this.currentPlayer = playerObject;
          this.playerForm.patchValue(this.currentPlayer);
        }, (err) => alert(err))
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
      if(this.workflow === 'players') {
        this.playerService.updatePlayerInPlayer(formValues).subscribe((player) => this.playerService.getPlayerInPlayer(this.currentPlayerId), (err) => alert(err))
        
      } else if(this.workflow === 'teams') {
        this.playerService.updatePlayerInTeam(this.currentSportId, this.currentTeamId,formValues).subscribe((player) => this.playerService.getPlayers(), (err) => alert(err))
        //this.router.navigateByUrl(`teams/${this.currentTeamId}/viewPlayers/${this.currentSportId}`);
      } else {
        this.playerService.updatePlayerInTeam(this.currentSportId, this.currentTeamId,formValues).subscribe((player) => this.playerService.getPlayerById(this.currentSportId,this.currentTeamId, this.currentPlayerId), (err) => alert(err))
      }
    } else if (this.formStatus === 'addPlayer') {
      if(this.workflow === 'players') {
        this.playerService.addPlayer(formValues).subscribe((player) => this.playerService.getPlayers(), (err) => alert(err));
      } else {
        console.log('going in here');
        console.log(`currentSportId: ${this.currentSportId} and currentTeamID: ${this.currentTeamId}`);
        this.playerService.addPlayerToTeam(this.currentSportId, this.currentTeamId, formValues).subscribe((player) => this.playerService.getPlayers(), (err) => alert(err));
      }
    }
    //console.log(formValues);
    // console.log(this.router.navigateByUrl());
    //this.router.navigateByUrl('players');
    this.location.back();
    
  }
}
