import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Sport } from '../models/sport';
import { SportsService } from '../services/sports.service';

@Component({
  selector: 'app-sports',
  templateUrl: './sports.component.html',
  styleUrls: ['./sports.component.css'],
})
export class SportsComponent implements OnInit {

  sports: Sport[];
  router: Router;
  constructor(private sportsService: SportsService, private _router: Router, private route: ActivatedRoute) {
    this.router = _router;
   }

  ngOnInit(): void {
    this.sportsService.getSports().subscribe((sportsObjects) =>{
      this.sports = sportsObjects;
      console.log(this.sports);
    });
  }

  sportsDetailsRoute(sport){
    const id = sport.GroupId;
    console.log(sport);
    // this.router.navigate(['sports', id])
  }
  getRoute(sport: Sport){
    // this.router.navigate([':/sports', `${sport.sportId}`]);

  }

}
