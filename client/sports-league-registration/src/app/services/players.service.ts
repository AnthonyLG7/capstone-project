import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Player } from '../models/player';
import { Sport } from '../models/sport';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {

  playersUrl: string = 'http://localhost:8082/api/members';
  playersInSportUrl: string = 'http://localhost:8082/api/groups';
  //http://localhost:8082/api/groups/:groupid/organizations/:orgid/members/:memberid
  playerByIdUrl: string = 'http://localhost:8082/api/groups'
  playerByPlayerUrl: string = 'http://localhost:8082/api/members'

  jsonContentTypeHeaders = {
    headers: new HttpHeaders().set('Content-Type', 'application/json')
  }

  constructor(private http: HttpClient) { }

  addPlayer(player: Player): Observable<Player> {
    const result: Observable<Player> = this.http.post<Player>(this.playersUrl,player,this.jsonContentTypeHeaders);
    return result;
  }

  getPlayers(): Observable<Player[]> {
    const results: Observable<Player[]> = this.http.get<Player[]>(this.playersUrl);
    console.log(results);
    return results;
  }

  getAllPlayersInSport(groupId: number, sportId: string): Observable<Player[]> {
    const results: Observable<Player[]> = this.http.get<Player[]>(`${this.playersInSportUrl}/${groupId}/organizations/${sportId}/members`);
    return results;
  }
  getPlayerById(groupId: number, sportId: string, playerId: number): Observable<Player>{
    const results: Observable<Player> = this.http.get<Player>(`${this.playerByIdUrl}/${groupId}/organizations/${sportId}/members/${playerId}`);
    return results;
  }
  getPlayerInPlayer(playerId: number): Observable<Player> {
    const result: Observable<Player> = this.http.get<Player>(`${this.playerByPlayerUrl}/${playerId}`);
    return result;
  }

  updatePlayerInTeam(groupId: number, sportId: string, player: Player): Observable<Player> {
    const result: Observable<Player> = this.http.put<Player>(`${this.playerByIdUrl}/${groupId}/organizations/${sportId}/members/${player.MemberId}`,player,this.jsonContentTypeHeaders );
    return result
  }
  updatePlayerInPlayer(player: Player) : Observable<Player> {
    const result : Observable<Player> = this.http.put<Player>(`${this.playerByPlayerUrl}/${player.MemberId}`,player,this.jsonContentTypeHeaders);
    return result;
  }

}
