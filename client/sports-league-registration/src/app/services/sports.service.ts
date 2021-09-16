import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Sport } from '../models/sport';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SportsService {

  sportsUrl = 'http://localhost:8082/api/groups';

  jsonContentTypeHeaders = {
    headers: new HttpHeaders().set('Content-Type', 'application/json')
  }
  errorMessage: string;
  sports: Sport[];
  currentSport: Sport;

  constructor(private http: HttpClient) { }

  

  getSports(): Observable<Sport[]> {
    //return this.sportsList;
    const results: Observable<Sport[]> = this.http.get<Sport[]>(this.sportsUrl);
    console.log(results);
    return results;
  }
  getSportById(sportId: number): Observable<Sport>{
    const result: Observable<Sport> = this.http.get<Sport>(`${this.sportsUrl}/${sportId}`);
    //console.log(result);
    return result;
  }
  addSport(sport: Sport): Observable<Sport> {
    const result: Observable<Sport> = this.http.post<Sport>(`${this.sportsUrl}`,sport,this.jsonContentTypeHeaders);
    return result;
  }

  updateSport(sport: Sport): Observable<Sport> {
    const result: Observable<Sport> = this.http.put<Sport>(this.sportsUrl, sport, this.jsonContentTypeHeaders);
    console.log("Update sport");
    return result;
  }

  deleteSport(sport: Sport): Observable<Sport> {
    const result: Observable<Sport> = this.http.delete<Sport>(`${this.sportsUrl}/${sport.GroupId}`);
    return result;
  }
}
