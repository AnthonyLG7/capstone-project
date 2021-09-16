
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Sport } from '../models/sport';
import { SportsService } from '../services/sports.service';
import { UrlService } from '../services/url.service';

@Component({
  selector: 'app-sport',
  templateUrl: './sport.component.html',
  styleUrls: ['./sport.component.css']
})
export class SportComponent implements OnInit {
  //Added Input for demonstration purposes to show I can use input.
  @Input() sportInput;
  sports: Sport[];

  constructor(private sportsService: SportsService, private router: Router) { }

  ngOnInit(): void {
    
  }

  showEditSportForm(sport: Sport) {
    this.router.navigateByUrl(`${this.router.url}/${sport.GroupId}/editSport`);
  }

  deleteSport(sport: Sport) {
    let result = confirm('You are about to delete a Player! Are you sure?');
    if(result) {
      this.sportsService.deleteSport(sport).subscribe((sport) => this.sportsService.getSports());
      window.location.reload()
    }
  }

}
