import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Player } from '../models/player';
import { Sport } from '../models/sport';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {

  playersUrl: string = 'http://localhost:8082/api/players';
  playersInSportUrl: string = 'http://localhost:8082/api/groups';

  jsonContentTypeHeaders = {
    headers: new HttpHeaders().set('Content-Type', 'application/json')
  }

  constructor(private http: HttpClient) { }

  getPlayers(): Observable<Player[]> {
    const results: Observable<Player[]> = this.http.get<Player[]>(this.playersUrl);
    console.log(results);
    return results;
  }

  getAllPlayersInSport(groupId: number, sportId: string): Observable<Player[]> {
    const results: Observable<Player[]> = this.http.get<Player[]>(`${this.playersInSportUrl}/${groupId}/organizations/${sportId}/members`);
    return results;
  }
}
