import { Component, Input, OnInit } from '@angular/core';
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
  searchedValue: string = '';

  ngOnInit(): void {
    
  }
  ngAfterContentInit() {
    console.log(this.searchedValue)
  }

  search(searchedValue) {
    console.log(searchedValue.target.value)
    this.urlService.setSearchedValue(searchedValue.target.value);
  }

  add() {
    console.log(this.urlService.getSearchedValue());
    this.url = this.urlService.getUrl(this.router.url);
    this.workflow = this.url[1];
    if(this.workflow === 'sports') {
      if(this.url.length === 2){
        this.router.navigateByUrl(`${this.router.url}/addSport`);
      } else if (this.url.length === 3) {
        this.router.navigateByUrl(`${this.router.url}/addTeam`);
      } else if (this.url.length === 5) {
        this.router.navigateByUrl(`${this.router.url}/addPlayer`);
      }
    } else if (this.workflow === 'teams'){
      if(this.url.length === 2){
        this.router.navigateByUrl(`${this.router.url}/addTeam`);
      } else if(this.url.length === 3) {
        this.router.navigateByUrl(`${this.router.url}/addSport`);
      } else if(this.url.length === 5) {
        this.router.navigateByUrl(`${this.router.url}/addPlayer`);
      }
    } else if (this.workflow === 'coaches') {
      this.router.navigateByUrl(`${this.router.url}/addCoaches`);
    }
    else {
      if(this.router.url !== `${this.router.url}/addPlayer`) {
        this.router.navigateByUrl(`${this.router.url}/addPlayer`);
      }
    }
  }

}
