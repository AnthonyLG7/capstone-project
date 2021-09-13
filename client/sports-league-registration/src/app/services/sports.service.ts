import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Sport } from '../models/sport';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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
    console.log(result);
    return result;
  }
}
