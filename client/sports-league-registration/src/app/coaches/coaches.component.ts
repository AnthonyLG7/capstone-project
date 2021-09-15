import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Coach } from '../models/coach';
import { CoachesService } from '../services/coaches.service';

@Component({
  selector: 'app-coaches',
  templateUrl: './coaches.component.html',
  styleUrls: ['./coaches.component.css']
})
export class CoachesComponent implements OnInit {

  coaches;

  constructor(private coachesService: CoachesService, private router: Router) { }

  ngOnInit(): void {
    this.coachesService.getCoaches().subscribe((coachesObject) => {
      this.coaches = coachesObject;
    });
  }

  showCoachEditForm(coach: Coach) {
    this.router.navigateByUrl(`${this.router.url}/editCoaches/${coach.CoachId}`)
  }

}
