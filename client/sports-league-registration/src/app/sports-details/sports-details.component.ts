import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Sport } from '../models/sport';
import { SportsService } from '../services/sports.service';

@Component({
  selector: 'app-sports-details',
  templateUrl: './sports-details.component.html',
  styleUrls: ['./sports-details.component.css']
})
export class SportsDetailsComponent implements OnInit {
  currentSport;
  sportId: number;

  constructor(private sportsService: SportsService, private route: ActivatedRoute) { 
    route.params.subscribe((value) => this.sportId = value.id);
    console.log(this.sportId);
  }

  ngOnInit(): void {
    console.log('testing before function ' + this.sportId)
    this.sportsService.getSportById(this.sportId).subscribe((sport) => this.currentSport = sport);
    console.log(this.currentSport);
  }

}
