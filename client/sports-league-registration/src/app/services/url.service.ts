import { Injectable } from '@angular/core';
import { ActivatedRoute, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  constructor(private router: ActivatedRoute) { }
  searchedValue;
  
  getUrl(path: string): string[] {
    return path.split('/');
  }

  setSearchedValue(value) {
    this.searchedValue = value;
    console.log('set searched Value to: ' + this.searchedValue)
  }

  getSearchedValue() {
    return this.searchedValue;
  }
}
