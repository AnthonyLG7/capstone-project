import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Player } from '../models/player';
import { PlayersService } from '../services/players.service';
import { UrlService } from '../services/url.service';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {
  players: Player[];
  player: Player
  currentPath: string;
  sportId: number;
  teamId: string;
  workflow: string;
  url;
  currentSportId: number;
  currentTeamId: string;


  constructor(private playersService: PlayersService, private _router: ActivatedRoute, private router: Router, private urlService: UrlService) { }

  ngOnInit(): void {
    this._router.url.subscribe((url) => {
      this.workflow = url[0].path;
      if(url.length > 1) {
       // this.currentPath = url[url.length - 2].path
       this.currentPath = url[0].path;
        console.log(url);
        console.log(this.currentPath);
      } else {
        this.currentPath = url[0].path
      }

    });
    console.log("testing " + this.currentPath);
    if(this.currentPath === 'players') {
      this.playersService.getPlayers().subscribe((playersObject) => {
        this.players = playersObject;
      })
    } else if (this.currentPath === 'sports') {
      this._router.params.subscribe((value) => {
        this.sportId = value.id;
        this.teamId = value.teamId;
        console.log(this.sportId);
        console.log(this.teamId);
      })
      this.playersService.getAllPlayersInSport(this.sportId, this.teamId).subscribe((playersObject) => {
        this.players = playersObject;
      });
    } else {
      this._router.params.subscribe((value) => {
        this.sportId = value.sportId;
        this.teamId = value.teamId;
        console.log(this.sportId);
        console.log(this.teamId);
      })
      this.playersService.getAllPlayersInSport(this.sportId, this.teamId).subscribe((playersObject) => {
        this.players = playersObject;
      });
    }
    this.url = this.urlService.getUrl(this.router.url);
  }

  

  showPlayersEditForm(player) {
    this.router.navigateByUrl(`${this.router.url}/editPlayer/${player.MemberId}`);
  }

  deletePlayer(player: Player) {
    let result = confirm('You are about to delete a Player! Are you sure?');
    if(result){
    if(this.router.url === '/players'){
      this.playersService.deletePlayerInPlayers(player).subscribe((player) => this.playersService.getPlayers());
    } else {
      console.log(this.url);
      if (this.workflow === 'teams') {
        this.currentSportId = Number(this.url[4]);
        this.currentTeamId = this.url[2];
        this.playersService.deletePlayerInTeam(this.currentSportId,this.currentTeamId, player).subscribe((player) => this.playersService.getPlayers());
      } else if(this.workflow === 'sports') {
        this.currentSportId = Number(this.url[2]);
        this.currentTeamId = this.url[4];
        this.playersService.deletePlayerInTeam(this.currentSportId,this.currentTeamId, player).subscribe((player) => this.playersService.getPlayers());
      }
    }
    window.location.reload();
  }
}

}
