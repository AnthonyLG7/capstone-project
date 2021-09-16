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
    // return value.filter((v) => v.name.indexOf(searchedObject) > -1 || v.size.indexOf(searchedObject) > -1)
    let data = JSON.stringify(searchedObject);
    let objectData = [];
    // return searchedObject.filter((arrObject) => {
    //     console.log(arrObject);
        
    //     //console.log(data);
    // })
    console.log(`value: ${searchedValue}`);
    if(category === 'sport') {
      objectData = JSON.parse(data).filter((o) => 

        o.GroupId === Number(searchedValue) || o.GroupName.includes(searchedValue) || o.SponsorName.includes(searchedValue) || o.SponsorEmail.includes(searchedValue)|| o.SponsorPhone.includes(searchedValue)
      ) 

    }
    console.log(objectData);
    return objectData;

  }
}
