import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Coach } from '../models/coach';

@Injectable({
  providedIn: 'root'
})
export class CoachesService {

  coachesUrl: string = 'http://localhost:8082/api/coaches';

  jsonContentTypeHeaders = {
    headers: new HttpHeaders().set('Content-Type', 'application/json')
  }

  constructor(private http: HttpClient) { }

  getCoaches(): Observable<Coach[]> {
    const results: Observable<Coach[]> = this.http.get<Coach[]>(this.coachesUrl);
    console.log(results);
    return results;
  }

  getCoachByTeam(coachId: number): Observable<Coach> {
    const results: Observable<Coach> = this.http.get<Coach>(`${this.coachesUrl}/${coachId}`);
    return results;
  }

  updateCoach(coach: Coach): Observable<Coach> {
    const results: Observable<Coach> = this.http.put<Coach>(`${this.coachesUrl}/${coach.CoachId}`, coach, this.jsonContentTypeHeaders);
    return results;
  }
}
