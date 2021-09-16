import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, UrlSegment } from '@angular/router';
import { UrlService } from '../services/url.service';

@Component({
  selector: 'app-search-add-nav',
  templateUrl: './search-add-nav.component.html',
  styleUrls: ['./search-add-nav.component.css']
})
export class SearchAddNavComponent implements OnInit {
  url;
  workflow: string;

  constructor(private urlService: UrlService, private router: Router) { }

  ngOnInit(): void {
    
  }

  add() {
console.log(this.router.url);
    this.url = this.urlService.getUrl(this.router.url);
    this.workflow = this.url[1];
    if(this.workflow === 'sports') {
      console.log("I am adding a sport");
      if(this.url.length === 2){
        this.router.navigateByUrl(`${this.router.url}/addSport`);
      } else if (this.url.length === 3) {
        console.log("I am getting bigger size 3");
        this.router.navigateByUrl(`${this.router.url}/addTeam`);
      } else if (this.url.length === 5) {
        console.log("I am the biggest size 5");
        this.router.navigateByUrl(`${this.router.url}/addPlayer`);
      }

    } else if (this.workflow === 'teams'){
      console.log("I am adding a team")
      if(this.url.length === 2){
        this.router.navigateByUrl(`${this.router.url}/addTeam`);
      } else if(this.url.length === 3) {
        console.log("I am getting bigger size 3 add sport to team");
        this.router.navigateByUrl(`${this.router.url}/addSport`);
      } else if(this.url.length === 5) {
        console.log("I am the biggest size 5 adding player to team");
        this.router.navigateByUrl(`${this.router.url}/addPlayer`);
      }
    } else if (this.workflow === 'coaches') {
      console.log("I am adding a coach")
      this.router.navigateByUrl(`${this.router.url}/addCoaches`);
    }
    else {
      console.log("I am adding player")
      if(this.router.url !== `${this.router.url}/addPlayer`) {
        this.router.navigateByUrl(`${this.router.url}/addPlayer`);
      }
    }
  }

}
