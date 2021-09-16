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

  filter(searchedObject: any[], searchedValue, category) {
    let data = JSON.stringify(searchedObject);
    console.log(data);
    let objectData = [];
    console.log(`value: ${searchedValue}`);
    if(category === 'sport') {
      objectData = JSON.parse(data).filter((o) => 

        o.GroupId === Number(searchedValue) || o.GroupName.includes(searchedValue) || o.SponsorName.includes(searchedValue) || o.SponsorEmail.includes(searchedValue)|| o.SponsorPhone.includes(searchedValue)
      ) 
    } else if (category === 'sportDetails') {
      objectData = JSON.parse(data).filter((o) => 
        o.OrganizationId.includes(searchedValue) || o.OrganizationName.includes(searchedValue || o.CoachName.includes(searchedValue) || o.CoachPhoneNumber.includes(searchedValue))
      )
    }
    console.log(objectData);
    return objectData;

  }
}
