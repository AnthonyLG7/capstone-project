import { Component, OnInit } from '@angular/core';
import { Player } from '../models/player';
import { PlayersService } from '../services/players.service';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {
  players: Player[];

  constructor(private playersService: PlayersService) { }

  ngOnInit(): void {
    this.playersService.getPlayers().subscribe((playersObject) => {
      this.players = playersObject;
    })
  }

}
