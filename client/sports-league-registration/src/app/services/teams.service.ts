import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Team } from '../models/team';
import { Observable } from 'rxjs';
import { Sport } from '../models/sport';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {

  teamsUrl = 'http://localhost:8082/api/organizations';
  sportsTeamsUrl = 'http://localhost:8082/api/groups/byorganization'

  jsonContentTypeHeaders = {
    headers: new HttpHeaders().set('Content-Type', 'application/json')
  }

  errorMessage: string;
  teams: Team[];
  currentTeam: Team;


  constructor(private http: HttpClient) { }

  getTeams(): Observable<Team[]> {
    const results: Observable<Team[]> = this.http.get<Team[]>(this.teamsUrl);
    console.log(results);
    return results;
  }
  getSportsById(teamId: string): Observable<Sport[]> {
    const result: Observable<Sport[]> = this.http.get<Sport[]>(`${this.sportsTeamsUrl}/${teamId}`);
    console.log(result);
    return result;
  }

  getTeamById(teamId: string): Observable<Team> {
    const result: Observable<Team> = this.http.get<Team>(`${this.teamsUrl}/${teamId}`);
    return result;
  }
}
