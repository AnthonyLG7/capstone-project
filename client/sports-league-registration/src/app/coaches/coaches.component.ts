import { Component, OnInit } from '@angular/core';
import { Coach } from '../models/coach';
import { CoachesService } from '../services/coaches.service';

@Component({
  selector: 'app-coaches',
  templateUrl: './coaches.component.html',
  styleUrls: ['./coaches.component.css']
})
export class CoachesComponent implements OnInit {

  coaches;

  constructor(private coachesService: CoachesService) { }

  ngOnInit(): void {
    this.coachesService.getCoaches().subscribe((coachesObject) => {
      this.coaches = coachesObject;
    });
  }

}
