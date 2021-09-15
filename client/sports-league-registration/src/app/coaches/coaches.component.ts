import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Coach } from '../models/coach';
import { CoachesService } from '../services/coaches.service';
import { takeUntil } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-coaches',
  templateUrl: './coaches.component.html',
  styleUrls: ['./coaches.component.css']
})
export class CoachesComponent implements OnInit, OnDestroy {

  coaches;
  subscription: Subscription;

  constructor(private coachesService: CoachesService, private router: Router) { }

  ngOnInit(): void {
    this.subscription = this.coachesService.getCoaches().subscribe((coachesObject) => {
      this.coaches = coachesObject;
    });
  }

  showCoachEditForm(coach: Coach) {
    this.router.navigateByUrl(`${this.router.url}/editCoaches/${coach.CoachId}`)
  }

  ngOnDestroy():void {
    this.subscription.unsubscribe();
  }
}
