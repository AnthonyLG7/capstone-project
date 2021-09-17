import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Sport } from '../models/sport';
import { SportsService } from '../services/sports.service';
import { UrlService } from '../services/url.service';

@Component({
  selector: 'app-sports',
  templateUrl: './sports.component.html',
  styleUrls: ['./sports.component.css'],
})
export class SportsComponent implements OnInit {

  sports: Sport[];
  router: Router;
  searchedValue = '';
  filteredSports: Sport[];

  constructor(private sportsService: SportsService, private _router: Router, private route: ActivatedRoute, private urlService: UrlService) {
    this.router = _router;
   }

  ngOnInit(): void {
    this.sportsService.getSports().subscribe((sportsObjects) =>{
      this.sports = sportsObjects;
      console.log(this.sports);
    }, (err) => alert(err));
  }

  ngAfterContentChecked(): void {
    //Called after every check of the component's or directive's content.
    //Add 'implements AfterContentChecked' to the class.
    this.searchedValue = this.urlService.getSearchedValue();
    console.log(`Inside sports component searchedValue: ${this.searchedValue}`)
    if(this.searchedValue === '' || this.searchedValue === undefined) {
      this.filteredSports = this.sports;
    } else {
      console.log(`Inside sports component else block searchedValue: ${this.searchedValue}`)
      this.filteredSports =this.urlService.filter(this.sports,this.searchedValue ,'sport')
    }
    
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
