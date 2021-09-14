import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Player } from '../models/player';
import { PlayersService } from '../services/players.service';

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


  constructor(private playersService: PlayersService, private _router: ActivatedRoute) { }

  ngOnInit(): void {
    this._router.url.subscribe((url) => {
      if(url.length > 1) {
        this.currentPath = url[url.length - 2].path
      } else {
        this.currentPath = url[0].path
      }

    });
    console.log("testing " + this.currentPath);
    if(this.currentPath === 'players') {
      this.playersService.getPlayers().subscribe((playersObject) => {
        this.players = playersObject;
      })
    } else {
      this._router.params.subscribe((value) => {
        this.sportId = value.id;
        this.teamId = value.teamId;
        console.log(this.sportId);
        console.log(this.teamId);
      })
      this.playersService.getAllPlayersInSport(this.sportId, this.teamId).subscribe((playersObject) => {
        this.players = playersObject;
      });
    }
  }

}
