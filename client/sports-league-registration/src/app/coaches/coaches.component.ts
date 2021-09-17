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
    }, (err) => alert(err));
  }

  showCoachEditForm(coach: Coach) {
    this.router.navigateByUrl(`${this.router.url}/editCoaches/${coach.CoachId}`)
  }

  ngOnDestroy():void {
    this.subscription.unsubscribe();
  }
  deleteCoach(coach: Coach) {
    let result = confirm("You are about to delete a coach! Are you sure?");
    if(result) {
      this.coachesService.deleteCoach(coach).subscribe((coach) => this.coachesService.getCoaches(), (err) => alert(err))
      window.location.reload();
    }
    
  }
}
