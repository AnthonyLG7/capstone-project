import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Player } from '../models/player';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {

  playersUrl: string = 'http://localhost:8082/api/players'

  jsonContentTypeHeaders = {
    headers: new HttpHeaders().set('Content-Type', 'application/json')
  }

  constructor(private http: HttpClient) { }

  getPlayers(): Observable<Player[]> {
    const results: Observable<Player[]> = this.http.get<Player[]>(this.playersUrl);
    console.log(results);
    return results;
  }
}
