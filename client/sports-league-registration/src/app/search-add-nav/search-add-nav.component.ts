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
      }

    } else if (this.workflow === 'teams'){
      console.log("I am adding a team")
    } else if (this.workflow === 'coaches') {
      console.log("I am adding a coach")
    }
    else {
      console.log("I am adding player")
    }
  }

}
